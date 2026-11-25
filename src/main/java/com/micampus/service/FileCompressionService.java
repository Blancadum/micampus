package com.micampus.service;

import org.apache.pdfbox.Loader;
import org.apache.pdfbox.cos.COSName;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDResources;
import org.apache.pdfbox.pdmodel.graphics.PDXObject;
import org.apache.pdfbox.pdmodel.graphics.image.JPEGFactory;
import org.apache.pdfbox.pdmodel.graphics.image.PDImageXObject;
import org.springframework.stereotype.Service;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.Iterator;

/**
 * Optimiza el peso de archivos subidos (PDFs e imágenes) de forma nativa en Java,
 * conservando siempre el resultado solo si realmente reduce el tamaño original.
 */
@Service
public class FileCompressionService {

    private static final int MAX_IMAGE_WIDTH = 1600;
    private static final float JPEG_QUALITY = 0.78f;

    public byte[] compressIfBeneficial(String filename, byte[] originalBytes) {
        if (originalBytes == null || originalBytes.length == 0 || filename == null) {
            return originalBytes;
        }
        String lower = filename.toLowerCase();
        try {
            byte[] candidate = null;
            if (lower.endsWith(".pdf")) {
                candidate = compressPdf(originalBytes);
            } else if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) {
                candidate = compressImage(originalBytes, "jpeg", true);
            } else if (lower.endsWith(".png")) {
                candidate = compressImage(originalBytes, "png", false);
            }
            if (candidate != null && candidate.length > 0 && candidate.length < originalBytes.length) {
                return candidate;
            }
        } catch (Exception ignored) {
        }
        return originalBytes;
    }

    private byte[] compressPdf(byte[] pdfBytes) throws IOException {
        try (PDDocument doc = Loader.loadPDF(pdfBytes);
             ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            for (PDPage page : doc.getPages()) {
                PDResources resources = page.getResources();
                if (resources == null) continue;
                for (COSName name : resources.getXObjectNames()) {
                    PDXObject xObj = resources.getXObject(name);
                    if (xObj instanceof PDImageXObject img) {
                        if (img.isStencil() || img.getSoftMask() != null) continue;
                        BufferedImage bi = img.getImage();
                        if (bi == null || bi.getColorModel().hasAlpha()) continue;
                        BufferedImage scaled = scaleDownIfNeeded(bi, MAX_IMAGE_WIDTH);
                        PDImageXObject recompressed = JPEGFactory.createFromImage(doc, scaled, JPEG_QUALITY);
                        resources.put(name, recompressed);
                    }
                }
            }
            doc.save(out);
            return out.toByteArray();
        }
    }

    private byte[] compressImage(byte[] imageBytes, String format, boolean useJpegQuality) throws IOException {
        BufferedImage input = ImageIO.read(new ByteArrayInputStream(imageBytes));
        if (input == null) return imageBytes;
        BufferedImage scaled = scaleDownIfNeeded(input, MAX_IMAGE_WIDTH);

        if (useJpegQuality && scaled.getColorModel().hasAlpha()) {
            BufferedImage rgb = new BufferedImage(scaled.getWidth(), scaled.getHeight(), BufferedImage.TYPE_INT_RGB);
            Graphics2D g = rgb.createGraphics();
            g.setColor(Color.WHITE);
            g.fillRect(0, 0, scaled.getWidth(), scaled.getHeight());
            g.drawImage(scaled, 0, 0, null);
            g.dispose();
            scaled = rgb;
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        if (useJpegQuality) {
            Iterator<ImageWriter> writers = ImageIO.getImageWritersByFormatName("jpeg");
            if (!writers.hasNext()) return imageBytes;
            ImageWriter writer = writers.next();
            try (ImageOutputStream ios = ImageIO.createImageOutputStream(out)) {
                writer.setOutput(ios);
                ImageWriteParam param = writer.getDefaultWriteParam();
                param.setCompressionMode(ImageWriteParam.MODE_EXPLICIT);
                param.setCompressionQuality(JPEG_QUALITY);
                writer.write(null, new IIOImage(scaled, null, null), param);
            } finally {
                writer.dispose();
            }
        } else {
            ImageIO.write(scaled, format, out);
        }
        return out.toByteArray();
    }

    private BufferedImage scaleDownIfNeeded(BufferedImage img, int maxWidth) {
        if (img.getWidth() <= maxWidth) return img;
        int targetW = maxWidth;
        int targetH = Math.max(1, (int) Math.round((double) img.getHeight() * targetW / img.getWidth()));
        int type = img.getColorModel().hasAlpha() ? BufferedImage.TYPE_INT_ARGB : BufferedImage.TYPE_INT_RGB;
        BufferedImage resized = new BufferedImage(targetW, targetH, type);
        Graphics2D g = resized.createGraphics();
        g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
        g.setRenderingHint(RenderingHints.KEY_RENDERING, RenderingHints.VALUE_RENDER_QUALITY);
        g.drawImage(img, 0, 0, targetW, targetH, null);
        g.dispose();
        return resized;
    }
}

package com.micampus.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.micampus.model.CampusDatabase;
import com.micampus.model.Subject;
import com.micampus.model.UploadedFile;
import com.micampus.repository.CampusStore;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.StandardCopyOption;
import java.text.Normalizer;
import java.time.Instant;
import java.util.List;
import java.util.Locale;
import java.util.UUID;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;
import java.util.zip.ZipOutputStream;

@Service
public class BackupService {

    private final CampusStore store;
    private final DocumentNormalizationService normalizationService;
    private final FileCompressionService compressionService;
    private final ObjectMapper mapper = new ObjectMapper();

    public BackupService(
            CampusStore store,
            @org.springframework.context.annotation.Lazy DocumentNormalizationService normalizationService,
            FileCompressionService compressionService
    ) {
        this.store = store;
        this.normalizationService = normalizationService;
        this.compressionService = compressionService;
    }

    public UploadedFile saveUploadedFile(String subjectId, MultipartFile file) throws IOException {
        return saveUploadedFile(subjectId, file, "otros");
    }

    public UploadedFile saveUploadedFile(String subjectId, MultipartFile file, String folder) throws IOException {
        String safeFolder = normalizeSlug(folder);
        if (safeFolder.isBlank()) safeFolder = "otros";

        String original = file.getOriginalFilename() != null ? Path.of(file.getOriginalFilename()).getFileName().toString() : "archivo";
        String storedName = System.currentTimeMillis() + "-" + original.replaceAll("[^a-zA-Z0-9._-]", "_");

        Path subjectDir = store.getUploadsDir().resolve(resolveSubjectFolderName(subjectId)).resolve(safeFolder);
        Files.createDirectories(subjectDir);
        Path target = subjectDir.resolve(storedName);
        byte[] finalBytes = compressionService.compressIfBeneficial(original, file.getBytes());
        Files.write(target, finalBytes);

        UploadedFile meta = new UploadedFile();
        meta.setId(UUID.randomUUID().toString().substring(0, 8));
        meta.setSubjectId(subjectId);
        meta.setOriginalName(original);
        meta.setStoredName(storedName);
        meta.setSizeBytes(finalBytes.length);
        meta.setUploadedAt(Instant.now().toString());
        meta.setFolder(safeFolder);

        store.write(db -> db.getUploads().add(meta));
        try {
            normalizationService.normalizeUploadedFile(meta, target);
        } catch (Exception ignored) {
        }
        return meta;
    }

    public UploadedFile saveNormalizedCalendarFile(String subjectId, String icsContent) throws IOException {
        String fileName = buildNormalizedCalendarFilename(subjectId);
        byte[] bytes = icsContent.getBytes(StandardCharsets.UTF_8);

        Path calDir = store.getUploadsDir().resolve(resolveSubjectFolderName(subjectId)).resolve("calendario");
        Files.createDirectories(calDir);
        Path target = calDir.resolve(fileName);
        Files.write(target, bytes);

        UploadedFile meta = new UploadedFile();
        meta.setId(UUID.randomUUID().toString().substring(0, 8));
        meta.setSubjectId(subjectId);
        meta.setOriginalName(fileName);
        meta.setStoredName(fileName);
        meta.setSizeBytes(bytes.length);
        meta.setUploadedAt(Instant.now().toString());
        meta.setFolder("calendario");

        store.write(db -> {
            db.getUploads().removeIf(u -> subjectId.equals(u.getSubjectId()) && fileName.equals(u.getStoredName()));
            db.getUploads().add(meta);
        });
        return meta;
    }

    public String buildNormalizedCalendarFilename(String subjectId) {
        if (subjectId == null || subjectId.isBlank()) {
            return "calendario-micampus.ics";
        }
        String slug = store.read(db -> db.getSubjects().stream()
                .filter(s -> subjectId.equals(s.getId()))
                .findFirst()
                .map(s -> normalizeSlug(s.getCode() != null && !s.getCode().isBlank() ? s.getCode() : s.getTitle()))
                .orElse(""));
        if (slug.isBlank()) {
            slug = normalizeSlug(subjectId);
        }
        return "calendario-" + (slug.isBlank() ? "asignatura" : slug) + ".ics";
    }

    public String resolveSubjectFolderName(String subjectId) {
        if (subjectId == null || subjectId.isBlank()) return "general";
        String slug = store.read(db -> db.getSubjects().stream()
                .filter(s -> subjectId.equals(s.getId()))
                .findFirst()
                .map(Subject::getTitle)
                .map(this::normalizeSlug)
                .orElse(""));
        return slug.isBlank() ? subjectId : slug + "-" + subjectId;
    }

    public String normalizeSlug(String input) {
        if (input == null || input.isBlank()) return "";
        String decomposed = Normalizer.normalize(input, Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "");
        return decomposed.toLowerCase(Locale.ROOT)
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("^-+|-+$", "");
    }

    public Resource loadUploadedFile(String subjectId, String storedName) throws IOException {
        String subjectFolder = resolveSubjectFolderName(subjectId);
        List<Path> candidates = new java.util.ArrayList<>();
        for (String sub : List.of("tutor", "temario", "calendario", "entregas", "otros")) {
            candidates.add(store.getUploadsDir().resolve(subjectFolder).resolve(sub).resolve(storedName).normalize());
        }
        candidates.add(store.getUploadsDir().resolve(subjectFolder).resolve(storedName).normalize());
        candidates.add(store.getUploadsDir().resolve(subjectId).resolve(storedName).normalize());

        for (Path file : candidates) {
            if (file.startsWith(store.getUploadsDir()) && Files.exists(file)) {
                return new UrlResource(file.toUri());
            }
        }
        throw new IOException("Archivo no encontrado");
    }

    public byte[] exportFullBackupZip() throws IOException {
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        try (ZipOutputStream zos = new ZipOutputStream(baos)) {
            byte[] jsonBytes = store.read(db -> {
                try {
                    return mapper.writerWithDefaultPrettyPrinter().writeValueAsBytes(db);
                } catch (IOException e) {
                    throw new RuntimeException(e);
                }
            });
            zos.putNextEntry(new ZipEntry("campus-db.json"));
            zos.write(jsonBytes);
            zos.closeEntry();

            Path sqliteFile = store.getSqliteFile();
            if (sqliteFile != null && Files.exists(sqliteFile)) {
                zos.putNextEntry(new ZipEntry("micampus.db"));
                Files.copy(sqliteFile, zos);
                zos.closeEntry();
            }

            Path uploadsDir = store.getUploadsDir();
            if (Files.exists(uploadsDir)) {
                try (var stream = Files.walk(uploadsDir)) {
                    for (Path p : stream.filter(Files::isRegularFile).toList()) {
                        String rel = "uploads/" + uploadsDir.relativize(p).toString().replace("\\", "/");
                        zos.putNextEntry(new ZipEntry(rel));
                        Files.copy(p, zos);
                        zos.closeEntry();
                    }
                }
            }
        }
        return baos.toByteArray();
    }

    public void restoreFullBackupZip(MultipartFile zipFile) throws IOException {
        CampusDatabase restoredDb = null;
        try (InputStream is = zipFile.getInputStream(); ZipInputStream zis = new ZipInputStream(is)) {
            ZipEntry entry;
            while ((entry = zis.getNextEntry()) != null) {
                if (entry.isDirectory()) continue;
                String name = entry.getName();
                if ("campus-db.json".equals(name)) {
                    restoredDb = mapper.readValue(zis.readAllBytes(), CampusDatabase.class);
                } else if (name.startsWith("uploads/")) {
                    String rel = name.substring("uploads/".length());
                    Path dest = store.getUploadsDir().resolve(rel).normalize();
                    if (dest.startsWith(store.getUploadsDir())) {
                        Files.createDirectories(dest.getParent());
                        Files.write(dest, zis.readAllBytes());
                    }
                }
                zis.closeEntry();
            }
        }

        if (restoredDb == null) {
            throw new IOException("El archivo ZIP no contiene campus-db.json válido");
        }
        store.replaceDatabase(restoredDb);
    }
}

package com.micampus.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;
import com.micampus.model.Subject;
import com.micampus.model.UploadedFile;
import com.micampus.repository.CampusStore;
import jakarta.annotation.PostConstruct;
import org.apache.pdfbox.Loader;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.time.Instant;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.stream.Stream;
import java.util.zip.ZipEntry;
import java.util.zip.ZipInputStream;

/**
 * Normaliza archivos subidos y documentos existentes (PDF, ODT, MD, TXT) en texto limpio
 * con identificadores canónicos (docId) para consultarlos y trabajarlos con la IA vía API.
 */
@Service
public class DocumentNormalizationService {

    private static final Set<String> SUPPORTED_EXT = Set.of(".pdf", ".odt", ".md", ".txt");
    private static final Pattern EAC_PATTERN = Pattern.compile("(eac|eaf)[_-]?(\\d+)", Pattern.CASE_INSENSITIVE);

    private final CampusStore store;
    private final NoteImporterService noteImporterService;
    private final ObjectMapper mapper;
    private final Path normalizedDir;
    private final String publicDir;

    public DocumentNormalizationService(
            CampusStore store,
            NoteImporterService noteImporterService,
            @Value("${micampus.public-dir:}") String publicDir
    ) {
        this.store = store;
        this.noteImporterService = noteImporterService;
        this.publicDir = publicDir != null ? publicDir.trim() : "";
        this.normalizedDir = store.getUploadsDir().getParent().resolve("normalized-docs");
        this.mapper = new ObjectMapper().enable(SerializationFeature.INDENT_OUTPUT);
    }

    @PostConstruct
    public void init() {
        try {
            Files.createDirectories(normalizedDir);
            syncAllDocuments();
        } catch (Exception ignored) {
        }
    }

    public Map<String, Object> syncAllDocuments() throws IOException {
        Files.createDirectories(normalizedDir);
        int indexed = 0;
        int failed = 0;
        List<String> docIds = new ArrayList<>();

        if (!publicDir.isBlank()) {
            Path eacsRoot = Path.of(publicDir).resolve("eacs");
            if (Files.isDirectory(eacsRoot)) {
                try (Stream<Path> walk = Files.walk(eacsRoot)) {
                    for (Path p : walk.filter(Files::isRegularFile).toList()) {
                        String name = p.getFileName().toString();
                        if (name.startsWith("~$") || name.startsWith(".")) continue;
                        if (!isSupported(name)) continue;
                        String rel = eacsRoot.relativize(p).toString().replace('\\', '/');
                        String[] parts = rel.split("/");
                        String subjectCode = parts.length > 0 ? parts[0].toLowerCase() : "general";
                        String eacId = detectEacId(rel);
                        String kind = detectKind(rel, false);
                        try {
                            Map<String, Object> doc = normalizeFile(p, subjectCode, eacId, kind, name, "/eacs/" + rel);
                            docIds.add(String.valueOf(doc.get("docId")));
                            indexed++;
                        } catch (Exception e) {
                            failed++;
                        }
                    }
                }
            }
        }

        for (Path materialRoot : resolveMaterialRoots()) {
            if (!Files.isDirectory(materialRoot)) continue;
            try (Stream<Path> walk = Files.walk(materialRoot)) {
                for (Path p : walk.filter(Files::isRegularFile).toList()) {
                    String name = p.getFileName().toString();
                    if (name.startsWith("~$") || name.startsWith(".")) continue;
                    if (!isSupported(name)) continue;
                    String rel = materialRoot.relativize(p).toString().replace('\\', '/');
                    String[] parts = rel.split("/");
                    String folderName = parts.length > 0 ? parts[0].toLowerCase() : "general";
                    String subjectCode = mapMaterialFolderToSubjectCode(folderName);
                    String unitOrEac = detectUnitOrEacId(rel);
                    try {
                        Map<String, Object> doc = normalizeFile(
                                p, subjectCode, unitOrEac, "temario_oficial", name, "/material/" + rel
                        );
                        docIds.add(String.valueOf(doc.get("docId")));
                        indexed++;
                    } catch (Exception e) {
                        failed++;
                    }
                }
            }
        }

        List<UploadedFile> uploads = store.read(db -> new ArrayList<>(db.getUploads()));
        Map<String, Subject> subjectById = store.read(db -> {
            Map<String, Subject> m = new HashMap<>();
            for (Subject s : db.getSubjects()) m.put(s.getId(), s);
            return m;
        });

        for (UploadedFile u : uploads) {
            if (!isSupported(u.getOriginalName())) continue;
            Path filePath = findUploadPath(u);
            if (filePath == null || !Files.isRegularFile(filePath)) continue;
            Subject sub = subjectById.get(u.getSubjectId());
            String subjectCode = sub != null && sub.getCode() != null ? sub.getCode().toLowerCase() : u.getSubjectId();
            String eacId = detectEacId(u.getFolder() + " " + u.getOriginalName());
            String kind = detectKind(u.getFolder() + "/" + u.getOriginalName(), true);
            try {
                Map<String, Object> doc = normalizeFile(
                        filePath, subjectCode, eacId, kind, u.getOriginalName(),
                        "/api/uploads/" + u.getSubjectId() + "/" + u.getStoredName()
                );
                docIds.add(String.valueOf(doc.get("docId")));
                indexed++;
            } catch (Exception e) {
                failed++;
            }
        }

        return Map.of("indexed", indexed, "failed", failed, "docIds", docIds);
    }

    public Map<String, Object> normalizeUploadedFile(UploadedFile meta, Path filePath) throws IOException {
        if (meta == null || filePath == null || !isSupported(meta.getOriginalName())) {
            return Map.of();
        }
        String subjectCode = store.read(db -> db.getSubjects().stream()
                .filter(s -> Objects.equals(s.getId(), meta.getSubjectId()))
                .map(Subject::getCode)
                .filter(Objects::nonNull)
                .map(String::toLowerCase)
                .findFirst()
                .orElse(meta.getSubjectId()));

        String eacId = detectEacId(meta.getFolder() + " " + meta.getOriginalName());
        String kind = detectKind(meta.getFolder() + "/" + meta.getOriginalName(), true);
        return normalizeFile(
                filePath, subjectCode, eacId, kind, meta.getOriginalName(),
                "/api/uploads/" + meta.getSubjectId() + "/" + meta.getStoredName()
        );
    }

    public List<Map<String, Object>> listDocuments(String subjectCode, String eacId, String kind) throws IOException {
        Files.createDirectories(normalizedDir);
        List<Map<String, Object>> list = new ArrayList<>();
        try (Stream<Path> files = Files.list(normalizedDir)) {
            for (Path p : files.filter(f -> f.toString().endsWith(".json")).sorted().toList()) {
                @SuppressWarnings("unchecked")
                Map<String, Object> doc = mapper.readValue(p.toFile(), Map.class);
                if (subjectCode != null && !subjectCode.isBlank()
                        && !subjectCode.equalsIgnoreCase(String.valueOf(doc.getOrDefault("subjectCode", "")))) {
                    continue;
                }
                if (eacId != null && !eacId.isBlank()
                        && !eacId.equalsIgnoreCase(String.valueOf(doc.getOrDefault("eacId", "")))) {
                    continue;
                }
                if (kind != null && !kind.isBlank()
                        && !kind.equalsIgnoreCase(String.valueOf(doc.getOrDefault("kind", "")))) {
                    continue;
                }
                Map<String, Object> summary = new LinkedHashMap<>(doc);
                summary.remove("text");
                list.add(summary);
            }
        }
        return list;
    }

    @SuppressWarnings("unchecked")
    public Optional<Map<String, Object>> getDocument(String docId) throws IOException {
        String safeId = slugify(docId);
        Path target = normalizedDir.resolve(safeId + ".json");
        if (!Files.isRegularFile(target)) return Optional.empty();
        return Optional.of(mapper.readValue(target.toFile(), Map.class));
    }

    private Map<String, Object> normalizeFile(
            Path filePath,
            String subjectCode,
            String eacId,
            String kind,
            String title,
            String sourceUrl
    ) throws IOException {
        Files.createDirectories(normalizedDir);
        String lower = filePath.getFileName().toString().toLowerCase();
        String rawText;
        int pageCount = 0;

        if (lower.endsWith(".pdf")) {
            byte[] bytes = Files.readAllBytes(filePath);
            try (PDDocument pdf = Loader.loadPDF(bytes)) {
                pageCount = pdf.getNumberOfPages();
            }
            rawText = noteImporterService.extractPdfText(bytes);
        } else if (lower.endsWith(".odt")) {
            rawText = extractOdtText(filePath);
        } else {
            rawText = Files.readString(filePath, StandardCharsets.UTF_8);
        }

        String normalizedText = cleanText(noteImporterService.normalizeMarkdown(rawText));
        String baseName = stripExtension(title);
        String docId = buildDocId(subjectCode, eacId, kind, baseName);

        Map<String, Object> doc = new LinkedHashMap<>();
        doc.put("docId", docId);
        doc.put("subjectCode", subjectCode);
        doc.put("eacId", eacId);
        doc.put("kind", kind);
        doc.put("title", title);
        doc.put("sourceUrl", sourceUrl);
        doc.put("pageCount", pageCount);
        doc.put("charCount", normalizedText.length());
        doc.put("normalizedAt", Instant.now().toString());
        doc.put("text", normalizedText);

        mapper.writeValue(normalizedDir.resolve(docId + ".json").toFile(), doc);
        return doc;
    }

    private String extractOdtText(Path odtPath) throws IOException {
        try (InputStream is = Files.newInputStream(odtPath); ZipInputStream zis = new ZipInputStream(is)) {
            ZipEntry entry;
            while ((entry = zis.getNextEntry()) != null) {
                if ("content.xml".equals(entry.getName())) {
                    String xml = new String(zis.readAllBytes(), StandardCharsets.UTF_8);
                    return xml
                            .replaceAll("</text:p>", "\n")
                            .replaceAll("</text:h>", "\n\n")
                            .replaceAll("<text:line-break/>", "\n")
                            .replaceAll("<[^>]+>", " ");
                }
            }
        }
        return "";
    }

    private Path findUploadPath(UploadedFile meta) {
        try (Stream<Path> walk = Files.walk(store.getUploadsDir())) {
            return walk.filter(Files::isRegularFile)
                    .filter(p -> p.getFileName().toString().equals(meta.getStoredName()))
                    .findFirst()
                    .orElse(null);
        } catch (IOException e) {
            return null;
        }
    }

    private boolean isSupported(String filename) {
        if (filename == null) return false;
        String lower = filename.toLowerCase();
        return SUPPORTED_EXT.stream().anyMatch(lower::endsWith);
    }

    private List<Path> resolveMaterialRoots() {
        List<Path> roots = new ArrayList<>();
        roots.add(Path.of("frontend", "public", "material"));
        roots.add(store.getUploadsDir().getParent().resolve("material"));
        if (!publicDir.isBlank()) {
            roots.add(Path.of(publicDir).resolve("material"));
        }
        return roots;
    }

    private String mapMaterialFolderToSubjectCode(String folderName) {
        if (folderName == null) return "general";
        return switch (folderName.toLowerCase()) {
            case "desplegament", "despliegue", "desp", "m08", "0614" -> "desp";
            case "entorns", "entornos", "ent", "m05", "0487" -> "ent";
            case "interficies", "interfaces", "int", "0615" -> "int";
            case "digitalitzacio", "digitalizacion", "digi" -> "digi";
            case "ipo2", "ipo" -> "ipo2";
            default -> folderName.toLowerCase();
        };
    }

    private String detectUnitOrEacId(String text) {
        if (text == null) return "general";
        Matcher unitMatcher = Pattern.compile("\\b(u\\d+)\\b|_(u\\d+)_", Pattern.CASE_INSENSITIVE).matcher(text);
        if (unitMatcher.find()) {
            String u = unitMatcher.group(1) != null ? unitMatcher.group(1) : unitMatcher.group(2);
            return u.toLowerCase();
        }
        if (text.toLowerCase().contains("indice")) return "indice";
        return detectEacId(text);
    }

    private String detectEacId(String text) {
        if (text == null) return "general";
        Matcher m = EAC_PATTERN.matcher(text);
        return m.find() ? (m.group(1).toLowerCase() + m.group(2)) : "general";
    }

    private String detectKind(String pathOrName, boolean isUpload) {
        String lower = pathOrName == null ? "" : pathOrName.toLowerCase();
        if (lower.contains("solucion") || lower.contains("solucio")) return "solucion";
        if (lower.contains("enunciat") || lower.contains("enunciado")) return "enunciado";
        if (lower.contains("paso_a_paso") || lower.contains("apuntes")) return "apunte";
        return isUpload ? "entrega" : "otro";
    }

    private String buildDocId(String subjectCode, String eacId, String kind, String baseName) {
        return slugify(String.join("-",
                subjectCode == null ? "gen" : subjectCode,
                eacId == null ? "general" : eacId,
                kind == null ? "otro" : kind,
                baseName == null ? "doc" : baseName
        ));
    }

    private String cleanText(String text) {
        if (text == null) return "";
        return text
                .replaceAll("[\\p{Cntrl}&&[^\n\t]]", "")
                .replaceAll(" +", " ")
                .trim();
    }

    private String stripExtension(String name) {
        int idx = name.lastIndexOf('.');
        return idx > 0 ? name.substring(0, idx) : name;
    }

    private String slugify(String s) {
        return java.text.Normalizer.normalize(s == null ? "" : s, java.text.Normalizer.Form.NFD)
                .replaceAll("\\p{InCombiningDiacriticalMarks}+", "")
                .toLowerCase()
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }
}

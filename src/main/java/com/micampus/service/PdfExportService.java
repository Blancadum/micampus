package com.micampus.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.micampus.model.Lesson;
import com.micampus.model.Subject;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.PDPage;
import org.apache.pdfbox.pdmodel.PDPageContentStream;
import org.apache.pdfbox.pdmodel.common.PDRectangle;
import org.apache.pdfbox.pdmodel.font.PDFont;
import org.apache.pdfbox.pdmodel.font.PDType1Font;
import org.apache.pdfbox.pdmodel.font.Standard14Fonts;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.awt.Color;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.text.Normalizer;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Genera PDFs de estudio con maquetacion profesional usando Apache PDFBox:
 * - Indice automatico cuando se exporta una unidad o libro completo
 * - Jerarquia y numeracion exacta (1., 2., 2.1., 2.1.1.) sincronizada con bookSections
 * - Tablas Markdown reales con cabecera sombreada y bordes
 * - Cajas de codigo con etiqueta de lenguaje y citas destacadas
 * - Control de titulos huerfanos y paginacion limpia
 */
@Service
public class PdfExportService {

    private static final float MARGIN = 48f;
    private static final float PAGE_WIDTH = PDRectangle.A4.getWidth();
    private static final float PAGE_HEIGHT = PDRectangle.A4.getHeight();
    private static final float CONTENT_WIDTH = PAGE_WIDTH - (MARGIN * 2);

    private static final PDFont FONT_REGULAR = new PDType1Font(Standard14Fonts.FontName.HELVETICA);
    private static final PDFont FONT_BOLD = new PDType1Font(Standard14Fonts.FontName.HELVETICA_BOLD);
    private static final PDFont FONT_OBLIQUE = new PDType1Font(Standard14Fonts.FontName.HELVETICA_OBLIQUE);
    private static final PDFont FONT_MONO = new PDType1Font(Standard14Fonts.FontName.COURIER);
    private static final PDFont FONT_MONO_BOLD = new PDType1Font(Standard14Fonts.FontName.COURIER_BOLD);
    private static final PDFont FONT_MONO_OBLIQUE = new PDType1Font(Standard14Fonts.FontName.COURIER_OBLIQUE);

    private static final Color COLOR_TITLE = new Color(15, 23, 42);
    private static final Color COLOR_TEXT = new Color(30, 41, 59);
    private static final Color COLOR_MUTED = new Color(100, 116, 139);
    private static final Color COLOR_ACCENT = new Color(22, 163, 74);
    private static final Color COLOR_ACCENT_SOFT = new Color(240, 253, 244);
    private static final Color COLOR_CODE_BG = new Color(15, 23, 42);
    private static final Color COLOR_CODE_HEADER = new Color(30, 41, 59);
    private static final Color COLOR_CODE_TEXT = new Color(226, 232, 240);
    private static final Color COLOR_CODE_COMMENT = new Color(148, 163, 184);
    private static final Color COLOR_CODE_KEYWORD = new Color(56, 189, 248);
    private static final Color COLOR_CODE_STRING = new Color(252, 211, 77);
    private static final Color COLOR_CODE_BADGE = new Color(74, 222, 128);
    private static final Color COLOR_TABLE_HEAD = new Color(226, 232, 240);
    private static final Color COLOR_TABLE_ALT = new Color(248, 250, 252);
    private static final Color COLOR_QUOTE_BG = new Color(248, 250, 252);
    private static final Color COLOR_QUOTE_BAR = new Color(59, 130, 246);
    private static final Color COLOR_DIVIDER = new Color(226, 232, 240);

    private final ObjectMapper objectMapper = new ObjectMapper();

    public byte[] exportLessonsToPdf(
            Subject subject,
            String unitFilter,
            String lessonIdFilter,
            List<Lesson> allSubjectLessons
    ) throws IOException {
        List<Map<String, Object>> bookSections = loadBookSections(subject);
        Map<String, NumberedMeta> metaByLessonId = computeNumbering(allSubjectLessons, bookSections);

        List<Lesson> filtered = allSubjectLessons.stream()
                .filter(l -> lessonIdFilter == null || lessonIdFilter.isBlank() || lessonIdFilter.equals(l.getId()))
                .filter(l -> unitFilter == null || unitFilter.isBlank() || (l.getUnit() != null && l.getUnit().equalsIgnoreCase(unitFilter)))
                .toList();

        try (PDDocument doc = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Color accentColor = parseSubjectAccent(subject);
            Cursor cursor = new Cursor(doc, accentColor);
            cursor.newPage();

            String subjectTitle = safeText(subject != null ? subject.getTitle() : "MiCampus");
            String subtitle = (unitFilter != null && !unitFilter.isBlank())
                    ? safeText(unitFilter)
                    : (filtered.size() == 1 && filtered.get(0).getUnit() != null
                        ? safeText(filtered.get(0).getUnit())
                        : "Libro de apuntes completo");

            cursor.drawAccentBanner(subjectTitle, subtitle, filtered.size(), accentColor);

            if (filtered.isEmpty()) {
                cursor.writeWrapped("No hay lecciones disponibles para exportar en esta seleccion.", FONT_REGULAR, 11f, COLOR_MUTED, 0f, 15f);
            } else {
                // Indice automatico para unidad o libro completo
                if (filtered.size() > 1) {
                    renderTableOfContents(cursor, filtered, metaByLessonId);
                    renderUnitPlatforms(cursor, filtered, accentColor);
                    cursor.newPage();
                }

                String lastUnit = "";
                String lastSectionPrinted = "";
                for (int i = 0; i < filtered.size(); i++) {
                    Lesson l = filtered.get(i);
                    NumberedMeta meta = metaByLessonId.getOrDefault(l.getId(), new NumberedMeta("", "", ""));

                    String unitName = safeText(l.getUnit());
                    if (!unitName.isBlank() && !unitName.equals(lastUnit) && filtered.size() > 1) {
                        if (i > 0) cursor.addSpace(12f);
                        cursor.ensureSpace(72f);
                        cursor.writeWrapped(unitName.toUpperCase(), FONT_BOLD, 9.5f, accentColor, 0f, 13f);
                        lastUnit = unitName;
                        lastSectionPrinted = "";
                    }

                    if (!meta.sectionHeader().isBlank() && !meta.sectionHeader().equals(lastSectionPrinted) && filtered.size() > 1) {
                        cursor.addSpace(6f);
                        cursor.ensureSpace(125f);
                        cursor.writeWrapped(safeText(meta.sectionHeader()), FONT_BOLD, 12.5f, accentColor, 0f, 17f);
                        lastSectionPrinted = meta.sectionHeader();
                    }

                    cursor.ensureSpace(105f);
                    String fullLessonTitle = (meta.numLabel().isBlank() ? "" : meta.numLabel() + " ") + safeText(l.getTitle());
                    cursor.writeWrapped(fullLessonTitle, FONT_BOLD, 15f, COLOR_TITLE, 0f, 19.5f);
                    cursor.drawDivider();
                    cursor.addSpace(4f);

                    String md = l.getContent() != null && !l.getContent().isBlank()
                            ? l.getContent()
                            : (l.getSummary() != null ? l.getSummary() : "");
                    renderMarkdown(cursor, md, l.getTitle(), meta.numLabel());
                    cursor.addSpace(16f);
                }
            }

            cursor.closeCurrentStream();
            addPageFooters(doc, subjectTitle);
            doc.save(out);
            return out.toByteArray();
        }
    }

    private void renderTableOfContents(Cursor cursor, List<Lesson> lessons, Map<String, NumberedMeta> metaMap) throws IOException {
        cursor.writeWrapped("INDICE DE CONTENIDOS", FONT_BOLD, 10.5f, COLOR_ACCENT, 0f, 15f);
        cursor.drawDivider();
        cursor.addSpace(4f);

        String lastUnit = "";
        String lastSec = "";
        for (Lesson l : lessons) {
            NumberedMeta meta = metaMap.getOrDefault(l.getId(), new NumberedMeta("", "", ""));
            String unitName = safeText(l.getUnit());
            if (!unitName.isBlank() && !unitName.equals(lastUnit)) {
                cursor.addSpace(4f);
                cursor.writeWrapped(unitName, FONT_BOLD, 10f, COLOR_TITLE, 0f, 14f);
                lastUnit = unitName;
                lastSec = "";
            }
            if (!meta.sectionHeader().isBlank() && !meta.sectionHeader().equals(lastSec)) {
                cursor.writeWrapped(safeText(meta.sectionHeader()), FONT_BOLD, 9.5f, COLOR_ACCENT, 10f, 13.5f);
                lastSec = meta.sectionHeader();
            }
            String indentLabel = (meta.numLabel().isBlank() ? "- " : meta.numLabel() + " ") + safeText(l.getTitle());
            boolean isTopLevel = meta.sectionHeader().isBlank();
            float indent = isTopLevel ? 10f : 22f;
            cursor.writeWrapped(
                    indentLabel,
                    isTopLevel ? FONT_BOLD : FONT_REGULAR,
                    9.5f,
                    isTopLevel ? COLOR_ACCENT : COLOR_TEXT,
                    indent,
                    13.5f
            );
        }
    }

    private record PlatformSpec(String name, String role, List<String> keywords) {}

    private static final List<PlatformSpec> PLATFORM_SPECS = List.of(
            new PlatformSpec("Apache HTTP", "Servidor Web", List.of("apache", "apache2", "httpd", "virtual host", "mod_proxy")),
            new PlatformSpec("ProFTPD", "FTP / FTPS", List.of("proftpd", "ftps", "ftp")),
            new PlatformSpec("OpenSSL", "SSL / TLS", List.of("openssl", "ssl", "tls", "https", "x.509")),
            new PlatformSpec("Ubuntu / Linux", "Sistema Base", List.of("linux", "ubuntu", "systemd", "apt")),
            new PlatformSpec("MariaDB / MySQL", "Base de Datos", List.of("mariadb", "mysql", "phpmyadmin", "sql")),
            new PlatformSpec("PHP", "Backend Dinamico", List.of("php", "lamp", "phpmyadmin")),
            new PlatformSpec("WordPress", "CMS Web", List.of("wordpress", "cms")),
            new PlatformSpec("Apache Tomcat", "Servlets / JSP", List.of("tomcat", "servlet", "jsp", ".war", "ajp")),
            new PlatformSpec("WildFly / JBoss", "Java EE", List.of("wildfly", "jboss")),
            new PlatformSpec("Docker", "Contenedores", List.of("docker", "dockerfile", "compose", "contenedor")),
            new PlatformSpec("Vagrant", "VMs Reproducibles", List.of("vagrant", "vagrantfile")),
            new PlatformSpec("OpenLDAP", "Directorio LDAP", List.of("ldap", "openldap", "ldif", "phpldapadmin")),
            new PlatformSpec("BIND9 DNS", "Resolucion DNS", List.of("bind9", "dns", "zona directa")),
            new PlatformSpec("Node.js / Gulp", "Build Frontend", List.of("node.js", "nodejs", "npm", "gulp", "webpack")),
            new PlatformSpec("Git / GitLab", "Control de Versiones", List.of("git", "gitlab", "github", "commit", "merge"))
    );

    private void renderUnitPlatforms(Cursor cursor, List<Lesson> lessons, Color accentColor) throws IOException {
        StringBuilder sb = new StringBuilder();
        for (Lesson l : lessons) {
            if (l.getTitle() != null) sb.append(l.getTitle()).append(' ');
            if (l.getSummary() != null) sb.append(l.getSummary()).append(' ');
            if (l.getContent() != null) sb.append(l.getContent()).append(' ');
        }
        String corpus = sb.toString().toLowerCase(Locale.ROOT);
        List<PlatformSpec> matched = PLATFORM_SPECS.stream()
                .filter(p -> p.keywords().stream().anyMatch(corpus::contains))
                .toList();
        if (matched.isEmpty()) return;

        cursor.addSpace(12f);
        cursor.ensureSpace(40f + matched.size() * 14f);
        cursor.writeWrapped("PLATAFORMAS Y TECNOLOGIAS DE ESTA UNIDAD", FONT_BOLD, 10f, accentColor, 0f, 14f);
        cursor.drawDivider();
        cursor.addSpace(4f);
        for (PlatformSpec p : matched) {
            cursor.writeWrapped("- " + p.name() + "  (" + p.role() + ")", FONT_REGULAR, 9.5f, COLOR_TEXT, 10f, 13.5f);
        }
    }

    private record NumberedMeta(String numLabel, String subPrefix, String sectionHeader) {}

    private List<Map<String, Object>> loadBookSections(Subject subject) {
        Map<String, Object> json = loadGestionJson(subject);
        Object bs = json.get("bookSections");
        if (bs instanceof List<?> list) {
            List<Map<String, Object>> out = new ArrayList<>();
            for (Object item : list) {
                if (item instanceof Map<?, ?> m) {
                    Map<String, Object> typed = new LinkedHashMap<>();
                    m.forEach((k, v) -> typed.put(String.valueOf(k), v));
                    out.add(typed);
                }
            }
            return out;
        }
        return List.of();
    }

    private Map<String, Object> loadGestionJson(Subject subject) {
        if (subject == null) return Map.of();
        List<String> candidates = new ArrayList<>();
        if (subject.getCode() != null && !subject.getCode().isBlank()) {
            candidates.add(subject.getCode().trim().toLowerCase());
        }
        if (subject.getId() != null && !subject.getId().isBlank()) {
            candidates.add(subject.getId().trim().toLowerCase());
        }
        for (String key : candidates) {
            try {
                Path fsPath = Path.of("frontend/public/data/ioc/gestion/" + key + ".json");
                String raw = null;
                if (Files.isRegularFile(fsPath)) {
                    raw = Files.readString(fsPath);
                } else {
                    ClassPathResource res = new ClassPathResource("static/data/ioc/gestion/" + key + ".json");
                    if (res.exists()) {
                        raw = new String(res.getInputStream().readAllBytes());
                    }
                }
                if (raw != null) {
                    return objectMapper.readValue(raw, new TypeReference<>() {});
                }
            } catch (Exception ignored) {
            }
        }
        return Map.of();
    }

    /**
     * Genera un PDF visual de diagramas sin consumir tokens de IA:
     * - Pagina 1: mapa global sintetico con todas las unidades correlacionadas
     * - Paginas 2..N: una pagina por cada unidad con sus nodos conceptuales y plataformas
     */
    @SuppressWarnings("unchecked")
    public byte[] exportDiagramsPdf(Subject subject, List<Lesson> allSubjectLessons) throws IOException {
        Map<String, Object> gestion = loadGestionJson(subject);
        Map<String, Object> unitDiagrams = gestion.get("unitDiagrams") instanceof Map<?, ?> m
                ? (Map<String, Object>) m
                : Map.of();

        Map<String, List<Lesson>> byUnit = new LinkedHashMap<>();
        for (Lesson l : allSubjectLessons) {
            String u = (l.getUnit() != null && !l.getUnit().isBlank()) ? l.getUnit() : "General";
            byUnit.computeIfAbsent(u, k -> new ArrayList<>()).add(l);
        }

        try (PDDocument doc = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Color accentColor = parseSubjectAccent(subject);
            Cursor cursor = new Cursor(doc, accentColor);
            cursor.newPage();

            String subjectTitle = safeText(subject != null ? subject.getTitle() : "MiCampus");
            cursor.drawAccentBanner(subjectTitle + " · Diagramas", "Mapa global correlacionado y esquemas por unidad", byUnit.size(), accentColor);
            cursor.writeWrapped("MAPA GLOBAL DE CONTENIDOS CORRELACIONADOS", FONT_BOLD, 10.5f, accentColor, 0f, 15f);
            cursor.drawDivider();
            cursor.addSpace(6f);

            int uIdx = 0;
            for (Map.Entry<String, List<Lesson>> entry : byUnit.entrySet()) {
                uIdx++;
                List<Lesson> uLessons = entry.getValue();
                String summary = uLessons.stream()
                        .limit(5)
                        .map(l -> safeText(l.getTitle()))
                        .reduce((a, b) -> a + "  |  " + b)
                        .orElse("Sin lecciones");
                if (uLessons.size() > 5) {
                    summary += "  (+" + (uLessons.size() - 5) + " más)";
                }

                cursor.ensureSpace(64f);
                cursor.drawUnitCorrelationBox(safeText(entry.getKey()), summary, uLessons.size(), accentColor, uIdx < byUnit.size());
            }

            // Paginas 2..N: una pagina dedicada por unidad
            int pageUnitIdx = 0;
            for (Map.Entry<String, List<Lesson>> entry : byUnit.entrySet()) {
                pageUnitIdx++;
                cursor.newPage();
                String unitName = entry.getKey();
                List<Lesson> uLessons = entry.getValue();

                cursor.drawAccentBanner(safeText(unitName), subjectTitle + " · Esquema de Unidad " + pageUnitIdx, uLessons.size(), accentColor);

                Map<String, Object> diagSpec = resolveUnitDiagramSpec(unitName, pageUnitIdx, uLessons, unitDiagrams);
                String diagTitle = safeText(String.valueOf(diagSpec.getOrDefault("title", "Arquitectura y bloques clave")));
                cursor.writeWrapped(diagTitle.toUpperCase(), FONT_BOLD, 10f, accentColor, 0f, 14f);
                cursor.addSpace(6f);

                List<Map<String, Object>> nodes = diagSpec.get("nodes") instanceof List<?> nl
                        ? (List<Map<String, Object>>) nl
                        : List.of();
                if (!nodes.isEmpty()) {
                    cursor.drawDiagramNodesRow(nodes, accentColor);
                }

                cursor.addSpace(8f);
                cursor.writeWrapped("CONTENIDOS CORRELACIONADOS DE LA UNIDAD", FONT_BOLD, 9.5f, accentColor, 0f, 14f);
                cursor.drawDivider();
                cursor.addSpace(3f);
                for (int i = 0; i < uLessons.size(); i++) {
                    cursor.writeWrapped((i + 1) + ". " + safeText(uLessons.get(i).getTitle()), FONT_REGULAR, 9.5f, COLOR_TEXT, 8f, 13.5f);
                }
                renderUnitPlatforms(cursor, uLessons, accentColor);
            }

            cursor.closeCurrentStream();
            addPageFooters(doc, subjectTitle + " - Diagramas");
            doc.save(out);
            return out.toByteArray();
        }
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> resolveUnitDiagramSpec(
            String unitName,
            int fallbackIdx,
            List<Lesson> uLessons,
            Map<String, Object> unitDiagrams
    ) {
        Matcher m = Pattern.compile("(?:U|Unidad|Bloque)\\s*(\\d+)", Pattern.CASE_INSENSITIVE).matcher(unitName);
        String key = m.find() ? "u" + m.group(1) : "u" + fallbackIdx;
        Object found = unitDiagrams.get(key);
        if (found instanceof Map<?, ?> map) {
            return (Map<String, Object>) map;
        }
        // Fallback determinista a partir de las lecciones de la unidad (3 nodos)
        List<Map<String, Object>> nodes = new ArrayList<>();
        int size = uLessons.size();
        int step = Math.max(1, (int) Math.ceil(size / 3.0));
        for (int i = 0; i < size && nodes.size() < 3; i += step) {
            List<String> bullets = new ArrayList<>();
            for (int j = i; j < Math.min(size, i + step) && bullets.size() < 3; j++) {
                bullets.add(safeText(uLessons.get(j).getTitle()));
            }
            nodes.add(Map.of(
                    "title", "Bloque " + (nodes.size() + 1),
                    "bullets", bullets
            ));
        }
        return Map.of("title", "Flujo de contenidos de " + unitName, "nodes", nodes);
    }

    /**
     * Genera un PDF de Glosario (por unidad o asignatura completa) extrayendo terminos clave sin gastar tokens.
     */
    public byte[] exportGlossaryPdf(Subject subject, String unitFilter, List<Lesson> allSubjectLessons) throws IOException {
        List<Lesson> filtered = allSubjectLessons.stream()
                .filter(l -> unitFilter == null || unitFilter.isBlank()
                        || (l.getUnit() != null && l.getUnit().equalsIgnoreCase(unitFilter)))
                .toList();

        Pattern boldTermPattern = Pattern.compile("(?:^|\\n)\\s*(?:[-*]\\s+)?\\*\\*([^\\*\\n]{2,55}?):\\*\\*\\s+([^\\n]{8,220})");
        Map<String, String[]> entries = new TreeMap<>(String.CASE_INSENSITIVE_ORDER);
        for (Lesson l : filtered) {
            String md = l.getContent() != null ? l.getContent() : "";
            Matcher m = boldTermPattern.matcher(md);
            while (m.find()) {
                String term = safeText(m.group(1)).trim();
                String def = safeText(m.group(2)).replaceAll("\\*\\*|`", "").trim();
                if (!term.isBlank() && !def.isBlank() && !term.toLowerCase().startsWith("analog") && !term.toLowerCase().startsWith("nota")) {
                    entries.putIfAbsent(term, new String[]{def, safeText(l.getUnit())});
                }
            }
        }

        try (PDDocument doc = new PDDocument(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Color accentColor = parseSubjectAccent(subject);
            Cursor cursor = new Cursor(doc, accentColor);
            cursor.newPage();

            String subjectTitle = safeText(subject != null ? subject.getTitle() : "MiCampus");
            String scope = (unitFilter != null && !unitFilter.isBlank()) ? safeText(unitFilter) : "Glosario general completo";
            cursor.drawAccentBanner("Glosario · " + subjectTitle, scope, entries.size(), accentColor);

            if (entries.isEmpty()) {
                cursor.writeWrapped("No se detectaron definiciones estructuradas en esta seleccion.", FONT_REGULAR, 10.5f, COLOR_MUTED, 0f, 15f);
            } else {
                for (Map.Entry<String, String[]> item : entries.entrySet()) {
                    cursor.ensureSpace(34f);
                    cursor.writeWrapped(item.getKey() + "  [" + item.getValue()[1] + "]", FONT_BOLD, 10f, accentColor, 0f, 13.5f);
                    cursor.writeWrapped(item.getValue()[0], FONT_REGULAR, 9.5f, COLOR_TEXT, 10f, 13.5f);
                    cursor.addSpace(4f);
                }
            }
            cursor.closeCurrentStream();
            addPageFooters(doc, subjectTitle + " - Diagramas");
            doc.save(out);
            return out.toByteArray();
        }
    }

    private Map<String, NumberedMeta> computeNumbering(List<Lesson> lessons, List<Map<String, Object>> bookSections) {
        Map<String, NumberedMeta> map = new HashMap<>();
        if (lessons == null || lessons.isEmpty()) return map;

        Map<String, List<Lesson>> grouped = new LinkedHashMap<>();
        for (Lesson l : lessons) {
            String u = (l.getUnit() != null && !l.getUnit().isBlank()) ? l.getUnit() : "General";
            grouped.computeIfAbsent(u, k -> new ArrayList<>()).add(l);
        }

        int unitIdx = 0;
        Pattern unitNumPattern = Pattern.compile("(?:U|Unidad|Bloque)\\s*(\\d+)", Pattern.CASE_INSENSITIVE);
        for (Map.Entry<String, List<Lesson>> ue : grouped.entrySet()) {
            String unitName = ue.getKey();
            List<Lesson> unitLessons = ue.getValue();
            Matcher m = unitNumPattern.matcher(unitName);
            String uNum = m.find() ? m.group(1) : String.valueOf(unitIdx + 1);
            String unitCode = "U" + uNum;

            List<Map<String, Object>> unitRules = bookSections.stream()
                    .filter(r -> r.get("unit") == null || String.valueOf(r.get("unit")).equalsIgnoreCase(unitCode))
                    .toList();

            List<Object> entries = new ArrayList<>();
            Map<String, Integer> sectionIndexByName = new HashMap<>();

            for (Lesson l : unitLessons) {
                String titleLower = (l.getTitle() != null ? l.getTitle() : "").toLowerCase();
                Map<String, Object> matchedRule = null;
                for (Map<String, Object> r : unitRules) {
                    Object kws = r.get("match");
                    if (kws instanceof List<?> kwList) {
                        boolean hit = kwList.stream().anyMatch(k -> titleLower.contains(String.valueOf(k).toLowerCase()));
                        if (hit) {
                            matchedRule = r;
                            break;
                        }
                    }
                }
                if (matchedRule == null) {
                    entries.add(l);
                } else {
                    String secName = String.valueOf(matchedRule.get("section"));
                    if (!sectionIndexByName.containsKey(secName)) {
                        sectionIndexByName.put(secName, entries.size());
                        entries.add(new SectionGroup(secName, new ArrayList<>()));
                    }
                    ((SectionGroup) entries.get(sectionIndexByName.get(secName))).lessons().add(l);
                }
            }

            for (int entryIdx = 0; entryIdx < entries.size(); entryIdx++) {
                int topNum = entryIdx + 1;
                Object entry = entries.get(entryIdx);
                if (entry instanceof Lesson l) {
                    String label = topNum + ".";
                    map.put(l.getId(), new NumberedMeta(label, label, ""));
                } else if (entry instanceof SectionGroup sg) {
                    String secHeader = topNum + ". " + sg.title();
                    for (int subIdx = 0; subIdx < sg.lessons().size(); subIdx++) {
                        Lesson l = sg.lessons().get(subIdx);
                        String label = topNum + "." + (subIdx + 1) + ".";
                        map.put(l.getId(), new NumberedMeta(label, label, secHeader));
                    }
                }
            }
            unitIdx++;
        }
        return map;
    }

    private record SectionGroup(String title, List<Lesson> lessons) {}

    private void renderMarkdown(Cursor cursor, String md, String lessonTitle, String subPrefix) throws IOException {
        if (md == null || md.isBlank()) return;
        String normalizedMd = md.replace("\r\n", "\n");

        Matcher leadMatch = Pattern.compile("^#{1,3}\\s+([^\\n]+)\\n+").matcher(normalizedMd);
        if (leadMatch.find() && isDuplicateLessonHeading(leadMatch.group(1), lessonTitle)) {
            normalizedMd = normalizedMd.substring(leadMatch.end());
        }
        if (lessonTitle != null && lessonTitle.toLowerCase().contains("introducci")) {
            normalizedMd = normalizedMd
                    .replaceFirst("(?im)^#{1,3}\\s+(?:\\d+(?:\\.\\d+)*\\.?\\s*)?Visi[oó]n general del bloque\\s*\\n+", "")
                    .replaceFirst("(?i)^\\s*(?:Bienvenido|Benvingut)[^\\n]*\\n+", "");
        }

        String[] lines = normalizedMd.split("\n");
        boolean inCode = false;
        String codeLang = "";
        List<String> codeBuffer = new ArrayList<>();
        List<String> tableBuffer = new ArrayList<>();
        List<String> quoteBuffer = new ArrayList<>();
        int subCounter = 0;

        for (String rawLine : lines) {
            String trimmed = rawLine.trim();

            if (trimmed.startsWith("```")) {
                flushTable(cursor, tableBuffer);
                flushQuote(cursor, quoteBuffer);
                if (!inCode) {
                    inCode = true;
                    codeLang = trimmed.substring(3).trim();
                    codeBuffer.clear();
                } else {
                    flushCodeBlock(cursor, codeLang, codeBuffer);
                    inCode = false;
                    codeLang = "";
                }
                continue;
            }
            if (inCode) {
                codeBuffer.add(rawLine);
                continue;
            }

            if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
                flushQuote(cursor, quoteBuffer);
                tableBuffer.add(trimmed);
                continue;
            } else if (!tableBuffer.isEmpty()) {
                flushTable(cursor, tableBuffer);
            }

            if (trimmed.startsWith(">")) {
                quoteBuffer.add(trimmed.replaceFirst("^>+\\s*", ""));
                continue;
            } else if (!quoteBuffer.isEmpty()) {
                flushQuote(cursor, quoteBuffer);
            }

            if (trimmed.isEmpty()) {
                cursor.addSpace(5f);
                continue;
            }
            if (trimmed.equals("---") || trimmed.equals("***")) {
                cursor.drawDivider();
                continue;
            }

            Matcher headingMatch = Pattern.compile("^(#{1,4})\\s+(.+)$").matcher(trimmed);
            if (headingMatch.matches()) {
                int level = headingMatch.group(1).length();
                String rawText = cleanInlineMarkdown(headingMatch.group(2));
                String cleanLabel = rawText.replaceFirst("^\\d+(?:\\.\\d+)*\\.?\\s+", "").trim();
                if (cleanLabel.isEmpty() || isDuplicateLessonHeading(cleanLabel, lessonTitle)) {
                    continue;
                }
                subCounter++;
                String numberedHeading = (subPrefix != null && !subPrefix.isBlank())
                        ? subPrefix + subCounter + ". " + cleanLabel
                        : cleanLabel;
                float size = switch (level) {
                    case 1 -> 13.5f;
                    case 2 -> 12f;
                    case 3 -> 10.8f;
                    default -> 10.2f;
                };
                cursor.addSpace(7f);
                cursor.ensureSpace(72f);
                cursor.writeWrapped(numberedHeading, FONT_BOLD, size, COLOR_TITLE, 0f, size + 4.5f);
                cursor.addSpace(2f);
                continue;
            }

            if (trimmed.startsWith("* ") || trimmed.startsWith("- ")) {
                String item = "- " + cleanInlineMarkdown(trimmed.substring(2));
                cursor.writeWrapped(item, FONT_REGULAR, 10f, COLOR_TEXT, 12f, 14.5f);
                continue;
            }

            if (trimmed.matches("^\\d+\\.\\s+.+$")) {
                cursor.writeWrapped(cleanInlineMarkdown(trimmed), FONT_REGULAR, 10f, COLOR_TEXT, 10f, 14.5f);
                continue;
            }

            cursor.writeWrapped(cleanInlineMarkdown(trimmed), FONT_REGULAR, 10f, COLOR_TEXT, 0f, 15f);
        }

        flushTable(cursor, tableBuffer);
        flushQuote(cursor, quoteBuffer);
        if (inCode && !codeBuffer.isEmpty()) {
            flushCodeBlock(cursor, codeLang, codeBuffer);
        }
    }

    private void flushQuote(Cursor cursor, List<String> quoteLines) throws IOException {
        if (quoteLines.isEmpty()) return;
        List<String> wrapped = new ArrayList<>();
        for (String line : quoteLines) {
            String cleaned = cleanInlineMarkdown(line.replaceFirst("^\\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION|INFO)\\]\\s*", ""));
            if (!cleaned.isBlank()) {
                wrapped.addAll(wrapLine(cleaned, FONT_OBLIQUE, 9.6f, CONTENT_WIDTH - 24f));
            }
        }
        quoteLines.clear();
        if (wrapped.isEmpty()) return;

        float lineHeight = 13.5f;
        float boxHeight = wrapped.size() * lineHeight + 12f;
        cursor.ensureSpace(Math.min(boxHeight + 8f, 90f));
        cursor.addSpace(4f);

        float startY = cursor.y;
        float drawH = Math.min(boxHeight, cursor.y - MARGIN);
        cursor.stream.setNonStrokingColor(COLOR_QUOTE_BG);
        cursor.stream.addRect(MARGIN, startY - drawH, CONTENT_WIDTH, drawH);
        cursor.stream.fill();
        cursor.stream.setNonStrokingColor(COLOR_QUOTE_BAR);
        cursor.stream.addRect(MARGIN, startY - drawH, 3f, drawH);
        cursor.stream.fill();

        cursor.y -= 8f;
        for (String w : wrapped) {
            if (cursor.y < MARGIN + 18f) {
                cursor.newPage();
            }
            cursor.stream.beginText();
            cursor.stream.setNonStrokingColor(COLOR_TEXT);
            cursor.stream.setFont(FONT_OBLIQUE, 9.6f);
            cursor.stream.newLineAtOffset(MARGIN + 12f, cursor.y - 9.6f);
            cursor.stream.showText(w);
            cursor.stream.endText();
            cursor.y -= lineHeight;
        }
        cursor.y -= 8f;
    }

    private void flushTable(Cursor cursor, List<String> tableLines) throws IOException {
        if (tableLines.isEmpty()) return;
        List<String[]> rows = new ArrayList<>();
        for (String line : tableLines) {
            if (line.replaceAll("[|\\s:-]", "").isEmpty()) continue; // separador |---|---|
            String inner = line.substring(1, line.length() - 1);
            String[] cols = inner.split("\\|");
            for (int c = 0; c < cols.length; c++) {
                cols[c] = cleanInlineMarkdown(cols[c].trim());
            }
            rows.add(cols);
        }
        tableLines.clear();
        if (rows.isEmpty()) return;

        int numCols = rows.stream().mapToInt(r -> r.length).max().orElse(1);
        float colWidth = CONTENT_WIDTH / numCols;
        float cellPad = 6f;
        float lineHeight = 12.5f;

        cursor.addSpace(4f);
        for (int rIdx = 0; rIdx < rows.size(); rIdx++) {
            String[] row = rows.get(rIdx);
            boolean isHeader = (rIdx == 0);
            PDFont font = isHeader ? FONT_BOLD : FONT_REGULAR;
            float fontSize = 9.2f;

            List<List<String>> wrappedCols = new ArrayList<>();
            int maxLines = 1;
            for (int c = 0; c < numCols; c++) {
                String cellText = c < row.length ? row[c] : "";
                List<String> wLines = wrapLine(cellText, font, fontSize, colWidth - (cellPad * 2));
                wrappedCols.add(wLines);
                maxLines = Math.max(maxLines, wLines.size());
            }
            float rowHeight = maxLines * lineHeight + 10f;
            cursor.ensureSpace(rowHeight + 6f);

            float rowTop = cursor.y;
            if (isHeader) {
                cursor.stream.setNonStrokingColor(COLOR_TABLE_HEAD);
                cursor.stream.addRect(MARGIN, rowTop - rowHeight, CONTENT_WIDTH, rowHeight);
                cursor.stream.fill();
            } else if (rIdx % 2 == 0) {
                cursor.stream.setNonStrokingColor(COLOR_TABLE_ALT);
                cursor.stream.addRect(MARGIN, rowTop - rowHeight, CONTENT_WIDTH, rowHeight);
                cursor.stream.fill();
            }

            cursor.stream.setStrokingColor(COLOR_DIVIDER);
            cursor.stream.setLineWidth(0.6f);
            cursor.stream.addRect(MARGIN, rowTop - rowHeight, CONTENT_WIDTH, rowHeight);
            cursor.stream.stroke();

            for (int c = 0; c < numCols; c++) {
                float cellX = MARGIN + (c * colWidth);
                if (c > 0) {
                    cursor.stream.moveTo(cellX, rowTop);
                    cursor.stream.lineTo(cellX, rowTop - rowHeight);
                    cursor.stream.stroke();
                }
                List<String> cellLines = wrappedCols.get(c);
                for (int lIdx = 0; lIdx < cellLines.size(); lIdx++) {
                    cursor.stream.beginText();
                    cursor.stream.setNonStrokingColor(COLOR_TITLE);
                    cursor.stream.setFont(font, fontSize);
                    cursor.stream.newLineAtOffset(cellX + cellPad, rowTop - 13f - (lIdx * lineHeight));
                    cursor.stream.showText(cellLines.get(lIdx));
                    cursor.stream.endText();
                }
            }
            cursor.y -= rowHeight;
        }
        cursor.addSpace(6f);
    }

    private void flushCodeBlock(Cursor cursor, String lang, List<String> codeLines) throws IOException {
        if (codeLines.isEmpty()) return;
        List<String> wrapped = new ArrayList<>();
        for (String line : codeLines) {
            wrapped.addAll(wrapLine(safeText(line), FONT_MONO, 8.5f, CONTENT_WIDTH - 22f));
        }
        float lineHeight = 12f;
        boolean hasLang = lang != null && !lang.isBlank();

        cursor.ensureSpace(48f);
        cursor.addSpace(4f);

        int idx = 0;
        boolean firstChunk = true;
        while (idx < wrapped.size()) {
            float headerBarH = (firstChunk && hasLang) ? 18f : 0f;
            float topPad = headerBarH + 7f;
            float bottomPad = 7f;
            float available = cursor.y - (MARGIN + 14f) - topPad - bottomPad;
            int fitLines = Math.max(1, (int) Math.floor(available / lineHeight));
            int endIdx = Math.min(wrapped.size(), idx + fitLines);

            // No dejar un comentario # suelto al final de la pagina si continua en la siguiente
            if (endIdx < wrapped.size() && endIdx - idx > 1) {
                String lastLineTrim = wrapped.get(endIdx - 1).trim();
                if (lastLineTrim.startsWith("#") || lastLineTrim.startsWith("//")) {
                    endIdx--;
                }
            }

            int chunkCount = endIdx - idx;
            float chunkHeight = topPad + (chunkCount * lineHeight) + bottomPad;

            cursor.stream.setNonStrokingColor(COLOR_CODE_BG);
            cursor.stream.addRect(MARGIN, cursor.y - chunkHeight, CONTENT_WIDTH, chunkHeight);
            cursor.stream.fill();

            if (headerBarH > 0f) {
                cursor.stream.setNonStrokingColor(COLOR_CODE_HEADER);
                cursor.stream.addRect(MARGIN, cursor.y - headerBarH, CONTENT_WIDTH, headerBarH);
                cursor.stream.fill();

                cursor.stream.beginText();
                cursor.stream.setNonStrokingColor(COLOR_CODE_BADGE);
                cursor.stream.setFont(FONT_MONO_BOLD, 7.8f);
                cursor.stream.newLineAtOffset(MARGIN + 11f, cursor.y - 12f);
                cursor.stream.showText(safeText(lang.toUpperCase()));
                cursor.stream.endText();
            }

            // Barra de acento izquierda
            cursor.stream.setNonStrokingColor(COLOR_ACCENT);
            cursor.stream.addRect(MARGIN, cursor.y - chunkHeight, 2.5f, chunkHeight);
            cursor.stream.fill();

            cursor.y -= topPad;
            for (int i = idx; i < endIdx; i++) {
                drawHighlightedCodeLine(cursor.stream, wrapped.get(i), MARGIN + 11f, cursor.y - 8.5f);
                cursor.y -= lineHeight;
            }
            cursor.y -= bottomPad;
            idx = endIdx;
            firstChunk = false;

            if (idx < wrapped.size()) {
                cursor.newPage();
            }
        }
        cursor.addSpace(5f);
    }

    private void drawHighlightedCodeLine(PDPageContentStream stream, String line, float x, float y) throws IOException {
        if (line == null || line.isEmpty()) return;
        String trimmed = line.trim();
        if (trimmed.startsWith("#") || trimmed.startsWith("//")) {
            drawMonoSegment(stream, line, FONT_MONO_OBLIQUE, COLOR_CODE_COMMENT, x, y);
            return;
        }

        // Separar comentario inline (# ...) si existe
        int commentIdx = line.indexOf(" #");
        String codePart = commentIdx > 0 ? line.substring(0, commentIdx) : line;
        String commentPart = commentIdx > 0 ? line.substring(commentIdx) : "";

        float curX = x;
        // Resaltar primera palabra clave / comando / directiva o etiqueta <...>
        Matcher leadCmd = Pattern.compile("^(\\s*)(</?[A-Za-z0-9_:-]+>?|sudo|apt|apt-get|systemctl|ss|grep|curl|openssl|git|docker|docker-compose|ufw|a2enmod|a2ensite|a2dissite|htpasswd|ServerName|ServerAlias|DocumentRoot|VirtualHost|Directory|DefaultRoot|RequireValidShell|PassivePorts|TLSEngine|TLSRequired|Include|ProxyPass|ProxyPassReverse)(.*)$").matcher(codePart);
        if (leadCmd.matches()) {
            String indent = leadCmd.group(1);
            String kw = leadCmd.group(2);
            String rest = leadCmd.group(3);
            if (!indent.isEmpty()) {
                curX += drawMonoSegment(stream, indent, FONT_MONO, COLOR_CODE_TEXT, curX, y);
            }
            curX += drawMonoSegment(stream, kw, FONT_MONO_BOLD, COLOR_CODE_KEYWORD, curX, y);
            curX += drawCodeWithStrings(stream, rest, curX, y);
        } else {
            curX += drawCodeWithStrings(stream, codePart, curX, y);
        }

        if (!commentPart.isEmpty()) {
            drawMonoSegment(stream, commentPart, FONT_MONO_OBLIQUE, COLOR_CODE_COMMENT, curX, y);
        }
    }

    private float drawCodeWithStrings(PDPageContentStream stream, String text, float startX, float y) throws IOException {
        if (text == null || text.isEmpty()) return 0f;
        float curX = startX;
        Matcher m = Pattern.compile("(\"[^\"]*\"|'[^']*')").matcher(text);
        int last = 0;
        while (m.find()) {
            if (m.start() > last) {
                curX += drawMonoSegment(stream, text.substring(last, m.start()), FONT_MONO, COLOR_CODE_TEXT, curX, y);
            }
            curX += drawMonoSegment(stream, m.group(1), FONT_MONO, COLOR_CODE_STRING, curX, y);
            last = m.end();
        }
        if (last < text.length()) {
            curX += drawMonoSegment(stream, text.substring(last), FONT_MONO, COLOR_CODE_TEXT, curX, y);
        }
        return curX - startX;
    }

    private float drawMonoSegment(PDPageContentStream stream, String text, PDFont font, Color color, float x, float y) throws IOException {
        if (text == null || text.isEmpty()) return 0f;
        stream.beginText();
        stream.setNonStrokingColor(color);
        stream.setFont(font, 8.5f);
        stream.newLineAtOffset(x, y);
        stream.showText(text);
        stream.endText();
        return font.getStringWidth(text) / 1000f * 8.5f;
    }

    private static boolean isDuplicateLessonHeading(String rawHeading, String lessonTitle) {
        String cleanHeading = String.valueOf(rawHeading == null ? "" : rawHeading)
                .replaceAll("[*_`]", "")
                .replaceFirst("^\\d+(?:\\.\\d+)*\\.?\\s+", "")
                .trim();
        String hNorm = slugify(cleanHeading);
        String tNorm = slugify(lessonTitle);
        return !hNorm.isEmpty() && !tNorm.isEmpty() && (hNorm.equals(tNorm) || tNorm.contains(hNorm) || hNorm.contains(tNorm));
    }

    private static String slugify(String text) {
        if (text == null) return "";
        return Normalizer.normalize(text.toLowerCase(), Normalizer.Form.NFD)
                .replaceAll("[\\u0300-\\u036f]", "")
                .replaceAll("[^a-z0-9]+", "-")
                .replaceAll("(^-|-$)", "");
    }

    private void addPageFooters(PDDocument doc, String subjectTitle) throws IOException {
        int total = doc.getNumberOfPages();
        for (int i = 0; i < total; i++) {
            PDPage page = doc.getPage(i);
            try (PDPageContentStream footer = new PDPageContentStream(doc, page, PDPageContentStream.AppendMode.APPEND, true, true)) {
                footer.setStrokingColor(COLOR_DIVIDER);
                footer.setLineWidth(0.6f);
                footer.moveTo(MARGIN, MARGIN - 10f);
                footer.lineTo(PAGE_WIDTH - MARGIN, MARGIN - 10f);
                footer.stroke();

                footer.beginText();
                footer.setNonStrokingColor(COLOR_MUTED);
                footer.setFont(FONT_REGULAR, 8.5f);
                footer.newLineAtOffset(MARGIN, MARGIN - 22f);
                footer.showText(safeText("MiCampus  |  " + subjectTitle));
                footer.endText();

                String pageLabel = "Pagina " + (i + 1) + " de " + total;
                float textW = FONT_REGULAR.getStringWidth(pageLabel) / 1000f * 8.5f;
                footer.beginText();
                footer.setNonStrokingColor(COLOR_MUTED);
                footer.setFont(FONT_REGULAR, 8.5f);
                footer.newLineAtOffset(PAGE_WIDTH - MARGIN - textW, MARGIN - 22f);
                footer.showText(pageLabel);
                footer.endText();
            }
        }
    }

    private static String cleanInlineMarkdown(String text) {
        String s = text
                .replaceAll("!\\[([^\\]]*)\\]\\([^)]*\\)", "[$1]")
                .replaceAll("\\[([^\\]]+)\\]\\(([^)]+)\\)", "$1 ($2)")
                .replaceAll("\\*\\*([^*]+)\\*\\*", "$1")
                .replaceAll("__([^_]+)__", "$1")
                .replaceAll("`([^`]+)`", "$1")
                .replaceAll("\\*([^*]+)\\*", "$1");
        return safeText(s);
    }

    private static String safeText(String raw) {
        if (raw == null) return "";
        String normalized = raw
                .replace("\t", "    ")
                .replace("→", "->")
                .replace("←", "<-")
                .replace("↔", "<->")
                .replace("•", "-")
                .replace("—", "-")
                .replace("–", "-")
                .replace("“", "\"")
                .replace("”", "\"")
                .replace("‘", "'")
                .replace("’", "'")
                .replace("…", "...");
        StringBuilder sb = new StringBuilder(normalized.length());
        for (int i = 0; i < normalized.length(); i++) {
            char c = normalized.charAt(i);
            if (c >= 32 && c <= 255) {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    private static Color parseHexColor(String hex, Color fallback) {
        if (hex == null || !hex.trim().matches("^#?[0-9a-fA-F]{6}$")) return fallback;
        String clean = hex.trim().startsWith("#") ? hex.trim().substring(1) : hex.trim();
        return new Color(
                Integer.parseInt(clean.substring(0, 2), 16),
                Integer.parseInt(clean.substring(2, 4), 16),
                Integer.parseInt(clean.substring(4, 6), 16)
        );
    }

    private static List<String> wrapLine(String text, PDFont font, float fontSize, float maxWidth) throws IOException {
        List<String> lines = new ArrayList<>();
        if (text == null || text.isEmpty()) {
            lines.add("");
            return lines;
        }
        String[] words = text.split(" ");
        StringBuilder current = new StringBuilder();
        for (String word : words) {
            String candidate = current.isEmpty() ? word : current + " " + word;
            float width = font.getStringWidth(candidate) / 1000f * fontSize;
            if (width <= maxWidth) {
                current = new StringBuilder(candidate);
            } else {
                if (!current.isEmpty()) {
                    lines.add(current.toString());
                    current = new StringBuilder(word);
                } else {
                    lines.add(word);
                    current = new StringBuilder();
                }
            }
        }
        if (!current.isEmpty()) {
            lines.add(current.toString());
        }
        return lines;
    }

    private static Color parseSubjectAccent(Subject subject) {
        String hex = subject != null ? subject.getColor() : null;
        if (hex != null && hex.matches("^#[0-9a-fA-F]{6}$")) {
            try {
                return Color.decode(hex);
            } catch (NumberFormatException ignored) {
            }
        }
        return COLOR_ACCENT;
    }

    private static class Cursor {
        private final PDDocument doc;
        private final Color accentColor;
        private PDPageContentStream stream;
        private float y;

        Cursor(PDDocument doc, Color accentColor) {
            this.doc = doc;
            this.accentColor = accentColor != null ? accentColor : COLOR_ACCENT;
        }

        void newPage() throws IOException {
            closeCurrentStream();
            PDPage page = new PDPage(PDRectangle.A4);
            doc.addPage(page);
            stream = new PDPageContentStream(doc, page);
            y = PAGE_HEIGHT - MARGIN;
        }

        void closeCurrentStream() throws IOException {
            if (stream != null) {
                stream.close();
                stream = null;
            }
        }

        void ensureSpace(float needed) throws IOException {
            if (y - needed < MARGIN + 18f) {
                newPage();
            }
        }

        void addSpace(float pts) throws IOException {
            y -= pts;
            if (y < MARGIN + 18f) {
                newPage();
            }
        }

        void drawAccentBanner(String title, String subtitle, int lessonCount, Color accent) throws IOException {
            float boxH = 58f;
            stream.setNonStrokingColor(COLOR_ACCENT_SOFT);
            stream.addRect(MARGIN, y - boxH, CONTENT_WIDTH, boxH);
            stream.fill();

            stream.setNonStrokingColor(accent != null ? accent : COLOR_ACCENT);
            stream.addRect(MARGIN, y - boxH, 4f, boxH);
            stream.fill();

            stream.beginText();
            stream.setNonStrokingColor(COLOR_TITLE);
            stream.setFont(FONT_BOLD, 16f);
            stream.newLineAtOffset(MARGIN + 14f, y - 22f);
            stream.showText(title);
            stream.endText();

            String sub = subtitle + (lessonCount > 1 ? "  |  " + lessonCount + " lecciones" : "");
            stream.beginText();
            stream.setNonStrokingColor(COLOR_MUTED);
            stream.setFont(FONT_REGULAR, 10f);
            stream.newLineAtOffset(MARGIN + 14f, y - 41f);
            stream.showText(sub);
            stream.endText();

            y -= (boxH + 18f);
        }

        void drawDivider() throws IOException {
            ensureSpace(10f);
            stream.setStrokingColor(COLOR_DIVIDER);
            stream.setLineWidth(0.75f);
            stream.moveTo(MARGIN, y - 3f);
            stream.lineTo(PAGE_WIDTH - MARGIN, y - 3f);
            stream.stroke();
            y -= 8f;
        }

        void writeWrapped(String text, PDFont font, float fontSize, Color color, float indent, float lineHeight)
                throws IOException {
            List<String> lines = wrapLine(text, font, fontSize, CONTENT_WIDTH - indent);
            for (String line : lines) {
                ensureSpace(lineHeight + 4f);
                stream.beginText();
                stream.setNonStrokingColor(color);
                stream.setFont(font, fontSize);
                stream.newLineAtOffset(MARGIN + indent, y - fontSize);
                stream.showText(line);
                stream.endText();
                y -= lineHeight;
            }
        }

        void drawUnitCorrelationBox(String unitTitle, String summary, int count, Color accent, boolean drawArrow) throws IOException {
            List<String> sumLines = wrapLine(summary, FONT_REGULAR, 8.5f, CONTENT_WIDTH - 28f);
            if (sumLines.size() > 2) {
                sumLines = sumLines.subList(0, 2);
            }
            float boxH = 30f + sumLines.size() * 12f;
            ensureSpace(boxH + (drawArrow ? 18f : 6f));

            stream.setNonStrokingColor(COLOR_QUOTE_BG);
            stream.addRect(MARGIN, y - boxH, CONTENT_WIDTH, boxH);
            stream.fill();

            stream.setStrokingColor(COLOR_DIVIDER);
            stream.setLineWidth(0.8f);
            stream.addRect(MARGIN, y - boxH, CONTENT_WIDTH, boxH);
            stream.stroke();

            stream.setNonStrokingColor(accent != null ? accent : COLOR_ACCENT);
            stream.addRect(MARGIN, y - boxH, 4f, boxH);
            stream.fill();

            String header = safeText(unitTitle) + "  (" + count + " lecciones)";
            List<String> headerLines = wrapLine(header, FONT_BOLD, 10f, CONTENT_WIDTH - 24f);
            stream.beginText();
            stream.setNonStrokingColor(COLOR_TITLE);
            stream.setFont(FONT_BOLD, 10f);
            stream.newLineAtOffset(MARGIN + 12f, y - 15f);
            stream.showText(headerLines.isEmpty() ? header : headerLines.get(0));
            stream.endText();

            float lineY = y - 29f;
            for (String sl : sumLines) {
                stream.beginText();
                stream.setNonStrokingColor(COLOR_MUTED);
                stream.setFont(FONT_REGULAR, 8.5f);
                stream.newLineAtOffset(MARGIN + 12f, lineY);
                stream.showText(sl);
                stream.endText();
                lineY -= 12f;
            }
            y -= boxH;

            if (drawArrow) {
                float cx = MARGIN + CONTENT_WIDTH / 2f;
                stream.setStrokingColor(accent != null ? accent : COLOR_ACCENT);
                stream.setLineWidth(1.2f);
                stream.moveTo(cx, y - 2f);
                stream.lineTo(cx, y - 12f);
                stream.moveTo(cx - 4f, y - 8f);
                stream.lineTo(cx, y - 12f);
                stream.lineTo(cx + 4f, y - 8f);
                stream.stroke();
                y -= 16f;
            } else {
                y -= 8f;
            }
        }

        @SuppressWarnings("unchecked")
        void drawDiagramNodesRow(List<Map<String, Object>> nodes, Color accent) throws IOException {
            int n = Math.min(3, nodes.size());
            if (n == 0) return;
            float gap = 14f;
            float boxW = (CONTENT_WIDTH - gap * (n - 1)) / n;
            float boxH = 112f;
            ensureSpace(boxH + 14f);

            Color barColor = accent != null ? accent : COLOR_ACCENT;
            for (int i = 0; i < n; i++) {
                float x = MARGIN + i * (boxW + gap);
                Map<String, Object> node = nodes.get(i);
                String nTitle = safeText(String.valueOf(node.getOrDefault("title", "Bloque " + (i + 1))));

                stream.setNonStrokingColor(COLOR_QUOTE_BG);
                stream.addRect(x, y - boxH, boxW, boxH);
                stream.fill();

                stream.setStrokingColor(COLOR_DIVIDER);
                stream.setLineWidth(0.9f);
                stream.addRect(x, y - boxH, boxW, boxH);
                stream.stroke();

                stream.setNonStrokingColor(barColor);
                stream.addRect(x, y - 22f, boxW, 22f);
                stream.fill();

                List<String> tLines = wrapLine(nTitle, FONT_BOLD, 9f, boxW - 12f);
                stream.beginText();
                stream.setNonStrokingColor(Color.WHITE);
                stream.setFont(FONT_BOLD, 9f);
                stream.newLineAtOffset(x + 6f, y - 14f);
                stream.showText(tLines.isEmpty() ? "" : tLines.get(0));
                stream.endText();

                float by = y - 36f;
                Object rawBullets = node.get("bullets");
                if (rawBullets instanceof List<?> bl) {
                    int bCount = 0;
                    for (Object bObj : bl) {
                        if (bCount >= 4 || by < y - boxH + 10f) break;
                        List<String> bLines = wrapLine("- " + safeText(String.valueOf(bObj)), FONT_REGULAR, 8f, boxW - 12f);
                        for (String bline : bLines) {
                            if (by < y - boxH + 8f) break;
                            stream.beginText();
                            stream.setNonStrokingColor(COLOR_TEXT);
                            stream.setFont(FONT_REGULAR, 8f);
                            stream.newLineAtOffset(x + 6f, by);
                            stream.showText(bline);
                            stream.endText();
                            by -= 10.5f;
                        }
                        bCount++;
                    }
                }

                if (i < n - 1) {
                    float ax1 = x + boxW + 2f;
                    float ax2 = x + boxW + gap - 2f;
                    float ay = y - (boxH / 2f);
                    stream.setStrokingColor(barColor);
                    stream.setLineWidth(1.2f);
                    stream.moveTo(ax1, ay);
                    stream.lineTo(ax2, ay);
                    stream.moveTo(ax2 - 4f, ay + 3f);
                    stream.lineTo(ax2, ay);
                    stream.lineTo(ax2 - 4f, ay - 3f);
                    stream.stroke();
                }
            }
            y -= (boxH + 10f);
        }
    }
}

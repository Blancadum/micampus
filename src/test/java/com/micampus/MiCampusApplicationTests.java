package com.micampus;

import com.micampus.service.CalendarAndCoachService;
import com.micampus.service.NoteImporterService;
import com.micampus.service.SearchIndexService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(properties = {
        "micampus.auto-open-browser=false",
        "micampus.data-dir=target/test-micampus-data"
})
class MiCampusApplicationTests {

    @Autowired
    private NoteImporterService noteImporterService;

    @Autowired
    private CalendarAndCoachService calendarAndCoachService;

    @Autowired
    private SearchIndexService searchIndexService;

    @Test
    void contextLoadsAndScriptsWork() {
        String raw = "# Tema 1: Java\n• Primer punto\n• Segundo punto\n\nPregunta: ¿Qué es JVM?\nRespuesta: Java Virtual Machine";
        String normalized = noteImporterService.normalizeMarkdown(raw);
        assertTrue(normalized.contains("- Primer punto"));

        var lessons = noteImporterService.splitIntoLessons(normalized, "sub1", "U1", "Fallback");
        assertEquals(1, lessons.size());
        assertEquals(1, lessons.get(0).getQuiz().size());

        String ics = calendarAndCoachService.generateIcs();
        assertTrue(ics.contains("BEGIN:VCALENDAR"));

        var report = calendarAndCoachService.buildCoachReport();
        assertNotNull(report.get("stats"));

        assertNotNull(searchIndexService.search("Java"));
    }
}

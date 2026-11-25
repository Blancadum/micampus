package com.micampus.service;

import com.micampus.model.Lesson;
import com.micampus.model.Subject;
import com.micampus.model.TaskItem;
import com.micampus.repository.CampusStore;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SearchIndexService {

    private final CampusStore store;
    private final AuthService authService;

    public SearchIndexService(CampusStore store, AuthService authService) {
        this.store = store;
        this.authService = authService;
    }

    public List<Map<String, Object>> search(String query) {
        return search(query, "");
    }

    public List<Map<String, Object>> search(String query, String ownerId) {
        if (query == null || query.isBlank()) {
            return List.of();
        }
        String q = query.toLowerCase().trim();

        return store.read(db -> {
            Map<String, Subject> subjectById = db.getSubjects().stream()
                    .filter(s -> authService.matchesOwner(s.getOwnerId(), ownerId))
                    .collect(Collectors.toMap(Subject::getId, s -> s, (a, b) -> a));
            List<Map<String, Object>> results = new ArrayList<>();

            for (Subject s : db.getSubjects()) {
                if (!authService.matchesOwner(s.getOwnerId(), ownerId)) continue;
                if (matches(q, s.getTitle(), s.getShortTitle(), s.getDescription(), s.getCode())) {
                    Map<String, Object> item = new LinkedHashMap<>();
                    item.put("type", "subject");
                    item.put("id", s.getId());
                    item.put("subjectId", s.getId());
                    item.put("title", s.getTitle());
                    item.put("subtitle", s.getDescription());
                    item.put("icon", s.getIcon());
                    item.put("color", s.getColor());
                    results.add(item);
                }
            }

            for (Lesson l : db.getLessons()) {
                if (!authService.matchesOwner(l.getOwnerId(), ownerId)) continue;
                if (matches(q, l.getTitle(), l.getSummary(), l.getContent(), l.getUnit())) {
                    Subject sub = subjectById.get(l.getSubjectId());
                    Map<String, Object> item = new LinkedHashMap<>();
                    item.put("type", "lesson");
                    item.put("id", l.getId());
                    item.put("subjectId", l.getSubjectId());
                    item.put("title", l.getTitle());
                    item.put("subtitle", (sub != null ? sub.getShortTitle() + " · " : "") + l.getUnit());
                    item.put("icon", sub != null ? sub.getIcon() : "📖");
                    item.put("color", sub != null ? sub.getColor() : "#3b82f6");
                    results.add(item);
                }
            }

            for (TaskItem t : db.getTasks()) {
                if (!authService.matchesOwner(t.getOwnerId(), ownerId)) continue;
                if (matches(q, t.getTitle(), t.getDescription(), t.getDueDate())) {
                    Subject sub = subjectById.get(t.getSubjectId());
                    Map<String, Object> item = new LinkedHashMap<>();
                    item.put("type", "task");
                    item.put("id", t.getId());
                    item.put("subjectId", t.getSubjectId());
                    item.put("title", t.getTitle());
                    item.put("subtitle", (sub != null ? sub.getShortTitle() : "Entrega") + " · " + (t.getDueDate() != null ? t.getDueDate() : "Sin fecha"));
                    item.put("icon", "📅");
                    item.put("color", sub != null ? sub.getColor() : "#f59e0b");
                    results.add(item);
                }
            }

            return results.stream().limit(25).collect(Collectors.toList());
        });
    }

    private boolean matches(String query, String... fields) {
        for (String field : fields) {
            if (field != null && field.toLowerCase().contains(query)) {
                return true;
            }
        }
        return false;
    }
}

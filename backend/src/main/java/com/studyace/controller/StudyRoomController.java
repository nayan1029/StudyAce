package com.studyace.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
public class StudyRoomController {

    @GetMapping
    public List<Map<String, Object>> rooms() {
        return List.of(
                Map.of("id", 1, "name", "DSA Night Sprint", "members", 12, "status", "LIVE", "topic", "Stacks, queues, and recursion"),
                Map.of("id", 2, "name", "DBMS Revision Pod", "members", 8, "status", "SCHEDULED", "topic", "Normalization and SQL joins"),
                Map.of("id", 3, "name", "Aptitude Challenge", "members", 15, "status", "LIVE", "topic", "Placement speed practice")
        );
    }

    @MessageMapping("/chat/send")
    @SendTo("/topic/messages")
    public ChatMessage send(@Payload ChatMessage message) {
        return message;
    }

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ChatMessage {
        private String room;
        private String sender;
        private String message;
    }
}

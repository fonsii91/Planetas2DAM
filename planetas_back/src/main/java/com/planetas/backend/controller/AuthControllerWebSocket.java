package com.planetas.backend.controller;

import com.planetas.backend.service.ApiClientService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageHeaderAccessor;
import org.springframework.messaging.simp.annotation.SendToUser;
import org.springframework.stereotype.Controller;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Controller
public class AuthControllerWebSocket {

    private static final Logger log = LoggerFactory.getLogger(AuthControllerWebSocket.class);
    private final ApiClientService apiClientService;

    // Mapa temporal para almacenar la sesión del usuario (Session ID -> User Info/ID)
    private final Map<String, Object> activeSessions = new ConcurrentHashMap<>();

    public AuthControllerWebSocket(ApiClientService apiClientService) {
        this.apiClientService = apiClientService;
    }

    @MessageMapping("/auth/login")
    @SendToUser("/queue/auth-response")
    public Map<String, Object> handleLogin(Map<String, String> creds, SimpMessageHeaderAccessor headerAccessor) {
        String nickname = creds.get("nickname");
        String password = creds.get("password");
        
        log.info("Intento de login desde WS: {}", nickname);
        
        Map<String, Object> response = apiClientService.verifyUser(nickname, password);
        
        if (!response.containsKey("error")) {
            // Guardar usuario en la sesión WebSocket
            String sessionId = headerAccessor.getSessionId();
            activeSessions.put(sessionId, response);
            log.info("Usuario {} autenticado corréctamente en la sesión {}", nickname, sessionId);
        } else {
            log.warn("Login fallido para {}: {}", nickname, response.get("error"));
        }
        
        return response;
    }

    @MessageMapping("/auth/register")
    @SendToUser("/queue/auth-response")
    public Map<String, Object> handleRegister(Map<String, String> creds, SimpMessageHeaderAccessor headerAccessor) {
        String nickname = creds.get("nickname");
        String password = creds.get("password");
        
        log.info("Intento de registro desde WS: {}", nickname);
        
        Map<String, Object> response = apiClientService.registerUser(nickname, password);
        
        if (!response.containsKey("error")) {
            // Opcional: auto-login post registro
            String sessionId = headerAccessor.getSessionId();
            activeSessions.put(sessionId, response);
            log.info("Usuario {} registrado y autenticado automáticamente en {}", nickname, sessionId);
        }
        
        return response;
    }
}

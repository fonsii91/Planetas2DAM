package com.planetas.backend.config;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

@Component
public class WebSocketEventListener {

    private static final Logger log = LoggerFactory.getLogger(WebSocketEventListener.class);

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        String sessionId = event.getSessionId();
        log.info("Desconexión de WebSocket detectada para session ID: {}", sessionId);
        
        // Aquí podríamos inyectar el AuthControllerWebSocket o un SessionService principal
        // para quitar el sessionId del ConcurrentHashMap de sesiones activas. 
        // Por ahora solo logueamos la desconexión base.
    }
}

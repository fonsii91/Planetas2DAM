package com.planetas.backend.service;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Service
public class ApiClientService {

    private static final Logger log = LoggerFactory.getLogger(ApiClientService.class);

    @Value("${api.url:http://localhost:8080/api}")
    private String apiUrl;

    private final RestTemplate restTemplate = new RestTemplate();
    private String adminToken;

    @PostConstruct
    public void initAdminToken() {
        log.info("Requesting middleware admin token from {}", apiUrl);
        try {
            Map<String, String> request = Map.of(
                    "nickname", "middleware_admin",
                    "password", "admin_password"
            );
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl + "/auth/login", request, Map.class);
            if (response.getStatusCode().is2xxSuccessful() && response.getBody() != null) {
                this.adminToken = (String) response.getBody().get("token");
                log.info("Successfully obtained middleware admin token");
            }
        } catch (Exception e) {
            log.error("Failed to obtain admin token on startup, will retry when needed: {}", e.getMessage());
        }
    }

    private HttpHeaders getAuthHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        if (this.adminToken == null) {
            initAdminToken(); // Retry
        }
        if (this.adminToken != null) {
            headers.setBearerAuth(this.adminToken);
        }
        return headers;
    }

    public Map<String, Object> verifyUser(String nickname, String password) {
        try {
            HttpEntity<Map<String, String>> request = new HttpEntity<>(Map.of("nickname", nickname, "password", password), getAuthHeaders());
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl + "/auth/verify-user", request, Map.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            }
        } catch (HttpClientErrorException.Unauthorized e) {
            return Map.of("error", "Credenciales inválidas");
        } catch (Exception e) {
            log.error("Error verifying user: {}", e.getMessage());
        }
        return Map.of("error", "Error interno del servidor al verificar");
    }

    public Map<String, Object> registerUser(String nickname, String password) {
        try {
            // El API espera nombre y apellidos (están con @NotBlank)
            Map<String, String> body = Map.of(
                    "nickname", nickname, 
                    "password", password,
                    "nombre", "Recluta",
                    "apellidos", "Nuevo",
                    "email", nickname + "@alianza.com"
            );
            HttpEntity<Map<String, String>> request = new HttpEntity<>(body, getAuthHeaders());
            ResponseEntity<Map> response = restTemplate.postForEntity(apiUrl + "/usuarios", request, Map.class);
            if (response.getStatusCode().is2xxSuccessful()) {
                return response.getBody();
            }
        } catch (Exception e) {
            log.error("Error registering user: {}", e.getMessage());
        }
        return Map.of("error", "Error interno o nickname ya en uso");
    }
}

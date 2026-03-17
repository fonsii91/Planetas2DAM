package org.proyecto.config;

import org.proyecto.domain.Usuario;
import org.proyecto.repository.UsuarioRepository;
import org.proyecto.service.AuthService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class AdminDataInitializer implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(AdminDataInitializer.class);
    private final UsuarioRepository usuarioRepository;
    private final AuthService authService;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public AdminDataInitializer(UsuarioRepository usuarioRepository, AuthService authService) {
        this.usuarioRepository = usuarioRepository;
        this.authService = authService;
    }

    @Override
    public void run(String... args) throws Exception {
        log.info("Checking for existence of middleware_admin...");
        if (usuarioRepository.findByNickname(AuthService.ADMIN_NICKNAME).isEmpty()) {
            Usuario admin = new Usuario();
            admin.setNickname(AuthService.ADMIN_NICKNAME);
            admin.setPassword(passwordEncoder.encode("admin_password")); // Contraseña secreta del sistema
            admin.setMonedas(99999);
            usuarioRepository.save(admin);
            log.info("middleware_admin user created successfully.");
        } else {
            log.info("middleware_admin user already exists.");
        }
    }
}

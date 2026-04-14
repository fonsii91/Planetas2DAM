---
name: API Planetas
description: Documentación de la tecnología de planetas_API para los agentes IA
---

# API Planetas2DAM (`planetas_API/`)

Este archivo documenta la tecnología y estructura de la API REST del ecosistema de Planetas2DAM, ubicada en el directorio `planetas_API/`. Actúa como servidor central de persistencia y autorización.

## Pila Tecnológica (Stack)

- **Lenguaje:** Java 20
- **Framework Web:** Spring Boot (v4.x)
- **Herramienta de Construcción:** Maven (`pom.xml` / `mvnw`)
- **Empaquetado:** WAR
- **Seguridad y Autenticación:** Spring Security y JWT (usando `jjwt` v0.11.5)
- **Mapeo y Validaciones:** Lombok, Spring Boot Validation
- **Persistencia Estructurada (Relacional):** Spring Data JPA / Hibernate
- **Persistencia Desestructurada (NoSQL):** Spring Data MongoDB

## Conexiones y Configuración (`application.properties`)

- **Puerto de Escucha:** `8090` (Configurado en `server.port`)
- **Base de Datos MySQL:** 
  - Host/Puerto: Localhost en el puerto `3307`
  - Esquema: `planetas_API`
  - Auto-Actualización: DDL-auto está en modo `update`
- **Base de Datos MongoDB:**
  - Destino: Base de datos en la nube (MongoDB Atlas) apuntando a `proyectomisiles.s4xovwr.mongodb.net`
  - Base de datos utilizada: `planetas_estadisticas`

## Rol y Arquitectura

1. **Gestor de Persistencia Dual:** La API implementa persistencia políglota, utilizando probablemente MySQL para entidades críticas (como Usuarios, Planetas base y control de cuentas) y MongoDB para estadísticas, analíticas y registro de partidas finalizadas (`planetas_estadisticas`).
2. **Autoridad Central y Validación:** El servidor central (en Java) es el que delega los tokens de acceso JWT.
3. **Comunicación de Red:** Mientras que el `planetas_back` (Node) se encarga de la fluidez del motor de tiempo real y websockets, `planetas_API` trabaja como fuente única de la verdad en base de datos.

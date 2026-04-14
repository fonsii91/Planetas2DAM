---
name: Frontend Planetas
description: Documentación de la tecnología de planetas_front para los agentes IA
---

# Frontend Planetas2DAM (`planetas_front/`)

Este archivo documenta la tecnología y estructura del frontend, ubicado en el directorio `planetas_front/`.

## Pila Tecnológica (Stack)

- **Framework Web:** Angular 21 (v21.1.2)
- **Lenguaje:** TypeScript (v5.9.2)
- **Estilos y UI:** Angular Material (v21.1.2), SCSS (`material-theme.scss`) y CSS (`styles.css`)
- **Testing:** Vitest (v4.0.8) y jsdom (sustituyendo a Karma/Jasmine)
- **Comunicaciones:** `HttpClient` (con REST) para autenticación, y `socket.io-client` para conexiones de WebSocket en tiempo real.

## Arquitectura y Estructura (`src/app/`)

El proyecto sigue una estructura modular orientada a dominios funcionales (Feature-Sliced Design simplificado):
- `/core/`: Lógica central de la aplicación, guardas, interceptores y servicios críticos o de infraestructura.
- `/features/`: Funcionalidades concretas de la aplicación (ej. Auth, Menús, Tableros de juego).
- `/components/`: Componentes compartidos o genéricos de UI utilizables en múltiples features.
- `/services/`: Servicios para la lógica de negocio y comunicación no enlazados estrictamente a un feature (si los hay).
- `models.ts`: Modelo de datos (interfaces y tipos) centralizado.

Se utiliza además una nomenclatura moderna o personalizada para los archivos (`app.ts` en lugar de `app.component.ts`, `app.html` en lugar de `app.component.html`), lo cual es una convención particular del proyecto para reducir verbo de archivos.

## Reglas de Desarrollo

1. **Angular Moderno (v18+):** El proyecto asume el uso completo de Angular en sus últimas versiones, exigiendo el uso de Standalone Components, el paradigma reactivo usando **Signals**, y el nuevo sistema **Control Flow** (`@if`, `@for`, etc.) para las plantillas.
2. **WebSockets con Socket.IO:** Las comunicaciones de tiempo real se realizan usando `socket.io-client` adaptándose a la tecnología expuesta por `planetas_back`. Anteriormente se usaba STOMP, pero se ha migrado para tener interoperabilidad perfecta con el backend de Node/Express. La autenticación se realiza por HTTP REST convencional.
3. **Testing Veloz:** Los tests unitarios deben ejecutarse usando `vitest`, lo que implica un entorno de ejecución en Node más rápido simulando el DOM con `jsdom`.

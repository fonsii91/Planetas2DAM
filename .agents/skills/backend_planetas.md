---
name: Backend Planetas
description: Documentación de la tecnología de planetas_back para los agentes IA
---

# Backend Planetas2DAM (`planetas_back/`)

Este archivo documenta la tecnología y estructura del backend integrado en el directorio `planetas_back/server/`.

## Pila Tecnológica (Stack)

- **Entorno de ejecución:** Node.js
- **Framework Web:** Express.js (v4.18.2)
- **WebSockets:** Socket.io (v4.7.2)
- **Autenticación y Seguridad:** JWT (jsonwebtoken)
- **Solicitudes HTTP Externas:** Axios (para la comunicación con `planetas_API`)
- **Validación de datos:** express-validator
- **Variables de entorno:** dotenv
- **Permisos de dominio cruzado:** cors

## Arquitectura y Directorios Principales

El proyecto Node.js tiene su punto de entrada en `index.js`, que configura un servidor HTTP/Express simultáneo a un servidor de WebSockets usando `socket.io`.

Estructura de archivos y directorios en `planetas_back/server/`:
- `index.js`: Instanciación principal de Express, configuración de CORS (permite llamadas desde el frontend en el puerto 5173), inicialización del servidor de WebSockets y carga de rutas/manejadores.
- `routes.js`: Definición de las rutas de la API REST local expuestas por Node.
- `mockData.js`: Datos simulados utilizados para pruebas sin depender de la base de datos o el API en entornos locales.
- `/services/`: Capa dedicada a interactuar con sistemas externos (incluye `dataService.js` con funciones como `init`, `obtenerPlanetas` y `crearPlaneta` que probablemente consumen `planetas_API`).
- `/sockets/`: Contiene manejadores específicos de eventos de WebSocket (como `gameHandler.js` para registrar eventos del juego en tiempo real).

## Consideraciones de Implementación
1. **Seguridad en WebSockets:** Se utiliza un middleware en `io.use` para verificar la validez del token JWT del cliente antes de permitir la conexión de sockets en tiempo real.
2. **Ciclo de arranque:** La función `startServer()` de `index.js` realiza una llamada inicial de `init()` desde el servicio de datos para obtener un "token del backend" y autenticarse con los otros componentes del sistema (presumiblemente `planetas_API`).
3. **Escucha y Puertos:** El servicio escucha en el puerto especificado en la variable de entorno `PORT`, por defecto el 3500.

---
name: Contexto del Proyecto
description: Descripción, reglas y contexto del proyecto Planetas2DAM para los agentes IA
---

# Proyecto Planetas2DAM

Este archivo sirve como base de conocimiento y contexto sobre el proyecto para que los agentes de Inteligencia Artificial (IA) entiendan el propósito, la arquitectura y las reglas de desarrollo.

## 1. Descripción General
Juego de combate táctico entre equipos (planetas) basada en la gestión estratégica de recursos limitados que se reinician cada ronda (pueden ser usados cono misiles de ataque o defensa) y un sistema de resolución simultánea. 

## 2. Pila Tecnológica (Stack)
### Frontend (`planetas_front/`)
- **Framework/Librería:** Angular 21
- **Estilos:** CSS, SCSS (Angular Material)
- **Otras herramientas:** RxStomp (WebSockets), Vitest

### Backend (`planetas_back/`)
- **Lenguaje/Framework:** Node.js, Express.js
- **Otros:** Socket.io, JWT, Axios

### API (`planetas_API/`)
- **Framework/Librería:** Spring Boot (Java 20)
- **Base de Datos:** MySQL (local puerto 3307), MongoDB (Atlas Cloud)
- **Otros:** Spring Security, JWT, Lombok, Spring Data JPA

### Comunicación entre servicios
- **planetas_back** se comunica con **planetas_API** a través de una API REST.
- **planetas_back** se comunica con **planetas_front** a través de WebSockets.

## 3. Estructura de Directorios
El repositorio está dividido en dos partes principales:
- `/planetas_front`: Contiene toda la lógica de la interfaz de usuario (cliente).
- `/planetas_back`: Contiene la lógica de negocio, la API y la conexión a la base de datos (servidor).

## 4. Mecánicas del Juego y Lógica del Motor de Combate (Core Logic)
La precisión en las reglas de combate es el pilar que evita desequilibrios sistémicos y errores de cálculo en el servidor. El motor debe garantizar un entorno determinista donde la integridad de los datos sea absoluta.
### Parámetros Base del Sistema
Para asegurar la equidad, se establecen los siguientes valores:
- Vidas iniciales: 200 puntos por planeta (estándar, pueden variar según el tipo de planeta).
- Misiles por ronda: 50 unidades (recurso renovable en cada turno, pueden variar según el tipo de planeta).
- Ratio de defensa: 2 misiles defensivos bloquean 1 punto de daño.
- Condiciones de victoria: Último superviviente o empate por destrucción mutua en la misma ronda.
### Resolución de Rondas: "Entrada Secuencial - Resolución Simultánea"
Para eliminar ventajas tácticas injustas, el sistema implementa un flujo atómico:
- Recolección de Inputs: Los equipos introducen sus acciones de forma paralela en el cliente.
- Almacenamiento en Buffer: El servidor almacena todas las estrategias sin procesarlas.
- Resolución Sincrónica: Una vez recibidos todos los inputs, el servidor calcula daños y defensas globalmente.
- Actualización de Estado: Cuando el servidor resuelve la ronda, se emite a los clientes un "Resumen de Ronda" de lo ocurrido y el estado final.

### Integridad de Datos y Validación de Entradas
Como especialistas en requisitos, dictaminamos que la validación debe ser exhaustiva para evitar la corrupción del estado del juego:
- Restricciones de Interfaz (UI): Los nombres de los planetas deben tener límites de caracteres estrictos para evitar desbordamientos en la interfaz.
- Validación de Tipos: El sistema debe rechazar cualquier entrada no numérica donde se esperen enteros.
- Reglas de Negocio: El servidor debe denegar payloads con valores de misiles negativos o que superen el presupuesto disponible de la ronda.

### Jerarquía de Entidades y Modelado de Objetos
La arquitectura se apoya en la herencia y el polimorfismo para permitir la extensión del sistema sin alterar el núcleo del motor.
#### Tipología de Planetas y Habilidades Especiales
Tipo de Planetas:
- Normal
    - HP Inicial: 200
    - Lógica Especial / Habilidades: Ninguna    
- Rojo / Azul / Verde   
    - HP Inicial: 200
    - Lógica Especial / Habilidades: Sistema Piedra-Papel-Tijera (ej. Rojo hace 2x daño a Verde, 0.5x a Azul).
- Gigante
    - HP Inicial: 400
    - Lógica Especial / Habilidades: Inicia con doble vida pero dispone de 20 misiles por ronda.
- Enano
    - HP Inicial: 100
    - Lógica Especial / Habilidades: Compensación por baja vida con un 50% de probabilidad de esquivar (dodge) cualquier ataque.
#### Implementación Técnica
La diferenciación de estas entidades exige el uso de métodos sobrescritos (override). Por ejemplo, el método calcularDañoRecibido() se comporta de forma polimórfica: en el Planeta Enano incluye la lógica de probabilidad de esquiva, mientras que en los planetas elementales verifica la afinidad del atacante.

## Arquitectura del Sistema: Estructura Distribuida
Entorno profesional de alta disponibilidad mediante la "Separación de Responsabilidades" (Separation of Concerns).
### Flujo de Conectividad: Host vs. Join
En el entorno distribuido, el cliente adopta dos roles posibles:
- Host: Un usuario crea la sala de combate, generando un código de partida único en el servidor.
- Joined Client: El resto de usuarios se unen a la sesión mediante dicho código, sincronizando sus parámetros con el servidor central.
### Componentes de la Arquitectura de Tres Capas
- Servidor Central
    - Árbitro de la lógica de combate, gestor de WebSockets y validador de reglas en tiempo real.
- Clientes
    - Interfaces para la recolección de inputs, animaciones tácticas y visualización del resumen de ronda.
- Servidor API REST
    - Intermediario especializado que desacopla la lógica de juego de la persistencia física en la base de datos.
### Ciclo de Vida de los Datos (Ejemplo: Cargar Partida)
El flujo atraviesa niveles jerárquicos: Cliente (Solicitud) -> Servidor Central (Lógica) -> Base de Datos (Persistencia). El retorno del JSON de estado permite al servidor central instanciar los objetos y sincronizar a todos los clientes.

## Especificaciones de Intercambio de Datos (JSON)
Para garantizar la interoperabilidad entre plataformas (Android, Java Desktop, Web), el intercambio de información se rige por estándares estrictos.
- Estado de Combate (JSON): Formato de alta velocidad para mensajes dinámicos tras cada ronda (objetivos, daños, estados de eliminación).
- Internacionalización (i18n): Gestión dinámica mediante archivos JSON de idiomas (ES/EN), eliminando el texto estático (hardcoded) en el código fuente.

## Persistencia y Gestión de Usuarios
La persistencia es un activo estratégico para la continuidad operativa y el fomento de la competitividad.
- Seguridad y Acceso: Sistema de Login y Registro centralizado.
- Estado de Partida: Al finalizar cada ronda almacenamiento íntegro de los datos necesarios para cargar la partida desde la ronda actual.
- Ranking Global: Seguimiento de victorias, rachas y métricas de supervivencia.
- Principio de Autoridad: Todas las validaciones de persistencia deben ejecutarse en el servidor. El cliente es un entorno inseguro; el servidor es la única "fuente de verdad" autorizada para modificar la base de datos.

## Reglas y Convenciones de Desarrollo
- **En frontend Angular 18+:**
    - Utiliza Signals para manejar todo el estado (state management).
    - Utiliza la nueva sintaxis de Control Flow (@if, @for). No utilices directivas *ngIf ni *ngFor
    - Asegúrate de incluir el bloque @empty dentro del @for.
    - Utiliza señales computadas (computed) si hay lógica derivada
- **Estilos y Diseño Visual (Sci-Fi / Neón):**
    - Se utiliza **Angular Material** configurado vía SCSS (`material-theme.scss`) con paletas **Cyan** (Primary) y **Orange** (Tertiary).
    - La estética es oscura (*Dark Mode*) con fondos profundos (ej. `#050a0f`) y tarjetas traslúcidas (`rgba(13, 20, 28, 0.9)`).
    - Se emplean efectos visuales "neón" mediante bordes y `box-shadow` (aprovechando clases globales como `.cyan-glow`, `.orange-glow`, `.cyan-text`, `.btn-cyan`).
    - Las adaptaciones de los componentes de Angular Material (como labels e inputs) para mantener la legibilidad sobre fondos oscuros se gestionan en el `styles.css` global.
- Usar nombres de variables en camelCase (o snake_case).
- Comentar las funciones complejas o la lógica de negocio importante.
- Mantener la separación de responsabilidades entre el frontend y el backend.

## Próximos Pasos (Roadmap)
[Anota aquí las tareas actuales o funcionalidades por desarrollar para tener un seguimiento.]
- [ ] Tarea 1...
- [ ] Tarea 2...

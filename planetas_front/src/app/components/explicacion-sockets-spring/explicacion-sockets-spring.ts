import { Component, signal, inject, TemplateRef } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DatePipe, NgClass } from '@angular/common';

interface LogEntry {
  id: number;
  time: Date;
  message: string;
  type: 'info'|'sent'|'recv'|'error'|'success';
}

@Component({
  selector: 'app-explicacion-sockets-spring',
  standalone: true,
  imports: [
    MatCardModule, 
    RouterModule, 
    MatButtonModule, 
    MatIconModule, 
    MatProgressBarModule,
    MatDialogModule,
    DatePipe,
    NgClass
  ],
  template: `
    <div class="main-wrapper">
      <div class="header-nav">
        <button mat-button routerLink="/login" class="btn-cyan">
          &lt; Volver al Login
        </button>
        <h2 class="cyan-text tech-title" style="margin: 0; padding-right: 1rem;">Laboratorio Interactivo de Socket.IO con Spring Boot</h2>
      </div>

      <div class="split-layout">
        
        <!-- =================== ZONA FRONTEND (CLIENTE) =================== -->
        <mat-card class="column client-col cyan-glow">
          <mat-card-header style="border-bottom: 1px solid rgba(0, 242, 255, 0.3); margin-bottom: 1rem; padding-bottom: 0.5rem;">
            <mat-icon style="color: #00f2ff; margin-right: 10px;">laptop_mac</mat-icon>
            <mat-card-title class="cyan-text">Frontend (Angular)</mat-card-title>
            <mat-card-subtitle class="tech-subtitle">El cliente Socket.IO</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content class="column-content">
            <!-- Interacciones Cliente -->
            <div class="step-card" [ngClass]="{'locked': step() > 0, 'completed': step() >= 1}">
              <div class="step-header">
                <h4>Paso 1A: Instalar Librería Socket.IO</h4>
                <button mat-icon-button class="cyan-text" (click)="openInfo(infoPaso1)" matTooltip="Saber más sobre el Paso 1"><mat-icon>help_outline</mat-icon></button>
              </div>
              <p style="font-size: 0.85rem; color: #aaa; margin-bottom: 10px;">Instalamos el cliente oficial en Angular. Esto nos permite usar una API muy sencilla y familiar para conectarnos al servidor bidireccional.</p>
              <button mat-flat-button class="btn-cyan" (click)="playPaso1()" [disabled]="step() > 0" style="margin-bottom: 10px;">
                npm install socket.io-client
              </button>
              <div class="code-header"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_front/src/app/core/services/websocket.service.ts</div>
              <pre class="code-block">{{ codePaso1Front }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 2, 'completed': step() >= 4}">
               <div class="step-header">
                 <h4>Paso 3 y 4: Conexión Socket.IO con JWT</h4>
                 <button mat-icon-button class="cyan-text" (click)="openInfo(infoPaso3_4)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa; margin-bottom: 10px;">Iniciamos la conexión pasándole el token JWT por la query string. Esta es la forma más compatible de autenticarse en el Handshake inicial de Socket.IO con Netty.</p>
               <button mat-flat-button class="btn-cyan" (click)="playPaso4()" [disabled]="step() !== 2" style="margin-bottom: 10px;">
                  CONECTAR A WS://LOCALHOST:8085
               </button>
               <div class="code-header"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_front/src/app/core/services/websocket.service.ts</div>
               <pre class="code-block">{{ codePaso4 }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 4}">
               <div class="step-header">
                 <h4>Paso 5: Suscribirse (on) y Enviar (emit)</h4>
                 <button mat-icon-button color="warn" (click)="openInfo(infoPaso5)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa; margin-bottom: 10px;">Usamos <code>emit</code> para enviar objetos de datos y <code>on</code> (envuelto en un Observable) para reaccionar asíncronamente a los mensajes que vengan del servidor.</p>
               <div class="code-header"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_front/src/app/components/panel-de-juego/panel-de-juego.ts</div>
               <pre class="code-block" style="margin-bottom: 10px;">{{ codePaso5A }}</pre>
               <button mat-flat-button color="warn" (click)="playPaso5()" [disabled]="step() < 4 || isLasering()">
                  <mat-icon>track_changes</mat-icon> DISPARAR LÁSER (emit)
               </button>
               <p style="font-size: 0.85rem; color: #aaa; margin-top: 15px;">Recibirás las respuestas del tópico (topic):</p>
               <div class="code-header"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_front/src/app/components/panel-de-juego/panel-de-juego.ts (Suscripción)</div>
               <pre class="code-block">{{ codePaso5C }}</pre>
            </div>
          </mat-card-content>

          <!-- Terminal Cliente (Static Bottom) -->
          <div class="console-window" style="border-top: 2px solid rgba(0, 242, 255, 0.5);">
            <div class="console-header"><mat-icon style="font-size: 14px; height: 14px; width: 14px;">terminal</mat-icon> Navegador Web Console</div>
            <div class="console-body" #clientScroll>
              @for (log of clientLogs(); track log.id) {
                <div class="log-line" [ngClass]="log.type">
                  <span class="timestamp">[{{ log.time | date:'HH:mm:ss.SSS' }}]</span> 
                  <span class="message">{{ log.message }}</span>
                </div>
              }
              @empty {
                <div class="log-line info">Consola vacía...</div>
              }
            </div>
          </div>
        </mat-card>

        
        <!-- =================== ZONA BACKEND (SERVIDOR) =================== -->
        <mat-card class="column server-col green-glow">
          <mat-card-header style="border-bottom: 1px solid rgba(105, 240, 174, 0.3); margin-bottom: 1rem; padding-bottom: 0.5rem;">
             <mat-icon style="color: #69f0ae; margin-right: 10px;">dns</mat-icon>
             <mat-card-title class="green-text" style="color: #69f0ae;">Backend (Spring Boot)</mat-card-title>
             <mat-card-subtitle class="tech-subtitle">Netty-SocketIO (Java)</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content class="column-content">
            <!-- Interacciones Servidor -->
            <div class="step-card" [ngClass]="{'locked': step() > 0, 'completed': step() >= 1}">
              <div class="step-header">
                <h4>Paso 1B: Añadir Dependencia Netty-SocketIO</h4>
                <button mat-icon-button class="green-text" style="color: #69f0ae;" (click)="openInfo(infoPaso1)"><mat-icon>help_outline</mat-icon></button>
              </div>
              <p style="font-size: 0.85rem; color: #aaa; margin-bottom: 10px;">Añadimos la librería Netty-SocketIO al <code>pom.xml</code>. Esta librería levanta un servidor paralelo capaz de entender el protocolo de Socket.IO de forma nativa en Java.</p>
              <button mat-flat-button class="btn-green" style="background-color: #69f0ae; color: #000; margin-bottom: 10px;" (click)="playPaso1()" [disabled]="step() > 0">
                Añadir netty-socketio
              </button>
              <div class="code-header green" style="border-left: 3px solid #69f0ae; color: #69f0ae;"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> pom.xml</div>
              <pre class="code-block green" style="border-left: 3px solid #69f0ae; color: #e8f5e9;">{{ codePaso1Back }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 1, 'completed': step() >= 2}">
               <div class="step-header">
                 <h4>Paso 2: Configurar SocketIOServer</h4>
                 <button mat-icon-button class="green-text" style="color: #69f0ae;" (click)="openInfo(infoPaso2)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa; margin-bottom: 10px;">Creamos el Bean de configuración asignándole un puerto propio (ej. 8085) y usamos un <code>CommandLineRunner</code> para arrancar el servidor asíncrono explícitamente.</p>
               <button mat-flat-button class="btn-green" style="background-color: #69f0ae; color: #000; margin-bottom: 10px;" (click)="playPaso2()" [disabled]="step() !== 1">
                  INICIAR SPRING BOOT
               </button>
               <div class="code-header green" style="border-left: 3px solid #69f0ae; color: #69f0ae;"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> SocketIOConfig.java</div>
               <pre class="code-block green" style="border-left: 3px solid #69f0ae; color: #e8f5e9;">{{ codePaso2 }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 2, 'completed': step() >= 4}">
               <div class="step-header">
                 <h4>Paso 3: Autorización para JWT</h4>
                 <button mat-icon-button class="green-text" style="color: #69f0ae;" (click)="openInfo(infoPaso3_4)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa; margin-bottom: 10px;">Añadimos un <code>AuthorizationListener</code> a la configuración. Este interceptará la petición de Handshake, extraerá el token de la URL y validará la sesión antes de conectar.</p>
               <div class="code-header green" style="border-left: 3px solid #69f0ae; color: #69f0ae;"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> SocketIOConfig.java (AuthorizationListener)</div>
               <pre class="code-block green" style="border-left: 3px solid #69f0ae; color: #e8f5e9;">{{ codePaso3 }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 4}">
               <div class="step-header">
                 <h4>Paso 5: Listeners en Java (onData)</h4>
                 <button mat-icon-button color="warn" (click)="openInfo(infoPaso5)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa; margin-bottom: 10px;">Registramos un <code>addEventListener</code> en el controlador. Jackson convierte el JSON automáticamente a la clase Java, y usamos BroadcastOperations para enviar la respuesta a todos.</p>
               <div class="code-header green" style="border-left: 3px solid #69f0ae; color: #69f0ae;"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> JuegoSocketController.java</div>
               <pre class="code-block green" style="border-left: 3px solid #69f0ae; color: #e8f5e9;">{{ codePaso5B }}</pre>
            </div>
          </mat-card-content>

          <!-- Terminal Servidor (Static Bottom) -->
          <div class="console-window" style="border-top: 2px solid rgba(105, 240, 174, 0.5);">
            <div class="console-header" style="background: #001208; border-bottom: 1px solid #005527;">
               <mat-icon style="font-size: 14px; height: 14px; width: 14px;">terminal</mat-icon> Spring Boot Console
            </div>
            <div class="console-body" #serverScroll>
              @for (log of serverLogs(); track log.id) {
                <div class="log-line" [ngClass]="log.type">
                  <span class="timestamp">[{{ log.time | date:'HH:mm:ss.SSS' }}]</span> 
                  <span class="message">{{ log.message }}</span>
                </div>
              }
              @empty {
                <div class="log-line info">Apagado. Esperando arranque...</div>
              }
            </div>
          </div>
        </mat-card>

      </div>

      <!-- MODALS / EXPLICACIONES TEÓRICAS -->
      <ng-template #infoPaso1>
        <div class="dark-modal cyan-glow">
          <h2 class="cyan-text" style="font-size: 1.5rem; margin-top: 0;">Socket.IO en Java 📦</h2>
          <p style="line-height: 1.6; color: #e0e0e0;">
            <b>Socket.IO</b> no es nativo de Java (su origen es Node.js). Sin embargo, la comunidad creó ports fantásticos como <b>Netty-SocketIO</b> que permiten que un servidor Spring Boot "hable" el dialecto de Socket.IO.
          </p>
          <p style="line-height: 1.6; color: #e0e0e0;">
            Esto nos permite usar el cliente oficial <code>socket.io-client</code> en Angular, manteniendo la familiaridad de los verbos <i>emit</i> y <i>on</i>, pero procesándolos con la robustez y concurrencia de Java.
          </p>
          <button mat-flat-button class="btn-cyan" mat-dialog-close style="width: 100%; margin-top: 15px;">¡Entendido!</button>
        </div>
      </ng-template>

      <ng-template #infoPaso2>
        <div class="dark-modal green-glow" style="border-color: #69f0ae;">
           <h2 style="color: #69f0ae; font-size: 1.5rem; margin-top: 0;">El paradigma de los 2 Puertos ⚙️</h2>
           <p style="line-height: 1.6; color: #e0e0e0;">
             Al usar Netty-SocketIO, tu aplicación Spring Boot tendrá <b>dos servidores corriendo simultáneamente</b>:
           </p>
           <ul style="color: #e0e0e0; margin-bottom: 15px;">
             <li><b>Tomcat (Puerto 8080):</b> Atiende las peticiones clásicas HTTP REST.</li>
             <li><b>Netty (Puerto 8085):</b> Atiende exclusivamente el tráfico bidireccional de WebSockets.</li>
           </ul>
           <p style="line-height: 1.6; color: #e0e0e0;">
             A diferencia de Tomcat, Netty no arranca automáticamente. Por eso usamos un <code>CommandLineRunner</code> para invocar <code>server.start()</code> al iniciar la app, y <code>@PreDestroy</code> para apagarlo y evitar dejar puertos "zombies".
           </p>
           <button mat-flat-button style="background-color: #69f0ae; color: #000; width: 100%; margin-top: 15px;" mat-dialog-close>¡Entendido!</button>
        </div>
      </ng-template>

      <ng-template #infoPaso3_4>
         <div class="dark-modal cyan-glow">
            <h2 class="cyan-text" style="font-size: 1.5rem; margin-top: 0;">Seguridad y JWT en Netty-SocketIO 🛡️</h2>
            <p style="line-height: 1.6; color: #e0e0e0;">
              En una API REST normal, envías el token en cada petición. En WebSockets, la conexión es constante, por lo que <b>solo validamos el token una vez</b> durante el "Apretón de Manos" (Handshake) inicial.
            </p>
            <p style="line-height: 1.6; color: #e0e0e0;">
              Para que Netty-SocketIO (Java) lea bien el token del cliente, a menudo se usa la URL <code>query: &#123; token &#125;</code>, aunque en Socket.IO moderno se prefiere el payload <code>auth: &#123; token &#125;</code> para evitar logs en red.
            </p>
            <p style="line-height: 1.6; color: #e0e0e0;">
              El <b>AuthorizationListener</b> actúa como el "Portero de la Discoteca": si el JWT es válido, la conexión se queda abierta permanentemente. Si no, se rechaza y el cliente ni siquiera llega a conectarse.
            </p>
            <button mat-flat-button class="btn-cyan" mat-dialog-close style="width: 100%; margin-top: 15px;">¡Brillante!</button>
         </div>
      </ng-template>

      <ng-template #infoPaso5>
        <div class="dark-modal cyan-glow" style="border-color: #ff5252;">
           <h2 style="color: #ff5252; font-size: 1.5rem; margin-top: 0;">Magia con Jackson: Object Mapping 📡</h2>
           <p style="line-height: 1.6; color: #e0e0e0;">
             En Node.js recibes un objeto JSON pelado. ¡En Java usamos tipado fuerte! 
           </p>
           <ul>
             <li style="margin-bottom: 10px; color: #e0e0e0;"><b><code>addEventListener()</code>:</b> Cuando Angular hace <code>emit('disparo', &#123;daño:100&#125;)</code>, Netty usa Jackson para instanciar automáticamente la clase Java <code>DisparoData.class</code> y rellenar sus campos. Cero transformaciones manuales.</li>
             <li style="color: #e0e0e0;"><b><code>getBroadcastOperations().sendEvent()</code>:</b> De la misma manera, tú le entregas a Spring un objeto Java puro (<code>AlertaResponse</code>) y él se encarga de convertirlo a JSON y enviarlo a todos los clientes Angular.</li>
           </ul>
           <button mat-flat-button color="warn" mat-dialog-close style="width: 100%; margin-top: 15px;">Fin de la Lección</button>
        </div>
      </ng-template>

    </div>
  `,
  styles: [`
    :host { display: block; height: 100vh; overflow: hidden; }
    
    .main-wrapper {
      padding: 1rem 2rem;
      color: white;
      height: 100%;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
    }

    .header-nav {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
      background: rgba(0,0,0,0.4);
      padding: 10px;
      border-radius: 8px;
    }

    .split-layout {
      flex: 1;
      display: flex;
      gap: 2rem;
      min-height: 0;
    }

    .column {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: rgba(13, 20, 28, 0.85) !important;
      overflow: hidden;
      border-radius: 12px;
    }

    .column-content {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow-y: auto;
      padding-right: 15px;
    }

    .step-card {
      background: rgba(0,0,0,0.4);
      border: 1px solid rgba(255,255,255,0.1);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 1rem;
      transition: all 0.3s ease;
    }
    .step-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 5px;
    }
    .step-header h4 { margin: 0; font-size: 1.1rem; }

    .step-card.locked { opacity: 0.4; pointer-events: none; filter: grayscale(100%); }
    .step-card.completed { border-color: rgba(105, 240, 174, 0.4); }

    .code-header {
      background: #0a1118;
      border-left: 3px solid #00e5ff;
      padding: 5px 10px;
      font-family: 'Courier New', monospace;
      font-size: 0.75rem;
      color: #8bb4d6;
      display: flex;
      align-items: center;
      margin-top: 10px;
      border-top-left-radius: 4px;
      border-top-right-radius: 4px;
      border-bottom: 1px solid rgba(0,229,255,0.2);
    }
    .code-header + .code-block {
      margin-top: 0;
      border-top-left-radius: 0;
      border-top-right-radius: 0;
    }

    .code-block {
      background: #020406;
      border-left: 3px solid #00e5ff;
      padding: 0.8rem;
      border-radius: 4px;
      font-family: 'Consolas', 'Monaco', monospace;
      color: #a5d6ff;
      font-size: 0.85rem;
      white-space: pre-wrap; 
      margin-top: 10px;
      margin-bottom: 0;
    }

    .console-window {
      background: #000;
      font-family: 'Courier New', monospace;
      font-size: 0.8rem;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      height: 250px;
    }

    .console-header {
      background: #111;
      color: #777;
      padding: 5px 10px;
      border-bottom: 1px solid #333;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .console-body {
      padding: 10px;
      flex: 1;
      overflow-y: auto;
    }

    .log-line { margin-bottom: 4px; word-break: break-all; }
    .timestamp { color: #555; margin-right: 8px; }
    .log-line.info .message { color: #ccc; }
    .log-line.sent .message { color: #00e5ff; }
    .log-line.recv .message { color: #69f0ae; }
    .log-line.error .message { color: #ff5252; }
    .log-line.success .message { color: #ffd740; font-weight: bold; }

    /* Modals */
    .dark-modal {
      background: #050a0f;
      padding: 2rem;
    }
  `]
})
export class ExplicacionSocketsSpringComponent {
  
  private dialog = inject(MatDialog);

  // STATS
  step = signal<number>(0); 
  isLasering = signal<boolean>(false);

  // LOGS
  clientLogs = signal<LogEntry[]>([]);
  serverLogs = signal<LogEntry[]>([]);
  private logIdCounter = 0;

  codePaso1Front = `import { WebsocketService } from './core/services/websocket.service';`;
  codePaso1Back = `<dependency>
    <groupId>com.corundumstudio.socketio</groupId>
    <artifactId>netty-socketio</artifactId>
    <version>2.0.6</version>
</dependency>`;
  
  codePaso2 = `@Configuration
public class SocketIOConfig {

    // 0.0.0.0 para que funcione en contenedores y producción
    @Value("\${socketio.host:0.0.0.0}")
    private String host;

    @Value("\${socketio.port:8085}")
    private Integer port;

    @Bean
    public SocketIOServer socketIOServer() {
        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        config.setHostname(host);
        config.setPort(port);
        // ⚠️ CORS abierto (*): Solo para desarrollo. En PROD usa "https://tudominio.com"
        config.setOrigin("*");
        return new SocketIOServer(config);
    }
}

// ⚠️ ¡IMPORTANTE! Netty no arranca solo. Necesitamos iniciarlo:
@Component
public class SocketServerRunner implements CommandLineRunner {
    private final SocketIOServer server;

    public SocketServerRunner(SocketIOServer server) { this.server = server; }

    @Override
    public void run(String... args) { server.start(); }

    @PreDestroy
    public void stop() { server.stop(); }
}`;

  codePaso3 = `@Configuration
public class SocketIOConfig {

    @Autowired
    private JwtUtils jwtUtils; // Inyectamos nuestra utilidad JWT

    @Bean
    public SocketIOServer socketIOServer() {
        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        // ... config (host, port)
        
        config.setAuthorizationListener(data -> {
            // Obtenemos el token inyectado en el handshake
            String token = data.getSingleUrlParam("token");
            
            if (token != null && jwtUtils.validateToken(token)) {
                // Usuario validado con éxito
                return AuthorizationResult.SUCCESSFUL_AUTHORIZATION;
            }
            
            // Conexión rechazada
            return AuthorizationResult.FAILED_AUTHORIZATION;
        });
        
        return new SocketIOServer(config);
    }
}`;

  codePaso4 = `import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket!: Socket;

  // 1. Conexión segura (Usa WSS en producción)
  public conectar(token: string): void {
    this.socket = io('http://localhost:8085', {
      // ⚠️ Query params en URL se loguean. En Socket.IO v3+ prefiere usar:
      // auth: { token } (si netty-socketio/backend lo soporta)
      query: { token },
      transports: ['websocket']
    });
  }

  // 2. Patrón Correcto: Envolver escucha con Genéricos y Desuscripción segura
  public listen<T>(event: string): Observable<T> {
    return new Observable((subscriber) => {
      const handler = (data: T) => subscriber.next(data);
      this.socket.on(event, handler);
      
      // ✅ IMPORTANTE: Pasamos el handler para no borrar otros listeners del mismo evento
      return () => this.socket.off(event, handler);
    });
  }

  // 3. Método centralizado para emitir
  public emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }
}`;

  codePaso5A = `import { inject } from '@angular/core';

export class JuegoComponent {
  private wsService = inject(WebsocketService); // Estilo moderno Angular

  lanzarAtaque() {
    // Emitimos el evento hacia el servidor Java
    this.wsService.emit('disparo_laser', { daño: 100, arma: "RayoX" });
  }
}`;
  
  codePaso5B = `@Component
public class JuegoSocketController {

    private final SocketIOServer server;

    @Autowired
    public JuegoSocketController(SocketIOServer server) {
        this.server = server;

        // Escuchamos el evento custom del cliente 'disparo_laser'
        this.server.addEventListener("disparo_laser", DisparoData.class, (client, data, ackSender) -> {
            
            // Validamos lógica de juego y reenviamos el efecto AL RESTO
            AlertaResponse alerta = new AlertaResponse("¡Un jugador ha disparado!");
            
            // server.getBroadcastOperations().sendEvent() emite a todos
            server.getBroadcastOperations().sendEvent("alerta_narrador", alerta);
        });
    }
}`;

  codePaso5C = `import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';

export class PanelJuegoComponent implements OnInit, OnDestroy {
  private eventSub!: Subscription;
  private wsService = inject(WebsocketService); // Estilo moderno Angular
  
  ngOnInit() {
    // Escuchamos tipando la respuesta
    this.eventSub = this.wsService.listen<{ mensaje: string }>('alerta_narrador')
      .subscribe((data) => {
         // En app real usar Toast/Snackbar, no alert
         console.log("Notificación del Servidor: " + data.mensaje);
      });
  }

  ngOnDestroy() {
    // Esto dispara la función de limpieza (off) en el Observable
    if (this.eventSub) this.eventSub.unsubscribe();
  }
}`;

  openInfo(template: TemplateRef<any>) {
    this.dialog.open(template, {
      panelClass: 'borderless-dialog',
      maxWidth: '500px'
    });
  }

  private addClientLog(message: string, type: LogEntry['type'] = 'info') {
    this.clientLogs.update(logs => [...logs, { id: this.logIdCounter++, time: new Date(), message, type }]);
  }

  private addServerLog(message: string, type: LogEntry['type'] = 'info') {
    this.serverLogs.update(logs => [...logs, { id: this.logIdCounter++, time: new Date(), message, type }]);
  }

  // INTERACCIONES
  playPaso1() {
     this.addClientLog('Instalado socket.io-client', 'success');
     this.addServerLog('Dependencia netty-socketio añadida al pom.xml', 'success');
     this.step.set(1);
  }

  playPaso2() {
     this.addServerLog('Iniciando Configuración SocketIOServer...', 'info');
     setTimeout(() => {
        this.addServerLog('Netty Server Started on port(s): 8085', 'info');
        this.addServerLog('Socket.IO namespaces listos', 'success');
        this.step.set(2);
     }, 800);
  }

  playPaso4() {
     this.step.set(3); // pending connect
     this.addClientLog('Recuperando JWT legítimo almacenado...', 'info');
     
     setTimeout(() => {
       this.addClientLog('Iniciando io() client hacia ws://localhost:8085', 'info');
       this.addClientLog('[Request] -> Handshake frame con {token: Bearer...}', 'sent');
       
       setTimeout(() => {
         this.addServerLog('[Incoming] Nuevo Handshake detectado en /socket.io', 'recv');
         this.addServerLog('AuthorizationListener verificando JWT token...', 'info');
         
         setTimeout(() => {
           this.addServerLog('Token Válido. SUCCESSFUL_AUTHORIZATION.', 'success');
           this.addClientLog('[Response] <- CONNECTED / Session ID emitido.', 'recv');
           this.addClientLog('Evento on("connect") disparado en Angular.', 'success');
           this.step.set(4); // connected
         }, 1000);
       }, 500);

     }, 700);
  }

  playPaso5() {
     if(this.step() < 4) return;
     this.isLasering.set(true);

     this.addClientLog('emit("disparo_laser", {daño: 100}) -->', 'sent');

     setTimeout(() => {
        this.addServerLog('<- EVENT recibido: "disparo_laser"', 'recv');
        this.addServerLog('Invocando addEventListener(DisparoData.class)', 'info');
        
        setTimeout(() => {
           this.addServerLog('getBroadcastOperations().sendEvent("alerta_narrador")', 'sent');
           
           setTimeout(() => {
              this.addClientLog('<- on("alerta_narrador") Nuevo mensaje Global!', 'recv');
              this.addClientLog('UI: Mostrando popup de alerta.', 'success');
              this.isLasering.set(false);
           }, 400);

        }, 600);
     }, 400);
  }
}

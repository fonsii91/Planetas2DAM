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
  selector: 'app-explicacion-sockets',
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
        <h2 class="cyan-text tech-title" style="margin: 0; padding-right: 1rem;">Laboratorio Interactivo de WebSockets</h2>
      </div>

      <div class="split-layout">
        
        <!-- =================== ZONA FRONTEND (CLIENTE) =================== -->
        <mat-card class="column client-col cyan-glow">
          <mat-card-header style="border-bottom: 1px solid rgba(0, 242, 255, 0.3); margin-bottom: 1rem; padding-bottom: 0.5rem;">
            <mat-icon style="color: #00f2ff; margin-right: 10px;">laptop_mac</mat-icon>
            <mat-card-title class="cyan-text">Frontend (Angular)</mat-card-title>
            <mat-card-subtitle class="tech-subtitle">El cliente de los jugadores</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content class="column-content">
            <!-- Interacciones Cliente -->
            <div class="step-card" [ngClass]="{'locked': step() > 0, 'completed': step() >= 1}">
              <div class="step-header">
                <h4>Paso 1A: Instalar Librería</h4>
                <button mat-icon-button class="cyan-text" (click)="openInfo(infoPaso1)" matTooltip="Saber más sobre el Paso 1"><mat-icon>help_outline</mat-icon></button>
              </div>
              <button mat-flat-button class="btn-cyan" (click)="playPaso1()" [disabled]="step() > 0" style="margin-bottom: 10px;">
                npm install socket.io-client
              </button>
              <div class="code-header"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_front/src/app/core/services/websocket.service.ts</div>
              <pre class="code-block">{{ codePaso1Front }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 2, 'completed': step() >= 4}">
               <div class="step-header">
                 <h4>Paso 3 y 4: Handshake y Conexión</h4>
                 <button mat-icon-button class="cyan-text" (click)="openInfo(infoPaso3_4)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa;">Recuperas el JWT que obtuviste en el Login REST y se lo inyectas al Socket.</p>
               <button mat-flat-button class="btn-cyan" (click)="playPaso4()" [disabled]="step() !== 2" style="margin-bottom: 10px;">
                  CONECTAR A WS://LOCALHOST:3500
               </button>
               <div class="code-header"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_front/src/app/core/services/websocket.service.ts</div>
               <pre class="code-block">{{ codePaso4 }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 4}">
               <div class="step-header">
                 <h4>Paso 5: Interactuar (emitir / on)</h4>
                 <button mat-icon-button color="warn" (click)="openInfo(infoPaso5)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa;">Empuja datos hacia el backend mediante eventos.</p>
               <div class="code-header"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_front/src/app/components/panel-de-juego/panel-de-juego.ts</div>
               <pre class="code-block" style="margin-bottom: 10px;">{{ codePaso5A }}</pre>
               <button mat-flat-button color="warn" (click)="playPaso5()" [disabled]="step() < 4 || isLasering()">
                  <mat-icon>track_changes</mat-icon> DISPARAR LÁSER (emit)
               </button>
               <p style="font-size: 0.85rem; color: #aaa; margin-top: 15px;">Recibirás las respuestas globales desde el servidor:</p>
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
        <mat-card class="column server-col orange-glow">
          <mat-card-header style="border-bottom: 1px solid rgba(255, 107, 0, 0.3); margin-bottom: 1rem; padding-bottom: 0.5rem;">
             <mat-icon style="color: #ff6b00; margin-right: 10px;">dns</mat-icon>
             <mat-card-title class="orange-text">Backend (Node.js)</mat-card-title>
             <mat-card-subtitle class="tech-subtitle">El Orquestador Centralizado</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content class="column-content">
            <!-- Interacciones Servidor -->
            <div class="step-card" [ngClass]="{'locked': step() > 0, 'completed': step() >= 1}">
              <div class="step-header">
                <h4>Paso 1B: Instalar Librería</h4>
                <button mat-icon-button class="orange-text" (click)="openInfo(infoPaso1)"><mat-icon>help_outline</mat-icon></button>
              </div>
              <button mat-flat-button class="btn-orange" (click)="playPaso1()" [disabled]="step() > 0" style="margin-bottom: 10px;">
                npm install socket.io
              </button>
              <div class="code-header orange"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_back/package.json</div>
              <pre class="code-block orange">{{ codePaso1Back }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 1, 'completed': step() >= 2}">
               <div class="step-header">
                 <h4>Paso 2: Iniciar Motor WebSockets</h4>
                 <button mat-icon-button class="orange-text" (click)="openInfo(infoPaso2)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <button mat-flat-button class="btn-orange" (click)="playPaso2()" [disabled]="step() !== 1" style="margin-bottom: 10px;">
                  INICIAR SERVIDOR EN PUERTO 3000
               </button>
               <div class="code-header orange"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_back/index.js</div>
               <pre class="code-block orange">{{ codePaso2 }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 2, 'completed': step() >= 4}">
               <div class="step-header">
                 <h4>Paso 3: Módulo de Seguridad (io.use)</h4>
                 <button mat-icon-button class="orange-text" (click)="openInfo(infoPaso3_4)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa;">El servidor está a la escucha interceptando peticiones y validando con JWT.</p>
               <div class="code-header orange"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_back/index.js (Middleware)</div>
               <pre class="code-block orange">{{ codePaso3 }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 4}">
               <div class="step-header">
                 <h4>Paso 5: Orquestador Global (on / emit)</h4>
                 <button mat-icon-button color="warn" (click)="openInfo(infoPaso5)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa;">Recibe el disparo del cliente y lo re-emite globalmente:</p>
               <div class="code-header orange"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_back/index.js (Socket Events)</div>
               <pre class="code-block orange">{{ codePaso5B }}</pre>
            </div>
          </mat-card-content>

          <!-- Terminal Servidor (Static Bottom) -->
          <div class="console-window" style="border-top: 2px solid rgba(255, 107, 0, 0.5);">
            <div class="console-header" style="background: #221200; border-bottom: 1px solid #552700;">
               <mat-icon style="font-size: 14px; height: 14px; width: 14px;">terminal</mat-icon> Node.JS Terminal
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
          <h2 class="cyan-text" style="font-size: 1.5rem; margin-top: 0;">¿Por qué diferentes paquetes? 📦</h2>
          <p style="line-height: 1.6; color: #e0e0e0;">
            Imagina que el Backend (Node.js) es la <b>Central Telefónica</b>. Necesita los equipos pesados (<code>socket.io</code>) para poder gestionar y enrutar miles de llamadas simultáneas y saber quién está online.
          </p>
          <p style="line-height: 1.6; color: #e0e0e0;">
            El Frontend (Angular), en cambio, es solamente un <b>Teléfono Móvil</b>. El usuario final usa una versión ligera (<code>socket.io-client</code>) que incluye justo lo único indispensable: descolgar y hablar.
          </p>
          <button mat-flat-button class="btn-cyan" mat-dialog-close style="width: 100%; margin-top: 15px;">¡Entendido!</button>
        </div>
      </ng-template>

      <ng-template #infoPaso2>
        <div class="dark-modal orange-glow">
           <h2 class="orange-text" style="font-size: 1.5rem; margin-top: 0;">El "Upgrade" a Sockets ⚙️</h2>
           <p style="line-height: 1.6; color: #e0e0e0;">
             Un API REST normal es como un <b>Servicio de Correos 📬</b>: tú envías una carta (GET/POST), el backend la lee, te devuelve un paquete, y el cartero se marcha. Relación terminada.
           </p>
           <p style="line-height: 1.6; color: #e0e0e0;">
             Al hacer <code>new Server(server)</code>, le indicamos a Node.js que coja peticiones especiales y las <i>"mejore"</i> (Protocol Upgrade) transformándolas en una <b>Llamada de Teléfono permanente 📞</b>. Ahora la conexión no se corta sola; podemos hablar cruzado en cualquier milisegundo.
           </p>
           <button mat-flat-button class="btn-orange" mat-dialog-close style="width: 100%; margin-top: 15px;">¡Entendido!</button>
        </div>
      </ng-template>

      <ng-template #infoPaso3_4>
         <div class="dark-modal cyan-glow">
            <h2 class="cyan-text" style="font-size: 1.5rem; margin-top: 0;">El Portero de la Discoteca 🛡️</h2>
            <p style="line-height: 1.6; color: #e0e0e0;">
              A diferencia del Correo donde examinas cada carta con tu sistema de seguridad REST, el tubo de WebSockets es salvaje. Si les dejas descolgar el teléfono, podrían gritar cualquier comando.
            </p>
            <p style="line-height: 1.6; color: #e0e0e0;">
              Por eso, el primer grito mágico que envía Angular (Paso 4) es el <b>Handshake</b> (El Saludo). En su interior, enviamos oculto nuestro <b>Ticket VIP (El Token JWT)</b>.
            </p>
            <p style="line-height: 1.6; color: #e0e0e0;">
              En el Backend (Paso 3), el middleware <code>io.use(...)</code> está quieto en la puerta, como un estricto portero de discoteca. Extrae ese Ticket VIP y lo examina (<code>jwt.verify</code>). Si es legal, te apunta en la lista (<code>socket.user = payload</code>) y te deja pasar a la fiesta. Si no, te corta la conexión allí mismo.
            </p>
            <button mat-flat-button class="btn-cyan" mat-dialog-close style="width: 100%; margin-top: 15px;">¡Brillante!</button>
         </div>
      </ng-template>

      <ng-template #infoPaso5>
        <div class="dark-modal cyan-glow" style="border-color: #ff5252;">
           <h2 style="color: #ff5252; font-size: 1.5rem; margin-top: 0;">El Ecosistema Emit / On 📡</h2>
           <p style="line-height: 1.6; color: #e0e0e0;">
             ¡Estás dentro! Una vez conectados, solo hay dos verbos en nuestro mundo Socket y debes aprender a conjugarlos:
           </p>
           <ul>
             <li style="margin-bottom: 10px; color: #e0e0e0;"><b><code>emit()</code>:</b> Exclamar algo por el tubo. Le adjuntas un "nombre de evento" (ej: 'disparo') y un paquete de "datos extra" (daños, coordenadas).</li>
             <li style="color: #e0e0e0;"><b><code>on() / listen()</code>:</b> Es poner la oreja esperando que alguien exclame un evento con ese nombre clave para ejecutar una respuesta.</li>
           </ul>
           <p style="line-height: 1.6; color: #e0e0e0;">
             En Angular, en vez de rellenar los componentes con verbos "on" sueltos como espagueti, usamos un <b>Observador (RxJS)</b> en el servicio. Transforma esos caóticos chuzos que vuelan por el tubo en preciosos <code>.subscribe()</code> pautados, que se desactivan limpios solos cuando la pantalla explota (<code>ngOnDestroy()</code>).
           </p>
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
    .code-header.orange {
      border-left: 3px solid #ff6b00;
      border-bottom: 1px solid rgba(255,107,0,0.2);
      color: #fca768;
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
    .code-block.orange {
       border-left: 3px solid #ff6b00;
       color: #ffd8a5;
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
export class ExplicacionSocketsComponent {
  
  private dialog = inject(MatDialog);

  // STATS
  step = signal<number>(0); 
  isLasering = signal<boolean>(false);

  // LOGS
  clientLogs = signal<LogEntry[]>([]);
  serverLogs = signal<LogEntry[]>([]);
  private logIdCounter = 0;

  codePaso1Front = `import { WebsocketService } from './core/services/websocket.service';`;
  codePaso1Back = `import { Server } from 'socket.io';`;
  
  codePaso2 = `import { Server } from 'socket.io';
import http from 'http';

const server = http.createServer(app); 

// Instanciar garantizando evitar problemas de CORS
const io = new Server(server, {
  cors: { origin: "http://localhost:4200", methods: ["GET", "POST"] }
});

// Iniciamos el puerto del servidor central
server.listen(3500, () => console.log('✅ Sockets on port 3500'));`;

  codePaso3 = `import jwt from 'jsonwebtoken';

io.use((socket, next) => {
  // Extraemos el JWT inyectado por el Frontend
  const token = socket.handshake.auth.token;

  if (!token) return next(new Error("Acceso Denegado: No token"));

  // Verificamos la firma con nuestra Variable de Entorno Segura
  jwt.verify(token, process.env.JWT_SECRET, (err, userPayload) => {
    if (err) return next(new Error("Acceso Denegado: Token inválido"));
    
    // Guardamos los datos decodificados en el socket del usuario
    socket.user = userPayload;
    next(); // Validado correctamente
  });
});`;

  codePaso4 = `import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket!: Socket;

  // 1. Inicializamos pasando el token (ej: recuperado del Login)
  public conectar(token: string): void {
    this.socket = io('http://localhost:3500', {
      auth: { token },
      transports: ['websocket']
    });
  }

  // 2. Patrón Correcto: Envolver escucha en un Observable de RxJS
  public listen(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => subscriber.next(data));
      // Buenas prácticas: Cleanup si el componente se destruye
      return () => this.socket.off(event);
    });
  }

  // 3. Método centralizado para emitir
  public emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }
}`;

  codePaso5A = `export class JuegoComponent {
  // Inyectamos el servicio (Nunca usamos la lib socket.io cruda aquí)
  constructor(private wsService: WebsocketService) {}

  lanzarAtaque() {
    // Emitimos usando la estructura de datos que espera el servidor
    this.wsService.emit('disparo_laser', { daño: 100, arma: "RayoX" });
  }
}`;
  
  codePaso5B = `io.on('connection', (socket) => {
  console.log(\`✅ Usuario \${socket.user.name} conectado\`);

  // Escuchamos el evento custom del cliente
  socket.on('disparo_laser', (info) => {
    // Validamos lógica de juego y reenviamos el efecto AL RESTO
    // io.emit = Envía a todos. socket.broadcast.emit = a todos menos a ti
    io.emit('alerta_narrador', { mensajito: "¡Un jugador ha disparado!" });
  });
});`;

  codePaso5C = `import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class PanelJuegoComponent implements OnInit, OnDestroy {
  private eventSub!: Subscription;
  
  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    // Nos suscribimos al Observable (La forma "Correcta y Angular")
    this.eventSub = this.wsService.listen('alerta_narrador')
      .subscribe((data) => {
         alert("Notificación del Servidor: " + data.mensajito);
      });
  }

  ngOnDestroy() {
    // IMPRESCINDIBLE: Destruir la subscripción para evitar Memory Leaks
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
     this.addClientLog('Instalado socket.io-client@latest', 'success');
     this.addServerLog('Instalado socket.io@latest', 'success');
     this.step.set(1);
  }

  playPaso2() {
     this.addServerLog('Iniciando constructor Server de Socket.io...', 'info');
     setTimeout(() => {
        this.addServerLog('Escuchando en ws://0.0.0.0:3000', 'success');
        this.addServerLog('Módulo de seguridad io.use() montado y listo.', 'info');
        this.step.set(2);
     }, 800);
  }

  playPaso4() {
     this.step.set(3); // pending connect
     this.addClientLog('Recuperando JWT legítimo almacenado desde el Login REST...', 'info');
     
     setTimeout(() => {
       this.addClientLog('JWT Listo. Iniciando io() transport: websocket', 'info');
       this.addClientLog('[Request] -> Intentando Handshake...', 'sent');
       
       setTimeout(() => {
         this.addServerLog('[Incoming] Petición de conexión detectada.', 'recv');
         this.addServerLog('Validando JWT recibido en auth.token...', 'info');
         
         setTimeout(() => {
           this.addServerLog('Token Válido. Usuario Autorizado.', 'success');
           this.addServerLog('Asignando canal de Socket ID particular...', 'info');
           this.addClientLog('[Response] <- Conexión Aceptada por Servidor.', 'recv');
           this.addClientLog('Evento on("connect") disparado.', 'success');
           this.step.set(4); // connected
         }, 1000);
       }, 500);

     }, 700);
  }

  playPaso5() {
     if(this.step() < 4) return;
     this.isLasering.set(true);

     this.addClientLog('emit("disparo_laser", { daño: 100 }) -->', 'sent');

     setTimeout(() => {
        this.addServerLog('<- on("disparo_laser") Recibido packet de daño 100', 'recv');
        this.addServerLog('Procesando mecánicas de juego en Backend...', 'info');
        
        setTimeout(() => {
           this.addServerLog('Redirigiendo a todos... io.emit("alerta_narrador")', 'sent');
           
           setTimeout(() => {
              this.addClientLog('<- on("alerta_narrador") Nuevo mensaje Global!', 'recv');
              this.addClientLog('UI: Mostrando popup rojo de impacto.', 'success');
              this.isLasering.set(false);
           }, 400);

        }, 600);
     }, 400);
  }
}

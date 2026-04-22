import { Component, signal, inject, TemplateRef, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { DatePipe, NgClass, NgIf } from '@angular/common';

interface LogEntry {
  id: number;
  time: Date;
  message: string;
  type: 'info'|'sent'|'recv'|'error'|'success';
}

@Component({
  selector: 'app-explicacion-http',
  standalone: true,
  imports: [
    MatCardModule, 
    RouterModule, 
    MatButtonModule, 
    MatIconModule, 
    MatProgressBarModule,
    MatDialogModule,
    DatePipe,
    NgClass,
    NgIf
  ],
  template: `
    <div class="main-wrapper">
      <div class="header-nav">
        <button mat-button routerLink="/login" class="btn-cyan">
          &lt; Volver al Login
        </button>
        <h2 class="cyan-text tech-title" style="margin: 0; padding-right: 1rem;">Laboratorio Interactivo de HTTP REST (Auth)</h2>
      </div>

      <!-- THE BRIDGE (NETWORK PIPELINE) -->
      <div class="network-bridge" [ngClass]="{'active': isSending()}">
        <div class="packet" *ngIf="isSending()" [ngClass]="packetDirection()">
          <mat-icon>{{ packetIcon() }}</mat-icon>
        </div>
        <div class="bridge-line"></div>
      </div>

      <div class="split-layout">
        
        <!-- =================== ZONA FRONTEND (CLIENTE) =================== -->
        <mat-card class="column client-col cyan-glow">
          <mat-card-header style="border-bottom: 1px solid rgba(0, 242, 255, 0.3); margin-bottom: 1rem; padding-bottom: 0.5rem;">
            <mat-icon style="color: #00f2ff; margin-right: 10px;">laptop_mac</mat-icon>
            <mat-card-title class="cyan-text">Frontend (Angular)</mat-card-title>
            <mat-card-subtitle class="tech-subtitle">El Navegador del Usuario</mat-card-subtitle>
          </mat-card-header>
          
          <mat-card-content class="column-content">
            <!-- Interacciones Cliente -->
            <div class="step-card" [ngClass]="{'locked': step() > 0, 'completed': step() >= 1}">
              <div class="step-header">
                <h4>Paso 0A: Preparar Motor HTTP</h4>
              </div>
              <p style="font-size: 0.85rem; color: #aaa;">Necesitamos habilitar HttpClient e inyectar el Policía Aduanero (Interceptor).</p>
              <button mat-flat-button class="btn-cyan" (click)="playPaso0()" [disabled]="step() > 0" style="margin-bottom: 10px;">
                <mat-icon>settings</mat-icon> CONFIGURAR APP.CONFIG.TS
              </button>
              <div class="code-header"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_front/src/app/app.config.ts</div>
              <pre class="code-block">{{ codeFrontConfig }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 1, 'completed': step() >= 2}">
              <div class="step-header">
                <h4>Paso 1: Enviar Credenciales</h4>
                <button mat-icon-button class="cyan-text" (click)="openInfo(infoHttp)" matTooltip="Saber más sobre REST"><mat-icon>help_outline</mat-icon></button>
              </div>
              <p style="font-size: 0.85rem; color: #aaa;">El usuario rellena el form. Emitimos la petición POST.</p>
              <button mat-flat-button class="btn-cyan" (click)="playPaso1()" [disabled]="step() !== 1 || isSending()" style="margin-bottom: 10px;">
                <mat-icon>send</mat-icon> POST /api/auth/login
              </button>
              <div class="code-header"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_front/src/app/features/auth/login/login.ts</div>
              <pre class="code-block">{{ codeFrontLogin }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 2, 'completed': step() >= 3}">
               <div class="step-header">
                 <h4>Paso 4: Guardar Ticket (JWT)</h4>
                 <button mat-icon-button class="cyan-text" (click)="openInfo(infoJwt)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa;">La petición vuelve con un 200 OK y la cadena del Token VIP. Lo guardamos en su cartera local (LocalStorage).</p>
               <div class="code-header"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_front/src/app/features/auth/login/login.ts (Suscripción)</div>
               <pre class="code-block">{{ codeFrontStorage }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 2, 'completed': step() >= 3}">
               <div class="step-header">
                 <h4>Paso 5: El Interceptor (Uso del VIP)</h4>
                 <button mat-icon-button color="warn" (click)="openInfo(infoInterceptor)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa;">Cualquier petición posterior será "sellada" automáticamente por el Interceptor sin que tengas que programarlo.</p>
               <div class="code-header"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_front/src/app/core/interceptors/auth.interceptor.ts</div>
               <pre class="code-block" style="margin-bottom: 10px;">{{ codeFrontInterceptor }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 2, 'completed': step() >= 3}">
               <div class="step-header">
                 <h4>Paso 7: Siguientes Peticiones</h4>
               </div>
               <p style="font-size: 0.85rem; color: #aaa;">El servicio queda limpio de seguridad. Al dispararlo, el Interceptor actuará.</p>
               <div class="code-header"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_front/src/app/core/services/planetas.service.ts</div>
               <pre class="code-block" style="margin-bottom: 10px;">{{ codeFrontService }}</pre>
               <button mat-flat-button color="warn" (click)="playPaso2()" [disabled]="step() < 2 || isSending()">
                  <mat-icon>lock_open</mat-icon> GET /api/admin/planetas
               </button>
            </div>
          </mat-card-content>

          <!-- Terminal Cliente -->
          <div class="console-window" style="border-top: 2px solid rgba(0, 242, 255, 0.5);">
            <div class="console-header"><mat-icon style="font-size: 14px; height: 14px; width: 14px;">terminal</mat-icon> DevTools | Network</div>
            <div class="console-body" #clientScroll>
              @for (log of clientLogs(); track log.id) {
                <div class="log-line" [ngClass]="log.type">
                  <span class="timestamp">[{{ log.time | date:'HH:mm:ss.SSS' }}]</span> 
                  <span class="message">{{ log.message }}</span>
                </div>
              }
              @empty {
                <div class="log-line info">Esperando interacción del usuario...</div>
              }
            </div>
          </div>
        </mat-card>

        
        <!-- =================== ZONA BACKEND (SERVIDOR) =================== -->
        <mat-card class="column server-col green-glow">
          <mat-card-header style="border-bottom: 1px solid rgba(105, 240, 174, 0.3); margin-bottom: 1rem; padding-bottom: 0.5rem;">
             <mat-icon style="color: #69f0ae; margin-right: 10px;">computer</mat-icon>
             <mat-card-title class="green-text">Backend (Spring Boot)</mat-card-title>
             <mat-card-subtitle class="tech-subtitle">La Base de Datos y la Seguridad</mat-card-subtitle>
          </mat-card-header>

          <mat-card-content class="column-content">
            <!-- Interacciones Servidor -->
            <div class="step-card" [ngClass]="{'locked': step() > 0, 'completed': step() >= 1}">
              <div class="step-header">
                <h4>Paso 0B: Importar Seguridad y JWT</h4>
              </div>
              <p style="font-size: 0.85rem; color: #aaa;">Dependencias Maven para cifrar contraseñas (BCrypt) y fabricar las Pulseras VIP.</p>
              <button mat-flat-button class="btn-green" (click)="playPaso0()" [disabled]="step() > 0" style="margin-bottom: 10px;">
                <mat-icon>download</mat-icon> INSTALAR MAVEN
              </button>
              <div class="code-header green"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_API/pom.xml (Maven)</div>
              <pre class="code-block green">{{ codeBackConfig }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 1, 'completed': step() >= 2}">
               <div class="step-header">
                 <h4>Paso 2: Autenticación en BBDD</h4>
                 <button mat-icon-button class="green-text" (click)="openInfo(infoHttp)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa;">Spring Security busca el email y cifra la contraseña recibida para compararla con MySQL.</p>
               <div class="code-header green"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_API/src/main/java/.../controllers/AuthController.java</div>
               <pre class="code-block green">{{ codeBackAuth }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 1, 'completed': step() >= 2}">
               <div class="step-header">
                 <h4>Paso 3: Generación del JWT</h4>
                 <button mat-icon-button class="green-text" (click)="openInfo(infoJwt)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa;">Si es correcto, fabricamos una cadena firmada con nuestra Clave Secreta y se lo devolvemos al cartero.</p>
               <div class="code-header green"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_API/src/main/java/.../services/AuthService.java</div>
               <pre class="code-block green">{{ codeBackToken }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 3}">
               <div class="step-header">
                 <h4>Paso 6: Validar en Rutas Protegidas</h4>
                 <button mat-icon-button color="warn" (click)="openInfo(infoInterceptor)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa;">Cuando pides entrar a la zona VIP de planetas, Spring Boot lee el "sello" sin tener que volver a consultar MySQL.</p>
               <div class="code-header green"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_API/src/main/java/.../config/SecurityConfig.java</div>
               <pre class="code-block green">{{ codeBackProtect }}</pre>
            </div>

            <div class="step-card" [ngClass]="{'locked': step() < 3}">
               <div class="step-header">
                 <h4>Paso 8: Política CORS Global</h4>
                 <button mat-icon-button class="green-text" (click)="openInfo(infoCors)"><mat-icon>help_outline</mat-icon></button>
               </div>
               <p style="font-size: 0.85rem; color: #aaa;">Para que Angular envíe Headers HTTP extra al servidor remoto, la política CORS del Backend debe autorizarlo.</p>
               <div class="code-header green"><mat-icon style="font-size: 14px; width: 14px; height: 14px; margin-right: 5px;">description</mat-icon> planetas_API/src/main/java/.../config/CorsConfig.java</div>
               <pre class="code-block green">{{ codeBackCors }}</pre>
            </div>
          </mat-card-content>

          <!-- Terminal Servidor -->
          <div class="console-window" style="border-top: 2px solid rgba(105, 240, 174, 0.5);">
            <div class="console-header" style="background: #021a0a; border-bottom: 1px solid #044018;">
               <mat-icon style="font-size: 14px; height: 14px; width: 14px;">terminal</mat-icon> Spring Boot (Tomcat)
            </div>
            <div class="console-body" #serverScroll>
              @for (log of serverLogs(); track log.id) {
                <div class="log-line" [ngClass]="log.type">
                  <span class="timestamp">[{{ log.time | date:'HH:mm:ss.SSS' }}]</span> 
                  <span class="message">{{ log.message }}</span>
                </div>
              }
              @empty {
                <div class="log-line info">INFO  org.springframework.boot.StartupInfoLogger ...</div>
              }
            </div>
          </div>
        </mat-card>

      </div>

      <!-- MODALS / EXPLICACIONES TEÓRICAS -->
      <ng-template #infoHttp>
        <div class="dark-modal green-glow">
          <h2 class="green-text" style="font-size: 1.5rem; margin-top: 0;">El Amnésico (HTTP Stateless) 📬</h2>
          <p style="line-height: 1.6; color: #e0e0e0;">
            A diferencia de WebSockets (que es como una tubería abierta donde nos vemos las caras permanentemente), el servidor HTTP REST <b>tiene una amnesia total</b>.
          </p>
          <p style="line-height: 1.6; color: #e0e0e0;">
            El cartero HTTP recoge tu petición <code>POST /login</code>, la entrega al servidor, agarra tu caja de respuesta, y cuando se da la vuelta, el servidor olvida quién demonios eres al instante. No hay "estado". ¡Por eso en adelante necesitamos un mecanismo extra (Tokens) para recordar tu sesión amnésica en futuras cartas!
          </p>
          <button mat-flat-button class="btn-green" mat-dialog-close style="width: 100%; margin-top: 15px;">Entiendo la limitación de HTTP</button>
        </div>
      </ng-template>

      <ng-template #infoJwt>
         <div class="dark-modal cyan-glow">
            <h2 class="cyan-text" style="font-size: 1.5rem; margin-top: 0;">La Pulsera VIP 🎫 (JWT)</h2>
            <p style="line-height: 1.6; color: #e0e0e0;">
              El <b>JWT (JSON Web Token)</b> funciona exactamente igual que la pulsera de un hotel resort Todo Incluido.
            </p>
            <p style="line-height: 1.6; color: #e0e0e0;">
              Cuando entras por primera vez enseñando tu DNI y pagando (<b>Login</b> en la Base de Datos), al cajero le cuesta tiempo y recursos. En vez de pedirte el DNI en la piscina o en el restaurante de nuevo (buscar en BBDD), te pone una pulsera irrompible.
            </p>
            <p style="line-height: 1.6; color: #e0e0e0;">
              A partir de ahí, ni el camarero ni el salvavidas consultan la base de datos: solo miran tu pulsera porque ven que lleva la <b>Firma Criptográfica (algoritmo HS256)</b> inalterable del hotel. Guardar el token en el LocalStorage es como esconder la pulsera en nuestra guantera para rehusarla.
            </p>
            <button mat-flat-button class="btn-cyan" mat-dialog-close style="width: 100%; margin-top: 15px;">¡Metáfora asimilada!</button>
         </div>
      </ng-template>

      <ng-template #infoInterceptor>
        <div class="dark-modal cyan-glow" style="border-color: #ff5252;">
           <h2 style="color: #ff5252; font-size: 1.5rem; margin-top: 0;">El Policía Aduanero (HttpInterceptor) 👮</h2>
           <p style="line-height: 1.6; color: #e0e0e0;">
             Imagina que cada vez que un servicio Angular va a mandar un <code>GET /planetas</code> tuviera que sacar a mano la pulsera VIP del cajón y pegarla en un Sello (Header). Sería aburrido y a menudo los Juniors se olvidan de pegarlo.
           </p>
           <p style="line-height: 1.6; color: #e0e0e0;">
             En Angular, en vez de emborronar cada servicio, programamos a un policía (HttpInterceptor) que vigila la frontera de salida del navegador. Él intercepta **TODAS** las cartas de tu App y de forma automática e invisible les estampa la cabecera <code>Authorization: Bearer [pulsera]</code> antes de dejarlas volar al Backend.
           </p>
           <button mat-flat-button color="warn" mat-dialog-close style="width: 100%; margin-top: 15px;">Genial estructura centralizada</button>
        </div>
      </ng-template>

      <ng-template #infoCors>
         <div class="dark-modal green-glow">
            <h2 class="green-text" style="font-size: 1.5rem; margin-top: 0;">El Guardián del Navegador 🛡️ (CORS)</h2>
            <p style="line-height: 1.6; color: #e0e0e0;">
              Por defecto, los navegadores confían ciegamente en las páginas web, pero sospechan mucho cuando una web descargada de <b>localhost:4200</b> intenta hacer peticiones "por detrás" a otro servidor en <b>localhost:8080</b>.
            </p>
            <p style="line-height: 1.6; color: #e0e0e0;">
              A esto se le llama política CORS. Si en el Backend no autorizas expresamente al origen "http://localhost:4200", el navegador abortará instantáneamente la petición y lanzará un error rojo de CORS en consola.
            </p>
            <p style="line-height: 1.6; color: #e0e0e0;">
              Además, es crucial usar <code>.allowedHeaders("*")</code> (o permitir explícitamente <code>Authorization</code>), ya que si no lo haces, el navegador se negará a viajar con tu "sello VIP" en la cabecera.
            </p>
            <button mat-flat-button class="btn-green" mat-dialog-close style="width: 100%; margin-top: 15px;">¡CORS dominado!</button>
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
      position: relative;
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

    /* THE BRIDGE */
    .network-bridge {
      position: absolute;
      top: 50%;
      left: 30%;
      right: 30%;
      height: 40px;
      margin-top: -20px;
      z-index: 10;
      pointer-events: none;
    }
    .bridge-line {
      position: absolute;
      top: 18px;
      left: 0;
      width: 100%;
      height: 4px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 2px;
      border-bottom: 1px dashed rgba(255, 215, 64, 0.3);
    }
    .packet {
      position: absolute;
      top: 0;
      width: 40px;
      height: 40px;
      background: #ffd740;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #000;
      box-shadow: 0 0 15px #ffd740;
      z-index: 11;
      opacity: 0;
    }
    .packet.forward {
      animation: shootForward 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    .packet.backward {
      animation: shootBackward 1.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
    }
    /* El packet de llave/token */
    .packet.vip {
       background: #00f2ff;
       box-shadow: 0 0 15px #00f2ff;
    }

    @keyframes shootForward {
      0% { left: 0%; opacity: 0; transform: scale(0.5); }
      10% { opacity: 1; transform: scale(1); }
      90% { left: 100%; opacity: 1; transform: scale(1); }
      100% { left: 100%; opacity: 0; transform: scale(0.5); }
    }
    @keyframes shootBackward {
      0% { left: 100%; opacity: 0; transform: scale(0.5); }
      10% { opacity: 1; transform: scale(1); }
      90% { left: 0%; opacity: 1; transform: scale(1); }
      100% { left: 0%; opacity: 0; transform: scale(0.5); }
    }

    /* END BRIDGE */

    .split-layout {
      flex: 1;
      display: flex;
      gap: 3rem;
      min-height: 0;
      position: relative;
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
    .code-header.green {
      border-left: 3px solid #69f0ae;
      border-bottom: 1px solid rgba(105,240,174,0.2);
      color: #92d19b;
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
    .code-block.green {
       border-left: 3px solid #69f0ae;
       color: #b9fbc0;
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

    .green-glow { box-shadow: 0 0 20px rgba(105, 240, 174, 0.05); border: 1px solid rgba(105, 240, 174, 0.3); }
    .cyan-glow { box-shadow: 0 0 20px rgba(0, 242, 255, 0.05); border: 1px solid rgba(0, 242, 255, 0.3); }
    .green-text { color: #69f0ae; }
    .cyan-text { color: #00f2ff; }
    
    .btn-green { background-color: #69f0ae; color: #000; }
    .btn-cyan { background-color: #00f2ff; color: #000; }

    /* Modals */
    .dark-modal {
      background: #050a0f;
      padding: 2rem;
    }
  `]
})
export class ExplicacionHttpComponent implements OnInit {
  
  private dialog = inject(MatDialog);

  // STATS
  step = signal<number>(0); 
  isSending = signal<boolean>(false);
  packetDirection = signal<'forward'|'backward'|'forward vip'|'backward vip'>('forward');
  packetIcon = signal<string>('mail'); // mail, key, vpn_key

  // LOGS
  clientLogs = signal<LogEntry[]>([]);
  serverLogs = signal<LogEntry[]>([]);
  private logIdCounter = 0;

  codeFrontConfig = `import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    // 1. Damos poder para emitir (Paso 1)
    // 2. Activamos al policía/interceptor mundial (Paso 5)
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};`;

  codeBackConfig = `<dependency>
  <groupId>org.springframework.boot</groupId>
  <artifactId>spring-boot-starter-security</artifactId>
</dependency>
<dependency>
  <groupId>io.jsonwebtoken</groupId>
  <artifactId>jjwt</artifactId>
  <version>0.12.5</version>
</dependency>`;

  codeFrontLogin = `login() {
  const credentials = { email: 'fonsi@edu.es', psw: '123' };
  // Lanzamos asíncronamente un POST al servidor REST
  this.http.post<AuthResponse>('/api/auth/login', credentials)
    .subscribe({
      next: (res) => this.guardarToken(res.token)
    });
}`;
  
  codeBackAuth = `@PostMapping("/login")
public ResponseEntity<?> login(@RequestBody LoginDto creds) {
  // 1. Spring Security busca en MySQL: SELECT * FROM usuarios ...
  User user = userRepository.findByEmail(creds.getEmail());
  
  // 2. Comprobamos Hashes (Bcrypt)
  if (!passwordEncoder.matches(creds.getPsw(), user.getPassword())) {
      throw new BadCredentialsException("Clave mal");
  }
}`;

  codeBackToken = `// ¡Si todo es correcto, fabricamos La Pulsera VIP!
String jwtGen = Jwts.builder()
   .setSubject(user.getRoles())
   .setIssuedAt(new Date())
   .setExpiration(futuro) // Expira en unas horas
   .signWith(SECRET_KEY, SignatureAlgorithm.HS256)
   .compact();

// Devolvemos Payload HTTP 200 con la pulsera dentro
return ResponseEntity.ok(new AuthResponse(jwtGen));`;

  codeFrontStorage = `guardarToken(token: string) {
  // Lo escondemos en la guantera de la memoria del navegador
  localStorage.setItem('auth_token', token);
  this.router.navigate(['/menu-principal']);
}`;

  codeFrontInterceptor = `export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // El policía aduanero vigila los paquetes que salen...
  const token = localStorage.getItem('auth_token');
  
  if (token) {
    // Si tenemos pulsera VIP, clonamos la carta y le imponemos el HEADER
    const reqConVIP = req.clone({
       setHeaders: { Authorization: \`Bearer \${token}\` }
    });
    return next(reqConVIP); // ¡Viaja de categoría suprema!
  }
  
  return next(req); // Viaja normal (como pordiosero sin login)
};`;

  codeBackProtect = `@Override
protected void configure(HttpSecurity http) throws Exception {
    http.authorizeRequests()
      // Cualquiera puede registrarse y ver login
      .antMatchers("/api/auth/**").permitAll()
      // ¡EL RESTO REQUIERE QUE LA PULSERA EXISTA Y SEA LEGAL!
      .anyRequest().authenticated() 
}`;

  codeFrontService = `import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class PlanetasService {
  
  // 1. Inyectamos la herramienta interna de Angular
  private http = inject(HttpClient);

  // 2. Peticiones limpias (El Interceptor las sellará invisibles)
  getPlanetas() {
    return this.http.get<Planeta[]>('/api/admin/planetas');
  }

  crearPlaneta(planeta: Planeta) {
    return this.http.post<Planeta>('/api/admin/planetas', planeta);
  }

  actualizarPlaneta(id: number, datos: Partial<Planeta>) {
    return this.http.put<Planeta>(\`/api/admin/planetas/\${id}\`, datos);
  }

  borrarPlaneta(id: number) {
    return this.http.delete(\`/api/admin/planetas/\${id}\`);
  }
}`;

  codeBackCors = `@Configuration
public class CorsConfig implements WebMvcConfigurer {
    @Override
    public void addCorsMappings(CorsRegistry registry) {
       registry.addMapping("/**")
           .allowedOrigins("http://localhost:4200") 
           .allowedMethods("GET", "POST", "PUT", "DELETE")
           .allowedHeaders("*"); // ¡Permite que Angular adjunte Tokens VIP!
    }
}`;

  ngOnInit() {
      // Setup algo inicial
  }

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
  playPaso0() {
     this.addClientLog('Aplicando provideHttpClient() y listando Interceptores...', 'success');
     this.addServerLog('Dependencias Maven instaladas: Security & JJWT.', 'success');
     this.step.set(1);
  }

  playPaso1() {
     if (this.step() !== 1) return;
     this.isSending.set(true);
     this.packetDirection.set('forward');
     this.packetIcon.set('mail');
     
     this.addClientLog('POST /api/auth/login. Enviando credenciales...', 'sent');
     
     // 1. Paquete viaja de Front a Back (1.5s de CSS animation)
     setTimeout(() => {
        this.addServerLog('[DispatcherServlet] Routing POST /api/auth/login => AuthController', 'info');
        this.addServerLog('[Hibernate] SELECT * FROM users WHERE email=fonsi@...', 'info');
        
        setTimeout(() => {
           this.addServerLog('Match! Generando Hash BCrypt y verificando...', 'success');
           this.addServerLog('Construyendo Firma JWT HMAC-SHA256...', 'info');
           
           setTimeout(() => {
              this.addServerLog('Respondiendo HTTP 200 OK w/ payload {token: "eyJh..."}', 'sent');
              
              // 2. Paquete Vuelve (Back to Front)
              this.packetDirection.set('backward vip');
              this.packetIcon.set('vpn_key'); // Llave
              
              setTimeout(() => {
                 this.addClientLog('Response HTTP 200 recibida. Observable desencadenado.', 'recv');
                 this.addClientLog('Almacenando cadena eyJh... en LocalStorage.', 'success');
                 this.isSending.set(false);
                 this.step.set(2); // Pasamos al estado final del Setup
              }, 1500);

           }, 800);
        }, 1200);

     }, 1500);
  }

  playPaso2() {
     this.isSending.set(true);
     this.packetDirection.set('forward vip');
     this.packetIcon.set('verified_user');
     
     this.addClientLog('GET /api/admin/planetas solicitado.', 'info');
     this.addClientLog('[AuthInterceptor] ¡Alto! Interceptando paquete...', 'sent');
     
     setTimeout(() => {
        this.addClientLog('Clonando y agregando Header "Authorization: Bearer eyJ..."', 'success');
        
        // Viaja Interceptado...
        setTimeout(() => {
           this.addServerLog('[JwtRequestFilter] Validando Bearer Auth...', 'info');
           
           setTimeout(() => {
              this.addServerLog('Firma legítima. Saltando consulta a MySQL por rapidez.', 'success');
              this.addServerLog('Delivering payload privado: [{name: "Marte"}, ...]', 'sent');
              
              // Frontend Recibe Respuesta privada
              this.packetDirection.set('backward');
              this.packetIcon.set('inventory_2'); // Paquete de items secretitos
              
              setTimeout(() => {
                 this.addClientLog('<- Recibidos 14 Planetas de zona VIP.', 'recv');
                 this.isSending.set(false);
                 this.step.set(3); 
              }, 1500);
              
           }, 800);
           
        }, 1500);
        
     }, 800);
  }
}

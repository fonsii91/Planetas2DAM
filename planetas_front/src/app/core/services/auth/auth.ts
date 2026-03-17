import { Injectable, signal, computed, inject } from '@angular/core';
import { WebsocketService } from '../websocket/websocket';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

export interface UserSession {
  id: number;
  nickname: string;
  monedas: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private wsService = inject(WebsocketService);

  // Signals (Almacén de estado reactivo)
  private sessionSignal = signal<UserSession | null>(null);
  
  public user = this.sessionSignal.asReadonly();
  public isLoggedIn = computed(() => this.sessionSignal() !== null);

  private authSubscription?: Subscription;

  constructor() {
    // Al intentar recuperar del LocalStorage (Estado Inseguro pero persistente frente a refresh)
    const stored = localStorage.getItem('usuario_sesion');
    if (stored) {
      try {
        this.sessionSignal.set(JSON.parse(stored));
      } catch (e) {
        localStorage.removeItem('usuario_sesion');
      }
    }

    // Suscribirnos al buzón de respuestas del WebSocket para Auth
    this.setupAuthListener();
  }

  private setupAuthListener(): void {
    // Escucha todo lo proveniente del servidor destinado exclusivamente a nuestro Client ID 
    // (/user lo maneja Spring STOMP dinámicamente)
    this.authSubscription = this.wsService.watch('/user/queue/auth-response')
      .pipe(
        map(message => JSON.parse(message.body))
      )
      .subscribe((response) => {
        if (response.error) {
          console.error('[AuthService] Error de autenticación:', response.error);
          alert('Error de autencicación: ' + response.error);
          // Opcionalmente exponer un signal para los errores y leerlos en el login
        } else {
          console.log('[AuthService] Sesión capturada!');
          const session: UserSession = {
            id: response.id,
            nickname: response.nickname,
            monedas: response.monedas
          };
          this.sessionSignal.set(session);
          localStorage.setItem('usuario_sesion', JSON.stringify(session));
        }
      });
  }

  public login(credentials: { nickname: string, password: string }): void {
    this.wsService.publish('/app/auth/login', credentials);
  }

  public register(credentials: { nickname: string, password: string }): void {
    this.wsService.publish('/app/auth/register', credentials);
  }

  public logout(): void {
    this.sessionSignal.set(null);
    localStorage.removeItem('usuario_sesion');
    // Se podría notificar al backend si fuera necesario gestionar cierre en tiempo real
  }
}

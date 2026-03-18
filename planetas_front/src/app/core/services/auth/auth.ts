import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebsocketService } from '../websocket/websocket';

export interface UserSession {
  id: number;
  nickname: string;
  monedas: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private wsService = inject(WebsocketService);

  // Signals (Almacén de estado reactivo)
  private sessionSignal = signal<UserSession | null>(null);
  
  public user = this.sessionSignal.asReadonly();
  public isLoggedIn = computed(() => this.sessionSignal() !== null);

  constructor() {
    // Recuperar del LocalStorage
    const stored = localStorage.getItem('usuario_sesion');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        this.sessionSignal.set(session);
        // Si hay un token también lo podríamos conectar aquí al websocket
        const token = localStorage.getItem('auth_token');
        if (token) {
            this.wsService.connect(token);
        }
      } catch (e) {
        localStorage.removeItem('usuario_sesion');
        localStorage.removeItem('auth_token');
      }
    }
  }

  public login(credentials: { name: string, password: string }): void {
    this.http.post<any>('http://localhost:3500/api/auth/login', credentials)
      .subscribe({
        next: (response) => {
          console.log('[AuthService] Login exitoso', response);
          if (response.token && response.user) {
            const session: UserSession = {
              id: response.user.id,
              nickname: response.user.nickname,
              monedas: response.user.monedas
            };
            this.sessionSignal.set(session);
            localStorage.setItem('usuario_sesion', JSON.stringify(session));
            localStorage.setItem('auth_token', response.token);
            
            // Conectar WebSockets con el token
            this.wsService.connect(response.token);
          }
        },
        error: (err) => {
          console.error('[AuthService] Error de autenticación:', err);
          alert('Error de autenticación: ' + (err.error?.msg || 'Revisa tus credenciales.'));
        }
      });
  }

  public register(user: { name: string, apellidos: string, nickname: string, password: string, email: string }): void {
    this.http.post<any>('http://localhost:3500/api/auth/register', user)
      .subscribe({
        next: (response) => {
          console.log('[AuthService] Registro exitoso', response);
          alert('Registro exitoso. Ahora puedes iniciar sesión.');
          // Idealmente, redirigir al login usando el Router desde el componente
        },
        error: (err) => {
          console.error('[AuthService] Error de registro:', err);
          alert('Error de registro: ' + (err.error?.msg || 'Revisa los datos.'));
        }
      });
  }

  public logout(): void {
    this.sessionSignal.set(null);
    localStorage.removeItem('usuario_sesion');
    localStorage.removeItem('auth_token');
    this.wsService.disconnect();
  }
}

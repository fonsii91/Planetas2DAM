import { Injectable, computed, signal } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket?: Socket;

  // Angular Core Signals holding the WebSocket status
  private connectionStateSignal = signal<boolean>(false);

  // Computadas para exponer a los componentes
  public isConnected = computed(() => this.connectionStateSignal());
  public connectionState = this.connectionStateSignal.asReadonly();

  constructor() {
  }

  /**
   * Conecta el socket al backend proporcionando el token JWT.
   */
  public connect(token: string): void {
    if (this.socket) {
      this.socket.disconnect();
    }
    
    this.socket = io('http://localhost:3500', {
      auth: { token },
      transports: ['websocket', 'polling']
    });

    this.socket.on('connect', () => {
      this.connectionStateSignal.set(true);
      console.log('[WebSocketService] Estado WebSocket: Conectado');
    });

    this.socket.on('disconnect', () => {
      this.connectionStateSignal.set(false);
      console.log('[WebSocketService] Estado WebSocket: Desconectado');
    });

    this.socket.on('connect_error', (err) => {
      console.error('[WebSocketService] Error de conexión:', err.message);
    });
  }

  /**
   * Suscribe al cliente a un evento específico de socket.io. Devuelve un observable.
   */
  public watch(eventName: string): Observable<any> {
    return new Observable((subscriber) => {
      if (!this.socket) {
        subscriber.error('Socket no está inicializado. Llama a connect() primero.');
        return;
      }
      
      const listener = (data: any) => {
        subscriber.next(data);
      };

      this.socket.on(eventName, listener);

      return () => {
        if (this.socket) {
          this.socket.off(eventName, listener);
        }
      };
    });
  }

  /**
   * Enviar un mensaje (evento) usando socket.io
   */
  public publish(eventName: string, payload: any): void {
    if (!this.isConnected()) {
      console.warn('[WebSocketService] Intentando emitir pero el socket no está conectado.');
    }
    if (this.socket) {
      this.socket.emit(eventName, payload);
    }
  }

  /**
   * Desconecta el socket
   */
  public disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = undefined;
    }
    this.connectionStateSignal.set(false);
  }
}

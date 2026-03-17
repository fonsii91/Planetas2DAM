import { Injectable, computed, signal } from '@angular/core';
import { RxStomp, RxStompState } from '@stomp/rx-stomp';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private rxStomp = new RxStomp();

  // Angular Core Signals holding the WebSocket status
  private connectionStateSignal = signal<RxStompState>(RxStompState.CLOSED);

  // Computadas para exponer a los componentes
  public isConnected = computed(() => this.connectionStateSignal() === RxStompState.OPEN);
  public connectionState = this.connectionStateSignal.asReadonly();

  constructor() {
    this.setupStompConfig();
    this.rxStomp.activate();

    // Reaccionar a cambios de estado del socket y actualizar señales
    this.rxStomp.connectionState$.subscribe((state: RxStompState) => {
      this.connectionStateSignal.set(state);
      console.log('[WebSocketService] Estado WebSocket:', RxStompState[state]);
    });
  }

  private setupStompConfig(): void {
    this.rxStomp.configure({
      brokerURL: 'ws://localhost:8091/ws',
      
      // Heartbeat configuration para mantener viva la conexión
      heartbeatIncoming: 0, 
      heartbeatOutgoing: 20000,

      // Intentar reconectar automáticamente pasados unos ms.
      reconnectDelay: 5000,
      
      // Opcionalmente definir configuración de debug en desarrollo:
      debug: (msg: string): void => {
        // Descomentar para debug agresivo 
        // console.log(new Date(), msg);
      },
    });
  }

  /**
   * Suscribe al cliente a una "Destination" STOMP. Devuelve un bucle observable.
   * Por ejemplo la cola del usuario para el auth response: '/user/queue/auth-response'
   */
  public watch(destination: string): Observable<any> {
    return this.rxStomp.watch(destination);
  }

  /**
   * Enviar un mensaje STOMP (Payload en JSON) a un endpoint
   */
  public publish(destination: string, targetBody: any): void {
    if(!this.isConnected()){
      console.warn('[WebSocketService] Intentando publicar pero el socket no está conectado.');
    }
    this.rxStomp.publish({ destination, body: JSON.stringify(targetBody) });
  }

  /**
   * Cierra ordenadamente la conexión
   */
  public deactivate(): void {
    this.rxStomp.deactivate();
  }
}

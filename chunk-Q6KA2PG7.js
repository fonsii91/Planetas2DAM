import{c as M,e as w}from"./chunk-RP4GWN2G.js";import{a as V,b as F}from"./chunk-MNST6SK6.js";import{T as N,U as A,c as I,d as O,e as T,f as R,h as D,i as j}from"./chunk-YGOEPVFP.js";import{g as P,k as L}from"./chunk-ZRJXPKKY.js";import{$b as c,Ab as t,Bb as e,Gb as _,Kb as p,Va as i,_b as o,ac as k,ea as d,fa as m,hc as h,ib as y,ic as g,jc as C,kc as E,qa as v,xb as S,yb as x,zb as l}from"./chunk-SER7VBRE.js";var b=(a,s)=>({locked:a,completed:s}),W=a=>({locked:a}),z=(a,s)=>s.id;function J(a,s){if(a&1&&(t(0,"div",24)(1,"span",33),o(2),C(3,"date"),e(),t(4,"span",34),o(5),e()()),a&2){let r=s.$implicit;l("ngClass",r.type),i(2),k("[",E(3,3,r.time,"HH:mm:ss.SSS"),"]"),i(3),c(r.message)}}function q(a,s){a&1&&(t(0,"div",25),o(1,"Consola vac\xEDa..."),e())}function H(a,s){if(a&1&&(t(0,"div",24)(1,"span",33),o(2),C(3,"date"),e(),t(4,"span",34),o(5),e()()),a&2){let r=s.$implicit;l("ngClass",r.type),i(2),k("[",E(3,3,r.time,"HH:mm:ss.SSS"),"]"),i(3),c(r.message)}}function U(a,s){a&1&&(t(0,"div",25),o(1,"Apagado. Esperando arranque..."),e())}var B=class a{step=v(0);isLasering=v(!1);clientLogs=v([]);serverLogs=v([]);logIdCounter=0;codePaso1Front="import { WebsocketService } from './core/services/websocket.service';";codePaso1Back="import { Server } from 'socket.io';";codePaso2=`import { Server } from 'socket.io';
import http from 'http';

const server = http.createServer(app); 

// Instanciar garantizando evitar problemas de CORS
const io = new Server(server, {
  cors: { origin: "http://localhost:4200", methods: ["GET", "POST"] }
});

// Iniciamos el puerto del servidor central
server.listen(3500, () => console.log('\u2705 Sockets on port 3500'));`;codePaso3=`import jwt from 'jsonwebtoken';

io.use((socket, next) => {
  // Extraemos el JWT inyectado por el Frontend
  const token = socket.handshake.auth.token;

  if (!token) return next(new Error("Acceso Denegado: No token"));

  // Verificamos la firma con nuestra Variable de Entorno Segura
  jwt.verify(token, process.env.JWT_SECRET, (err, userPayload) => {
    if (err) return next(new Error("Acceso Denegado: Token inv\xE1lido"));
    
    // Guardamos los datos decodificados en el socket del usuario
    socket.user = userPayload;
    next(); // Validado correctamente
  });
});`;codePaso4=`import { Injectable } from '@angular/core';
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

  // 2. Patr\xF3n Correcto: Envolver escucha en un Observable de RxJS
  public listen(event: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(event, (data) => subscriber.next(data));
      // Buenas pr\xE1cticas: Cleanup si el componente se destruye
      return () => this.socket.off(event);
    });
  }

  // 3. M\xE9todo centralizado para emitir
  public emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }
}`;codePaso5A=`// En tu componente (ej: juego.ts)
export class JuegoComponent {
  // Inyectamos el servicio (Nunca usamos la lib socket.io cruda aqu\xED)
  constructor(private wsService: WebsocketService) {}

  lanzarAtaque() {
    // Emitimos usando la estructura de datos que espera el servidor
    this.wsService.emit('disparo_laser', { da\xF1o: 100, arma: "RayoX" });
  }
}`;codePaso5B=`io.on('connection', (socket) => {
  console.log(\`\u2705 Usuario \${socket.user.name} conectado\`);

  // Escuchamos el evento custom del cliente
  socket.on('disparo_laser', (info) => {
    // Validamos l\xF3gica de juego y reenviamos el efecto AL RESTO
    // io.emit = Env\xEDa a todos. socket.broadcast.emit = a todos menos a ti
    io.emit('alerta_narrador', { mensajito: "\xA1Un jugador ha disparado!" });
  });
});`;codePaso5C=`import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

export class PanelJuegoComponent implements OnInit, OnDestroy {
  private eventSub!: Subscription;
  
  constructor(private wsService: WebsocketService) {}

  ngOnInit() {
    // Nos suscribimos al Observable (La forma "Correcta y Angular")
    this.eventSub = this.wsService.listen('alerta_narrador')
      .subscribe((data) => {
         alert("Notificaci\xF3n del Servidor: " + data.mensajito);
      });
  }

  ngOnDestroy() {
    // IMPRESCINDIBLE: Destruir la subscripci\xF3n para evitar Memory Leaks
    if (this.eventSub) this.eventSub.unsubscribe();
  }
}`;addClientLog(s,r="info"){this.clientLogs.update(n=>[...n,{id:this.logIdCounter++,time:new Date,message:s,type:r}])}addServerLog(s,r="info"){this.serverLogs.update(n=>[...n,{id:this.logIdCounter++,time:new Date,message:s,type:r}])}playPaso1(){this.addClientLog("Instalado socket.io-client@latest","success"),this.addServerLog("Instalado socket.io@latest","success"),this.step.set(1)}playPaso2(){this.addServerLog("Iniciando constructor Server de Socket.io...","info"),setTimeout(()=>{this.addServerLog("Escuchando en ws://0.0.0.0:3000","success"),this.addServerLog("M\xF3dulo de seguridad io.use() montado y listo.","info"),this.step.set(2)},800)}playPaso4(){this.step.set(3),this.addClientLog("Recuperando JWT leg\xEDtimo almacenado desde el Login REST...","info"),setTimeout(()=>{this.addClientLog("JWT Listo. Iniciando io() transport: websocket","info"),this.addClientLog("[Request] -> Intentando Handshake...","sent"),setTimeout(()=>{this.addServerLog("[Incoming] Petici\xF3n de conexi\xF3n detectada.","recv"),this.addServerLog("Validando JWT recibido en auth.token...","info"),setTimeout(()=>{this.addServerLog("Token V\xE1lido. Usuario Autorizado.","success"),this.addServerLog("Asignando canal de Socket ID particular...","info"),this.addClientLog("[Response] <- Conexi\xF3n Aceptada por Servidor.","recv"),this.addClientLog('Evento on("connect") disparado.',"success"),this.step.set(4)},1e3)},500)},700)}playPaso5(){this.step()<4||(this.isLasering.set(!0),this.addClientLog('emit("disparo_laser", { da\xF1o: 100 }) -->',"sent"),setTimeout(()=>{this.addServerLog('<- on("disparo_laser") Recibido packet de da\xF1o 100',"recv"),this.addServerLog("Procesando mec\xE1nicas de juego en Backend...","info"),setTimeout(()=>{this.addServerLog('Redirigiendo a todos... io.emit("alerta_narrador")',"sent"),setTimeout(()=>{this.addClientLog('<- on("alerta_narrador") Nuevo mensaje Global!',"recv"),this.addClientLog("UI: Mostrando popup rojo de impacto.","success"),this.isLasering.set(!1)},400)},600)},400))}static \u0275fac=function(r){return new(r||a)};static \u0275cmp=y({type:a,selectors:[["app-explicacion-sockets"]],decls:104,vars:41,consts:[["clientScroll",""],["serverScroll",""],[1,"main-wrapper"],[1,"header-nav"],["mat-button","","routerLink","/login",1,"btn-cyan"],[1,"cyan-text","tech-title",2,"margin","0","padding-right","1rem"],[1,"split-layout"],[1,"column","client-col","cyan-glow"],[2,"border-bottom","1px solid rgba(0, 242, 255, 0.3)","margin-bottom","1rem","padding-bottom","0.5rem"],[2,"color","#00f2ff","margin-right","10px"],[1,"cyan-text"],[1,"tech-subtitle"],[1,"column-content"],[1,"step-card",3,"ngClass"],["mat-flat-button","",1,"btn-cyan",2,"margin-bottom","10px",3,"click","disabled"],[1,"code-block"],[2,"font-size","0.85rem","color","#aaa"],[1,"code-block",2,"margin-bottom","10px"],["mat-flat-button","","color","warn",3,"click","disabled"],[2,"font-size","0.85rem","color","#aaa","margin-top","15px"],[1,"console-window"],[1,"console-header"],[2,"font-size","14px","height","14px","width","14px"],[1,"console-body"],[1,"log-line",3,"ngClass"],[1,"log-line","info"],[1,"column","server-col","orange-glow"],[2,"border-bottom","1px solid rgba(255, 107, 0, 0.3)","margin-bottom","1rem","padding-bottom","0.5rem"],[2,"color","#ff6b00","margin-right","10px"],[1,"orange-text"],["mat-flat-button","",1,"btn-orange",2,"margin-bottom","10px",3,"click","disabled"],[1,"code-block","orange"],[1,"console-header",2,"background","#221200","border-bottom","1px solid #552700"],[1,"timestamp"],[1,"message"]],template:function(r,n){if(r&1){let u=_();t(0,"div",2)(1,"div",3)(2,"button",4),o(3," < Volver al Login "),e(),t(4,"h2",5),o(5,"Laboratorio Interactivo de WebSockets"),e()(),t(6,"div",6)(7,"mat-card",7)(8,"mat-card-header",8)(9,"mat-icon",9),o(10,"laptop_mac"),e(),t(11,"mat-card-title",10),o(12,"Frontend (Angular)"),e(),t(13,"mat-card-subtitle",11),o(14,"El cliente de los jugadores"),e()(),t(15,"mat-card-content",12)(16,"div",13)(17,"h4"),o(18,"Paso 1A: Instalar Librer\xEDa"),e(),t(19,"button",14),p("click",function(){return d(u),m(n.playPaso1())}),o(20," npm install socket.io-client "),e(),t(21,"pre",15),o(22),e()(),t(23,"div",13)(24,"h4"),o(25,"Paso 3 y 4: Handshake y Conexi\xF3n"),e(),t(26,"p",16),o(27,"Recuperas el JWT que obtuviste en el Login REST y se lo inyectas al Socket."),e(),t(28,"button",14),p("click",function(){return d(u),m(n.playPaso4())}),o(29," CONECTAR A WS://LOCALHOST:3500 "),e(),t(30,"pre",15),o(31),e()(),t(32,"div",13)(33,"h4"),o(34,"Paso 5: Interactuar (emitir / on)"),e(),t(35,"p",16),o(36,"Empuja datos hacia el backend mediante eventos."),e(),t(37,"pre",17),o(38),e(),t(39,"button",18),p("click",function(){return d(u),m(n.playPaso5())}),t(40,"mat-icon"),o(41,"track_changes"),e(),o(42," DISPARAR L\xC1SER (emit) "),e(),t(43,"p",19),o(44,"Recibir\xE1s las respuestas globales desde el servidor:"),e(),t(45,"pre",15),o(46),e()(),t(47,"div",20)(48,"div",21)(49,"mat-icon",22),o(50,"terminal"),e(),o(51," Navegador Web Console"),e(),t(52,"div",23,0),S(54,J,6,6,"div",24,z,!1,q,2,0,"div",25),e()()()(),t(57,"mat-card",26)(58,"mat-card-header",27)(59,"mat-icon",28),o(60,"dns"),e(),t(61,"mat-card-title",29),o(62,"Backend (Node.js)"),e(),t(63,"mat-card-subtitle",11),o(64,"El Orquestador Centralizado"),e()(),t(65,"mat-card-content",12)(66,"div",13)(67,"h4"),o(68,"Paso 1B: Instalar Librer\xEDa"),e(),t(69,"button",30),p("click",function(){return d(u),m(n.playPaso1())}),o(70," npm install socket.io "),e(),t(71,"pre",31),o(72),e()(),t(73,"div",13)(74,"h4"),o(75,"Paso 2: Iniciar Motor WebSockets"),e(),t(76,"button",30),p("click",function(){return d(u),m(n.playPaso2())}),o(77," INICIAR SERVIDOR EN PUERTO 3000 "),e(),t(78,"pre",31),o(79),e()(),t(80,"div",13)(81,"h4"),o(82,"Paso 3: M\xF3dulo de Seguridad (io.use)"),e(),t(83,"p",16),o(84,"El servidor est\xE1 a la escucha interceptando peticiones y validando con JWT."),e(),t(85,"pre",31),o(86),e()(),t(87,"div",13)(88,"h4"),o(89,"Paso 5: Orquestador Global (on / emit)"),e(),t(90,"p",16),o(91,"Recibe el disparo del cliente y lo re-emite globalmente:"),e(),t(92,"pre",31),o(93),e()(),t(94,"div",20)(95,"div",32)(96,"mat-icon",22),o(97,"terminal"),e(),o(98," Node.JS Terminal "),e(),t(99,"div",23,1),S(101,H,6,6,"div",24,z,!1,U,2,0,"div",25),e()()()()()()}r&2&&(i(16),l("ngClass",g(22,b,n.step()>0,n.step()>=1)),i(3),l("disabled",n.step()>0),i(3),c(n.codePaso1Front),i(),l("ngClass",g(25,b,n.step()<2,n.step()>=4)),i(5),l("disabled",n.step()!==2),i(3),c(n.codePaso4),i(),l("ngClass",h(28,W,n.step()<4)),i(6),c(n.codePaso5A),i(),l("disabled",n.step()<4||n.isLasering()),i(7),c(n.codePaso5C),i(8),x(n.clientLogs()),i(12),l("ngClass",g(30,b,n.step()>0,n.step()>=1)),i(3),l("disabled",n.step()>0),i(3),c(n.codePaso1Back),i(),l("ngClass",g(33,b,n.step()<1,n.step()>=2)),i(3),l("disabled",n.step()!==1),i(3),c(n.codePaso2),i(),l("ngClass",g(36,b,n.step()<2,n.step()>=4)),i(6),c(n.codePaso3),i(),l("ngClass",h(39,W,n.step()<4)),i(6),c(n.codePaso5B),i(8),x(n.serverLogs()))},dependencies:[j,I,T,D,R,O,w,M,A,N,F,V,P,L],styles:["[_nghost-%COMP%]{display:block;height:100vh;overflow:hidden}.main-wrapper[_ngcontent-%COMP%]{padding:1rem 2rem;color:#fff;height:100%;box-sizing:border-box;display:flex;flex-direction:column}.header-nav[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;background:#0006;padding:10px;border-radius:8px}.split-layout[_ngcontent-%COMP%]{flex:1;display:flex;gap:2rem;min-height:0}.column[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;background-color:#0d141cd9!important;overflow:hidden;border-radius:12px}.column-content[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;overflow-y:auto;padding-right:15px}.step-card[_ngcontent-%COMP%]{background:#0006;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:1rem;margin-bottom:1rem;transition:all .3s ease}.step-card[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0 0 10px;font-size:1.1rem}.step-card.locked[_ngcontent-%COMP%]{opacity:.4;pointer-events:none;filter:grayscale(100%)}.step-card.completed[_ngcontent-%COMP%]{border-color:#69f0ae66}.code-block[_ngcontent-%COMP%]{background:#020406;border-left:3px solid #00e5ff;padding:.8rem;border-radius:4px;font-family:Consolas,Monaco,monospace;color:#a5d6ff;font-size:.85rem;white-space:pre-wrap;margin-top:10px;margin-bottom:0}.code-block.orange[_ngcontent-%COMP%]{border-left:3px solid #ff6b00;color:#ffd8a5}.console-window[_ngcontent-%COMP%]{background:#000;border:1px solid #333;border-radius:4px;font-family:Courier New,monospace;font-size:.8rem;flex:1;display:flex;flex-direction:column;min-height:250px;margin-top:10px;margin-bottom:2rem}.console-header[_ngcontent-%COMP%]{background:#111;color:#777;padding:5px 10px;border-bottom:1px solid #333;font-size:.8rem;display:flex;align-items:center;gap:8px}.console-body[_ngcontent-%COMP%]{padding:10px;flex:1;overflow-y:auto}.log-line[_ngcontent-%COMP%]{margin-bottom:4px;word-break:break-all}.timestamp[_ngcontent-%COMP%]{color:#555;margin-right:8px}.log-line.info[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{color:#ccc}.log-line.sent[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{color:#00e5ff}.log-line.recv[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{color:#69f0ae}.log-line.error[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{color:#ff5252}.log-line.success[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{color:#ffd740;font-weight:700}"]})};export{B as ExplicacionSocketsComponent};

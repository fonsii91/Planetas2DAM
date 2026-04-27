import{a as $,b as G,c as Z}from"./chunk-OCYRZHVV.js";import"./chunk-K5AN2DAO.js";import{c as A,e as D}from"./chunk-RP4GWN2G.js";import{a as q}from"./chunk-KQZ37NSQ.js";import{a as W,b as H}from"./chunk-6B4SRW25.js";import{S as z,U as B,V as U,c as F,d as N,e as R,f as j,h as J,i as V}from"./chunk-FROH2AJ4.js";import{g as L,k as M}from"./chunk-ZRJXPKKY.js";import{$ as I,$b as S,Ab as n,Bb as t,Gb as T,Kb as p,Va as o,Wb as f,_b as e,ac as h,ea as d,fa as m,hc as C,ib as P,ic as v,jc as y,kc as O,lc as E,nb as w,qa as x,xb as k,yb as _,zb as s}from"./chunk-SER7VBRE.js";var b=(a,r)=>({locked:a,completed:r}),Q=a=>({locked:a}),X=(a,r)=>r.id;function Y(a,r){if(a&1&&(n(0,"div",34)(1,"span",46),e(2),y(3,"date"),t(),n(4,"span",47),e(5),t()()),a&2){let l=r.$implicit;s("ngClass",l.type),o(2),h("[",O(3,3,l.time,"HH:mm:ss.SSS"),"]"),o(3),S(l.message)}}function ee(a,r){a&1&&(n(0,"div",35),e(1,"Consola vac\xEDa..."),t())}function te(a,r){if(a&1&&(n(0,"div",34)(1,"span",46),e(2),y(3,"date"),t(),n(4,"span",47),e(5),t()()),a&2){let l=r.$implicit;s("ngClass",l.type),o(2),h("[",O(3,3,l.time,"HH:mm:ss.SSS"),"]"),o(3),S(l.message)}}function ne(a,r){a&1&&(n(0,"div",35),e(1,"Apagado. Esperando arranque..."),t())}function ie(a,r){a&1&&(n(0,"div",48)(1,"h2",49),e(2,"Socket.IO en Java \u{1F4E6}"),t(),n(3,"p",50)(4,"b"),e(5,"Socket.IO"),t(),e(6," no es nativo de Java (su origen es Node.js). Sin embargo, la comunidad cre\xF3 ports fant\xE1sticos como "),n(7,"b"),e(8,"Netty-SocketIO"),t(),e(9,' que permiten que un servidor Spring Boot "hable" el dialecto de Socket.IO. '),t(),n(10,"p",50),e(11," Esto nos permite usar el cliente oficial "),n(12,"code"),e(13,"socket.io-client"),t(),e(14," en Angular, manteniendo la familiaridad de los verbos "),n(15,"i"),e(16,"emit"),t(),e(17," y "),n(18,"i"),e(19,"on"),t(),e(20,", pero proces\xE1ndolos con la robustez y concurrencia de Java. "),t(),n(21,"button",51),e(22,"\xA1Entendido!"),t()())}function oe(a,r){a&1&&(n(0,"div",52)(1,"h2",53),e(2,"El paradigma de los 2 Puertos \u2699\uFE0F"),t(),n(3,"p",50),e(4," Al usar Netty-SocketIO, tu aplicaci\xF3n Spring Boot tendr\xE1 "),n(5,"b"),e(6,"dos servidores corriendo simult\xE1neamente"),t(),e(7,": "),t(),n(8,"ul",54)(9,"li")(10,"b"),e(11,"Tomcat (Puerto 8080):"),t(),e(12," Atiende las peticiones cl\xE1sicas HTTP REST."),t(),n(13,"li")(14,"b"),e(15,"Netty (Puerto 8085):"),t(),e(16," Atiende exclusivamente el tr\xE1fico bidireccional de WebSockets."),t()(),n(17,"p",50),e(18," A diferencia de Tomcat, Netty no arranca autom\xE1ticamente. Por eso usamos un "),n(19,"code"),e(20,"CommandLineRunner"),t(),e(21," para invocar "),n(22,"code"),e(23,"server.start()"),t(),e(24," al iniciar la app, y "),n(25,"code"),e(26,"@PreDestroy"),t(),e(27,' para apagarlo y evitar dejar puertos "zombies". '),t(),n(28,"button",55),e(29,"\xA1Entendido!"),t()())}function ae(a,r){a&1&&(n(0,"div",48)(1,"h2",49),e(2,"Seguridad y JWT en Netty-SocketIO \u{1F6E1}\uFE0F"),t(),n(3,"p",50),e(4," En una API REST normal, env\xEDas el token en cada petici\xF3n. En WebSockets, la conexi\xF3n es constante, por lo que "),n(5,"b"),e(6,"solo validamos el token una vez"),t(),e(7,' durante el "Apret\xF3n de Manos" (Handshake) inicial. '),t(),n(8,"p",50),e(9," Para que Netty-SocketIO (Java) lea bien el token del cliente, a menudo se usa la URL "),n(10,"code"),e(11,"query: { token }"),t(),e(12,", aunque en Socket.IO moderno se prefiere el payload "),n(13,"code"),e(14,"auth: { token }"),t(),e(15," para evitar logs en red. "),t(),n(16,"p",50),e(17," El "),n(18,"b"),e(19,"AuthorizationListener"),t(),e(20,' act\xFAa como el "Portero de la Discoteca": si el JWT es v\xE1lido, la conexi\xF3n se queda abierta permanentemente. Si no, se rechaza y el cliente ni siquiera llega a conectarse. '),t(),n(21,"button",51),e(22,"\xA1Brillante!"),t()())}function re(a,r){a&1&&(n(0,"div",56)(1,"h2",57),e(2,"Magia con Jackson: Object Mapping \u{1F4E1}"),t(),n(3,"p",50),e(4," En Node.js recibes un objeto JSON pelado. \xA1En Java usamos tipado fuerte! "),t(),n(5,"ul")(6,"li",58)(7,"b")(8,"code"),e(9,"addEventListener()"),t(),e(10,":"),t(),e(11," Cuando Angular hace "),n(12,"code"),e(13,"emit('disparo', {da\xF1o:100})"),t(),e(14,", Netty usa Jackson para instanciar autom\xE1ticamente la clase Java "),n(15,"code"),e(16,"DisparoData.class"),t(),e(17," y rellenar sus campos. Cero transformaciones manuales."),t(),n(18,"li",59)(19,"b")(20,"code"),e(21,"getBroadcastOperations().sendEvent()"),t(),e(22,":"),t(),e(23," De la misma manera, t\xFA le entregas a Spring un objeto Java puro ("),n(24,"code"),e(25,"AlertaResponse"),t(),e(26,") y \xE9l se encarga de convertirlo a JSON y enviarlo a todos los clientes Angular."),t()(),n(27,"button",60),e(28,"Fin de la Lecci\xF3n"),t()())}var K=class a{dialog=I($);step=x(0);isLasering=x(!1);clientLogs=x([]);serverLogs=x([]);logIdCounter=0;codePaso1Front="import { WebsocketService } from './core/services/websocket.service';";codePaso1Back=`<dependency>
    <groupId>com.corundumstudio.socketio</groupId>
    <artifactId>netty-socketio</artifactId>
    <version>2.0.6</version>
</dependency>`;codePaso2=`@Configuration
public class SocketIOConfig {

    // 0.0.0.0 para que funcione en contenedores y producci\xF3n
    @Value("\${socketio.host:0.0.0.0}")
    private String host;

    @Value("\${socketio.port:8085}")
    private Integer port;

    @Bean
    public SocketIOServer socketIOServer() {
        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        config.setHostname(host);
        config.setPort(port);
        // \u26A0\uFE0F CORS abierto (*): Solo para desarrollo. En PROD usa "https://tudominio.com"
        config.setOrigin("*");
        return new SocketIOServer(config);
    }
}

// \u26A0\uFE0F \xA1IMPORTANTE! Netty no arranca solo. Necesitamos iniciarlo:
@Component
public class SocketServerRunner implements CommandLineRunner {
    private final SocketIOServer server;

    public SocketServerRunner(SocketIOServer server) { this.server = server; }

    @Override
    public void run(String... args) { server.start(); }

    @PreDestroy
    public void stop() { server.stop(); }
}`;codePaso3=`@Configuration
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
                // Usuario validado con \xE9xito
                return AuthorizationResult.SUCCESSFUL_AUTHORIZATION;
            }
            
            // Conexi\xF3n rechazada
            return AuthorizationResult.FAILED_AUTHORIZATION;
        });
        
        return new SocketIOServer(config);
    }
}`;codePaso4=`import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class WebsocketService {
  private socket!: Socket;

  // 1. Conexi\xF3n segura (Usa WSS en producci\xF3n)
  public conectar(token: string): void {
    this.socket = io('http://localhost:8085', {
      // \u26A0\uFE0F Query params en URL se loguean. En Socket.IO v3+ prefiere usar:
      // auth: { token } (si netty-socketio/backend lo soporta)
      query: { token },
      transports: ['websocket']
    });
  }

  // 2. Patr\xF3n Correcto: Envolver escucha con Gen\xE9ricos y Desuscripci\xF3n segura
  public listen<T>(event: string): Observable<T> {
    return new Observable((subscriber) => {
      const handler = (data: T) => subscriber.next(data);
      this.socket.on(event, handler);
      
      // \u2705 IMPORTANTE: Pasamos el handler para no borrar otros listeners del mismo evento
      return () => this.socket.off(event, handler);
    });
  }

  // 3. M\xE9todo centralizado para emitir
  public emit(event: string, data: any): void {
    this.socket.emit(event, data);
  }
}`;codePaso5A=`import { inject } from '@angular/core';

export class JuegoComponent {
  private wsService = inject(WebsocketService); // Estilo moderno Angular

  lanzarAtaque() {
    // Emitimos el evento hacia el servidor Java
    this.wsService.emit('disparo_laser', { da\xF1o: 100, arma: "RayoX" });
  }
}`;codePaso5B=`@Component
public class JuegoSocketController {

    private final SocketIOServer server;

    @Autowired
    public JuegoSocketController(SocketIOServer server) {
        this.server = server;

        // Escuchamos el evento custom del cliente 'disparo_laser'
        this.server.addEventListener("disparo_laser", DisparoData.class, (client, data, ackSender) -> {
            
            // Validamos l\xF3gica de juego y reenviamos el efecto AL RESTO
            AlertaResponse alerta = new AlertaResponse("\xA1Un jugador ha disparado!");
            
            // server.getBroadcastOperations().sendEvent() emite a todos
            server.getBroadcastOperations().sendEvent("alerta_narrador", alerta);
        });
    }
}`;codePaso5C=`import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { Subscription } from 'rxjs';

export class PanelJuegoComponent implements OnInit, OnDestroy {
  private eventSub!: Subscription;
  private wsService = inject(WebsocketService); // Estilo moderno Angular
  
  ngOnInit() {
    // Escuchamos tipando la respuesta
    this.eventSub = this.wsService.listen<{ mensaje: string }>('alerta_narrador')
      .subscribe((data) => {
         // En app real usar Toast/Snackbar, no alert
         console.log("Notificaci\xF3n del Servidor: " + data.mensaje);
      });
  }

  ngOnDestroy() {
    // Esto dispara la funci\xF3n de limpieza (off) en el Observable
    if (this.eventSub) this.eventSub.unsubscribe();
  }
}`;openInfo(r){this.dialog.open(r,{panelClass:"borderless-dialog",maxWidth:"500px"})}addClientLog(r,l="info"){this.clientLogs.update(i=>[...i,{id:this.logIdCounter++,time:new Date,message:r,type:l}])}addServerLog(r,l="info"){this.serverLogs.update(i=>[...i,{id:this.logIdCounter++,time:new Date,message:r,type:l}])}playPaso1(){this.addClientLog("Instalado socket.io-client","success"),this.addServerLog("Dependencia netty-socketio a\xF1adida al pom.xml","success"),this.step.set(1)}playPaso2(){this.addServerLog("Iniciando Configuraci\xF3n SocketIOServer...","info"),setTimeout(()=>{this.addServerLog("Netty Server Started on port(s): 8085","info"),this.addServerLog("Socket.IO namespaces listos","success"),this.step.set(2)},800)}playPaso4(){this.step.set(3),this.addClientLog("Recuperando JWT leg\xEDtimo almacenado...","info"),setTimeout(()=>{this.addClientLog("Iniciando io() client hacia ws://localhost:8085","info"),this.addClientLog("[Request] -> Handshake frame con {token: Bearer...}","sent"),setTimeout(()=>{this.addServerLog("[Incoming] Nuevo Handshake detectado en /socket.io","recv"),this.addServerLog("AuthorizationListener verificando JWT token...","info"),setTimeout(()=>{this.addServerLog("Token V\xE1lido. SUCCESSFUL_AUTHORIZATION.","success"),this.addClientLog("[Response] <- CONNECTED / Session ID emitido.","recv"),this.addClientLog('Evento on("connect") disparado en Angular.',"success"),this.step.set(4)},1e3)},500)},700)}playPaso5(){this.step()<4||(this.isLasering.set(!0),this.addClientLog('emit("disparo_laser", {da\xF1o: 100}) -->',"sent"),setTimeout(()=>{this.addServerLog('<- EVENT recibido: "disparo_laser"',"recv"),this.addServerLog("Invocando addEventListener(DisparoData.class)","info"),setTimeout(()=>{this.addServerLog('getBroadcastOperations().sendEvent("alerta_narrador")',"sent"),setTimeout(()=>{this.addClientLog('<- on("alerta_narrador") Nuevo mensaje Global!',"recv"),this.addClientLog("UI: Mostrando popup de alerta.","success"),this.isLasering.set(!1)},400)},600)},400))}static \u0275fac=function(l){return new(l||a)};static \u0275cmp=P({type:a,selectors:[["app-explicacion-sockets-spring"]],decls:196,vars:41,consts:[["clientScroll",""],["serverScroll",""],["infoPaso1",""],["infoPaso2",""],["infoPaso3_4",""],["infoPaso5",""],[1,"main-wrapper"],[1,"header-nav"],["mat-button","","routerLink","/login",1,"btn-cyan"],[1,"cyan-text","tech-title",2,"margin","0","padding-right","1rem"],[1,"split-layout"],[1,"column","client-col","cyan-glow"],[2,"border-bottom","1px solid rgba(0, 242, 255, 0.3)","margin-bottom","1rem","padding-bottom","0.5rem"],[2,"color","#00f2ff","margin-right","10px"],[1,"cyan-text"],[1,"tech-subtitle"],[1,"column-content"],[1,"step-card",3,"ngClass"],[1,"step-header"],["mat-icon-button","","matTooltip","Saber m\xE1s sobre el Paso 1",1,"cyan-text",3,"click"],[2,"font-size","0.85rem","color","#aaa","margin-bottom","10px"],["mat-flat-button","",1,"btn-cyan",2,"margin-bottom","10px",3,"click","disabled"],[1,"code-header"],[2,"font-size","14px","width","14px","height","14px","margin-right","5px"],[1,"code-block"],["mat-icon-button","",1,"cyan-text",3,"click"],["mat-icon-button","","color","warn",3,"click"],[1,"code-block",2,"margin-bottom","10px"],["mat-flat-button","","color","warn",3,"click","disabled"],[2,"font-size","0.85rem","color","#aaa","margin-top","15px"],[1,"console-window",2,"border-top","2px solid rgba(0, 242, 255, 0.5)"],[1,"console-header"],[2,"font-size","14px","height","14px","width","14px"],[1,"console-body"],[1,"log-line",3,"ngClass"],[1,"log-line","info"],[1,"column","server-col","green-glow"],[2,"border-bottom","1px solid rgba(105, 240, 174, 0.3)","margin-bottom","1rem","padding-bottom","0.5rem"],[2,"color","#69f0ae","margin-right","10px"],[1,"green-text",2,"color","#69f0ae"],["mat-icon-button","",1,"green-text",2,"color","#69f0ae",3,"click"],["mat-flat-button","",1,"btn-green",2,"background-color","#69f0ae","color","#000","margin-bottom","10px",3,"click","disabled"],[1,"code-header","green",2,"border-left","3px solid #69f0ae","color","#69f0ae"],[1,"code-block","green",2,"border-left","3px solid #69f0ae","color","#e8f5e9"],[1,"console-window",2,"border-top","2px solid rgba(105, 240, 174, 0.5)"],[1,"console-header",2,"background","#001208","border-bottom","1px solid #005527"],[1,"timestamp"],[1,"message"],[1,"dark-modal","cyan-glow"],[1,"cyan-text",2,"font-size","1.5rem","margin-top","0"],[2,"line-height","1.6","color","#e0e0e0"],["mat-flat-button","","mat-dialog-close","",1,"btn-cyan",2,"width","100%","margin-top","15px"],[1,"dark-modal","green-glow",2,"border-color","#69f0ae"],[2,"color","#69f0ae","font-size","1.5rem","margin-top","0"],[2,"color","#e0e0e0","margin-bottom","15px"],["mat-flat-button","","mat-dialog-close","",2,"background-color","#69f0ae","color","#000","width","100%","margin-top","15px"],[1,"dark-modal","cyan-glow",2,"border-color","#ff5252"],[2,"color","#ff5252","font-size","1.5rem","margin-top","0"],[2,"margin-bottom","10px","color","#e0e0e0"],[2,"color","#e0e0e0"],["mat-flat-button","","color","warn","mat-dialog-close","",2,"width","100%","margin-top","15px"]],template:function(l,i){if(l&1){let u=T();n(0,"div",6)(1,"div",7)(2,"button",8),e(3," < Volver al Login "),t(),n(4,"h2",9),e(5,"Laboratorio Interactivo de Socket.IO con Spring Boot"),t()(),n(6,"div",10)(7,"mat-card",11)(8,"mat-card-header",12)(9,"mat-icon",13),e(10,"laptop_mac"),t(),n(11,"mat-card-title",14),e(12,"Frontend (Angular)"),t(),n(13,"mat-card-subtitle",15),e(14,"El cliente Socket.IO"),t()(),n(15,"mat-card-content",16)(16,"div",17)(17,"div",18)(18,"h4"),e(19,"Paso 1A: Instalar Librer\xEDa Socket.IO"),t(),n(20,"button",19),p("click",function(){d(u);let c=f(189);return m(i.openInfo(c))}),n(21,"mat-icon"),e(22,"help_outline"),t()()(),n(23,"p",20),e(24,"Instalamos el cliente oficial en Angular. Esto nos permite usar una API muy sencilla y familiar para conectarnos al servidor bidireccional."),t(),n(25,"button",21),p("click",function(){return d(u),m(i.playPaso1())}),e(26," npm install socket.io-client "),t(),n(27,"div",22)(28,"mat-icon",23),e(29,"description"),t(),e(30," planetas_front/src/app/core/services/websocket.service.ts"),t(),n(31,"pre",24),e(32),t()(),n(33,"div",17)(34,"div",18)(35,"h4"),e(36,"Paso 3 y 4: Conexi\xF3n Socket.IO con JWT"),t(),n(37,"button",25),p("click",function(){d(u);let c=f(193);return m(i.openInfo(c))}),n(38,"mat-icon"),e(39,"help_outline"),t()()(),n(40,"p",20),e(41,"Iniciamos la conexi\xF3n pas\xE1ndole el token JWT por la query string. Esta es la forma m\xE1s compatible de autenticarse en el Handshake inicial de Socket.IO con Netty."),t(),n(42,"button",21),p("click",function(){return d(u),m(i.playPaso4())}),e(43," CONECTAR A WS://LOCALHOST:8085 "),t(),n(44,"div",22)(45,"mat-icon",23),e(46,"description"),t(),e(47," planetas_front/src/app/core/services/websocket.service.ts"),t(),n(48,"pre",24),e(49),t()(),n(50,"div",17)(51,"div",18)(52,"h4"),e(53,"Paso 5: Suscribirse (on) y Enviar (emit)"),t(),n(54,"button",26),p("click",function(){d(u);let c=f(195);return m(i.openInfo(c))}),n(55,"mat-icon"),e(56,"help_outline"),t()()(),n(57,"p",20),e(58,"Usamos "),n(59,"code"),e(60,"emit"),t(),e(61," para enviar objetos de datos y "),n(62,"code"),e(63,"on"),t(),e(64," (envuelto en un Observable) para reaccionar as\xEDncronamente a los mensajes que vengan del servidor."),t(),n(65,"div",22)(66,"mat-icon",23),e(67,"description"),t(),e(68," planetas_front/src/app/components/panel-de-juego/panel-de-juego.ts"),t(),n(69,"pre",27),e(70),t(),n(71,"button",28),p("click",function(){return d(u),m(i.playPaso5())}),n(72,"mat-icon"),e(73,"track_changes"),t(),e(74," DISPARAR L\xC1SER (emit) "),t(),n(75,"p",29),e(76,"Recibir\xE1s las respuestas del t\xF3pico (topic):"),t(),n(77,"div",22)(78,"mat-icon",23),e(79,"description"),t(),e(80," planetas_front/src/app/components/panel-de-juego/panel-de-juego.ts (Suscripci\xF3n)"),t(),n(81,"pre",24),e(82),t()()(),n(83,"div",30)(84,"div",31)(85,"mat-icon",32),e(86,"terminal"),t(),e(87," Navegador Web Console"),t(),n(88,"div",33,0),k(90,Y,6,6,"div",34,X,!1,ee,2,0,"div",35),t()()(),n(93,"mat-card",36)(94,"mat-card-header",37)(95,"mat-icon",38),e(96,"dns"),t(),n(97,"mat-card-title",39),e(98,"Backend (Spring Boot)"),t(),n(99,"mat-card-subtitle",15),e(100,"Netty-SocketIO (Java)"),t()(),n(101,"mat-card-content",16)(102,"div",17)(103,"div",18)(104,"h4"),e(105,"Paso 1B: A\xF1adir Dependencia Netty-SocketIO"),t(),n(106,"button",40),p("click",function(){d(u);let c=f(189);return m(i.openInfo(c))}),n(107,"mat-icon"),e(108,"help_outline"),t()()(),n(109,"p",20),e(110,"A\xF1adimos la librer\xEDa Netty-SocketIO al "),n(111,"code"),e(112,"pom.xml"),t(),e(113,". Esta librer\xEDa levanta un servidor paralelo capaz de entender el protocolo de Socket.IO de forma nativa en Java."),t(),n(114,"button",41),p("click",function(){return d(u),m(i.playPaso1())}),e(115," A\xF1adir netty-socketio "),t(),n(116,"div",42)(117,"mat-icon",23),e(118,"description"),t(),e(119," pom.xml"),t(),n(120,"pre",43),e(121),t()(),n(122,"div",17)(123,"div",18)(124,"h4"),e(125,"Paso 2: Configurar SocketIOServer"),t(),n(126,"button",40),p("click",function(){d(u);let c=f(191);return m(i.openInfo(c))}),n(127,"mat-icon"),e(128,"help_outline"),t()()(),n(129,"p",20),e(130,"Creamos el Bean de configuraci\xF3n asign\xE1ndole un puerto propio (ej. 8085) y usamos un "),n(131,"code"),e(132,"CommandLineRunner"),t(),e(133," para arrancar el servidor as\xEDncrono expl\xEDcitamente."),t(),n(134,"button",41),p("click",function(){return d(u),m(i.playPaso2())}),e(135," INICIAR SPRING BOOT "),t(),n(136,"div",42)(137,"mat-icon",23),e(138,"description"),t(),e(139," SocketIOConfig.java"),t(),n(140,"pre",43),e(141),t()(),n(142,"div",17)(143,"div",18)(144,"h4"),e(145,"Paso 3: Autorizaci\xF3n para JWT"),t(),n(146,"button",40),p("click",function(){d(u);let c=f(193);return m(i.openInfo(c))}),n(147,"mat-icon"),e(148,"help_outline"),t()()(),n(149,"p",20),e(150,"A\xF1adimos un "),n(151,"code"),e(152,"AuthorizationListener"),t(),e(153," a la configuraci\xF3n. Este interceptar\xE1 la petici\xF3n de Handshake, extraer\xE1 el token de la URL y validar\xE1 la sesi\xF3n antes de conectar."),t(),n(154,"div",42)(155,"mat-icon",23),e(156,"description"),t(),e(157," SocketIOConfig.java (AuthorizationListener)"),t(),n(158,"pre",43),e(159),t()(),n(160,"div",17)(161,"div",18)(162,"h4"),e(163,"Paso 5: Listeners en Java (onData)"),t(),n(164,"button",26),p("click",function(){d(u);let c=f(195);return m(i.openInfo(c))}),n(165,"mat-icon"),e(166,"help_outline"),t()()(),n(167,"p",20),e(168,"Registramos un "),n(169,"code"),e(170,"addEventListener"),t(),e(171," en el controlador. Jackson convierte el JSON autom\xE1ticamente a la clase Java, y usamos BroadcastOperations para enviar la respuesta a todos."),t(),n(172,"div",42)(173,"mat-icon",23),e(174,"description"),t(),e(175," JuegoSocketController.java"),t(),n(176,"pre",43),e(177),t()()(),n(178,"div",44)(179,"div",45)(180,"mat-icon",32),e(181,"terminal"),t(),e(182," Spring Boot Console "),t(),n(183,"div",33,1),k(185,te,6,6,"div",34,X,!1,ne,2,0,"div",35),t()()()(),w(188,ie,23,0,"ng-template",null,2,E)(190,oe,30,0,"ng-template",null,3,E)(192,ae,23,0,"ng-template",null,4,E)(194,re,29,0,"ng-template",null,5,E),t()}l&2&&(o(16),s("ngClass",v(22,b,i.step()>0,i.step()>=1)),o(9),s("disabled",i.step()>0),o(7),S(i.codePaso1Front),o(),s("ngClass",v(25,b,i.step()<2,i.step()>=4)),o(9),s("disabled",i.step()!==2),o(7),S(i.codePaso4),o(),s("ngClass",C(28,Q,i.step()<4)),o(20),S(i.codePaso5A),o(),s("disabled",i.step()<4||i.isLasering()),o(11),S(i.codePaso5C),o(8),_(i.clientLogs()),o(12),s("ngClass",v(30,b,i.step()>0,i.step()>=1)),o(12),s("disabled",i.step()>0),o(7),S(i.codePaso1Back),o(),s("ngClass",v(33,b,i.step()<1,i.step()>=2)),o(12),s("disabled",i.step()!==1),o(7),S(i.codePaso2),o(),s("ngClass",v(36,b,i.step()<2,i.step()>=4)),o(17),S(i.codePaso3),o(),s("ngClass",C(39,Q,i.step()<4)),o(17),S(i.codePaso5B),o(8),_(i.serverLogs()))},dependencies:[V,F,R,J,j,N,D,A,U,B,z,H,W,q,Z,G,L,M],styles:["[_nghost-%COMP%]{display:block;height:100vh;overflow:hidden}.main-wrapper[_ngcontent-%COMP%]{padding:1rem 2rem;color:#fff;height:100%;box-sizing:border-box;display:flex;flex-direction:column}.header-nav[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:1rem;background:#0006;padding:10px;border-radius:8px}.split-layout[_ngcontent-%COMP%]{flex:1;display:flex;gap:2rem;min-height:0}.column[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;background-color:#0d141cd9!important;overflow:hidden;border-radius:12px}.column-content[_ngcontent-%COMP%]{flex:1;display:flex;flex-direction:column;overflow-y:auto;padding-right:15px}.step-card[_ngcontent-%COMP%]{background:#0006;border:1px solid rgba(255,255,255,.1);border-radius:8px;padding:1rem;margin-bottom:1rem;transition:all .3s ease}.step-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;margin-bottom:5px}.step-header[_ngcontent-%COMP%]   h4[_ngcontent-%COMP%]{margin:0;font-size:1.1rem}.step-card.locked[_ngcontent-%COMP%]{opacity:.4;pointer-events:none;filter:grayscale(100%)}.step-card.completed[_ngcontent-%COMP%]{border-color:#69f0ae66}.code-header[_ngcontent-%COMP%]{background:#0a1118;border-left:3px solid #00e5ff;padding:5px 10px;font-family:Courier New,monospace;font-size:.75rem;color:#8bb4d6;display:flex;align-items:center;margin-top:10px;border-top-left-radius:4px;border-top-right-radius:4px;border-bottom:1px solid rgba(0,229,255,.2)}.code-header[_ngcontent-%COMP%] + .code-block[_ngcontent-%COMP%]{margin-top:0;border-top-left-radius:0;border-top-right-radius:0}.code-block[_ngcontent-%COMP%]{background:#020406;border-left:3px solid #00e5ff;padding:.8rem;border-radius:4px;font-family:Consolas,Monaco,monospace;color:#a5d6ff;font-size:.85rem;white-space:pre-wrap;margin-top:10px;margin-bottom:0}.console-window[_ngcontent-%COMP%]{background:#000;font-family:Courier New,monospace;font-size:.8rem;flex-shrink:0;display:flex;flex-direction:column;height:250px}.console-header[_ngcontent-%COMP%]{background:#111;color:#777;padding:5px 10px;border-bottom:1px solid #333;font-size:.8rem;display:flex;align-items:center;gap:8px}.console-body[_ngcontent-%COMP%]{padding:10px;flex:1;overflow-y:auto}.log-line[_ngcontent-%COMP%]{margin-bottom:4px;word-break:break-all}.timestamp[_ngcontent-%COMP%]{color:#555;margin-right:8px}.log-line.info[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{color:#ccc}.log-line.sent[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{color:#00e5ff}.log-line.recv[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{color:#69f0ae}.log-line.error[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{color:#ff5252}.log-line.success[_ngcontent-%COMP%]   .message[_ngcontent-%COMP%]{color:#ffd740;font-weight:700}.dark-modal[_ngcontent-%COMP%]{background:#050a0f;padding:2rem}"]})};export{K as ExplicacionSocketsSpringComponent};

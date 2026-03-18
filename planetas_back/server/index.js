import express from 'express';
import  http from 'http';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import { Server } from 'socket.io';
import routes from './routes.js' ;
import { init, obtenerPlanetas, crearPlaneta } from './services/dataService.js' ;
import registerGameHandler from "./sockets/gameHandler.js";
import { mockGames, getGamesByStatus } from './mockData.js';

const router = express.Router();
const backendToken ='';
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3500;

app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3500'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use('/api', routes);


const PLANET_FALLBACK = [
  {
    tipo: 'Normal',
    name: 'Normal',
    vidaInicial: 200,
    missilesIniciales: 50,
    descripcion: 'Equilibrado. Estándar de la flota.',
    habilidad: 'Ninguna',
    imagen: '/images/planets/normal.png'
  },
  {
    tipo: 'Fuego',
    name: 'Fuego',
    vidaInicial: 200,
    missilesIniciales: 50,
    descripcion: 'Agresivo. Parte de la Tríada Elemental.',
    habilidad: 'Daño x2 a Planta. Daño x0.5 a Agua.',
    imagen: '/images/planets/fire.png'
  },
  {
    tipo: 'Agua',
    name: 'Agua',
    vidaInicial: 200,
    missilesIniciales: 50,
    descripcion: 'Fluido. Parte de la Tríada Elemental.',
    habilidad: 'Daño x2 a Fuego. Daño x0.5 a Planta.',
    imagen: '/images/planets/water.png'
  },
  {
    tipo: 'Planta',
    name: 'Planta',
    vidaInicial: 200,
    missilesIniciales: 50,
    descripcion: 'Resistente. Parte de la Tríada Elemental.',
    habilidad: 'Daño x2 a Agua. Daño x0.5 a Fuego.',
    imagen: '/images/planets/plant.png'
  },
  {
    tipo: 'Roca',
    name: 'Roca',
    vidaInicial: 400,
    missilesIniciales: 20,
    descripcion: 'Tanque pesado. Comienza lento y se mantiene constante.',
    habilidad: '400 HP. Siempre 20 misiles por ronda.',
    imagen: '/images/planets/rock.png'
  },
  {
    tipo: 'Aire',
    name: 'Aire',
    vidaInicial: 100,
    missilesIniciales: 50,
    descripcion: 'Ágil y evasivo.',
    habilidad: '100 HP. 50% Probabilidad de esquivar ataques.',
    imagen: '/images/planets/air.png'
  }
];



//-- Configuración de Socket.IO

const server = http.createServer(app);
const io = new Server(server,{
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});


io.use((socket, next) => {
  
  jwt.verify(socket.handshake.auth.token, "hola", (err, decoded) => {
    if (err) {
           console.error("JWT Error Type:", err.name); // Will say 'JsonWebTokenError'
           console.error("JWT Error Message:", err.message); // Will say 'invalid signature'
            return next(new Error("Authentication error"));
        }
        socket.user = decoded;
  });
  next()
});

io.on('connection', (socket) => {
  console.log('Cliente conectado:', socket.id);

  registerGameHandler(io,socket);
  socket.on('disconnect', () => {
    console.log('Cliente desconectado:', socket.id);
  });

  
});
 

async function startServer() {
    try {
        const backendToken = await init();
        if (!backendToken) {
            console.error('Error al obtener el token del backend');
        }
       console.log('Token del backend obtenido exitosamente');
    } catch (err) {
        console.error(err);
    }
}

startServer();

server.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});


// Mock data para pruebas del servidor WebSocket

const mockGames = [  //tipo : Tipo : agua , fuego según el tipo es el valor del planeta para el ataque 
  {
    id: 'game-001',
    estado: 'activa',
    numeroRonda: 2,
    jugadores: [
      {
        id: 'player-001',
        planeta: { "id": "planeta-001", "nombre": "Tierra", "victorias": 2, "tipo": "agua", "vidas": 120 },
        socket: 'socket-id-001',
        vidas: 120
      },
      {
        id: 'player-002',
        nombre: 'Usuario 2',
        planeta: { "id": "planeta-002", "nombre": "Marte", "victorias": 1, "tipo": "fuego", "vidas": 80 },
        socket: 'socket-id-002',
        vidas: 80
      },
      {
        id: 'player-003',
        nombre: 'Usuario 3',
        planeta: { "id": "planeta-003", "nombre": "Venus", "victorias": 0, "tipo": "aire", "vidas": 100 },
        socket: 'socket-id-003',
        vidas: 70
      }
     ],
    mensajes:["jugador 1 en la ronda dos a atacado ", "Jugador 2 en la ronda dos a atacado ", "Jugador 3 en la ronda dos a atacado "],
    fechaInicio: new Date('2026-02  -01T10:00:00'),
    fechaFin: null
  },
  {
    id: 'game-002',
    estado: 'finalizada',
    rondas: 3,
    rondaActual: 3,
    jugadores: [
      {
        id: 'player-004',
        nombre: 'Usuario 4',
        planeta: { "id": "planeta-003", "nombre": "Jupiter", "victorias": 0, "tipo": "fuego", "vidas": 100 },
        misiles:300,
        socket: 'socket-id-004',
        puntos: 200
      },
      {
        id: 'player-005',
        nombre: 'Usuario 5',
        planeta: { "id": "planeta-004", "nombre": "Saturno", "victorias": 0, "tipo": "fuego", "vidas": 100 },
        socket: 'socket-id-005',
        puntos: 180
      }
    ],
    fechaInicio: new Date('2026-02-01T09:00:00'),
    fechaFin: new Date('2026-02-01T10:30:00')
  },
  {
    id: 'game-003',
    estado: 'esperando',
    rondas: 4,
    rondaActual: 0,
    jugadores: [
      {
        id: 'player-006',
        nombre: 'Usuario 6',
       planeta: { "id": "planeta-006", "nombre": "Mercurio", "victorias": 0, "tipo": "agua", "vidas": 88 },
        socket: 'socket-id-00cdd6',
        puntos: 0
      }
    ],
    fechaInicio: null,
    fechaFin: null
  }
];

// Función para filtrar partidas por estado
function getGamesByStatus(status) {
  return mockGames.filter(game => game.estado === status);
}

module.exports = {
  mockGames,
  getGamesByStatus
};

// crear planeta 
//  
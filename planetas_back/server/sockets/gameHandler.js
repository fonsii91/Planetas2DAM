import gameManager from "./gameManager.js";

export default (io, socket) => {
  
  const handleCreateGame = (payload) => {
    // El 'socket.user' viene del middleware de JWT que hicimos antes
    const gameId = `game-${Date.now()}`;
    
    const newGame = {
      id: gameId,
      estado: 'activa',
      jugadores: [{
        id: socket.user.id,
        nombre: socket.user.name,
        socket: socket.id,
        vidas: 100 // O el valor de tu objeto planeta
      }],
      mensajes: [`Juego iniciado por ${socket.user.name}`],
      fechaInicio: new Date()
    };

    socket.join(gameId);
    // Guardar en tu store global (Map o Redis)
    gameManager.save(gameId, newGame); 

    io.to(gameId).emit("game:created", newGame);
  };


  const handleAttack = (payload) => {
    const { gameId, targetId } = payload;
    console.log(`Ataque en la partida ${gameId} hacia ${targetId}`);
    // Lógica de validación y daño...
  };



  const handleJoinGame = (payload) => {
  const { gameId } = payload;
  const game = gameManager.get(gameId);

  if (!game) {
    socket.emit("game:error", { message: "Juego no encontrado" });
    return;
  }

  // Verificar si el usuario ya está en el juego
  const isAlreadyJoined = game.jugadores.some(j => j.socket === socket.id);
  if (isAlreadyJoined) return;

  const newPlayer = {
    id: socket.user.id,
    nombre: socket.user.name,
    socket: socket.id,
    vidas: 100
  };

  game.jugadores.push(newPlayer);
  gameManager.save(gameId, game);
  socket.join(gameId);

  io.to(gameId).emit("game:joined", { game, player: newPlayer });
};
 
  // Registro de "Rutas" de Socket
  socket.on("game:create", handleCreateGame);
  socket.on("game:attack", handleAttack);
  socket.on("game:join", handleJoinGame);
};
/**
 * GameManager - Singleton para gestionar el estado de las partidas
 */
class GameManager {
  constructor() {
    // Usamos un Map para una búsqueda rápida (O(1)) por gameId
    this.games = new Map();
  }

  // Guardar o actualizar una partida
  save(gameId, gameData) {
    this.games.set(gameId, gameData);
    return true;
  }

  // Obtener una partida por su ID
  get(gameId) {
    return this.games.get(gameId);
  }

  // Eliminar una partida (por ejemplo, cuando termina)
  delete(gameId) {
    return this.games.delete(gameId);
  }

  // Obtener todas las partidas activas (útil para un lobby)
  getAll() {
    return Array.from(this.games.values());
  }

  // Actualizar solo una parte del estado (ej: reducir vida)
  updatePlayerHealth(gameId, playerId, damage) {
    const game = this.get(gameId);
    if (!game) return null;

    const player = game.jugadores.find(p => p.id === playerId);
    if (player) {
      player.vidas -= damage;
      if (player.vidas < 0) player.vidas = 0;
      this.save(gameId, game);
    }
    return game;
  }
}

// Exportamos una única instancia (Singleton)
const gameManager = new GameManager();
export default gameManager;
export interface Planeta {
  nombre: string;
  tipo: 'Normal' | 'Agua' | 'Fuego' | 'Planta' | 'Tierra' | 'Aire';
}

export interface Jugador {
  nombre: string;
  vida: number;
  vidaMaxima: number;
  planeta: Planeta;
  misilesDisponibles: number;
}

export interface MensajeRonda {
  texto: string;
  tipo?: 'info' | 'success' | 'warning' | 'danger' | 'round';
}

export interface Ataque {
  atacante: Jugador;
  defensor: Jugador;
  misiles: number;
}

export const PLANET_IMAGES: { [key: string]: string } = {
  'Tierra': 'images/planets/earth.png',
  'Fuego': 'images/planets/fire.png',
  'Aire': 'images/planets/air.png'
};

export function getPlanetImage(tipo: string): string {
  return PLANET_IMAGES[tipo] || 'images/planets/earth.png';
}

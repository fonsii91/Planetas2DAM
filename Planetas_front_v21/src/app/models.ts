export interface Planeta {
  nombre: string;
  tipo: 'Normal' | 'Agua' | 'Fuego' | 'Planta' | 'Roca' | 'Aire';
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
  'Normal': 'images/planets/normal.png',
  'Fuego': 'images/planets/fire.png',
  'Aire': 'images/planets/air.png',
  'Planta': 'images/planets/plant.png',
  'Agua': 'images/planets/water.png',
  'Roca': 'images/planets/rock.png'
};

export function getPlanetImage(tipo: string): string {
  return PLANET_IMAGES[tipo] || 'images/planets/earth.png';
}

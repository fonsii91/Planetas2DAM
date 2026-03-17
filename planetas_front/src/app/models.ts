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


export interface PlanetStats {
  vidaInicial: number;
  misilesIniciales: number;
  descripcion: string;
  habilidad?: string;
}

export const PLANET_RULES: { [key: string]: PlanetStats } = {
  'Normal': {
    vidaInicial: 200,
    misilesIniciales: 50,
    descripcion: 'Equilibrado. Estándar de la flota.',
    habilidad: 'Ninguna'
  },
  'Fuego': {
    vidaInicial: 200,
    misilesIniciales: 50,
    descripcion: 'Agresivo. Parte de la Tríada Elemental.',
    habilidad: 'Daño x2 a Planta. Daño x0.5 a Agua.'
  },
  'Agua': {
    vidaInicial: 200,
    misilesIniciales: 50,
    descripcion: 'Fluido. Parte de la Tríada Elemental.',
    habilidad: 'Daño x2 a Fuego. Daño x0.5 a Planta.'
  },
  'Planta': {
    vidaInicial: 200,
    misilesIniciales: 50,
    descripcion: 'Resistente. Parte de la Tríada Elemental.',
    habilidad: 'Daño x2 a Agua. Daño x0.5 a Fuego.'
  },
  'Roca': {
    vidaInicial: 400,
    misilesIniciales: 20,
    descripcion: 'Tanque pesado. Comienza lento y se mantiene constante.',
    habilidad: '400 HP. Siempre 20 misiles por ronda.'
  },
  'Aire': {
    vidaInicial: 100,
    misilesIniciales: 50,
    descripcion: 'Ágil y evasivo.',
    habilidad: '100 HP. 50% Probabilidad de esquivar ataques.'
  }
};

export function getPlanetImage(tipo: string): string {
  return PLANET_IMAGES[tipo] || 'images/planets/earth.png';
}

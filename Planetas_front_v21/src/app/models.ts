export interface Planeta {
  nombre: string;
  tipo: 'Normal' |'Agua' | 'Fuego'| 'Planta' | 'Tierra' | 'Aire';
}

export interface Jugador {
  nombre: string;
  vida: number;
  planeta: Planeta;
  misilesDisponibles: number;
}

export interface MensajeRonda {
  texto: string;
}

export interface Ataque {
  atacante: Jugador;
  defensor: Jugador;
  misiles: number;
}

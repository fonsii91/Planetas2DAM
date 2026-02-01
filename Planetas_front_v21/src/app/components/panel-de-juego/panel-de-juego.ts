import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule } from '@angular/forms';
import { Jugador, MensajeRonda, getPlanetImage } from '../../models';

import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-panel-de-juego',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSliderModule,
    MatProgressBarModule,
    MatSidenavModule,
    FormsModule
  ],
  templateUrl: './panel-de-juego.html',
  styleUrl: './panel-de-juego.css'
})
export class PanelDeJuego {
  numeroRonda = 1;

  jugadorActual: Jugador = {
    nombre: 'Comandante Shepard',
    vida: 200,
    vidaMaxima: 200,
    planeta: { nombre: 'Tierra', tipo: 'Normal' },
    misilesDisponibles: 50
  };

  constructor(private gameService: GameService) {
    const player = this.gameService.getPlayer();
    if (player) {
      this.jugadorActual = player;
    }
  }

  enemigos: Jugador[] = [
    {
      nombre: 'Jedi Skywalker',
      vida: 200,
      vidaMaxima: 200,
      planeta: { nombre: 'Tatooine', tipo: 'Fuego' },
      misilesDisponibles: 50
    },
    {
      nombre: 'StarLord_99',
      vida: 200,
      vidaMaxima: 200,
      planeta: { nombre: 'Xandar', tipo: 'Planta' },
      misilesDisponibles: 50
    }
  ];

  mensajesRonda: MensajeRonda[] = [
    { texto: 'Inicio de la batalla. Prepara tu estrategia.', tipo: 'info' }
  ];

  ataques: { [key: string]: { misiles: number } } = {
    'Jedi Skywalker': { misiles: 0 },
    'StarLord_99': { misiles: 0 }
  };

  getPlanetImage = getPlanetImage;

  get misilesRestantes(): number {
    const totalAsignados = Object.values(this.ataques).reduce((total, ataque) => total + ataque.misiles, 0);
    return this.jugadorActual.misilesDisponibles - totalAsignados;
  }

  get misilesDefensa(): number {
    return Math.floor(this.misilesRestantes / 2);
  }

  maxMisilesPorAtaque(enemigo: Jugador): number {
    const misilesEnOtrosAtaques = Object.keys(this.ataques)
      .filter(key => key !== enemigo.nombre)
      .reduce((total, key) => total + this.ataques[key].misiles, 0);
    return this.jugadorActual.misilesDisponibles - misilesEnOtrosAtaques;
  }

  // Generates an array of 20 segments for the health bar
  getHealthSegments(vida: number, vidaMaxima: number): boolean[] {
    const totalSegments = 20;
    const healthPerSegment = vidaMaxima / totalSegments;
    const filledSegments = Math.ceil(vida / healthPerSegment);
    return Array(totalSegments).fill(false).map((_, i) => i < filledSegments);
  }

  adjustMissiles(enemigo: Jugador, amount: number) {
    const max = this.maxMisilesPorAtaque(enemigo);
    const newValue = this.ataques[enemigo.nombre].misiles + amount;

    if (newValue >= 0 && newValue <= max) {
      this.ataques[enemigo.nombre].misiles = newValue;
    }
  }

  setMaxMissiles(enemigo: Jugador) {
    this.ataques[enemigo.nombre].misiles = this.maxMisilesPorAtaque(enemigo);
  }

  validateInput(enemigo: Jugador) {
    const max = this.maxMisilesPorAtaque(enemigo);
    let val = this.ataques[enemigo.nombre].misiles;

    if (val < 0) val = 0;
    if (val > max) val = max;

    this.ataques[enemigo.nombre].misiles = val;
  }

  lanzarAtaque() {
    const totalMisilesAtaque = Object.values(this.ataques).reduce((total, ataque) => total + ataque.misiles, 0);

    if (totalMisilesAtaque > this.jugadorActual.misilesDisponibles) {
      this.mensajesRonda.push({ texto: 'Error: No tienes suficientes misiles para este ataque.', tipo: 'warning' });
      return;
    }

    this.jugadorActual.misilesDisponibles -= totalMisilesAtaque;

    this.mensajesRonda.push({ texto: `COMIENZO DE RONDA ${this.numeroRonda}`, tipo: 'round' });

    Object.keys(this.ataques).forEach(nombreEnemigo => {
      const ataque = this.ataques[nombreEnemigo];
      if (ataque.misiles > 0) {
        const enemigo = this.enemigos.find(e => e.nombre === nombreEnemigo);
        if (enemigo) {
          const impacto = this.calcularDanio(this.jugadorActual.planeta.tipo, enemigo.planeta.tipo, ataque.misiles);

          if (impacto.esquivado) {
            this.mensajesRonda.push({ texto: `Ataque a <b>${nombreEnemigo}</b>: ¡ESQUIVADO! (Probabilidad de Aire)`, tipo: 'info' });
            this.showDamage(nombreEnemigo, 0);
          } else {
            const estabaVivo = enemigo.vida > 0;
            enemigo.vida -= impacto.danio;

            let detalleEfectividad = '';
            if (impacto.multiplicador > 1) detalleEfectividad = ' (¡Es muy efectivo! x2)';
            if (impacto.multiplicador < 1) detalleEfectividad = ' (No es muy efectivo... x0.5)';

            this.mensajesRonda.push({ texto: `Ataque a <b>${nombreEnemigo}</b>: Impacto de <b>${ataque.misiles}</b> misiles (<span style="color: #ff79c6">-${impacto.danio} HP</span>)${detalleEfectividad}.`, tipo: 'success' });
            this.showDamage(nombreEnemigo, impacto.danio);

            if (estabaVivo && enemigo.vida <= 0) {
              enemigo.vida = 0;
              this.mensajesRonda.push({ texto: `¡<b>${nombreEnemigo}</b> ha sido ELIMINADO de la galaxia!`, tipo: 'danger' });
            }
          }
        }
      }
    });

    // Resetear ataques para la siguiente ronda
    Object.keys(this.ataques).forEach(key => this.ataques[key].misiles = 0);

    // Resetear/Escalar misiles del jugador
    if (this.jugadorActual.planeta.tipo === 'Roca') {
      this.jugadorActual.misilesDisponibles = 20;
      this.mensajesRonda.push({ texto: `[ROCA] Misiles recargados a ${this.jugadorActual.misilesDisponibles}.`, tipo: 'info' });
    } else {
      this.jugadorActual.misilesDisponibles = 50;
    }

    this.numeroRonda++;
  }

  calcularDanio(tipoAtacante: string, tipoDefensor: string, cantidadMisiles: number): { danio: number, multiplicador: number, esquivado: boolean } {
    // 1. Check Dodge (Aire)
    if (tipoDefensor === 'Aire') {
      // 50% chance to dodge
      if (Math.random() < 0.5) {
        return { danio: 0, multiplicador: 0, esquivado: true };
      }
    }

    // 2. Elemental Triad
    let multiplicador = 1;

    if (tipoAtacante === 'Fuego') {
      if (tipoDefensor === 'Planta') multiplicador = 2;
      if (tipoDefensor === 'Agua') multiplicador = 0.5;
    } else if (tipoAtacante === 'Agua') {
      if (tipoDefensor === 'Fuego') multiplicador = 2;
      if (tipoDefensor === 'Planta') multiplicador = 0.5;
    } else if (tipoAtacante === 'Planta') {
      if (tipoDefensor === 'Agua') multiplicador = 2;
      if (tipoDefensor === 'Fuego') multiplicador = 0.5;
    }
    // Rojo/Azul/Verde mapping from prompt?
    // "Rojo vs Verde", "Azul vs Rojo".
    // Assuming Fuego=Rojo, Agua=Azul, Planta=Verde based on color logic.
    // The prompt explicitly said: "Rojo Contra Verde", "Azul Contra Rojo", "Verde Contra Azul".
    // Let's stick to standard Pokemon Fuego/Agua/Planta logic which is also in the prompt ("Similar a los tipos de Pokemon").
    // Re-reading prompt: "Rojo Contra Verde" (Red vs Green -> Fire vs Plant? Usually Fire burns Plant).
    // "Azul Contra Rojo" (Blue vs Red -> Water vs Fire).
    // "Verde Contra Azul" (Green vs Blue -> Plant vs Water).
    // My Implementation: Fuego(Red) > Planta(Green); Agua(Blue) > Fuego(Red); Planta(Green) > Agua(Blue).
    // Matches prompt perfectly.

    // Base damage is 1 per missile
    const danioBase = cantidadMisiles * 1;
    return { danio: Math.floor(danioBase * multiplicador), multiplicador, esquivado: false };
  }

  agregarEnemigo() {
    // Máximo 9 enemigos + 1 jugador = 10 jugadores totales
    if (this.enemigos.length >= 9) {
      return;
    }

    const id = this.enemigos.length + 1;
    const tiposPlaneta: ('Normal' | 'Agua' | 'Fuego' | 'Planta' | 'Roca' | 'Aire')[] = ['Normal', 'Agua', 'Fuego', 'Planta', 'Roca', 'Aire'];
    const tipoAleatorio = tiposPlaneta[Math.floor(Math.random() * tiposPlaneta.length)];
    const nuevoNombre = `Enemigo Simulador ${id}`;

    const nuevoEnemigo: Jugador = {
      nombre: nuevoNombre,
      vida: 200,
      vidaMaxima: 200,
      planeta: { nombre: `Planeta ${id}`, tipo: tipoAleatorio },
      misilesDisponibles: 50
    };

    this.enemigos.push(nuevoEnemigo);
    this.ataques[nuevoNombre] = { misiles: 0 };
    this.mensajesRonda.push({ texto: `¡Un nuevo rival ha entrado al sistema: <b>${nuevoNombre}</b>!`, tipo: 'warning' });
  }

  // --- Visual Effects Logic ---
  damageDealt: { [key: string]: number | null } = {};

  showDamage(nombre: string, cantidad: number) {
    this.damageDealt[nombre] = cantidad;
    // Auto-hide after animation plays (2s in CSS)
    setTimeout(() => {
      this.damageDealt[nombre] = null;
    }, 2000);
  }
}
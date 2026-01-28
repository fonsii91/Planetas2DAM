import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSliderModule } from '@angular/material/slider';
import { FormsModule } from '@angular/forms';
import { Jugador, MensajeRonda } from '../../models';

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
    FormsModule
  ],
  templateUrl: './panel-de-juego.html',
  styleUrl: './panel-de-juego.css'
})
export class PanelDeJuego {
  numeroRonda = 1;

  jugadorActual: Jugador = {
    nombre: 'Comandante Shepard',
    vida: 100,
    planeta: { nombre: 'Tierra', tipo: 'Tierra' },
    misilesDisponibles: 50
  };

  enemigos: Jugador[] = [
    {
      nombre: 'Jedi Skywalker',
      vida: 100,
      planeta: { nombre: 'Tatooine', tipo: 'Fuego' },
      misilesDisponibles: 50
    },
    {
      nombre: 'StarLord_99',
      vida: 100,
      planeta: { nombre: 'Xandar', tipo: 'Aire' },
      misilesDisponibles: 50
    }
  ];

  mensajesRonda: MensajeRonda[] = [
    { texto: 'Inicio de la batalla. Prepara tu estrategia.'}
  ];

  ataques: { [key: string]: { misiles: number } } = {
    'Jedi Skywalker': { misiles: 0 },
    'StarLord_99': { misiles: 0 }
  };

  maxMisilesPorAtaque(enemigo: Jugador): number {
    const misilesEnOtrosAtaques = Object.keys(this.ataques)
      .filter(key => key !== enemigo.nombre)
      .reduce((total, key) => total + this.ataques[key].misiles, 0);
    return this.jugadorActual.misilesDisponibles - misilesEnOtrosAtaques;
  }

  lanzarAtaque() {
    const totalMisilesAtaque = Object.values(this.ataques).reduce((total, ataque) => total + ataque.misiles, 0);

    if (totalMisilesAtaque > this.jugadorActual.misilesDisponibles) {
      // Manejar el error, por ejemplo, con un mensaje en la UI
      this.mensajesRonda.push({ texto: 'Error: No tienes suficientes misiles para este ataque.' });
      return;
    }

    this.jugadorActual.misilesDisponibles -= totalMisilesAtaque;

    this.mensajesRonda.push({ texto: `Ronda ${this.numeroRonda}:` });

    Object.keys(this.ataques).forEach(nombreEnemigo => {
      const ataque = this.ataques[nombreEnemigo];
      if (ataque.misiles > 0) {
        const enemigo = this.enemigos.find(e => e.nombre === nombreEnemigo);
        if (enemigo) {
          // Lógica simple de daño
          const danio = ataque.misiles * 2; // Cada misil hace 2 de daño (ejemplo)
          enemigo.vida -= danio;
          this.mensajesRonda.push({ texto: `> Has lanzado ${ataque.misiles} misiles a ${nombreEnemigo}, causando ${danio} de daño.` });
        }
      }
    });

    // Resetear ataques para la siguiente ronda
    Object.keys(this.ataques).forEach(key => this.ataques[key].misiles = 0);

    this.numeroRonda++;
  }
}
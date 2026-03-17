import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-crear-partida',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatListModule, MatButtonModule, RouterLink, MatIconModule, MatTooltipModule],
  templateUrl: './crear-partida.html',
  styleUrl: './crear-partida.css',
})
export class CrearPartida {
  private router = inject(Router);

  jugadores = [
    { nombre: 'Comandante Shepard', estado: 'listo' },
    { nombre: 'Jedi Skywalker', estado: 'eligiendo' },
    { nombre: 'StarLord_99', estado: 'listo' }
  ];

  todosListos(): boolean {
    return this.jugadores.every(jugador => jugador.estado === 'listo');
  }

  iniciarBatalla() {
    console.log('Iniciando batalla...');
    this.router.navigate(['/panel-de-juego']);
  }

  cancelar() {
    console.log('Cancelando...');
  }
}

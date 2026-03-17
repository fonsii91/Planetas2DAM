
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { Jugador, getPlanetImage, PLANET_RULES, PlanetStats } from '../../models';

import { GameService } from '../../services/game.service';

@Component({
    selector: 'app-elegir-planeta',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        MatCardModule,
        MatButtonModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    templateUrl: './elegir-planeta.html',
    styleUrl: './elegir-planeta.css'
})
export class ElegirPlaneta {
    planetName: string = '';
    selectedType: 'Normal' | 'Agua' | 'Fuego' | 'Planta' | 'Roca' | 'Aire' = 'Normal';

    planetTypes: string[] = ['Normal', 'Agua', 'Fuego', 'Planta', 'Roca', 'Aire'];

    constructor(private router: Router, private gameService: GameService) { }

    get planetImage(): string {
        return getPlanetImage(this.selectedType);
    }

    get selectedPlanetStats(): PlanetStats {
        return PLANET_RULES[this.selectedType];
    }

    confirmar() {
        if (this.planetName.trim()) {
            const stats = this.selectedPlanetStats;

            const nuevoJugador: Jugador = {
                nombre: 'Comandante', // Default name, could be added to form if needed
                vida: stats.vidaInicial,
                vidaMaxima: stats.vidaInicial,
                planeta: { nombre: this.planetName, tipo: this.selectedType },
                misilesDisponibles: stats.misilesIniciales
            };

            this.gameService.setPlayer(nuevoJugador);
            this.router.navigate(['/panel-de-juego']);
        }
    }
}


import { Injectable } from '@angular/core';
import { Jugador } from '../models';

@Injectable({
    providedIn: 'root'
})
export class GameService {
    private player: Jugador | null = null;

    constructor() { }

    setPlayer(player: Jugador) {
        this.player = player;
    }

    getPlayer(): Jugador | null {
        return this.player;
    }

    resetGame() {
        this.player = null;
    }
}


import { TestBed } from '@angular/core/testing';
import { GameService } from './game.service';
import { Jugador } from '../models';

describe('GameService', () => {
    let service: GameService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(GameService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should store and retrieve player', () => {
        const mockPlayer: Jugador = {
            nombre: 'Test Player',
            vida: 100,
            vidaMaxima: 100,
            planeta: { nombre: 'Test Planet', tipo: 'Normal' },
            misilesDisponibles: 50
        };

        service.setPlayer(mockPlayer);
        expect(service.getPlayer()).toEqual(mockPlayer);
    });

    it('should reset game', () => {
        const mockPlayer: Jugador = {
            nombre: 'Test Player',
            vida: 100,
            vidaMaxima: 100,
            planeta: { nombre: 'Test Planet', tipo: 'Normal' },
            misilesDisponibles: 50
        };

        service.setPlayer(mockPlayer);
        service.resetGame();
        expect(service.getPlayer()).toBeNull();
    });
});

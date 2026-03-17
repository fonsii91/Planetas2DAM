import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDeJuego } from './panel-de-juego';
import { GameService } from '../../services/game.service';

describe('PanelDeJuego', () => {
  let component: PanelDeJuego;
  let fixture: ComponentFixture<PanelDeJuego>;

  beforeEach(async () => {
    const gameServiceMock = {
      getPlayer: () => null,
      setPlayer: () => { },
      resetGame: () => { }
    };

    await TestBed.configureTestingModule({
      imports: [PanelDeJuego],
      providers: [{ provide: GameService, useValue: gameServiceMock }]
    })
      .compileComponents();

    fixture = TestBed.createComponent(PanelDeJuego);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should deal 1 damage per missile (Normal vs Normal)', () => {
    // Setup
    const enemyName = 'Test Enemy';
    component.enemigos = [{
      nombre: enemyName,
      vida: 200,
      vidaMaxima: 200,
      planeta: { nombre: 'Test Planet', tipo: 'Normal' },
      misilesDisponibles: 50
    }];
    component.ataques[enemyName] = { misiles: 10 };
    component.jugadorActual.misilesDisponibles = 50;
    component.jugadorActual.planeta.tipo = 'Normal'; // Ensure known type

    // Action
    component.lanzarAtaque();

    // Assertion
    // Normal vs Normal = x1 multiplier.
    // 10 missiles * 1 base * 1 mult = 10 damage.
    const enemy = component.enemigos.find(e => e.nombre === enemyName);
    expect(enemy?.vida).toBe(190);
  });

  it('should apply effective damage (x2)', () => {
    const enemyName = 'Plant Enemy';
    component.enemigos = [{
      nombre: enemyName,
      vida: 200,
      vidaMaxima: 200,
      planeta: { nombre: 'P', tipo: 'Planta' },
      misilesDisponibles: 50
    }];
    component.ataques[enemyName] = { misiles: 10 };

    // Attacker is Fire -> Fire vs Plant = x2
    component.jugadorActual.planeta.tipo = 'Fuego';
    component.jugadorActual.misilesDisponibles = 50;

    component.lanzarAtaque();

    // 10 * 1 * 2 = 20 damage. 200 - 20 = 180.
    const enemy = component.enemigos.find(e => e.nombre === enemyName);
    expect(enemy?.vida).toBe(180);
  });
});

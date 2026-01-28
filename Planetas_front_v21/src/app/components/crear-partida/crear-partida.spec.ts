import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPartida } from './crear-partida';

describe('CrearPartida', () => {
  let component: CrearPartida;
  let fixture: ComponentFixture<CrearPartida>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearPartida]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrearPartida);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

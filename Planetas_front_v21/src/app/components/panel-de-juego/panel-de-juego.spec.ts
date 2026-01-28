import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelDeJuego } from './panel-de-juego';

describe('PanelDeJuego', () => {
  let component: PanelDeJuego;
  let fixture: ComponentFixture<PanelDeJuego>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PanelDeJuego]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PanelDeJuego);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

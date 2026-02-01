
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ElegirPlaneta } from './elegir-planeta';
import { GameService } from '../../services/game.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

describe('ElegirPlaneta', () => {
    let component: ElegirPlaneta;
    let fixture: ComponentFixture<ElegirPlaneta>;

    beforeEach(async () => {
        const gameServiceMock = {
            getPlayer: () => null,
            setPlayer: () => { },
            resetGame: () => { }
        };

        await TestBed.configureTestingModule({
            imports: [ElegirPlaneta, BrowserAnimationsModule, RouterTestingModule],
            providers: [{ provide: GameService, useValue: gameServiceMock }]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ElegirPlaneta);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

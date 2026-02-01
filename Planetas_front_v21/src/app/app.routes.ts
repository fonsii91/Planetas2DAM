import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./auth/register/register').then(m => m.RegisterComponent)
  },
  {
    path: 'menu-principal',
    loadComponent: () => import('./components/menu-principal/menu-principal').then(m => m.MenuPrincipal)
  },
  {
    path: 'crear-partida',
    loadComponent: () => import('./components/crear-partida/crear-partida').then(m => m.CrearPartida)
  },
  {
    path: 'elegir-planeta',
    loadComponent: () => import('./components/elegir-planeta/elegir-planeta').then(m => m.ElegirPlaneta)
  },
  {
    path: 'panel-de-juego',
    loadComponent: () => import('./components/panel-de-juego/panel-de-juego').then(m => m.PanelDeJuego)
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.RegisterComponent)
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
  {
    path: 'explicacion-sockets',
    loadComponent: () => import('./components/explicacion-sockets/explicacion-sockets').then(m => m.ExplicacionSocketsComponent)
  },
  {
    path: 'explicacion-sockets-spring',
    loadComponent: () => import('./components/explicacion-sockets-spring/explicacion-sockets-spring').then(m => m.ExplicacionSocketsSpringComponent)
  },
  {
    path: 'explicacion-http',
    loadComponent: () => import('./components/explicacion-http/explicacion-http').then(m => m.ExplicacionHttpComponent)
  },
  { path: '', redirectTo: 'explicacion-http', pathMatch: 'full' },
  { path: '**', redirectTo: 'explicacion-sockets' }
];
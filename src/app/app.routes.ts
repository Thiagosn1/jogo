import { Routes } from '@angular/router';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { BiomasBrasileirosComponent } from './biomas-brasileiros/biomas-brasileiros.component';

export const routes: Routes = [
  { path: '', component: TelaInicialComponent },
  { path: 'jogo', component: BiomasBrasileirosComponent },
];

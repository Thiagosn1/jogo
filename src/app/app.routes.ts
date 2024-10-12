import { Routes } from '@angular/router';
import { TelaInicialComponent } from './tela-inicial/tela-inicial.component';
import { BiomasBrasileirosComponent } from './biomas-brasileiros/biomas-brasileiros.component';
import { JogoMemoriaComponent } from './jogo-memoria/jogo-memoria.component';
import { CacaPalavrasComponent } from './caca-palavras/caca-palavras.component';

export const routes: Routes = [
  { path: '', component: TelaInicialComponent },
  { path: 'jogo', component: BiomasBrasileirosComponent },
  { path: 'memoria', component: JogoMemoriaComponent },
  { path: 'cacapalavras', component: CacaPalavrasComponent },
];

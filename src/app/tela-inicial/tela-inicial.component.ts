import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { PontuacaoService } from '../pontuacao.service'; // Importe o serviço de pontuação

interface Pontuacao {
  nome: string;
  pontuacao: number;
  tipoJogo: string;
}

@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css'],
})
export class TelaInicialComponent {
  nomeJogador: string = '';
  tipoJogo: string = 'quiz';
  pontuacoes: { [key: string]: Pontuacao[] } = {};
  mostrarRanking: boolean = false;

  constructor(
    private router: Router,
    private pontuacaoService: PontuacaoService
  ) {}

  iniciarJogo() {
    if (this.nomeJogador.trim()) {
      this.router.navigate(['/jogo'], {
        queryParams: {
          nome: this.nomeJogador,
          tipo: this.tipoJogo,
        },
      });
    } else {
      alert('Por favor, digite seu nome para começar.');
    }
  }

  abrirRanking() {
    this.pontuacaoService.obterPontuacoes().subscribe(
      (data: Pontuacao[]) => {
        this.pontuacoes = data.reduce(
          (acc: { [key: string]: Pontuacao[] }, pontuacao: Pontuacao) => {
            if (!acc[pontuacao.tipoJogo]) {
              acc[pontuacao.tipoJogo] = [];
            }
            acc[pontuacao.tipoJogo].push(pontuacao);
            return acc;
          },
          {}
        );

        for (const tipo in this.pontuacoes) {
          this.pontuacoes[tipo].sort((a, b) => b.pontuacao - a.pontuacao);
        }

        this.mostrarRanking = true;
      },
      (error) => {
        console.error('Erro ao obter pontuações', error);
      }
    );
  }

  fecharRanking() {
    this.mostrarRanking = false;
  }
}

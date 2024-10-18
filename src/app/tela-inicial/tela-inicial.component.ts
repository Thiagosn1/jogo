import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Router } from '@angular/router';
import { PontuacaoService } from '../pontuacao.service';

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
        const pontuacoesFiltradas = data.reduce(
          (
            acc: { [key: string]: { [nome: string]: Pontuacao } },
            pontuacao: Pontuacao
          ) => {
            const nomeTrimmed = pontuacao.nome.trim(); // Remove espaços em branco
            if (!acc[pontuacao.tipoJogo]) {
              acc[pontuacao.tipoJogo] = {};
            }
            if (
              !acc[pontuacao.tipoJogo][nomeTrimmed] ||
              acc[pontuacao.tipoJogo][nomeTrimmed].pontuacao <
                pontuacao.pontuacao
            ) {
              acc[pontuacao.tipoJogo][nomeTrimmed] = pontuacao;
            }
            return acc;
          },
          {}
        );

        this.pontuacoes = Object.keys(pontuacoesFiltradas).reduce(
          (acc: { [key: string]: Pontuacao[] }, tipo: string) => {
            acc[tipo] = Object.values(pontuacoesFiltradas[tipo]).sort(
              (a, b) => b.pontuacao - a.pontuacao
            );
            return acc;
          },
          {}
        );

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

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
  id: string;
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
        const dadosNormalizados = data.map((pontuacao) => ({
          ...pontuacao,
          nome: pontuacao.nome.trim().toLowerCase(),
        }));

        const pontuacoesUnicas: { [nomeETipo: string]: Pontuacao } = {};

        dadosNormalizados.forEach((pontuacao) => {
          const chave = `${pontuacao.nome}-${pontuacao.tipoJogo}`;

          if (
            !pontuacoesUnicas[chave] ||
            pontuacao.pontuacao > pontuacoesUnicas[chave].pontuacao ||
            (pontuacao.pontuacao === pontuacoesUnicas[chave].pontuacao &&
              Number(pontuacao.id) > Number(pontuacoesUnicas[chave].id))
          ) {
            pontuacoesUnicas[chave] = pontuacao;
          }
        });

        const pontuacoesPorTipo: {
          'jogo-memoria': Pontuacao[];
          'caca-palavras': Pontuacao[];
          quiz: Pontuacao[];
        } = {
          'jogo-memoria': [],
          'caca-palavras': [],
          quiz: [],
        };

        Object.values(pontuacoesUnicas).forEach((pontuacao) => {
          pontuacoesPorTipo[
            pontuacao.tipoJogo as keyof typeof pontuacoesPorTipo
          ].push({
            ...pontuacao,
            nome:
              pontuacao.nome.charAt(0).toUpperCase() + pontuacao.nome.slice(1),
          });
        });

        Object.keys(pontuacoesPorTipo).forEach((tipo) => {
          pontuacoesPorTipo[tipo as keyof typeof pontuacoesPorTipo].sort(
            (a: Pontuacao, b: Pontuacao) => {
              if (b.pontuacao !== a.pontuacao) {
                return b.pontuacao - a.pontuacao;
              } else {
                return Number(b.id) - Number(a.id);
              }
            }
          );
        });

        this.pontuacoes = pontuacoesPorTipo;
        this.mostrarRanking = true;
      },
      (error) => {
        console.error('Erro ao obter pontuações:', error);
      }
    );
  }

  fecharRanking() {
    this.mostrarRanking = false;
  }
}

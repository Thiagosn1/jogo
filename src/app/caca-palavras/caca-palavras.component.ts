import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { PontuacaoService } from '../pontuacao.service';
import { HttpClientModule } from '@angular/common/http';

interface Palavra {
  palavra: string;
  encontrada: boolean;
}

interface Celula {
  letra: string;
  selecionada: boolean;
  encontrada: boolean;
}

@Component({
  selector: 'app-caca-palavras',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, HttpClientModule],
  templateUrl: './caca-palavras.component.html',
  styleUrls: ['./caca-palavras.component.css'],
})
export class CacaPalavrasComponent implements OnInit, OnDestroy {
  nomeJogador: string = '';
  grade: Celula[][] = [];
  palavras: Palavra[] = [
    { palavra: 'AMAZONIA', encontrada: false },
    { palavra: 'CERRADO', encontrada: false },
    { palavra: 'CAATINGA', encontrada: false },
    { palavra: 'PANTANAL', encontrada: false },
    { palavra: 'PAMPA', encontrada: false },
    { palavra: 'MATA', encontrada: false },
  ];
  selecaoAtual: string = '';
  direcaoAtual: string = '';
  mensagemVitoria: string = '';
  cronometro: number = 0;
  cronometroDisplay: string = '00:00';
  intervalo: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pontuacaoService: PontuacaoService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.nomeJogador = params['nome'] || 'Jogador';
    });
    this.inicializarJogo();
  }

  ngOnDestroy() {
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
  }

  inicializarJogo() {
    this.grade = this.gerarGrade();
    this.palavras.forEach((p) => (p.encontrada = false));
    this.selecaoAtual = '';
    this.direcaoAtual = '';
    this.mensagemVitoria = '';
    this.iniciarCronometro();
  }

  gerarGrade(): Celula[][] {
    const tamanho = 12;
    const grade: Celula[][] = Array(tamanho)
      .fill(null)
      .map(() =>
        Array(tamanho)
          .fill(null)
          .map(() => ({ letra: '', selecionada: false, encontrada: false }))
      );

    this.palavras.forEach((palavra) => {
      const { palavra: p } = palavra;
      let colocada = false;
      while (!colocada) {
        const direcao = Math.floor(Math.random() * 3);
        const x = Math.floor(Math.random() * tamanho);
        const y = Math.floor(Math.random() * tamanho);

        if (this.podeColocarPalavra(grade, p, x, y, direcao)) {
          this.colocarPalavra(grade, p, x, y, direcao);
          colocada = true;
        }
      }
    });

    for (let i = 0; i < tamanho; i++) {
      for (let j = 0; j < tamanho; j++) {
        if (grade[i][j].letra === '') {
          grade[i][j].letra = String.fromCharCode(
            65 + Math.floor(Math.random() * 26)
          );
        }
      }
    }

    return grade;
  }

  podeColocarPalavra(
    grade: Celula[][],
    palavra: string,
    x: number,
    y: number,
    direcao: number
  ): boolean {
    const tamanho = grade.length;
    const comprimento = palavra.length;

    if (direcao === 0 && x + comprimento > tamanho) return false;
    if (direcao === 1 && y + comprimento > tamanho) return false;
    if (
      direcao === 2 &&
      (x + comprimento > tamanho || y + comprimento > tamanho)
    )
      return false;

    for (let i = 0; i < comprimento; i++) {
      let posX = x + (direcao === 0 || direcao === 2 ? i : 0);
      let posY = y + (direcao === 1 || direcao === 2 ? i : 0);
      if (
        grade[posY][posX].letra !== '' &&
        grade[posY][posX].letra !== palavra[i]
      )
        return false;
    }

    return true;
  }

  colocarPalavra(
    grade: Celula[][],
    palavra: string,
    x: number,
    y: number,
    direcao: number
  ) {
    for (let i = 0; i < palavra.length; i++) {
      let posX = x + (direcao === 0 || direcao === 2 ? i : 0);
      let posY = y + (direcao === 1 || direcao === 2 ? i : 0);
      grade[posY][posX].letra = palavra[i];
    }
  }

  selecionarLetra(i: number, j: number) {
    if (this.grade[i][j].selecionada) return;

    if (this.selecaoAtual.length === 0) {
      this.direcaoAtual = '';
    }

    if (this.selecaoAtual.length > 0) {
      const ultimaPosicao = this.encontrarUltimaPosicaoSelecionada();

      if (ultimaPosicao) {
        const [ultimaI, ultimaJ] = ultimaPosicao;

        if (!this.direcaoAtual) {
          if (i === ultimaI && j === ultimaJ + 1) {
            this.direcaoAtual = 'horizontal';
          } else if (i === ultimaI + 1 && j === ultimaJ) {
            this.direcaoAtual = 'vertical';
          } else if (i === ultimaI + 1 && j === ultimaJ + 1) {
            this.direcaoAtual = 'diagonal';
          } else {
            return;
          }
        }

        if (this.direcaoAtual === 'horizontal' && i !== ultimaI) {
          return;
        } else if (this.direcaoAtual === 'vertical' && j !== ultimaJ) {
          return;
        } else if (
          this.direcaoAtual === 'diagonal' &&
          (i !== ultimaI + 1 || j !== ultimaJ + 1)
        ) {
          return;
        }
      }
    }

    this.grade[i][j].selecionada = true;
    this.selecaoAtual += this.grade[i][j].letra;

    const inicioValido = this.palavras.some((p) =>
      p.palavra.startsWith(this.selecaoAtual)
    );

    if (!inicioValido) {
      this.limparSelecao();
      return;
    }

    const palavraEncontrada = this.palavras.find(
      (p) => p.palavra === this.selecaoAtual
    );

    if (palavraEncontrada) {
      palavraEncontrada.encontrada = true;

      this.grade.forEach((linha) =>
        linha.forEach((celula) => {
          if (celula.selecionada) {
            celula.encontrada = true;
            celula.selecionada = false;
          }
        })
      );

      this.selecaoAtual = '';
      this.direcaoAtual = '';

      this.verificarVitoria();
    }
  }

  encontrarUltimaPosicaoSelecionada(): [number, number] | null {
    for (let i = this.grade.length - 1; i >= 0; i--) {
      for (let j = this.grade[i].length - 1; j >= 0; j--) {
        if (this.grade[i][j].selecionada) {
          return [i, j];
        }
      }
    }
    return null;
  }

  limparSelecao() {
    this.grade.forEach((linha) =>
      linha.forEach((celula) => {
        celula.selecionada = false;
      })
    );
    this.selecaoAtual = '';
    this.direcaoAtual = '';
  }

  iniciarCronometro() {
    this.cronometro = 0;
    this.cronometroDisplay = '00:00';
    if (this.intervalo) {
      clearInterval(this.intervalo);
    }
    this.intervalo = setInterval(() => {
      this.cronometro++;
      const minutos = Math.floor(this.cronometro / 60);
      const segundos = this.cronometro % 60;
      this.cronometroDisplay = `${this.pad(minutos)}:${this.pad(segundos)}`;
    }, 1000);
  }

  pad(value: number): string {
    return value < 10 ? `0${value}` : `${value}`;
  }

  calcularPontuacao(): number {
    const pontuacaoInicial = 200;
    const tempoDecorrido = this.cronometro;
    const penalidadePorSegundo = 1; // Penalidade de 1 ponto por segundo

    const pontuacaoFinal = Math.max(
      0,
      pontuacaoInicial - tempoDecorrido * penalidadePorSegundo
    );
    return pontuacaoFinal;
  }

  finalizarJogo() {
    const pontos = this.calcularPontuacao();
    this.pontuacaoService
      .salvarPontuacao(this.nomeJogador, pontos, 'caca-palavras')
      .subscribe({
        next: (response) => {
          console.log('Pontuação salva com sucesso', response);
        },
        error: (error) => {
          console.error('Erro ao salvar pontuação', error);
        },
      });
  }

  verificarVitoria() {
    if (this.palavras.every((p) => p.encontrada)) {
      clearInterval(this.intervalo); // Para o cronômetro
      this.mensagemVitoria = `Parabéns, ${this.nomeJogador}! Você encontrou todas as palavras!`;
      this.finalizarJogo();
    }
  }

  reiniciarJogo() {
    this.inicializarJogo();
  }

  sair() {
    this.router.navigate(['/']);
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { PontuacaoService } from '../pontuacao.service';
import { HttpClientModule } from '@angular/common/http';

interface CartaMemoria {
  id: number;
  nome: string;
  imagem: string;
  virada: boolean;
  encontrada: boolean;
}

@Component({
  selector: 'app-jogo-memoria',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, HttpClientModule],
  templateUrl: './jogo-memoria.component.html',
  styleUrls: ['./jogo-memoria.component.css'],
})
export class JogoMemoriaComponent implements OnInit {
  nomeJogador: string = '';
  cartas: CartaMemoria[] = [];
  cartasViradas: CartaMemoria[] = [];
  mensagem: string = '';
  curiosidade: string = '';
  acertos: number = 0;
  erros: number = 0;
  curiosidades: { [key: string]: string } = {
    Amazônia: 'A Amazônia é a maior floresta tropical do mundo.',
    Cerrado: 'O Cerrado é conhecido como a savana brasileira.',
    'Mata Atlântica':
      'A Mata Atlântica é um dos biomas mais biodiversos do mundo.',
    Caatinga: 'A Caatinga é o único bioma exclusivamente brasileiro.',
    Pampa: 'O Pampa é caracterizado por suas vastas planícies.',
    Pantanal: 'O Pantanal é a maior planície alagável do mundo.',
  };

  constructor(
    private route: ActivatedRoute,
    private pontuacaoService: PontuacaoService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.nomeJogador = params['nome'] || 'Jogador';
    });
    this.inicializarCartas();
  }

  inicializarCartas() {
    const biomas = [
      { nome: 'Amazônia', imagem: 'assets/amazonia.jpg' },
      { nome: 'Cerrado', imagem: 'assets/cerrado.jpg' },
      { nome: 'Mata Atlântica', imagem: 'assets/mata-atlantica.jpeg' },
      { nome: 'Caatinga', imagem: 'assets/caatinga.jpeg' },
      { nome: 'Pampa', imagem: 'assets/pampa.jpeg' },
      { nome: 'Pantanal', imagem: 'assets/pantanal.jpg' },
    ];

    this.cartas = [...biomas, ...biomas].map((bioma, index) => ({
      id: index,
      nome: bioma.nome,
      imagem: bioma.imagem,
      virada: false,
      encontrada: false,
    }));

    this.embaralharCartas();
    this.acertos = 0;
    this.erros = 0;
    this.mensagem = '';
    this.curiosidade = '';
  }

  embaralharCartas() {
    for (let i = this.cartas.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cartas[i], this.cartas[j]] = [this.cartas[j], this.cartas[i]];
    }
  }

  virarCarta(carta: CartaMemoria) {
    if (carta.virada || carta.encontrada || this.cartasViradas.length === 2)
      return;

    carta.virada = true;
    this.cartasViradas.push(carta);

    if (this.cartasViradas.length === 2) {
      setTimeout(() => this.verificarPar(), 1000);
    }
  }

  verificarPar() {
    const [carta1, carta2] = this.cartasViradas;
    if (carta1.nome === carta2.nome) {
      carta1.encontrada = carta2.encontrada = true;
      this.acertos++;
      this.mensagem = `Bioma ${carta1.nome} encontrado!`;
      this.curiosidade = this.curiosidades[carta1.nome];
    } else {
      carta1.virada = carta2.virada = false;
      this.erros++;
      this.mensagem = '';
      this.curiosidade = '';
    }
    this.cartasViradas = [];

    this.verificarVitoria();
  }

  verificarVitoria() {
    if (this.cartas.every((carta) => carta.encontrada)) {
      const pontos = this.acertos * 10 - this.erros * 5;
      this.mensagem = `Parabéns, você encontrou todos os biomas!`;
      this.curiosidade = `Pontuação: ${pontos} pontos.`;

      this.pontuacaoService
        .salvarPontuacao(this.nomeJogador, pontos, 'jogo-memoria')
        .subscribe({
          next: (response) => {
            console.log('Pontuação salva com sucesso', response);
          },
          error: (error) => {
            console.error('Erro ao salvar pontuação', error);
          },
        });
    }
  }

  reiniciarJogo() {
    this.inicializarCartas();
  }
}

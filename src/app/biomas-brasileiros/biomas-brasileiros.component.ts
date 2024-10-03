import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';

interface Desafio {
  pergunta: string;
  respostas: string[];
  respostaCorreta: number;
}

interface Bioma {
  nome: string;
  descricao: string;
  curiosidade1: string;
  desafio1: Desafio;
  curiosidade2: string;
  desafio2: Desafio;
  imagem: string;
}

@Component({
  selector: 'app-biomas-brasileiros',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatProgressBarModule,
  ],
  templateUrl: './biomas-brasileiros.component.html',
  styleUrls: ['./biomas-brasileiros.component.css'],
})
export class BiomasBrasileirosComponent implements OnInit {
  nomeJogador: string = '';
  biomas: Bioma[] = [
    {
      nome: 'Amazônia',
      descricao: 'Maior floresta tropical do mundo, com imensa biodiversidade.',
      curiosidade1: 'A Amazônia possui mais de 40.000 espécies de plantas!',
      desafio1: {
        pergunta:
          'Que animal é conhecido como o "gigante das águas" da Amazônia?',
        respostas: ['Pirarucu', 'Jacaré-açu', 'Boto-cor-de-rosa'],
        respostaCorreta: 0,
      },
      curiosidade2:
        'O Rio Amazonas despeja cerca de 209.000 metros cúbicos de água no Oceano Atlântico por segundo!',
      desafio2: {
        pergunta: 'Quais são as cores da bandeira do estado do Amazonas?',
        respostas: [
          'Verde, amarelo e azul',
          'Vermelho, branco e azul',
          'Verde, branco e vermelho',
        ],
        respostaCorreta: 1,
      },
      imagem: 'assets/amazonia.jpg',
    },
    {
      nome: 'Cerrado',
      descricao: 'Savana tropical com grande diversidade de plantas e animais.',
      curiosidade1: 'O Cerrado é conhecido como o "berço das águas" do Brasil!',
      desafio1: {
        pergunta:
          'Qual árvore símbolo do Cerrado é conhecida por seu tronco retorcido?',
        respostas: ['Ipê', 'Pequizeiro', 'Buriti'],
        respostaCorreta: 1,
      },
      curiosidade2:
        'O Cerrado é o segundo maior bioma da América do Sul, ocupando cerca de 22% do território brasileiro.',
      desafio2: {
        pergunta:
          'Qual fruto típico do Cerrado é conhecido por seu sabor único e é usado em diversos pratos regionais?',
        respostas: ['Pequi', 'Cagaita', 'Araticum'],
        respostaCorreta: 0,
      },
      imagem: 'assets/cerrado.jpg',
    },
    {
      nome: 'Mata Atlântica',
      descricao:
        'Floresta tropical que se estende ao longo da costa brasileira.',
      curiosidade1:
        'A Mata Atlântica abriga mais de 20.000 espécies de plantas!',
      desafio1: {
        pergunta:
          'Qual animal em perigo de extinção é símbolo da Mata Atlântica?',
        respostas: ['Mico-leão-dourado', 'Onça-pintada', 'Lobo-guará'],
        respostaCorreta: 0,
      },
      curiosidade2:
        'Apenas cerca de 7% da cobertura original da Mata Atlântica ainda existe hoje.',
      desafio2: {
        pergunta:
          'Qual é a árvore símbolo da Mata Atlântica, conhecida por sua madeira nobre e que dá nome a um estado brasileiro?',
        respostas: ['Jequitibá', 'Araucária', 'Pau-Brasil'],
        respostaCorreta: 2,
      },
      imagem: 'assets/mata-atlantica.jpeg',
    },
    {
      nome: 'Caatinga',
      descricao:
        'Único bioma exclusivamente brasileiro, caracterizado por sua vegetação adaptada à seca.',
      curiosidade1:
        'A Caatinga possui plantas que podem sobreviver até 3 anos sem chuva!',
      desafio1: {
        pergunta: 'Qual cactus é emblemático da Caatinga?',
        respostas: ['Mandacaru', 'Xique-xique', 'Facheiro'],
        respostaCorreta: 0,
      },
      curiosidade2:
        'O nome "Caatinga" vem do Tupi-Guarani e significa "mata branca".',
      desafio2: {
        pergunta:
          'Qual é o animal símbolo da Caatinga, conhecido por sua resistência à seca?',
        respostas: ['Tatu-bola', 'Asa-branca', 'Preá'],
        respostaCorreta: 0,
      },
      imagem: 'assets/caatinga.jpeg',
    },
    {
      nome: 'Pampa',
      descricao:
        'Região de planícies com campos nativos, também conhecida como campos sulinos.',
      curiosidade1: 'O Pampa abriga mais de 3.000 espécies de plantas!',
      desafio1: {
        pergunta:
          'Qual ave é símbolo do Pampa e está na bandeira do Rio Grande do Sul?',
        respostas: ['Quero-quero', 'João-de-barro', 'Ema'],
        respostaCorreta: 0,
      },
      curiosidade2:
        'O Pampa é o único bioma brasileiro que está presente em apenas um estado.',
      desafio2: {
        pergunta: 'Qual é a bebida típica do Pampa, feita com erva-mate?',
        respostas: ['Tereré', 'Chimarrão', 'Quentão'],
        respostaCorreta: 1,
      },
      imagem: 'assets/pampa.jpeg',
    },
    {
      nome: 'Pantanal',
      descricao: 'Maior planície alagável do mundo, com rica biodiversidade.',
      curiosidade1:
        'O Pantanal é considerado a savana mais preservada do mundo!',
      desafio1: {
        pergunta: 'Qual réptil é considerado o maior predador do Pantanal?',
        respostas: ['Sucuri', 'Jacaré-do-pantanal', 'Iguana'],
        respostaCorreta: 1,
      },
      curiosidade2:
        'O Pantanal funciona como um grande filtro natural de água, purificando-a antes de chegar ao Paraguai.',
      desafio2: {
        pergunta:
          'Qual fenômeno natural ocorre no Pantanal, quando as águas baixam e os peixes ficam concentrados em poças?',
        respostas: ['Piracema', 'Vazante', 'Cheia'],
        respostaCorreta: 1,
      },
      imagem: 'assets/pantanal.jpg',
    },
  ];

  biomaAtual = 0;
  pontos = 0;
  desafioAtual = 1;
  mostrarResposta = false;
  respostaSelecionada: number | null = null;
  jogoFinalizado = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.nomeJogador = params['nome'] || 'Jogador';
    });
  }

  verificarResposta(index: number): void {
    this.respostaSelecionada = index;
    this.mostrarResposta = true;
    const desafioAtual =
      this.desafioAtual === 1
        ? this.biomas[this.biomaAtual].desafio1
        : this.biomas[this.biomaAtual].desafio2;
    if (index === desafioAtual.respostaCorreta) {
      this.pontos += 5;
    }
  }

  proximoDesafio(): void {
    if (this.desafioAtual === 1) {
      this.desafioAtual = 2;
      this.mostrarResposta = false;
      this.respostaSelecionada = null;
    } else {
      this.proximoBioma();
    }
  }

  proximoBioma(): void {
    if (this.biomaAtual < this.biomas.length - 1) {
      this.biomaAtual++;
      this.desafioAtual = 1;
      this.mostrarResposta = false;
      this.respostaSelecionada = null;
    } else {
      this.finalizarJogo();
    }
  }

  finalizarJogo(): void {
    this.jogoFinalizado = true;
  }

  reiniciarJogo(): void {
    this.biomaAtual = 0;
    this.desafioAtual = 1;
    this.pontos = 0;
    this.mostrarResposta = false;
    this.respostaSelecionada = null;
    this.jogoFinalizado = false;
  }

  get progresso(): number {
    return (
      ((this.biomaAtual * 2 + this.desafioAtual) / (this.biomas.length * 2)) *
      100
    );
  }
}

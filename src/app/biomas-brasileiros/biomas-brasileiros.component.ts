import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { PontuacaoService } from '../pontuacao.service';
import { HttpClientModule } from '@angular/common/http';

interface Desafio {
  pergunta: string;
  respostas: string[];
  respostaCorreta: number;
  curiosidade: string;
}

interface Bioma {
  nome: string;
  descricao: string;
  desafios: Desafio[];
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
    HttpClientModule,
  ],
  templateUrl: './biomas-brasileiros.component.html',
  styleUrls: ['./biomas-brasileiros.component.css'],
})
export class BiomasBrasileirosComponent implements OnInit {
  nomeJogador: string = '';
  biomas: Bioma[] = [
    {
      nome: 'Amazônia',
      descricao:
        'Maior floresta tropical do mundo, abrigando uma biodiversidade incomparável e desempenhando um papel crucial na regulação do clima global.',
      desafios: [
        {
          pergunta:
            'Qual é a maior ameaça à biodiversidade da Amazônia atualmente?',
          respostas: [
            'Atividades de turismo sustentável',
            'Aumento das áreas de conservação',
            'Desmatamento e queimadas',
            'Aumento da população indígena',
          ],
          respostaCorreta: 2,
          curiosidade:
            'A Amazônia abriga mais de 40.000 espécies de plantas, incluindo muitas com propriedades medicinais ainda desconhecidas.',
        },
        {
          pergunta:
            'Qual dos seguintes rios é o principal rio que atravessa o bioma Amazônia?',
          respostas: [
            'Rio São Francisco',
            'Rio Tocantins',
            'Rio Paraná',
            'Rio Amazonas',
          ],
          respostaCorreta: 3,
          curiosidade:
            'O Rio Amazonas despeja cerca de 209.000 metros cúbicos de água no Oceano Atlântico por segundo, mais do que os próximos sete maiores rios do mundo combinados!',
        },
        {
          pergunta:
            'Qual é o principal fator responsável pela alta umidade na Amazônia?',
          respostas: [
            'Proximidade com os desertos tropicais',
            'Densa cobertura vegetal que contribui para a evapotranspiração',
            'Ventos secos vindos do oceano Atlântico',
            'Altitude elevada da região',
          ],
          respostaCorreta: 1,
          curiosidade:
            'A Floresta Amazônica produz cerca de 20% do oxigênio do planeta, sendo por isso conhecida como o "pulmão do mundo".',
        },
        {
          pergunta:
            'Qual das características abaixo é típica dos solos da Amazônia?',
          respostas: [
            'Solos muito férteis, ricos em nutrientes',
            'Solos arenosos e pobres em matéria orgânica',
            'Solos profundos, mas geralmente pobres em nutrientes devido à intensa lixiviação',
            'Solos formados principalmente por rochas calcárias',
          ],
          respostaCorreta: 2,
          curiosidade:
            'Apesar dos solos pobres, a Amazônia mantém sua exuberância graças a um ciclo eficiente de reciclagem de nutrientes, onde as próprias plantas e a matéria orgânica em decomposição fornecem os nutrientes necessários.',
        },
      ],
      imagem: 'assets/amazonia.jpg',
    },
    {
      nome: 'Cerrado',
      descricao:
        'O Cerrado é um bioma caracterizado por uma vegetação de savana, onde predominam árvores de pequeno porte, arbustos e gramíneas. Este bioma abriga uma rica biodiversidade, incluindo muitas espécies endêmicas.',
      desafios: [
        {
          pergunta:
            'Qual é uma característica marcante da vegetação do Cerrado?',
          respostas: [
            'Predominância de florestas densas e úmidas',
            'Presença de árvores retorcidas, arbustos e gramíneas',
            'Alta diversidade de plantas aquáticas',
            'Vegetação sempre verde, sem variações sazonais',
          ],
          respostaCorreta: 1, // Índice da resposta correta
          curiosidade:
            'A vegetação do Cerrado é adaptada a períodos de seca, com plantas que possuem raízes profundas para acessar água subterrânea.',
        },
        {
          pergunta:
            'Qual é um dos principais desafios ambientais enfrentados pelo Cerrado atualmente?',
          respostas: [
            'Aumento da biodiversidade',
            'Aumento das áreas de conservação',
            'Proteção de espécies ameaçadas',
            'Urbanização e expansão agrícola',
          ],
          respostaCorreta: 3,
          curiosidade:
            'O Cerrado enfrenta um rápido processo de desmatamento devido à agricultura e à pecuária, o que ameaça sua rica biodiversidade.',
        },
        {
          pergunta: 'Qual é o principal tipo de solo encontrado no Cerrado?',
          respostas: [
            'Solo fértil, rico em nutrientes',
            'Solo arenoso, com alta capacidade de drenagem',
            'Solo ácido, pobre em nutrientes e com alta lixiviação',
            'Solo argiloso, ideal para agricultura intensiva',
          ],
          respostaCorreta: 2,
          curiosidade:
            'Os solos do Cerrado são desafiadores para a agricultura, pois muitas vezes são pobres em nutrientes e requerem correção para serem produtivos.',
        },
        {
          pergunta: 'Qual animal é considerado um símbolo da fauna do Cerrado?',
          respostas: [
            'Tamanduá-bandeira',
            'Arara-azul',
            'Onça-pintada',
            'Lobo-guará',
          ],
          respostaCorreta: 3,
          curiosidade:
            'O lobo-guará é conhecido por sua aparência distinta e por ser o maior canídeo da América do Sul, desempenhando um papel importante na cadeia alimentar do Cerrado.',
        },
      ],
      imagem: 'assets/cerrado.jpg', // Adicione a imagem do Cerrado aqui
    },
    {
      nome: 'Mata Atlântica',
      descricao:
        'A Mata Atlântica é um dos biomas mais ricos em biodiversidade do mundo, abrigando uma grande variedade de fauna e flora. Ela é conhecida por suas florestas densas e montanhosas, além de ser um hotspot de biodiversidade.',
      desafios: [
        {
          pergunta:
            'Em qual região do Brasil a Mata Atlântica está predominantemente localizada?',
          respostas: ['Norte', 'Sul e Sudeste', 'Centro-Oeste', 'Nordeste'],
          respostaCorreta: 1,
          curiosidade:
            'A Mata Atlântica originalmente cobria cerca de 1.3 milhão de km², mas hoje restam apenas cerca de 12% de sua cobertura original.',
        },
        {
          pergunta:
            'Qual dos seguintes animais é encontrado na Mata Atlântica?',
          respostas: ['Arara-azul', 'Tamanduá-bandeira', 'Mico-leão-dourado'],
          respostaCorreta: 2,
          curiosidade:
            'O Mico-leão-dourado é uma espécie ameaçada de extinção e é um símbolo da conservação da Mata Atlântica.',
        },
        {
          pergunta:
            'A Mata Atlântica é conhecida por sua alta biodiversidade. Qual termo descreve melhor essa característica?',
          respostas: [
            'Baixa diversidade de espécies',
            'Floresta homogênea',
            'Hotspot de biodiversidade',
            'Clima desértico',
          ],
          respostaCorreta: 2,
          curiosidade:
            'A Mata Atlântica abriga cerca de 20 mil espécies de plantas e 5 mil espécies de animais, muitas das quais são endêmicas.',
        },
        {
          pergunta:
            'Quais são as principais ameaças à Mata Atlântica atualmente?',
          respostas: [
            'Queimadas controladas e turismo sustentável',
            'Expansão agrícola, urbanização e desmatamento',
            'Chuvas intensas e terremotos',
            'Crescimento de espécies invasoras e degradação natural',
          ],
          respostaCorreta: 1,
          curiosidade:
            'A Mata Atlântica é uma das florestas mais ameaçadas do mundo, com apenas 12% de sua área original restante devido à ação humana.',
        },
      ],
      imagem: 'assets/mata-atlantica.jpeg',
    },
    {
      nome: 'Caatinga',
      descricao:
        'A Caatinga é um bioma exclusivo do Brasil, caracterizado por um clima semiárido e uma vegetação adaptada à escassez de água. Este bioma abriga uma fauna e flora que se adaptaram a condições adversas, como longos períodos de seca.',
      desafios: [
        {
          pergunta:
            'Qual é a principal característica climática do bioma Caatinga?',
          respostas: [
            'Clima tropical úmido',
            'Clima semiárido, com longos períodos de seca',
            'Clima temperado com invernos rigorosos',
            'Clima equatorial com chuvas abundantes',
          ],
          respostaCorreta: 1,
          curiosidade:
            'A Caatinga possui um clima semiárido, com uma média de chuvas de 500 a 800 mm por ano, concentradas em poucos meses.',
        },
        {
          pergunta: 'A vegetação predominante da Caatinga é composta por:',
          respostas: [
            'Árvores de grande porte e floresta densa',
            'Gramíneas e plantas aquáticas',
            'Cactáceas, arbustos espinhosos e plantas adaptadas à seca',
            'Árvores perenes com folhas largas',
          ],
          respostaCorreta: 2,
          curiosidade:
            'A vegetação da Caatinga é composta por plantas xerófitas, que possuem adaptações para conservar água, como cactos e arbustos espinhosos.',
        },
        {
          pergunta: 'Qual das seguintes plantas é típica da Caatinga?',
          respostas: ['Araucária', 'Mandacaru', 'Vitória-régia', 'Samambaia'],
          respostaCorreta: 1,
          curiosidade:
            'O Mandacaru é um cacto típico da Caatinga e pode armazenar água em seu tronco, o que o ajuda a sobreviver em períodos de seca.',
        },
        {
          pergunta:
            'Qual adaptação das plantas da Caatinga é essencial para sobreviver ao clima semiárido?',
          respostas: [
            'Folhas largas e grandes',
            'Troncos finos e altos',
            'Raízes superficiais e pequenas',
            'Espinhos no lugar de folhas para evitar a perda de água',
          ],
          respostaCorreta: 3,
          curiosidade:
            'As plantas da Caatinga, como os cactos, possuem espinhos que reduzem a perda de água e ajudam a protegê-las de herbívoros.',
        },
      ],
      imagem: 'assets/caatinga.jpeg',
    },
    {
      nome: 'Pampa',
      descricao:
        'O Pampa é um bioma característico do sul do Brasil, conhecido por suas extensas pastagens e clima temperado. É uma região de grande importância para a agropecuária e apresenta uma biodiversidade única, com várias espécies de plantas e animais adaptados às condições do campo.',
      desafios: [
        {
          pergunta: 'Em qual região do Brasil está localizado o Bioma Pampa?',
          respostas: ['Norte', 'Nordeste', 'Centro-Oeste', 'Sul'],
          respostaCorreta: 3,
          curiosidade:
            'O Pampa é um bioma exclusivo do Brasil, localizado principalmente no Rio Grande do Sul, mas também se estendendo por partes do Uruguai e Argentina.',
        },
        {
          pergunta: 'Qual é a principal atividade econômica no Bioma Pampa?',
          respostas: [
            'Extração de madeira',
            'Mineração de ferro',
            'Pecuária e agricultura',
            'Produção de energia hidrelétrica',
          ],
          respostaCorreta: 2,
          curiosidade:
            'A pecuária, especialmente a criação de gado, é uma das principais atividades econômicas do Pampa, aproveitando as vastas pastagens disponíveis.',
        },
      ],
      imagem: 'assets/pampa.jpeg',
    },
    {
      nome: 'Pantanal',
      descricao:
        'O Pantanal é a maior planície alagável do mundo, localizado principalmente no Brasil, e é conhecido por sua rica biodiversidade e ecossistemas variados. Este bioma abriga uma grande variedade de fauna e flora, sendo um dos mais importantes do planeta.',
      desafios: [
        {
          pergunta: 'O Pantanal é conhecido por ser:',
          respostas: [
            'A maior planície alagável do mundo',
            'Uma área desértica e árida',
            'Uma floresta tropical densa',
            'Um bioma predominantemente montanhoso',
          ],
          respostaCorreta: 0,
          curiosidade:
            'O Pantanal cobre uma área de aproximadamente 150 mil quilômetros quadrados, abrigando uma grande diversidade de espécies de plantas e animais.',
        },
        {
          pergunta: 'Qual animal é símbolo da fauna do Pantanal?',
          respostas: [
            'Mico-leão-dourado',
            'Onça-pintada',
            'Lobo-guará',
            'Tatu-bola',
          ],
          respostaCorreta: 1,
          curiosidade:
            'A onça-pintada é o maior felino das Américas e desempenha um papel crucial como predador no ecossistema do Pantanal.',
        },
        {
          pergunta:
            'Qual dos seguintes animais é típico do Pantanal e está ameaçado de extinção?',
          respostas: [
            'Tamanduá-bandeira',
            'Arara-azul',
            'Jaguatirica',
            'Lobo-guará',
          ],
          respostaCorreta: 1,
          curiosidade:
            'A arara-azul, além de ser uma espécie ameaçada, é um ícone da avifauna brasileira, conhecida por suas cores vibrantes.',
        },
        {
          pergunta: 'Qual é o impacto das queimadas ilegais no Pantanal?',
          respostas: [
            'Aumento da fertilidade do solo',
            'Redução da biodiversidade e destruição de habitats',
            'Expansão das áreas alagadas',
            'Diminuição da quantidade de chuvas',
          ],
          respostaCorreta: 1,
          curiosidade:
            'As queimadas ilegais têm devastado grandes áreas do Pantanal, resultando em perda de habitat e ameaça a várias espécies.',
        },
      ],
      imagem: 'assets/pantanal.jpg',
    },

    /* 
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
    }, */
  ];

  biomaAtual = 0;
  pontos = 0;
  desafioAtual = 0;
  mostrarResposta = false;
  respostaSelecionada: number | null = null;
  jogoFinalizado = false;
  tipoJogo: string = 'quiz';
  curiosidadeResposta: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pontuacaoService: PontuacaoService
  ) {}

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.nomeJogador = params['nome'] || 'Jogador';
      this.tipoJogo = params['tipo'] || 'quiz';

      if (this.tipoJogo !== 'quiz') {
        this.router.navigate([`/${this.tipoJogo}`], {
          queryParams: { nome: this.nomeJogador },
        });
      }
    });
  }

  verificarResposta(index: number): void {
    this.respostaSelecionada = index;
    this.mostrarResposta = true;

    const desafioAtual =
      this.biomas[this.biomaAtual].desafios[this.desafioAtual];
    if (index === desafioAtual.respostaCorreta) {
      this.pontos += 5;
    }

    this.curiosidadeResposta = desafioAtual.curiosidade;
  }

  proximoDesafio(): void {
    setTimeout(() => {
      if (
        this.desafioAtual <
        this.biomas[this.biomaAtual].desafios.length - 1
      ) {
        this.desafioAtual++;
        this.mostrarResposta = false;
        this.respostaSelecionada = null;
      } else {
        this.proximoBioma();
      }
    }, 500);
  }

  proximoBioma(): void {
    if (this.biomaAtual < this.biomas.length - 1) {
      this.biomaAtual++;
      this.desafioAtual = 0;
      this.mostrarResposta = false;
      this.respostaSelecionada = null;
    } else {
      this.finalizarJogo();
    }
  }

  finalizarJogo(): void {
    this.jogoFinalizado = true;
    this.salvarPontuacao();
  }

  salvarPontuacao() {
    this.pontuacaoService
      .salvarPontuacao(this.nomeJogador, this.pontos, this.tipoJogo)
      .subscribe({
        next: (response) => {
          console.log('Pontuação salva com sucesso', response);
        },
        error: (error) => {
          console.error('Erro ao salvar pontuação', error);
        },
      });
  }

  reiniciarJogo(): void {
    this.biomaAtual = 0;
    this.desafioAtual = 0;
    this.pontos = 0;
    this.mostrarResposta = false;
    this.respostaSelecionada = null;
    this.jogoFinalizado = false;
  }

  get progresso(): number {
    return (
      ((this.biomaAtual * this.biomas[this.biomaAtual].desafios.length +
        this.desafioAtual) /
        (this.biomas.length * this.biomas[this.biomaAtual].desafios.length)) *
      100
    );
  }

  sair(): void {
    this.router.navigate(['/']);
  }
}

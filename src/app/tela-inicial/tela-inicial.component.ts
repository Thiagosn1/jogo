import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tela-inicial',
  standalone: true,
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule],
  templateUrl: './tela-inicial.component.html',
  styleUrls: ['./tela-inicial.component.css'],
})
export class TelaInicialComponent {
  nomeJogador: string = '';

  constructor(private router: Router) {}

  iniciarJogo() {
    if (this.nomeJogador.trim()) {
      this.router.navigate(['/jogo']);
    } else {
      alert('Por favor, digite seu nome para começar.');
    }
  }
}

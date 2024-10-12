import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PontuacaoService {
  private apiUrl = 'https://670ae107ac6860a6c2cabf4d.mockapi.io/api/scores';

  constructor(private http: HttpClient) {}

  // Método para salvar pontuação
  salvarPontuacao(
    nome: string,
    pontuacao: number,
    tipoJogo: string
  ): Observable<any> {
    const score = {
      nome,
      pontuacao,
      tipoJogo,
    };

    return this.http.post(this.apiUrl, score);
  }

  // Método para obter as pontuações (caso precise exibir um ranking)
  obterPontuacoes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}

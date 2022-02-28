import { take } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoboService {

  private readonly API = `${environment.API}bot`

  constructor(private http: HttpClient) { }

  postar(username: string, categoria: string) {
    return this.http.get(`${this.API}/postar/${categoria}/${username}`, { responseType: 'text' }).pipe(take(1));
  }

  verificarContas(username: string) {
    return this.http.get(`${this.API}/verificarcontas/${username}`, { responseType: 'text' }).pipe(take(1));
  }

  cadastrarGanhar(username: string){
    return this.http.get(`${this.API}/cadastrarGanhar/${username}`, { responseType: 'text' }).pipe(take(1));

  }
}

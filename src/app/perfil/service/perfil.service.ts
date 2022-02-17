import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Perfil } from 'src/app/model/perfil';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  private readonly API = `${environment.API}perfil`

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Perfil[]>(this.API).pipe(take(1));
  }

  gerByUsername(username: string){

    return this.http.get<Perfil>(`${this.API}/${username}`).pipe(take(1));
  }

  salvar(perfil: Perfil) {

    return this.http.post(this.API, JSON.stringify(perfil), { headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text' }).pipe(take(1));
  }

  atualizar(perfil: Perfil) {

    return this.http.put(`${this.API}/atualizar`, JSON.stringify(perfil), { headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text' }).pipe(take(1));
  }
}

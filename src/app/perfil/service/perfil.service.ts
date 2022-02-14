import { take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

  salvar(perfil: Perfil) {

    return this.http.post(this.API, JSON.stringify(perfil), { headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text' }).pipe(take(1));
  }
}

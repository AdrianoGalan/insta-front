import { PerfilGerado } from './../../model/perfilGerado';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PerfilGeradoService {

  private readonly API = `${environment.API}perfil/criar`

  constructor(private http: HttpClient) { }

  gerar(genero: string) {
    return this.http.get<PerfilGerado>(`${this.API}/${genero}`).pipe(take(1));
  }
}

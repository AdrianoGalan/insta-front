import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';

import { Categoria } from './../../model/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private readonly API = `${environment.API}categoria`

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Categoria[]>(this.API).pipe(take(1));
  }
}

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Hashtag } from 'src/app/model/hashtag';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HashtagService {


  private readonly API = `${environment.API}hashtag`

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Hashtag[]>(this.API).pipe(take(1));
  }

  gerar(categoria: string) {

    return this.http.get(`${this.API}/gerar/${categoria}`, {responseType: 'text'}).pipe(take(1));
  }

  salvar(hashtag: Hashtag) {


    return this.http.post(this.API, JSON.stringify(hashtag), { headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text' }).pipe(take(1));
  }

  deletar(idHashtag: string){

    return this.http.delete(`${this.API}/deletar/${idHashtag}`,{ responseType: 'text'} ).pipe(take(1));

  }
}

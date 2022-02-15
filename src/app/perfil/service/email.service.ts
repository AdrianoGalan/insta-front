import { take } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Email } from 'src/app/model/email';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private readonly API = `${environment.API}email`

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Email[]>(this.API).pipe(take(1));
  }

  salvar(email: Email) {

    return this.http.post(this.API, JSON.stringify(email), { headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text' }).pipe(take(1));
  }
}

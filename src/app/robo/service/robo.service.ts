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
    return this.http.get(`${this.API}/postar/${categoria}/${username}`).pipe(take(1));
  }
}

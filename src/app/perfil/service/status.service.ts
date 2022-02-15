import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { take } from 'rxjs';
import { Status } from 'src/app/model/status';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  private readonly API = `${environment.API}email/status`

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get<Status[]>(this.API).pipe(take(1));
  }

  salvar(status: Status) {

    return this.http.post(this.API, JSON.stringify(status), { headers: new HttpHeaders().set('Content-Type', 'application/json'), responseType: 'text' }).pipe(take(1));
  }
}

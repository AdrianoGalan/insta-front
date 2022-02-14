import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/model/perfil';
import { PerfilService } from '../service/perfil.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  perfil$!: Observable<Perfil[]>

  constructor(
    private perfilSeervice: PerfilService
  ) { }

  ngOnInit(): void {

    this.perfil$ = this.perfilSeervice.list();

  }

  onAtualizar(perfil: Perfil){

  }

}

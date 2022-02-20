import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Perfil } from 'src/app/model/perfil';
import { PerfilService } from '../service/perfil.service';
import { Status } from 'src/app/model/status';
import { StatusService } from '../service/status.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {

  perfil$!: Observable<Perfil[]>
  status$!: Observable<Status[]>;
  inputStatus!: Status;

  constructor(
    private perfilSeervice: PerfilService,
    private statusSevice: StatusService
  ) { }

  ngOnInit(): void {



    this.perfil$ = this.perfilSeervice.listDifBloqueado('2');
    this.status$ = this.statusSevice.list();

    this.status$.forEach(element => {
      console.log(element)
    });



  }
  onListar(){
    this.perfil$ = this.perfilSeervice.list();
  }

  onFiltrar(){

    if(this.inputStatus){



    console.log(this.inputStatus);
    this.perfil$ = this.perfilSeervice.listByStatus(this.inputStatus.id);
    }else{
      console.log("escolhe filho da puta  ")
    }
  }

}

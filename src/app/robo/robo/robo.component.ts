import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Perfil } from 'src/app/model/perfil';
import { Status } from 'src/app/model/status';
import { EmailService } from 'src/app/perfil/service/email.service';
import { PerfilGeradoService } from 'src/app/perfil/service/perfil-gerado.service';
import { PerfilService } from 'src/app/perfil/service/perfil.service';
import { StatusService } from 'src/app/perfil/service/status.service';
import { RoboService } from '../service/robo.service';



@Component({
  selector: 'app-robo',
  templateUrl: './robo.component.html',
  styleUrls: ['./robo.component.css']
})
export class RoboComponent implements OnInit {

  formulario!: FormGroup;
  bsModalRef!: BsModalRef;
  perfil$!: Observable<Perfil[]>;
  submitted: boolean = false;
  perfil!: Perfil;
  status!: Status;

  constructor(
    private formBuilder: FormBuilder,
    private perfilService: PerfilService,
    private roboService: RoboService

  ) {
    this.perfil$ = this.perfilService.listDifBloqueado('2');


   }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({

      perfil: [null, [Validators.required, Validators.minLength(1)]],
      categoria: [null, [Validators.required, Validators.minLength(1)]]

    });
  }

  onPostar(){

    this.roboService.postar(this.formulario.value['perfil'], this.formulario.value['categoria']).subscribe(
      success => {

        console.log("foi")
      },
      erro => {


        console.log("deu merda")
      }
    )


  }


  hasError(field: string) {


    return this.formulario.get(field)?.errors

  }

}

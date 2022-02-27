import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Perfil } from 'src/app/model/perfil';
import { Status } from 'src/app/model/status';
import { PerfilService } from 'src/app/perfil/service/perfil.service';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

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
    private roboService: RoboService,
    private modalService: BsModalService

  ) {
    this.perfil$ = this.perfilService.listDifBloqueado('2');


   }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({

      perfil: [null, [Validators.required, Validators.minLength(1)]],
      categoria: [null, [Validators.required, Validators.minLength(1)]]

    });
  }

  onVerificar(){

    this.roboService.verificarContas(this.formulario.value['perfil']).subscribe(
      success => {

        this.formulario.reset();
      },
      erro => {

        this.handleError('Erro ao Postar');

      }
    )

  }

  onPostar(){

    this.roboService.postar(this.formulario.value['perfil'], this.formulario.value['categoria']).subscribe(
      success => {

        this.formulario.reset();
      },
      erro => {

        this.handleError('Erro ao Postar');

      }
    )


  }

  handleError(msg: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = msg;
  }

  hasError(field: string) {


    return this.formulario.get(field)?.errors

  }

}

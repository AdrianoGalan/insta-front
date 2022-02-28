import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { map, mapTo, Observable, tap } from 'rxjs';
import { Perfil } from 'src/app/model/perfil';
import { Status } from 'src/app/model/status';
import { PerfilService } from 'src/app/perfil/service/perfil.service';
import { StatusService } from 'src/app/perfil/service/status.service';
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
  status$!: Observable<Status[]>;
  inputStatus!: Status;

  constructor(
    private formBuilder: FormBuilder,
    private perfilService: PerfilService,
    private roboService: RoboService,
    private modalService: BsModalService,
    private statusSevice: StatusService

  ) {

    this.status$ = this.statusSevice.list();

    this.status$.forEach(element => {
      for (const st of element) {
        if (st.status == 'Criado') {
          this.inputStatus = st
          this.perfil$ = this.perfilService.listByStatus(this.inputStatus.id);
        }
      }
    });


  }

  ngOnInit(): void {


    // this.perfil$ = this.perfilService.listByStatus(this.inputStatus.id);

    this.formulario = this.formBuilder.group({

      perfil: [null, [Validators.required, Validators.minLength(1)]],
      categoria: [null, [Validators.required, Validators.minLength(1)]]

    });
  }

  onVerificar() {

    this.roboService.verificarContas(this.formulario.value['perfil']).subscribe(
      success => {

        this.formulario.reset();
      },
      erro => {

        this.handleError('Erro ao Postar');

      }
    )

  }

  onPostar() {

    if (this.formulario.valid) {
      this.roboService.postar(this.formulario.value['perfil'], this.formulario.value['categoria']).subscribe(
        success => {

          this.formulario.reset();
        },
        erro => {

          this.handleError('Erro ao Postar');

        }
      )
    }

  }

  onFiltrar() {

    if (this.inputStatus) {

      console.log(this.inputStatus)
      this.perfil$ = this.perfilService.listByStatus(this.inputStatus.id);
    }

  }

  onCadastrar() {

    if (this.formulario.value['perfil']) {
      this.roboService.cadastrarGanhar(this.formulario.value['perfil']).subscribe(
        success => {

          this.formulario.reset();
        },
        erro => {

          this.handleError('Erro ao Postar');

        }
      )
    }
  }

  onListar() {

    this.perfil$ = this.perfilService.listDifBloqueado('2');

  }

  handleError(msg: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = msg;
  }

  hasError(field: string) {


    return this.formulario.get(field)?.errors

  }

  compararSelect(obj1: Status, obj2: Status) {

    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2

  }

}

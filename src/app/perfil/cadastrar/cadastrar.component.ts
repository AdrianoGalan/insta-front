import { StatusService } from './../service/status.service';
import { NovoStatusComponent } from './../novo-status/novo-status.component';
import { PerfilService } from './../service/perfil.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Email } from 'src/app/model/email';
import { Perfil } from 'src/app/model/perfil';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

import { EmailService } from '../service/email.service';
import { NovoEmailComponent } from './../novo-email/novo-email.component';
import { Status } from 'src/app/model/status';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  formulario!: FormGroup;
  bsModalRef!: BsModalRef;
  email$!: Observable<Email[]>;
  status$!: Observable<Status[]>;
  submitted: boolean = false

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private router: Router,
    private modalService: BsModalService,
    private perfilService: PerfilService,
    private statusSevice: StatusService
  ) { }

  ngOnInit(): void {

    this.email$ = this.emailService.list();
    this.status$ = this.statusSevice.list();

    this.formulario = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(1)]],
      senha: [null, [Validators.required, Validators.minLength(1)]],
      status: [null, [Validators.required, Validators.minLength(1)]],
      email: [null, [Validators.required, Validators.minLength(1)]],
      nome: [null, [Validators.required, Validators.minLength(1)]],
      sobrenome: [null, [Validators.required, Validators.minLength(1)]],
      genero: [null, [Validators.required]],
      dataCriacao: [null, [Validators.required]],
      numeroSeguidor: [null, [Validators.required]],
      numeroSeguindo: [null, [Validators.required]]



    });
  }

  onSubmit() {


    this.submitted = true
    if (this.formulario.valid) {

      let perfil: Perfil = new Perfil()

      perfil.username = this.formulario.value['username'];
      perfil.email = this.formulario.value['email'];
      perfil.status = this.formulario.value['status'];
      perfil.nome = this.formulario.value['nome'];
      perfil.sobreNome = this.formulario.value['sobrenome'];
      perfil.genero = this.formulario.value['genero'];
      perfil.dataCriacao = this.formulario.value['dataCriacao'];
      perfil.numeroSeguidor = this.formulario.value['numeroSeguidor'];
      perfil.numeroSeguindo = this.formulario.value['numeroSeguindo'];

      this.perfilService.salvar(perfil).subscribe(

        success => {

          this.formulario.reset();
          this.router.navigate(['perfil']);

        },
        erro => {


          this.handleError('Erro ao salvar');

        }

      );


    }
  }

  addEmail() {


    this.bsModalRef = this.modalService.show(NovoEmailComponent);
  }

  atualizarListaEmail() {

    this.email$ = this.emailService.list();
  }

  addStatus(){

    this.bsModalRef = this.modalService.show(NovoStatusComponent);

  }
  atualizarListaStatus(){

    this.status$ = this.statusSevice.list();

  }

  hasError(field: string) {


    return this.formulario.get(field)?.errors

  }

  handleError(msg: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = msg;
  }

}

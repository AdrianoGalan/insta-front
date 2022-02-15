import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subscription } from 'rxjs';
import { Email } from 'src/app/model/email';
import { Perfil } from 'src/app/model/perfil';
import { Status } from 'src/app/model/status';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

import { EmailService } from '../service/email.service';
import { NovoEmailComponent } from './../novo-email/novo-email.component';
import { NovoStatusComponent } from './../novo-status/novo-status.component';
import { PerfilService } from './../service/perfil.service';
import { StatusService } from './../service/status.service';

@Component({
  selector: 'app-atualizar',
  templateUrl: './atualizar.component.html',
  styleUrls: ['./atualizar.component.css']
})
export class AtualizarComponent implements OnInit {

  inscricao: Subscription;
  formulario!: FormGroup;
  bsModalRef!: BsModalRef;
  email$!: Observable<Email[]>;
  status$!: Observable<Status[]>;
  submitted: boolean = false;
  perfil: Perfil;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private perfilService: PerfilService,
    private statusSevice: StatusService
  ) {

    this.perfil = new Perfil();

    this.inscricao = this.route.params.subscribe(
      (params: any) => {

        let username = params['username'];


        this.perfilService.gerByUsername(username).subscribe(
          p => {
            this.perfil = p ;
            this.povoar();

          }
        );

      }
    );

  }

  povoar(){

    this.formulario.get('username')?.setValue(this.perfil.username);
    this.formulario.controls['senha'].setValue(this.perfil.senha);
    this.formulario.controls['dispositivo'].setValue(this.perfil.dispositivo);
    this.formulario.get('email')?.setValue(this.perfil.email.email);
    this.formulario.get('status')?.setValue(this.perfil.status.status);
    this.formulario.controls['nome'].setValue(this.perfil.nome);
    this.formulario.controls['sobrenome'].setValue(this.perfil.sobreNome);
    this.formulario.controls['numeroSeguidor'].setValue(this.perfil.numeroSeguidor);
    this.formulario.controls['numeroSeguindo'].setValue(this.perfil.numeroSeguindo);
    this.formulario.controls['dataCriacao'].setValue(this.perfil.dataCriacao);
    this.formulario.controls['genero'].setValue(this.perfil.genero);

  }

  ngOnInit(): void {

    this.email$ = this.emailService.list();
    this.status$ = this.statusSevice.list();

    this.formulario = this.formBuilder.group({
      username: [null, [Validators.required, Validators.minLength(1)]],
      senha: [null, [Validators.required, Validators.minLength(1)]],
      dispositivo: [null, [Validators.required, Validators.minLength(1)]],
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



      this.perfil.username = this.formulario.value['username'];
      this.perfil.senha = this.formulario.value['senha'];
      this.perfil.dispositivo = this.formulario.value['dispositivo'];
      this.perfil.email = this.formulario.value['email'];
      this.perfil.status = this.formulario.value['status'];
      this.perfil.nome = this.formulario.value['nome'];
      this.perfil.sobreNome = this.formulario.value['sobrenome'];
      this.perfil.genero = this.formulario.value['genero'];
      this.perfil.dataCriacao = this.formulario.value['dataCriacao'];
      this.perfil.numeroSeguidor = this.formulario.value['numeroSeguidor'];
      this.perfil.numeroSeguindo = this.formulario.value['numeroSeguindo'];

      this.perfilService.salvar(this.perfil).subscribe(

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

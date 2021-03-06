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

  inscricao!: Subscription;
  formulario!: FormGroup;
  bsModalRef!: BsModalRef;
  email$!: Observable<Email[]>;
  status$!: Observable<Status[]>;
  submitted: boolean = false;
  perfil!: Perfil;

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

            this.perfil = p
            this.povoar(p)

          }
        );

      }
    );




  }

  povoar(p: Perfil) {



    this.formulario.controls['username'].setValue(p.username);
    this.formulario.controls['senha'].setValue(p.senha);
    this.formulario.controls['dispositivo'].setValue(p.dispositivo);
    this.formulario.controls['email'].setValue(p.email);
    this.formulario.controls['status'].setValue(p.status);
    this.formulario.controls['nome'].setValue(p.nome);
    this.formulario.controls['sobrenome'].setValue(p.sobreNome);
    this.formulario.controls['numeroSeguidor'].setValue(p.numeroSeguidor);
    this.formulario.controls['numeroSeguindo'].setValue(p.numeroSeguindo);
    this.formulario.controls['dataCriacao'].setValue(p.dataCriacao);
    this.formulario.controls['genero'].setValue(p.genero);
    this.formulario.controls['qualidade'].setValue(p.qualidade);

    this.formulario.controls['dataBloqueio'].setValue(p.dataBloqueio);
    this.formulario.controls['dataInicioTrabalho'].setValue(p.dataInicioTrabalho);
    this.formulario.controls['dataCadastro'].setValue(p.dataCadastro);





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
      qualidade: [null, [Validators.required]],
      dataCriacao: [null, [Validators.required]],
      numeroSeguidor: [null, [Validators.required]],
      numeroSeguindo: [null, [Validators.required]],

      dataBloqueio: [null],
      dataInicioTrabalho: [null ],
      dataCadastro: [null]



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
      this.perfil.qualidade = this.formulario.value['qualidade'];
      this.perfil.dataCriacao = this.formulario.value['dataCriacao'];
      this.perfil.numeroSeguidor = this.formulario.value['numeroSeguidor'];
      this.perfil.numeroSeguindo = this.formulario.value['numeroSeguindo'];
      this.perfil.dataBloqueio = this.formulario.value['dataBloqueio'],
      this.perfil.dataInicioTrabalho = this.formulario.value['dataInicioTrabalho'],
      this.perfil.dataCadastro = this.formulario.value['dataCadastro'],

      this.perfilService.atualizar(this.perfil).subscribe(

        success => {

          this.formulario.reset();
          this.perfilService.backup().subscribe();
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

  addStatus() {

    this.bsModalRef = this.modalService.show(NovoStatusComponent);

  }
  atualizarListaStatus() {

    this.status$ = this.statusSevice.list();

  }

  hasError(field: string) {


    return this.formulario.get(field)?.errors

  }
  compararSelect(obj1: any, obj2: any) {

    return obj1 && obj2 ? (obj1.id === obj2.id) : obj1 === obj2

  }

  handleError(msg: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = msg;
  }

}

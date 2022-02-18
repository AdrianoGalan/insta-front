import { PerfilGerado } from './../../model/perfilGerado';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Email } from 'src/app/model/email';
import { Perfil } from 'src/app/model/perfil';
import { Status } from 'src/app/model/status';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

import { EmailService } from '../service/email.service';
import { PerfilService } from './../service/perfil.service';
import { StatusService } from './../service/status.service';
import { PerfilGeradoService } from '../service/perfil-gerado.service';

@Component({
  selector: 'app-gerar-perfil',
  templateUrl: './gerar-perfil.component.html',
  styleUrls: ['./gerar-perfil.component.css']
})
export class GerarPerfilComponent implements OnInit {

  formulario!: FormGroup;
  bsModalRef!: BsModalRef;
  email$!: Observable<Email[]>;
  submitted: boolean = false;
  perfil: Perfil;
  status!: Status;



  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private router: Router,
    private modalService: BsModalService,
    private perfilService: PerfilService,
    private statusSevice: StatusService,
    private perfilGeradoService: PerfilGeradoService
  ) {

    this.perfil = new Perfil()
    this.email$ = this.emailService.list();

    this.statusSevice.getStatus('Criado').subscribe(
      s => {

        this.status = s
        this.perfil.status = s


      }
    );
  }
  ngOnInit(): void {

    this.formulario = this.formBuilder.group({

      email: [null, [Validators.required, Validators.minLength(1)]],
      username: [null],
      genero: [null, [Validators.required]]

    });

  }

  onSubmit() {


    this.submitted = true
    if (this.formulario.valid) {


      this.perfil.dispositivo = 'novo';
      this.perfil.numeroSeguidor = '0';
      this.perfil.numeroSeguindo = '0';
      this.perfil.username = this.formulario.value['username']

      console.log(this.perfil)

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


  hasError(field: string) {


    return this.formulario.get(field)?.errors

  }

  onGerarPerfil() {

    this.submitted = true


    if (this.formulario.valid) {

      this.perfil.email = this.formulario.value['email'];
      this.perfil.genero = this.formulario.value['genero'];


      this.perfilGeradoService.gerar(this.perfil.genero).subscribe(
        p => {

          this.perfil.nome = p.nome;
          this.perfil.sobreNome = p.sobrenome;
          this.perfil.dataCriacao = p.dataCriacao;
          this.perfil.senha = p.senha;

          this.formulario.controls['username'].setValue(p.username);

        }
      );





    }

  }

  handleError(msg: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = msg;
  }

}

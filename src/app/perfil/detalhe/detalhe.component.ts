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
  selector: 'app-detalhe',
  templateUrl: './detalhe.component.html',
  styleUrls: ['./detalhe.component.css']
})
export class DetalheComponent implements OnInit {

  inscricao!: Subscription;
  formulario!: FormGroup;
  bsModalRef!: BsModalRef;
  email$!: Observable<Email[]>;
  status$!: Observable<Status[]>;
  submitted: boolean = false;
  perfil$!: Observable<Perfil>;

  constructor(
    private formBuilder: FormBuilder,
    private emailService: EmailService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService,
    private perfilService: PerfilService,
    private statusSevice: StatusService
  ) {



    this.inscricao = this.route.params.subscribe(
      (params: any) => {

        let username = params['username'];


        this.perfil$ = this.perfilService.gerByUsername(username);

      }
    );

   }

  ngOnInit(): void {
  }


  onStatus(p: Perfil, sta: string){

    p.status.status = sta

    p.status.id = '-1'

    this.perfilService.status(p).subscribe(

      success => {

        //  this.perfil$ = this.perfilService.gerByUsername(p.username);

      },
      erro => {


        this.handleError('Erro ao salvar');

      }

    );

  }

  handleError(msg: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = msg;
  }

}

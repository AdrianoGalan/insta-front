import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Email } from 'src/app/model/email';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

import { EmailService } from '../service/email.service';

@Component({
  selector: 'app-novo-email',
  templateUrl: './novo-email.component.html',
  styleUrls: ['./novo-email.component.css']
})
export class NovoEmailComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private emailService: EmailService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({

      email: [null, [Validators.required, Validators.minLength(3)]]


    });

  }

  onSubmit() {

    if (this.formulario.valid) {




      let email: Email = new Email();
      email.email = this.formulario.value['email'];

      this.emailService.salvar(email).subscribe(
        success => {


          this.bsModalRef.hide();
        },
        erro => {

          this.handleError('Erro ao salvar');

        }
      )
    }


  }

  handleError(msg: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = msg;
  }

}

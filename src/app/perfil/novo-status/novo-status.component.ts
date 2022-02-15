import { StatusService } from './../service/status.service';
import { Component, OnInit } from '@angular/core';

import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Status } from 'src/app/model/status';

@Component({
  selector: 'app-novo-status',
  templateUrl: './novo-status.component.html',
  styleUrls: ['./novo-status.component.css']
})
export class NovoStatusComponent implements OnInit {




  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private statusService: StatusService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {

    this.formulario = this.formBuilder.group({

      status: [null, [Validators.required, Validators.minLength(3)]]


    });
  }


  onSubmit() {

    if (this.formulario.valid) {




      let status: Status = new Status();
      status.status = this.formulario.value['status'];

      this.statusService.salvar(status).subscribe(
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

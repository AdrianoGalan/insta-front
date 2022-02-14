import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { Categoria } from './../../model/categoria';
import { CategoriaService } from './../service/categoria.service';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-nova-categoria',
  templateUrl: './nova-categoria.component.html',
  styleUrls: ['./nova-categoria.component.css']
})
export class NovaCategoriaComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public bsModalRef: BsModalRef,
    private categoriaService: CategoriaService,
    private modalService: BsModalService
  ) {

    this.formulario = this.formBuilder.group({

      nome: [null, [Validators.required, Validators.minLength(3)]]


    });

   }

  ngOnInit(): void {


  }

  onSubmit(){

    if (this.formulario.valid) {




      let categoria: Categoria = new Categoria();
      categoria.nome = this.formulario.value['nome'];

      this.categoriaService.salvar(categoria).subscribe(
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

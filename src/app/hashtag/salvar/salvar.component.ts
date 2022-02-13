import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Categoria } from 'src/app/model/categoria';
import { Hashtag } from 'src/app/model/hashtag';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

import { CategoriaService } from '../service/categoria.service';
import { HashtagService } from '../service/hashtag.service';

@Component({
  selector: 'app-salvar',
  templateUrl: './salvar.component.html',
  styleUrls: ['./salvar.component.css']
})
export class SalvarComponent implements OnInit {

  formulario!: FormGroup;
  bsModalRef!: BsModalRef;
  categoria$!: Observable<Categoria[]>;
  has!: Hashtag;

  constructor(
    private serviceCategoria: CategoriaService,
    private serviceHashtag: HashtagService,
    private formBuilder: FormBuilder,
    private router: Router,
    private modalService: BsModalService

  ) { }

  ngOnInit(): void {

    this.categoria$ = this.serviceCategoria.list();

    this.formulario = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.minLength(1)]],
      categoria: [null, Validators.required],

    });
  }

  onSubmit(){




    if (this.formulario.valid) {

      this.has = new Hashtag();
      this.has.nome = this.formulario.value['nome'];
      this.has.categoria = this.formulario.value['categoria']

      this.serviceHashtag.salvar(this.has).subscribe(

        success => {

          this.formulario.reset();
          this.router.navigate(['hashtag']);

        },
        erro => {


          this.handleError('Erro ao salvar');

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

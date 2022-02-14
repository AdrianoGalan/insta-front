import { CategoriaService } from './../service/categoria.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Categoria } from './../../model/categoria';
import { Observable, take } from 'rxjs';
import { HashtagService } from './../service/hashtag.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-gerar',
  templateUrl: './gerar.component.html',
  styleUrls: ['./gerar.component.css'],
})
export class GerarComponent implements OnInit {
  geradas!: Observable<string>;
  categoria$!: Observable<Categoria[]>;
  formulario!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private serviceCategoria: CategoriaService,
    private hashtagService: HashtagService
  ) {}

  ngOnInit(): void {
    this.categoria$ = this.serviceCategoria.list();

    this.formulario = this.formBuilder.group({
      hashtag: [null],
      categoria: [null, [Validators.required, Validators.minLength(1)]],
    });
  }
  onSubmit() {
    if (this.formulario.valid) {
      let cat: Categoria = this.formulario.value['categoria'];

      this.hashtagService
        .gerar(cat.id)
        .subscribe((has) => this.formulario.controls['hashtag'].setValue(has));
    }
  }
}

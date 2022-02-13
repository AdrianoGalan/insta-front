import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Observable } from 'rxjs';
import { Hashtag } from 'src/app/model/hashtag';
import { AlertModalComponent } from 'src/app/shared/alert-modal/alert-modal.component';

import { HashtagService } from '../service/hashtag.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {


  hashtags$!: Observable<Hashtag[]>;
  bsModalRef!: BsModalRef;

  constructor(
    private hasservice: HashtagService,
    private modalService: BsModalService
  ) {

    this.hashtags$ = this.hasservice.list();

  }

  ngOnInit(): void {

    this.hashtags$ = this.hasservice.list();

  }

  onDeletar(has: Hashtag) {

    this.hasservice.deletar(has.id).subscribe(

      () => {

        this.handleError('Hashtag Deletada');
        this.ngOnInit();

      },
      erro => {

        this.handleError('Erro ao Deletar');

      }

    );

  }

  handleError(msg: string) {
    this.bsModalRef = this.modalService.show(AlertModalComponent);
    this.bsModalRef.content.type = 'danger';
    this.bsModalRef.content.message = msg;
  }

}

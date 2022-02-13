import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hashtag } from 'src/app/model/hashtag';
import { HashtagService } from '../service/hashtag.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {


  hashtags$!: Observable<Hashtag[]>;

  constructor(private hasservice: HashtagService) {

    this.hashtags$ = this.hasservice.list();

   }

  ngOnInit(): void {

    this.hashtags$ = this.hasservice.list();

  }

  onDeletar(has: Hashtag){

    this.hasservice.deletar(has.id).subscribe(

      success => {

        //this.handleError('Funcionario Deletado');
        this.ngOnInit();

      },
      erro => {

       // this.handleError('Erro ao Deletar');


      }

    );

  }

}

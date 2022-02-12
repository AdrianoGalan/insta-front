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

   }

  ngOnInit(): void {
    
  }

}

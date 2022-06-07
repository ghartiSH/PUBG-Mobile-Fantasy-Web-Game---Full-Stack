import {Component, OnInit} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { News } from 'src/app/model/News';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  news!: News[];
  constructor(private newsService: NewsService, private _sanitizer: DomSanitizer,private router:Router
    ) {
  }

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe( data =>{
      this.news = data;
      for(let i=0; i< this.news.length; i++){
        this.news[i].image = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
        + this.news[i].image);
      };
    });
  }

  browseNews(id: number){
    this.router.navigate(['news', id])
  }

}

import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { News } from 'src/app/model/News';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-browse-news',
  templateUrl: './browse-news.component.html',
  styleUrls: ['./browse-news.component.scss']
})
export class BrowseNewsComponent implements OnInit {

  id!: number;
  news: News = new News();
  imagefile!: any;
  
  constructor(private route: ActivatedRoute, 
    private newsService: NewsService,
    private _sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.newsService.getNewsbyId(this.id).subscribe ( data =>{
      this.imagefile = this._sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' 
      + data.image);
      this.news = data;
    }
    );
  }

}

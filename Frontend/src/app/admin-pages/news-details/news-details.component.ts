import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { News } from 'src/app/model/News';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-details',
  templateUrl: './news-details.component.html',
  styleUrls: ['./news-details.component.scss']
})
export class NewsDetailsComponent implements OnInit {

  news!: News[];

  constructor(private newsService: NewsService,
    private router: Router,) { }

    displayedColumns: string[] = ['id', 'heading','actions'];

  ngOnInit(): void {
    this.newsService.getAllNews().subscribe( data => {
      this.news = data;
    })

  }

  getNews(){
    this.newsService.getAllNews().subscribe(data => {
      this.news = data;
    })
  }

  viewNews(id: number){
    this.router.navigate(['admin/view-news', id]);
  }

  updateNews(id: number){
    this.router.navigate(['admin/update-news', id]);
  }

  

  deleteNews(id: number){
    if (confirm("Are you sure to delete the item?")){
      this.newsService.deleteNews(id).subscribe(data => {
        this.getNews;
      })
  }
}

}


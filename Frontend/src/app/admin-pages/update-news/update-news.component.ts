import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { News } from 'src/app/model/News';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-update-news',
  templateUrl: './update-news.component.html',
  styleUrls: ['./update-news.component.scss']
})
export class UpdateNewsComponent implements OnInit {

  id!: number;
  news: News = new News();
  file: any;
  constructor(private newsService: NewsService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MatSnackBar) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.newsService.getNewsbyId(this.id).subscribe( data => {
      this.news = data;
    }); 
  }

  goToNewsList(){
    this.router.navigate(['admin/news-details']);
  }

  onChange(event:any){
    this.file = event.target.files[0];
  }

  onSubmit(){
    this.newsService.updateNews(this.id, this.file, this.news).subscribe(data =>{
      this.goToNewsList;
    });
    this.snack.open("Tournament Updated", 'Close',{
      duration: 5000})

  }
  

}

import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { News } from 'src/app/model/News';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-add-news',
  templateUrl: './add-news.component.html',
  styleUrls: ['./add-news.component.scss']
})
export class AddNewsComponent implements OnInit {
  news: News = new News();

  file!: File;

  constructor(private snack: MatSnackBar, private newsService: NewsService) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.newsService.addNews(this.file, this.news).subscribe(data => {
      console.log(data);
    })
    this.snack.open("News Added Succesfully...", "Close", {
      duration: 5000});
  }

  onChange(event:any){
    this.file = event.target.files[0];
  }

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from '../model/News';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private baseURL = "http://localhost:8081/news";

  constructor(private http: HttpClient) { }

  addNews(file:any, news: News): Observable<Object>{
    const fd = new FormData();
    fd.append('heading', news.heading);
    fd.append('content', news.content);
    fd.append('image', file);
    return this.http.post(this.baseURL, fd);
  }

  getAllNews():Observable<News[]>{
    return this.http.get<News[]>(this.baseURL);
  }

  deleteNews(id:number): Observable<Object>{
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  getNewsbyId(id: number): Observable<News>{
    return this.http.get<News>(`${this.baseURL}/${id}`);
  }

  updateNews(id: number, file:any, news:News): Observable<Object>{
    const nfd = new FormData();
    nfd.append('heading', news.heading);
    nfd.append('content', news.content);
    nfd.append('image', file);
    return this.http.put(`${this.baseURL}/${id}`,nfd);
  }

}

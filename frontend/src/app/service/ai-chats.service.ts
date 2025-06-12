import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Prompt } from '../compartido/prompt';
import { baseURL } from '../compartido/baseurl';


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class AIChatsService {

  constructor(private http: HttpClient) { }

  chatModels(prompt: Prompt): Observable<any> {
    return this.http.post<any>(`${baseURL}/chat/`, prompt, httpOptions)
  }

}
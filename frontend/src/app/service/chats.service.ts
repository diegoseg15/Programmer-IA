import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PromptSave } from '../compartido/promptSave';
import { Prompt } from '../compartido/prompt';
import { Observable } from 'rxjs';
import { baseURL } from '../compartido/baseurl';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`
  })
};

@Injectable({
  providedIn: 'root'
})
export class ChatsService {

  constructor(private http: HttpClient) { }

  getAllChatsUser(): Observable<any> {
    return this.http.get<any>(`${baseURL}/messages/`, httpOptions);
  }

  getChat(id: String): Observable<any> {
    return this.http.get<any>(`${baseURL}/message/${id}/`, httpOptions);
  }

  saveChat(promptSave: PromptSave): Observable<any> {
    return this.http.post<any>(`${baseURL}/save-message/`, promptSave, httpOptions)
  }

  updateChat(prompt: Prompt, id: String): Observable<any> {
    return this.http.put<any>(`${baseURL}/message/update/${id}/`, prompt, httpOptions)
  }

  deleteChat(id: String): Observable<any> {
    return this.http.delete<any>(`${baseURL}/delete-message/${id}/`, httpOptions);
  }
}

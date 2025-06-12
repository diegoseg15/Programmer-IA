import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, shareReplay } from 'rxjs';
import { baseURL } from '../compartido/baseurl';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userDataSubject = new BehaviorSubject<any>(null);
  public userData$ = this.userDataSubject.asObservable();
  private lastToken: string | null = null;

  constructor(private http: HttpClient) {
    this.loadInitialData(); // Carga los datos al iniciar el servicio
  }

  private loadInitialData() {
    const token = localStorage.getItem('token');
    if (!token) {
      this.userDataSubject.next({ message: 'No autenticado', user: null });
      return;
    }

    if (token !== this.lastToken) {
      this.http.get<any>(`${baseURL}/user_auth/`, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        })
      }).pipe(
        shareReplay(1)
      ).subscribe(data => {
        this.userDataSubject.next(data); // Emite los datos a todos los suscriptores
        this.lastToken = token;
      });
    }
  }

  // Refrescar los datos manualmente
  refreshUserData() {
    this.loadInitialData();
  }

  // Mantén getUserData() si otros componentes lo usan directamente
  getUserData(): Observable<any> {
    return this.userData$;
  }
}
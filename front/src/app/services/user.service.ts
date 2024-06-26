import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/users/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUser(id: number): Observable<User> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.get<User>(url);
  }

  addUser(user: FormData): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }

  updateUser(id: number, user: FormData): Observable<any> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.put(url, user);
  }

  deleteUser(id: number): Observable<User> {
    const url = `${this.apiUrl}${id}/`;
    return this.http.delete<User>(url);
  }
}

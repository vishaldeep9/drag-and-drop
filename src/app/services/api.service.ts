import { User } from './../models/user';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl: string = '_http://localhost:3000/enquiry';

  constructor(private _http: HttpClient) {}

  postRegistration(registerObj: User): Observable<User> {
    return this._http.post<User>(`${this.baseUrl}`, registerObj);
  }

  getRegisteredUser(): Observable<User[]> {
    return this._http.get<User[]>(`${this.baseUrl}`);
  }

  updateRegisterUser(registerObj: User, id: number): Observable<User> {
    return this._http.put<User>(`${this.baseUrl}/${id}`, registerObj);
  }

  deleteRegistered(id: number): Observable<User> {
    return this._http.delete<User>(`${this.baseUrl}/${id}`);
  }

  getRegisteredUserId(id: number): Observable<User> {
    return this._http.get<User>(`${this.baseUrl}/${id}`);
  }
}


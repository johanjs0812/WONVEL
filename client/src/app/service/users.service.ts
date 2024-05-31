import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private http: HttpClient) { }

  private user = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('user') || '{}'));

  // Phương thức lấy toàn bộ data
  getAllData(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v1/users`);
  }

  // Phương thức lấy dữ liệu theo id
  getDataById(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v1/users/${id}`);
  }

  // Phương thức thêm dữ liệu mới
  addData(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/v2/users`, data);
  }

  // Phương thức login
  login(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/v2/users/login`, data);
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
    this.user.next(user);
  }

  getUser() {
    return this.user.asObservable();
  }

  //CHECK SINGUP
  singup(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/v2/users/singup`, data);
  }

}

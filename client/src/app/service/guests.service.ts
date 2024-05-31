import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class GuestsService {
  private tours = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  // Phương thức lấy toàn bộ data
  getAllTours(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v1/guests`);
  }

  // Phương thức lấy dữ liệu theo id
  getTourById(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v1/guests/${id}`);
  }

  // Phương thức thêm nhiều dữ liệu mới
  addData(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/v2/guests`, data);
  }

}

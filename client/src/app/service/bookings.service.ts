import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class BookingService {
  // private apiUrl = 'http://localhost:3000/api/v1/tours';
  private tours = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  // Phương thức lấy toàn bộ data
  getAllTours(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v1/bookings`);
  }

  // Phương thức lấy dữ liệu theo id
  getTourById(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v1/bookings/${id}`);
  }

  // Phương thức thêm dữ liệu mới
  addData(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/v1/bookings`, data);
  }

  // Phương thức lấy dữ liệu nhiều bảng theo id
  getPayment(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v2/bookings/payment/${id}`);
  }
}

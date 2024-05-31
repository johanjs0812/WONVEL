import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class TourService {
  private apiUrl = 'http://localhost:3000/api/v1/tours';
  private tours = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  // Phương thức lấy toàn bộ data
  getAllTours(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Phương thức lấy dữ liệu theo id
  getTourById(id: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  // Phương thức lấy dữ liệu theo destination
  getToursByCategory(category: any): Observable<any> {
    return this.http.get(`${this.apiUrl}?category=${category}`);
  }

  // Phương thức lấy toàn bộ tour và destination tương ứng
  getToursAndDes(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v1/tours_des`);
  }

  // Phương thức lấy tour giảm giá
  getToursDisccountPrice(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v2/tours/discount_price`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap  } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class InvoicesService {
  private tours = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  // Phương thức lấy toàn bộ data
  getAllTours(): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v1/invoices`);
  }

  // Phương thức lấy dữ liệu theo id
  getTourById(id: any): Observable<any> {
    return this.http.get(`http://localhost:3000/api/v1/invoices/${id}`);
  }

  // Phương thức thêm dữ liệu mới
  addData(data: any): Observable<any> {
    return this.http.post(`http://localhost:3000/api/v1/invoices`, data);
  }

}

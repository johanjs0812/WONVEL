import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, QueryList, ViewChildren, inject} from '@angular/core';

import { FormatService } from '../service/format.service';
import { BookingService } from "../service/bookings.service";

import { ActivatedRoute, Router } from '@angular/router';
import { group } from '@angular/animations';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})

export class PaymentComponent implements OnInit{

  hoadon: any;
  ageGroup:any;
  invoices: any;
  khachtrabaonhieuroi: any;
  tienconlai: any;

  ageGroups: { key: string, value: number }[] = [];

  constructor(
    private formatService: FormatService,
    private bookingService: BookingService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.getPayment(id);
  }

  getPayment(id:any){
    this.bookingService.getPayment(id).subscribe(data => {

      data.tour.start_date = this.formatService.formatToVndDate(data.tour.start_date);
      data.tour.end_date = this.formatService.formatToVndDate(data.tour.end_date);
      data.payment_status = this.formatService.getPaymentStatus(data.payment_status);

      this.ageGroup = this.formatService.countAgeGroups(data.guests);

      this.khachtrabaonhieuroi = data.invoices.reduce((sum: number, item: any) => sum + item.total_amount, 0);
      this.tienconlai = data.total_price - this.khachtrabaonhieuroi;
      this.tienconlai = this.formatService.formatVnd(this.tienconlai);
      this.khachtrabaonhieuroi = this.formatService.formatVnd(this.khachtrabaonhieuroi);
      data.total_price = this.formatService.formatVnd(data.total_price);

      this.invoices = data.invoices;
      this.hoadon = data;
    })
  }

  getAgeGroup(data:string) {
   return this.formatService.getAgeGroup(data);
  }

  getPrieGroup(data:string) {
    return this.formatService.getPriceGroup(data);
  }

}

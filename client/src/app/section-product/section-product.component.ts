import { Component, OnInit } from '@angular/core';
import { TourService } from '../service/tours.service';
import { FormatService } from '../service/format.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-section-product',
  templateUrl: './section-product.component.html',
  styleUrls: ['./section-product.component.css']
})
export class SectionProductComponent implements OnInit{

  tourdisscount: any;

  constructor(
    private tourService: TourService,
    private formatService: FormatService,
    private route: ActivatedRoute,
  ) { }

  getDataDiscountPrice(){
    this.tourService.getToursDisccountPrice().subscribe(data => {
      this.tourdisscount = this.formatService.getTopDiscountTours(data);
    })
  }

  ngOnInit() {
    this.getDataDiscountPrice();
  }
}

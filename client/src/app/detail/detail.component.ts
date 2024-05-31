import { Component, OnInit } from '@angular/core';
import { TourService } from '../service/tours.service';
import { FormatService } from '../service/format.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})

export class DetailComponent implements OnInit{
  tour: any;
  timeday: any;
  constructor(
    private tourService: TourService,
    private formatService: FormatService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.tourService.getTourById(id).subscribe(tour => {

      this.timeday = this.formatService.calculateDaysBetween(tour.tour.start_date, tour.tour.end_date);
      tour.tour.price = this.formatService.formatVnd(tour.tour.price);
      tour.tour.start_date = this.formatService.formatToVndDate(tour.tour.start_date);

      this.tour = tour;
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { TourService } from '../service/tours.service';
import { FormatService } from '../service/format.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit{

  tourdisscount: any;

  constructor(
    private tourService: TourService,
    private formatService: FormatService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {}
}

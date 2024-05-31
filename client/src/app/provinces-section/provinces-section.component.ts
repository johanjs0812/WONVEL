import { Component, OnInit } from '@angular/core';
import { DataDefService } from "../service/datadef.service";

@Component({
  selector: 'app-provinces-section',
  templateUrl: './provinces-section.component.html',
  styleUrls: ['./provinces-section.component.css']
})

export class ProvincesSectionComponent implements OnInit{

  tinh: any;

  constructor(
    private dataDefService: DataDefService
  ){}

  ngOnInit(): void {
    this.tinh =  this.dataDefService.getProvinces();
  }
}

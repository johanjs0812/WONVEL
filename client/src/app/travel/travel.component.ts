import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { TourService } from '../service/tours.service';
import { FormatService } from '../service/format.service';
import { DataDefService } from '../service/datadef.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';

@Component({
  selector: 'app-travel',
  templateUrl: './travel.component.html',
  styleUrls: ['./travel.component.css']
})

export class TravelComponent implements OnInit, AfterViewInit{

  @ViewChild('picker') datePicker!: MatDatepicker<any>;
  @ViewChild('dateInput') dateInput!: ElementRef<HTMLInputElement>;

  constructor(
    private tourService: TourService,
    private formatService: FormatService,
    private dataDefService: DataDefService
  )
  { }

  tours: any[] = [];
  count_res: any;
  valueDate: any;
  provinces: any;

  ngOnInit(): void {
    this.getTours();
    this.valueDate = this.getDay();
    this.provinces = this.dataDefService.provinces();
  }

  ngAfterViewInit(){}

  getTours() {
    this.tourService.getAllTours().subscribe(data => {
      this.tours = data;
      this.count_res = this.tours.length;
    })
  };

  // ===============FORMAT========================
  formatPrice(price: number): string {
    return this.formatService.formatVnd(price);
  }

  Duration(start: string, end:string){
    return this.formatService.calculateDaysBetween(start, end);
  }

  formatVndDate(value: any): string {
    return this.formatService.formatToVndDate(value);
  }

  // ===================CLICK=========================

  buttons = ['1-3 ngày', '4-7 ngày', '8-14 ngày', 'trên 14 ngày'];
  selectedButton: number | null = null;

  selectButton(index: number): void {
    if (this.selectedButton === index) {
      console.log('Button clicked twice');
      this.selectedButton = null; // Reset selected button
    } else {
      this.selectedButton = index;
    }
  }

  buttons2 = ['Ô tô', 'Xe khách', 'Máy bay', 'Tàu hỏa'];
  selectedButton2: number | null = null;

  selectButton2(index: number): void {
    if (this.selectedButton2 === index) {
      console.log('Button clicked twice');
      this.selectedButton2 = null; // Reset selected button
    } else {
      this.selectedButton2 = index;
    }
  }

  getDay(): string {
    const currentDate = new Date();
    const vietnamTimeOffset = 7 * 60 * 60 * 1000;
    const vietnamTime = new Date(currentDate.getTime() + vietnamTimeOffset);

    const day = vietnamTime.getDate();
    const month = vietnamTime.getMonth() + 1;
    const year = vietnamTime.getFullYear();

    const formattedDate = `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}/${year}`;
    return formattedDate;
  }

  onDateChange(event: any) {
    const selectedDate = event.value;
    if (selectedDate) {
      const day = selectedDate.getDate().toString().padStart(2, '0');
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, '0');
      const year = selectedDate.getFullYear();
      this.valueDate = `${day}/${month}/${year}`;

      const compare = `${year}-${month}-${day}`;
      this.updateFilter('goDayFilter', compare);

    } else {
      this.valueDate = '';
    }
  }

  isDisplayed = false;
  isDisplayed2 = false;
  selectedProvince: any;
  selectedProvince2: any;

  get displayStyle() {
    return this.isDisplayed ? 'inline-block' : 'none';
  }

  get displayStyle2() {
    return this.isDisplayed2 ? 'inline-block' : 'none';
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    this.isDisplayed = false;
    this.isDisplayed2 = false;
  }

  toggleDisplayStyle(province: any, event: MouseEvent) {
    event.stopPropagation();
    this.isDisplayed = !this.isDisplayed;
    this.selectedProvince = province;
  }

  toggleDisplayStyle2(province: any, event: MouseEvent) {
    event.stopPropagation();
    this.isDisplayed2 = !this.isDisplayed2;
    this.selectedProvince2 = province;
  }

  // ===================FILTER======================================

  items:any = [ ];

  startFilter:any = {};
  endFilter:any = {};
  dayFilter:any = {};
  goDayFilter:any = {};
  vehicleFilter:any = {};
  priceFilter:any = {};

  filteredItems:any;

  clickPrice(x: any, y: any){
    if (!x && !y) {
      return;
    }
    const price = {
      s: x,
      e: y
    }
    this.updateFilter('priceFilter', price);
  }

  updateFilter(filterType: any, criteria: any) {
    switch (filterType) {
      case 'startFilter':
        Object.keys(this.startFilter).forEach(key => {
          this.startFilter[key] = false;
        });
        this.startFilter[criteria] = !this.startFilter[criteria];
        break;

      case 'endFilter':
        Object.keys(this.endFilter).forEach(key => {
          this.endFilter[key] = false;
        });
        this.endFilter[criteria] = !this.endFilter[criteria];
        break;
      case 'dayFilter':
        Object.keys(this.dayFilter).forEach(key => {
          if (key !== criteria) {
            this.dayFilter[key] = false;
          }
        });
        this.dayFilter[criteria] = !this.dayFilter[criteria];
        break;
      case 'goDayFilter':
        Object.keys(this.goDayFilter).forEach(key => {
            this.goDayFilter[key] = false;
        });
        this.goDayFilter[criteria] = !this.goDayFilter[criteria];
        break;
      case 'vehicleFilter':
        Object.keys(this.vehicleFilter).forEach(key => {
          if (key !== criteria) {
            this.vehicleFilter[key] = false;
          }
        });
        this.vehicleFilter[criteria] = !this.vehicleFilter[criteria];
        break;
      case 'priceFilter':
        this.priceFilter = criteria;
        break;
      default:
        console.error(`Invalid filter type: ${filterType}`);
        break;
    }
    this.applyFilter();
  };


  applyFilter() {

    this.tourService.getToursAndDes().subscribe((data:any) => {
      this.tours = data.tours;

      if (Array.isArray(this.tours)) {

        this.tours = this.tours.filter((item:any) => {

          return Object.keys(this.startFilter).every(criteria => {
            if (criteria === 'undefined') {
              return true;
            }

            if (this.startFilter[criteria]) {
              return item.departure_location === criteria;
            } else {
              return true;
            }

          }) && Object.keys(this.endFilter).every(criteria => {

            if (criteria === 'undefined') {
              return true;
            }

            if (this.endFilter[criteria]) {
              // console.log('den', item.destination.provinces, criteria)
              return item.destination.provinces === criteria;
            } else {
              return true;
            }

          }) && Object.keys(this.dayFilter).every(criteria => {

            if (this.dayFilter[criteria]) {

              let kq = this.formatService.calculateDaysFilter(item.start_date, item.end_date);

              let min, max;
              criteria = criteria.replace(' ngày', '').replace('trên ', '');

              if (criteria.includes('-')) {
                [min, max] = criteria.replace(' ngày', '').split('-').map(Number);
              } else {
                min = Number(criteria);
                max = Infinity;
              }

              return kq >= min && kq <= max;

            } else {
              return true;
            }

          }) && Object.keys(this.goDayFilter).every(criteria => {

            if (this.goDayFilter[criteria]) {

              console.log('ccc3')

              return item.start_date === criteria;
            } else {
              return true;
            }

          }) && Object.keys(this.vehicleFilter).every(criteria => {

            if (this.vehicleFilter[criteria]) {
              console.log('ccc4')

              return item.transportation === criteria;
            } else {
              return true;
            }

          }) && Object.keys(this.priceFilter).every(() => {

            let price = item.discount_price !== null ? item.discount_price : item.price;

            let s = this.priceFilter.s !== undefined ? this.priceFilter.s : -Infinity;
            let e = this.priceFilter.e !== undefined ? this.priceFilter.e : Infinity;

            if (s === -Infinity && e === Infinity) {
              console.log('finity')
              return true;
            }

            return price >= s && price <= e;
          });

        });

      } else {
        console.error('this.tours is not an array');
      }

      this.count_res = this.tours.length;

    });

  }

}

import { Component, OnInit, AfterViewInit, ViewChild, ElementRef, QueryList, ViewChildren, inject} from '@angular/core';

import { TourService } from '../service/tours.service';
import { FormatService } from '../service/format.service';
import { BookingService } from "../service/bookings.service";
import { UserService } from "../service/users.service";
import { GuestsService } from "../service/guests.service";
import { InvoicesService } from "../service/invoices.service";

import { ActivatedRoute, Router } from '@angular/router';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-information-payment',
  templateUrl: './information-payment.component.html',
  styleUrls: ['./information-payment.component.css']
})

export class InformationPaymentComponent implements OnInit, AfterViewInit{

  tour: any;
  timeday: any;
  pricebasic: any;

  adults = 1;
  adultsArray = Array(this.adults).fill('');

  childrens = 0;
  childrenArray = Array(this.childrens).fill('');

  young_childs = 0;
  young_childsArray = Array(this.young_childs).fill('');

  babys = 0;
  babysArray = Array(this.babys).fill('');

  total_nfm: any = 0;
  total: any = 0;

  constructor(
    private tourService: TourService,
    private formatService: FormatService,
    private bookingService: BookingService,
    private userService: UserService,
    private guestsService: GuestsService,
    private invoicesService: InvoicesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  account: any;

  ngOnInit() {
    
    this.userService.getUser().subscribe(user => {
      this.account = user;
    });

    this.generateYears();
    this.generateDaysAndMonths();
    const id = this.route.snapshot.paramMap.get('id');
    this.tourService.getTourById(id).subscribe(tour => {

      this.totalCaculator(tour);
      this.pricebasic = tour.tour.price;
      this.timeday = this.formatService.calculateDaysBetween(tour.tour.start_date, tour.tour.end_date);

      tour.tour.price = this.formatService.formatVnd(tour.tour.price);
      tour.tour.start_date = this.formatService.formatToVndDate(tour.tour.start_date);
      tour.tour.end_date = this.formatService.formatToVndDate(tour.tour.end_date);

      this.tour = tour;

    });
  }

  // ================BTN ADD PEOPLE=============
  addPeople(human: any) {
    switch (human) {
      case 'adults':
        this.adults++;
        this.adultsArray = Array(this.adults).fill('');
        break;

      case 'childrens':
        this.childrens++;
        this.childrenArray = Array(this.childrens).fill('');
        break;

      case 'young_childs':
        this.young_childs++;
        this.young_childsArray = Array(this.young_childs).fill('');
        break;

      case 'babys':
        this.babys++;
        this.babysArray = Array(this.babys).fill('');
        break;

      default:
        break;
    }
    this.totalCaculator(undefined);
  }

  removePeople(human: any) {
    switch (human) {
      case 'adults':
        if (this.adults > 1) {
          this.adults--;
          this.adultsArray = Array(this.adults).fill('');
        }else {
          this.showAlert();
        }
        break;

      case 'childrens':
        if (this.childrens > 0) {
          this.childrens--;
          this.childrenArray = Array(this.childrens).fill('');
        }
        break;

      case 'young_childs':
        if (this.young_childs > 0) {
          this.young_childs--;
          this.young_childsArray = Array(this.young_childs).fill('');
        }
        break;

      case 'babys':
        if (this.babys > 0) {
          this.babys--;
          this.babysArray = Array(this.babys).fill('');
        }
        break;

      default:
        break;
    }
    this.totalCaculator(undefined);
  }

  alertVisible = false;
  showAlert() {
    this.alertVisible = true;
    setTimeout(() => this.alertVisible = false, 2000);
  }

  discountchild:number = 0.2;
  discountYoung:number = 0.4;
  discountBaby: number = 0.6;
  totalCaculator(start:any)
  {
    if (start) {
      this.total = (start.tour.price * this.adults) + (start.tour.price * this.childrens) + (start.tour.price * this.babys) + (start.tour.price * this.young_childs);
      this.total_nfm = this.total;
      this.total = this.formatService.formatVnd(this.total);
      return this.total;
    }else{

      const child = (this.pricebasic * this.childrens) * this.discountchild;
      const young_childs = (this.pricebasic * this.young_childs) * this.discountYoung;
      const babys = (this.pricebasic * this.babys) * this.discountBaby;

      this.total =
        (this.pricebasic * this.adults) +
        (this.pricebasic * this.childrens) - child +
        (this.pricebasic * this.young_childs) - young_childs +
        (this.pricebasic * this.babys) - babys
      ;

      this.total_nfm = this.total;
      this.total = this.formatService.formatVnd(this.total);
      return this.total;
    }

  }

  // ================CREATE TIME===================
  adultsYears: number[] = [];
  childrenYears: number[] = [];
  toddlersYears: number[] = [];
  babiesYears: number[] = [];
  generateYears() {
    // Người lớn sinh trước ngày 08/06/2012
    for (let year = new Date().getFullYear(); year >= 1900; year--) {
      if (year <= 2012) {
        this.adultsYears.push(year);
      }
    }

    // Trẻ em sinh từ 09/06/2012 đến 08/06/2019
    for (let year = 2019; year >= 2012; year--) {
      this.childrenYears.push(year);
    }

    // Trẻ nhỏ sinh từ 09/06/2019 đến 08/06/2022
    for (let year = 2022; year >= 2019; year--) {
      this.toddlersYears.push(year);
    }

    // Em bé sinh từ 09/06/2022 đến 10/06/2024
    for (let year = 2024; year >= 2022; year--) {
      this.babiesYears.push(year);
    }
  }

  days: number[] = [];
  months: number[] = [];
  generateDaysAndMonths() {
    for (let day = 1; day <= 31; day++) {
      this.days.push(day);
    }

    for (let month = 1; month <= 12; month++) {
      this.months.push(month);
    }
  }

  // =================PAYMENT======================
  ngAfterViewInit(){ }

  @ViewChild('input1') input1: ElementRef | undefined;
  @ViewChild('input2') input2: ElementRef | undefined;
  @ViewChild('input3') input3: ElementRef | undefined;
  @ViewChild('input4') input4: ElementRef | undefined;

  getInputValues() {
    const input1Value = this.input1?.nativeElement.value;
    const input2Value = this.input2?.nativeElement.value;
    const input3Value = this.input3?.nativeElement.value;
    const input4Value = this.input4?.nativeElement.value;

    const data = {
      email: input2Value,
      full_name: input1Value,
      address: input4Value || null,
      phone_number: input3Value
    }

    console.log('1234', data);
    return data;
  }

  checkInputsContact() { return ![this.input1, this.input2, this.input3].every(input => input?.nativeElement.value) }

  @ViewChildren('adultsInput') adultsInput: QueryList<ElementRef> | undefined;
  @ViewChildren('childrensInput') childrensInput: QueryList<ElementRef> | undefined;
  @ViewChildren('young_childsInput') young_childsInput: QueryList<ElementRef> | undefined;
  @ViewChildren('babysInput') babysInput: QueryList<ElementRef> | undefined;

  checkInputsAdults() { return this.checkInputs(this.adultsInput) }
  checkInputsChildrens() { return this.checkInputs(this.childrensInput) }
  checkInputsYoung() { return this.checkInputs(this.young_childsInput) }
  checkInputsBaby() { return this.checkInputs(this.babysInput) }

  getAdultsInputValues() { return this.getInputFourHuman(this.adultsInput) }
  getChildrensInputValues() { return this.getInputFourHuman(this.childrensInput) }
  getYoungChildsInputValues() { return this.getInputFourHuman(this.young_childsInput) }
  getBabysInputValues() { return this.getInputFourHuman(this.babysInput) }

  // ------------------------------

  @ViewChildren("selectgdAdults") selectgdAdults: QueryList<ElementRef> | undefined;
  @ViewChildren("selectdayAdults") selectdayAdults: QueryList<ElementRef> | undefined;
  @ViewChildren("selectmonthAdults") selectmonthAdults: QueryList<ElementRef> | undefined;
  @ViewChildren("selectyearAdults") selectyearAdults: QueryList<ElementRef> | undefined;

  ADcheckSelectsGender() { return this.checkSelects(this.selectgdAdults) }
  ADcheckSelectsDay() { return this.checkSelects(this.selectdayAdults) }
  ADcheckSelectsMonth() { return this.checkSelects(this.selectmonthAdults) }
  ADcheckSelectsYear() { return this.checkSelects(this.selectyearAdults) }

  getADSelectValuesGender() { return this.getSelectValues(this.selectgdAdults) }
  getADSelectValuesDay() { return this.getSelectValues(this.selectdayAdults) }
  getADSelectValuesMonth() { return this.getSelectValues(this.selectmonthAdults) }
  getADSelectValuesYear() { return this.getSelectValues(this.selectyearAdults) }

  // ----------------------

  @ViewChildren("selectgdChildrens") selectgdChildrens: QueryList<ElementRef> | undefined;
  @ViewChildren("selectdayChildrens") selectdayChildrens: QueryList<ElementRef> | undefined;
  @ViewChildren("selectmonthChildrens") selectmonthChildrens: QueryList<ElementRef> | undefined;
  @ViewChildren("selectyearChildrens") selectyearChildrens: QueryList<ElementRef> | undefined;

  CRheckSelectsGender() { return this.checkSelects(this.selectgdChildrens) }
  CRcheckSelectsDay() { return this.checkSelects(this.selectdayChildrens) }
  CRcheckSelectsMonth() { return this.checkSelects(this.selectmonthChildrens) }
  CRcheckSelectsYear() { return this.checkSelects(this.selectyearChildrens) }

  getCRSelectValuesGender() { return this.getSelectValues(this.selectgdChildrens) }
  getCRSelectValuesDay() { return this.getSelectValues(this.selectdayChildrens) }
  getCRSelectValuesMonth() { return this.getSelectValues(this.selectmonthChildrens) }
  getCRSelectValuesYear() { return this.getSelectValues(this.selectyearChildrens) }

  // ---------------------------

  @ViewChildren("selectgdYoungChilds") selectgdYoungChilds: QueryList<ElementRef> | undefined;
  @ViewChildren("selectdayYoungChilds") selectdayYoungChilds: QueryList<ElementRef> | undefined;
  @ViewChildren("selectmonthYoungChilds") selectmonthYoungChilds: QueryList<ElementRef> | undefined;
  @ViewChildren("selectyearYoungChilds") selectyearYoungChilds: QueryList<ElementRef> | undefined;

  YGheckSelectsGender() { return this.checkSelects(this.selectgdYoungChilds) }
  YGcheckSelectsDay() { return this.checkSelects(this.selectdayYoungChilds) }
  YGcheckSelectsMonth() { return this.checkSelects(this.selectmonthYoungChilds) }
  YGcheckSelectsYear() { return this.checkSelects(this.selectyearYoungChilds) }

  getYGSelectValuesGender() { return this.getSelectValues(this.selectgdYoungChilds) }
  getYGSelectValuesDay() { return this.getSelectValues(this.selectdayYoungChilds) }
  getYGSelectValuesMonth() { return this.getSelectValues(this.selectmonthYoungChilds) }
  getYGSelectValuesYear() { return this.getSelectValues(this.selectyearYoungChilds) }

  // ----------------------------

  @ViewChildren("selectgdBabys") selectgdBabys: QueryList<ElementRef> | undefined;
  @ViewChildren("selectdayBabys") selectdayBabys: QueryList<ElementRef> | undefined;
  @ViewChildren("selectmonthBabys") selectmonthBabys: QueryList<ElementRef> | undefined;
  @ViewChildren("selectyearBabys") selectyearBabys: QueryList<ElementRef> | undefined;

  BBheckSelectsGender() { return this.checkSelects(this.selectgdBabys) }
  BBcheckSelectsDay() { return this.checkSelects(this.selectdayBabys) }
  BBcheckSelectsMonth() { return this.checkSelects(this.selectmonthBabys) }
  BBcheckSelectsYear() { return this.checkSelects(this.selectyearBabys) }

  getBBSelectValuesGender() { return this.getSelectValues(this.selectgdBabys) }
  getBBSelectValuesDay() { return this.getSelectValues(this.selectdayBabys) }
  getBBSelectValuesMonth() { return this.getSelectValues(this.selectmonthBabys) }
  getBBSelectValuesYear() { return this.getSelectValues(this.selectyearBabys) }

  // ---------------------------

  checkSelects(selects: QueryList<ElementRef> | undefined) {
    return selects?.some(select => select.nativeElement.value === null || select.nativeElement.value.trim() === '');
  }

  checkInputs(inputList: QueryList<ElementRef> | undefined) {
    return inputList?.some(input => input && input.nativeElement && (input.nativeElement.value === null || input.nativeElement.value.trim() === ''));
  }

  getInputFourHuman(inputList: QueryList<ElementRef> | undefined) {
    return inputList?.map(input => input.nativeElement.value)
  }

  getSelectValues(selectList: QueryList<ElementRef> | undefined) {
    return selectList?.map(select => select.nativeElement.value)
  }

  // NOI MANG-------------------------------------------------------------------------

  combineInputsAndChecksAdults() {
    const name = this.getAdultsInputValues();
    const gender = this.getADSelectValuesGender();
    const day = this.getADSelectValuesDay();
    const month = this.getADSelectValuesMonth();
    const year = this.getADSelectValuesYear();

    if (name && gender && day && month && year) {
      return this.combineInputsAndChecks(name, gender, day, month, year);
    } else {
      console.error('One or more arrays are undefined');
      return [];
    }
  }

  combineInputsAndChecksChildrens() {
    const name = this.getChildrensInputValues();
    const gender = this.getCRSelectValuesGender();
    const day = this.getCRSelectValuesDay();
    const month = this.getCRSelectValuesMonth();
    const year = this.getCRSelectValuesYear();

    if (name && gender && day && month && year) {
      if (name && gender && day && month && year) {
      return this.combineInputsAndChecks(name, gender, day, month, year);
    } else {
      console.error('One or more arrays are undefined');
      return [];
    }
    } else {
      console.error('One or more arrays are undefined');
      return [];
    }
  }

  combineInputsAndChecksYoungChilds() {
      const name = this.getYoungChildsInputValues();
      const gender = this.getYGSelectValuesGender();
      const day = this.getYGSelectValuesDay();
      const month = this.getYGSelectValuesMonth();
      const year = this.getYGSelectValuesYear();

      if (name && gender && day && month && year) {
        return this.combineInputsAndChecks(name, gender, day, month, year);
      } else {
        console.error('One or more arrays are undefined');
        return [];
      }
  }

  combineInputsAndChecksBabys() {
      const name = this.getBabysInputValues();
      const gender = this.getBBSelectValuesGender();
      const day = this.getBBSelectValuesDay();
      const month = this.getBBSelectValuesMonth();
      const year = this.getBBSelectValuesYear();

      if (name && gender && day && month && year) {
        return this.combineInputsAndChecks(name, gender, day, month, year);
      } else {
        console.error('One or more arrays are undefined');
        return [];
      }
  }

  combineInputsAndChecks(name: string[], gender: string[], day: string[], month: string[], year: string[]): object[] {
    if (name && gender && day && month && year &&
        name.length === gender.length &&
        name.length === day.length &&
        name.length === month.length &&
        name.length === year.length) {
        return name.map((name, index) => {
            const birthday = `${day[index]}/${month[index]}/${year[index]}`;
            return {
                name: name,
                gender: gender[index],
                birthday: birthday,
                booking_id: this.bookingid
            };
        });
    } else {
        console.error('One or more arrays are undefined or not of the same length');
        return [];
    }
  }

  // CHECK OUT----------------------------------------------------------------------------
  page: string = "inf";
  userid: any;
  bookingid: any;
  pm_method: any = "cash";

  addUser(data: object) {
    this.userService.addData(data).subscribe(
      response => {
        console.log('Response from server user: ', response);
        this.userid = response.id;

        const booking = {
          user_id: this.userid,
          tour_id: this.tour.tour.id,
          booking_date: new Date().toLocaleDateString('vi-VN'),
          num_of_people: this.adults + this.childrens + this.young_childs + this.babys,
          total_price: this.total_nfm,
          payment_status: 1,
          code: this.generateInvoiceNumber()
        }
        this.addBookings(booking);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  addBookings(data: object) {
    this.bookingService.addData(data).subscribe(
      response => {
        console.log('Response from server booking: ', response);
        this.bookingid = response.id;

        const ad = this.combineInputsAndChecksAdults() || [];
        const cr = this.combineInputsAndChecksChildrens() || [];
        const yg = this.combineInputsAndChecksYoungChilds() || [];
        const bb = this.combineInputsAndChecksBabys() || [];

        const all = ad.concat(cr, yg, bb);
        this.addGuests(all);

        if (response.payment_status === 1) {
          const invoices = {
            booking_id : this.bookingid,
            invoice_date: new Date().toLocaleDateString('vi-VN'),
            total_amount: this.total_nfm,
            payment_method: this.pm_method
          }
          this.addInvoices(invoices);
        }

        this.changePage(this.bookingid);

      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  addGuests(data: Array<object>) {
    this.guestsService.addData(data).subscribe(
      response => {
        console.log('Response from server guests: ', response);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  generateInvoiceNumber(): string {
    const now = new Date();
    const randomNum = Math.floor(Math.random() * 1000);
    let invoiceNumber = '' + now.getFullYear() + (now.getMonth() + 1) + now.getDate();
    invoiceNumber += now.getHours() + now.getMinutes() + now.getSeconds() + randomNum;

    if (invoiceNumber.length > 12) {
      invoiceNumber = invoiceNumber.substr(0, 12);
    }
    return invoiceNumber;
  }

  addInvoices(data: object){
    this.invoicesService.addData(data).subscribe(
      response => {
        console.log('Response from server invoices: ', response);
      },
      error => {
        console.error('Error: ', error);
      }
    );
  }

  @ViewChild('cash') cash: ElementRef | undefined;
  @ViewChild('bank') bank: ElementRef | undefined;
  @ViewChild('credit') credit: ElementRef | undefined;
  @ViewChild('VNPay') VNPay: ElementRef | undefined;
  @ViewChild('momo') momo: ElementRef | undefined;


  checkRadioButtons(): boolean {
    const radioButtons = [this.cash, this.bank, this.credit, this.VNPay, this.momo];
    for (let i = 0; i < radioButtons.length; i++) {
      if (radioButtons[i]?.nativeElement.checked) {
        this.pm_method = radioButtons[i]?.nativeElement.value;
        return true;
      }
    }
    return false;
  }

  @ViewChild('dongydieukhoan') dongydieukhoan: ElementRef | undefined;

  checkCheckbox(): boolean {
    if (this.dongydieukhoan?.nativeElement.checked) {
      return true;
    }
    return false;
  }

  paychangePage(page: string){
    if (page === "inf") {
      if (
        this.checkInputsContact() ||
        this.checkInputsAdults() || this.checkInputsChildrens() || this.checkInputsYoung() || this.checkInputsBaby() ||
        this.ADcheckSelectsGender() ||  this.ADcheckSelectsDay() || this.ADcheckSelectsMonth() || this.ADcheckSelectsYear() ||
        this.CRheckSelectsGender() || this.CRcheckSelectsDay() || this.CRcheckSelectsMonth() || this.CRcheckSelectsYear() ||
        this.YGheckSelectsGender() || this.YGcheckSelectsDay() || this.YGcheckSelectsMonth() || this.YGcheckSelectsYear() ||
        this.BBheckSelectsGender() || this.BBcheckSelectsDay() || this.BBcheckSelectsMonth() || this.BBcheckSelectsYear()
      ) { alert('Có ít nhất một ô input không được điền'); }
      else {
        this.page = 'method';
      }
      return;
    }

    if (page === 'method') {
      const a = this.checkRadioButtons();
      const b =  this.checkCheckbox();
      if (a && b) {
        const user = this.getInputValues();
        this.addUser(user);
      }
    }
  }

  changePage(id: any){
    this.router.navigate(['/payment', id]);
  }

}

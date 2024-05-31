import { Injectable,  Pipe, PipeTransform } from '@angular/core';

type AgeGroup = 'Người lớn' | 'Trẻ em' | 'Trẻ nhỏ' | 'Em bé' | 'Không xác định';

@Pipe({
  name: 'vndFormat'
})

@Injectable({
  providedIn: 'root'
})

export class FormatService {

  constructor() { }

  // Hàm tính số ngày giữa hai ngày
  calculateDaysBetween(date1: string, date2: string): any {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays === 0) {
      return 'đi trong' + ' ' + 'ngày';
    }
    return diffDays + ' ' + 'ngày';
  }

  calculateDaysFilter(date1: string, date2: string): any {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const timeDiff = Math.abs(d2.getTime() - d1.getTime());
    let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return diffDays;
  }

  formatVnd(value: number): string {
    let formatter = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    });

    return formatter.format(value);
  }

  formatToVndDate(dateString: any): string {
    // Kiểm tra xem dateString đã ở định dạng "ngày-tháng-năm" chưa
    if (/^\d{1,2}\/\d{1,2}\/\d{4}$/.test(dateString)) {
      return dateString;
    }

    let dateParts = dateString.split("-");
    return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
  }
  // TÍNH GIẢM GIÁ
  getTopDiscountTours(tours: any[]): any[] {
    tours.forEach(tour => {
      tour.discount_percentage = ((tour.price - tour.discount_price) / tour.price) * 100;

      tour.discount_percentage = Math.floor(tour.discount_percentage);
      tour.price = this.formatVnd(tour.price);
      tour.discount_price = this.formatVnd(tour.discount_price);

      tour.timeday = this.calculateDaysBetween(tour.start_date, tour.end_date);

      tour.start_date = this.formatToVndDate(tour.start_date);
      tour.end_date = this.formatToVndDate(tour.end_date);
    });
    tours.sort((a, b) => b.discount_percentage - a.discount_percentage);
    return tours.slice(0, 3);
  }

  // TÍNH ĐỘ TUỔI
  getAgeGroup(birthDateString: string): string {
    const birthDate = new Date(birthDateString);
    const birthYear = birthDate.getFullYear();

    const adultThreshold = new Date('2012-06-08').getFullYear();
    const childThreshold = new Date('2019-06-09').getFullYear();
    const kidThreshold = new Date('2012-06-09').getFullYear();
    const babyThreshold = new Date('2022-06-09').getFullYear();

    if (birthYear <= adultThreshold) {
      return 'Người lớn';
    } else if (birthYear > adultThreshold && birthYear <= kidThreshold) {
      return 'Trẻ em';
    } else if (birthYear > kidThreshold && birthYear <= childThreshold) {
      return 'Trẻ nhỏ';
    } else if (birthYear > babyThreshold) {
      return 'Em bé';
    } else {
      return 'Không xác định';
    }
  }

  // ĐẾM NHÓM TUỔI=========================================
  ageGroups: Record<AgeGroup, number> = {
    'Người lớn': 0,
    'Trẻ em': 0,
    'Trẻ nhỏ': 0,
    'Em bé': 0,
    'Không xác định': 0
  };

  includesAgeGroup(birthDateString: string): AgeGroup {
    const birthDate = new Date(birthDateString);
    const birthYear = birthDate.getFullYear();

    const adultThreshold = new Date('2012-06-08').getFullYear();
    const childThreshold = new Date('2019-06-09').getFullYear();
    const kidThreshold = new Date('2012-06-09').getFullYear();
    const babyThreshold = new Date('2022-06-09').getFullYear();

    if (birthYear <= adultThreshold) {
      return 'Người lớn';
    } else if (birthYear > adultThreshold && birthYear <= kidThreshold) {
      return 'Trẻ em';
    } else if (birthYear > kidThreshold && birthYear <= childThreshold) {
      return 'Trẻ nhỏ';
    } else if (birthYear > babyThreshold) {
      return 'Em bé';
    } else {
      return 'Không xác định';
    }
  }

  countAgeGroups(data: any[]): Record<AgeGroup, number> {
    data.forEach(person => {
      const group = this.includesAgeGroup(person.birthday);
      if (group) {
        this.ageGroups[group]++;
      }
    });
    return this.ageGroups;
  }

  // TÍNH GIẢM GIÁ ĐỘ TUỔI
  getPriceGroup(birthDateString: string): string {
    const birthDate = new Date(birthDateString);
    const birthYear = birthDate.getFullYear();

    const adultThreshold = new Date('2012-06-08').getFullYear();
    const childThreshold = new Date('2019-06-09').getFullYear();
    const kidThreshold = new Date('2012-06-09').getFullYear();
    const babyThreshold = new Date('2022-06-09').getFullYear();

    if (birthYear <= adultThreshold) {
      return '0';
    } else if (birthYear > adultThreshold && birthYear <= kidThreshold) {
      return '20%';
    } else if (birthYear > kidThreshold && birthYear <= childThreshold) {
      return '40%';
    } else if (birthYear > babyThreshold) {
      return '60%';
    } else {
      return 'Không xác định';
    }
  }

  // KIỂM TRA TÌNH TRẠNG THANH TÓAN
  getPaymentStatus(pm: number): string{
    console.log('p', pm)
    if (pm && pm === 2) {
      return "Đang thanh toán";
    } else if (pm === 1){
      return "Đã thanh toán";
    } else if (pm === 0){
      return "Chưa thanh toán";
    }

    return "Chờ xác nhận";

  }
}

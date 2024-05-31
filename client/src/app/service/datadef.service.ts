import { Injectable,  Pipe, PipeTransform } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class DataDefService {

  constructor() { }

  provinces(){
    return [
      'An Giang', 'Bà Rịa - Vũng Tàu', 'Bắc Giang', 'Bắc Kạn', 'Bạc Liêu',
      'Bắc Ninh', 'Bến Tre', 'Bình Định', 'Bình Dương', 'Bình Phước',
      'Bình Thuận', 'Cà Mau', 'Cần Thơ', 'Cao Bằng', 'Đà Nẵng',
      'Đắk Lắk', 'Đắk Nông', 'Điện Biên', 'Đồng Nai', 'Đồng Tháp',
      'Gia Lai', 'Hà Giang', 'Hà Nam', 'Hà Nội', 'Hà Tĩnh',
      'Hải Dương', 'Hải Phòng', 'Hậu Giang', 'Hòa Bình', 'Hưng Yên',
      'Khánh Hòa', 'Kiên Giang', 'Kon Tum', 'Lai Châu', 'Lâm Đồng',
      'Lạng Sơn', 'Lào Cai', 'Long An', 'Nam Định', 'Nghệ An',
      'Ninh Bình', 'Ninh Thuận', 'Phú Thọ', 'Phú Yên', 'Quảng Bình',
      'Quảng Nam', 'Quảng Ngãi', 'Quảng Ninh', 'Quảng Trị', 'Sóc Trăng',
      'Sơn La', 'Tây Ninh', 'Thái Bình', 'Thái Nguyên', 'Thanh Hóa',
      'Thừa Thiên Huế', 'Tiền Giang', 'TP. Hồ Chí Minh', 'Trà Vinh', 'Tuyên Quang',
      'Vĩnh Long', 'Vĩnh Phúc', 'Yên Bái'
    ]
  };

  getProvinces() {
    return [
      {
        img: 'https://vcdn1-dulich.vnecdn.net/2022/05/11/hoan-kiem-lake-7673-1613972680-1508-1652253984.jpg?w=0&h=0&q=100&dpr=1&fit=crop&s=2wB1cBTUcNKuk68nrG6LMQ',
        luotThamQuan: 10000,
        ten: 'Hà Nội'
      },
      {
        img: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/ed/DJI_0550-HDR-Pano.jpg/800px-DJI_0550-HDR-Pano.jpg',
        luotThamQuan: 9500,
        ten: 'Hồ Chí Minh'
      },
      {
        img: 'https://media.baothaibinh.com.vn/upload/news/11_2022/1667438129055_08152903112022.jpg',
        luotThamQuan: 8500,
        ten: 'Đà Nẵng'
      },
      {
        img: 'https://i0.wp.com/heza.gov.vn/wp-content/uploads/2023/09/hai_phong-scaled.jpg?fit=2560%2C1662&ssl=1',
        luotThamQuan: 8000,
        ten: 'Hải Phòng'
      },
      {
        img: 'https://image.vietnamnews.vn/uploadvnnews/Article/2019/3/12/HP03120138332611PM.jpg',
        luotThamQuan: 7500,
        ten: 'Cần Thơ'
      },
      {
        img: 'https://cdn.britannica.com/23/185223-050-71EBC6C2/Thien-Mu-pagoda-Huong-River-Vietnam-Hue.jpg',
        luotThamQuan: 7000,
        ten: 'Huế'
      },
      {
        img: 'https://vmtravel.com.vn/wp-content/uploads/2018/02/holiday-to-vietnam-nha-trang-beach-972x603.jpg',
        luotThamQuan: 6500,
        ten: 'Nha Trang'
      },
      {
        img: 'https://investvietnam.vn/uploads/02-Location/ProvincesCities/QuangNinh/QuangNinh3.jpg',
        luotThamQuan: 6000,
        ten: 'Quảng Ninh'
      }
    ];
  }


}

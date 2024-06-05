-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 05, 2024 lúc 11:45 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `travel`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `bookings`
--

CREATE TABLE `bookings` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `tour_id` int(11) NOT NULL,
  `booking_date` varchar(50) NOT NULL,
  `num_of_people` tinyint(4) NOT NULL DEFAULT 1,
  `total_price` int(11) NOT NULL,
  `payment_status` tinyint(4) NOT NULL DEFAULT 0,
  `code` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `bookings`
--

INSERT INTO `bookings` (`id`, `user_id`, `tour_id`, `booking_date`, `num_of_people`, `total_price`, `payment_status`, `code`) VALUES
(1, 1, 1, '2024-05-01', 2, 5400000, 1, ''),
(2, 2, 2, '2024-05-02', 1, 1800000, 1, ''),
(3, 3, 3, '2024-05-03', 3, 6750000, 0, ''),
(4, 4, 4, '2024-05-04', 2, 4400000, 1, ''),
(5, 5, 5, '2024-05-05', 4, 4000000, 0, ''),
(6, 6, 6, '2024-05-06', 1, 3600000, 1, ''),
(7, 7, 7, '2024-05-07', 3, 4050000, 0, ''),
(8, 8, 8, '2024-05-08', 2, 3200000, 1, ''),
(9, 9, 9, '2024-05-09', 1, 500000, 1, ''),
(10, 10, 10, '2024-05-10', 5, 22500000, 0, ''),
(16, 24, 1, '30/5/2024', 2, 4200000, 1, '2024530433'),
(17, 33, 2, '1/6/2024', 4, 6800000, 1, '202461439'),
(18, 34, 6, '1/6/2024', 2, 8000000, 1, '202461421');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `destinations`
--

CREATE TABLE `destinations` (
  `id` int(11) NOT NULL,
  `destination_name` varchar(200) NOT NULL,
  `des` varchar(2000) NOT NULL,
  `provinces` varchar(500) NOT NULL,
  `image_url` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `destinations`
--

INSERT INTO `destinations` (`id`, `destination_name`, `des`, `provinces`, `image_url`) VALUES
(11, 'Vịnh Hạ Long', 'Một điểm đến du lịch nổi tiếng ở tỉnh Quảng Ninh, nổi tiếng với làn nước màu ngọc bích và hàng ngàn đảo đá vôi sừng sững.', 'Quảng Ninh', 'https://example.com/images/halongbay.jpg'),
(12, 'Phố cổ Hội An', 'Một ví dụ bảo tồn tốt về một cảng thương mại Đông Nam Á từ thế kỷ 15 đến thế kỷ 19.', 'Quảng Nam', 'https://example.com/images/hoian.jpg'),
(13, 'Vườn quốc gia Phong Nha-Kẻ Bàng', 'Một Di sản Thế giới UNESCO nổi tiếng với hệ thống hang động, bao gồm hang động lớn nhất thế giới, Sơn Đoòng.', 'Quảng Bình', 'https://example.com/images/phongnha.jpg'),
(14, 'Sa Pa', 'Một thị trấn ở dãy Hoàng Liên Sơn thuộc tây bắc Việt Nam, nổi tiếng với các thửa ruộng bậc thang và dân tộc thiểu số.', 'Lào Cai', 'https://example.com/images/sapa.jpg'),
(15, 'Đà Nẵng', 'Một thành phố ven biển ở miền trung Việt Nam nổi tiếng với bãi biển cát trắng, cầu Rồng và Ngũ Hành Sơn.', 'Đà Nẵng', 'https://example.com/images/danang.jpg'),
(16, 'Nha Trang', 'Một thành phố ven biển ở tỉnh Khánh Hòa, nổi tiếng với các bãi biển, điểm lặn biển và các đảo ngoài khơi.', 'Khánh Hòa', 'https://example.com/images/nhatrang.jpg'),
(17, 'Huế', 'Kinh đô cũ của Việt Nam, nổi tiếng với các di tích lịch sử, chùa chiền và Đại Nội.', 'Thừa Thiên-Huế', 'https://example.com/images/hue.jpg'),
(18, 'Đồng bằng sông Cửu Long', 'Một vùng ở phía tây nam Việt Nam nổi tiếng với mạng lưới sông ngòi, đầm lầy và đảo, cùng các chợ nổi.', 'Bạc Liêu', 'https://example.com/images/mekongdelta.jpg'),
(19, 'Địa đạo Củ Chi', 'Một mạng lưới đường hầm được sử dụng bởi quân Giải phóng miền Nam Việt Nam trong Chiến tranh Việt Nam, nằm gần TP. Hồ Chí Minh.', 'TP. Hồ Chí Minh', 'https://example.com/images/cuchi.jpg'),
(20, 'Đảo Phú Quốc', 'Một hòn đảo nằm ngoài khơi Campuchia trong vịnh Thái Lan, nổi tiếng với các bãi biển, khu nghỉ dưỡng và Vườn quốc gia Phú Quốc.', 'Kiên Giang', 'https://example.com/images/phuquoc.jpg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `guests`
--

CREATE TABLE `guests` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `gender` varchar(5) DEFAULT NULL,
  `birthday` varchar(10) NOT NULL,
  `booking_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `guests`
--

INSERT INTO `guests` (`id`, `name`, `gender`, `birthday`, `booking_id`) VALUES
(9, 'Lĩnh Vi', 'Nam', '4/7/1964', 16),
(10, 'Lam Tú', 'Nam', '17/8/2022', 16),
(11, 'Nguyễn C', 'Nam', '5/4/2012', 17),
(12, 'Nguyễn Hoa', 'Nữ', '14/8/2001', 17),
(13, 'Hoa Hoa', 'Nữ', '16/7/2015', 17),
(14, 'Giang Hoa', 'Nam', '16/10/2020', 17),
(15, 'thay tho', 'Nam', '16/9/1999', 18),
(16, 'thay nam', 'Nam', '15/7/1998', 18);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `invoices`
--

CREATE TABLE `invoices` (
  `id` int(11) NOT NULL,
  `booking_id` int(11) NOT NULL,
  `invoice_date` varchar(11) NOT NULL,
  `total_amount` int(11) NOT NULL,
  `payment_method` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `invoices`
--

INSERT INTO `invoices` (`id`, `booking_id`, `invoice_date`, `total_amount`, `payment_method`) VALUES
(11, 16, '30/5/2024', 4200000, 'Thanh toán chuyển khoản'),
(12, 17, '1/6/2024', 6800000, 'Thanh toán tiền mặt'),
(13, 18, '1/6/2024', 8000000, 'Thanh toán tiền mặt');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tours`
--

CREATE TABLE `tours` (
  `id` int(11) NOT NULL,
  `tour_name` varchar(200) NOT NULL,
  `destination_id` int(11) NOT NULL,
  `description` text NOT NULL,
  `price` int(11) NOT NULL,
  `start_date` varchar(50) NOT NULL,
  `end_date` varchar(50) NOT NULL,
  `discount_price` int(11) DEFAULT NULL,
  `departure_location` varchar(250) NOT NULL,
  `transportation` varchar(50) NOT NULL,
  `code_tour` varchar(50) NOT NULL,
  `img` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tours`
--

INSERT INTO `tours` (`id`, `tour_name`, `destination_id`, `description`, `price`, `start_date`, `end_date`, `discount_price`, `departure_location`, `transportation`, `code_tour`, `img`) VALUES
(1, 'Hà Nội - Vịnh Hạ Long - Ninh Bình - Tràng An - Hà Nam - Địa Tạng Phi Lai Tự', 11, 'Chuyến du thuyền 3 ngày khám phá các kỳ quan thiên nhiên của Vịnh Hạ Long.\nLịch trình:\n- Ngày 1: Khởi hành từ Hà Nội, check-in tại du thuyền, tham quan Động Thiên Cung.\n- Ngày 2: Tham quan Làng Chài Vung Viêng, chèo kayak, tham quan hang Luồn.\n- Ngày 3: Thăm đảo Titop, trở về Hà Nội.', 3000000, '2024-06-01', '2024-06-03', 2700000, 'Hà Nội', 'Xe khách', 'NNSGN4505-006-160524VJ-D', 'https://ik.imagekit.io/tvlk/blog/2022/10/kinh-nghiem-du-lich-vinh-ha-long-1.jpg?tr=dpr-2,w-675'),
(2, 'Tour Bán Đảo Sơn Trà nửa ngày Ngũ Hành Sơn Hội An', 12, 'Chuyến tham quan 2 ngày đến phố cổ Hội An, bao gồm cả chuyến thăm thánh địa Mỹ Sơn.\nLịch trình:\n- Ngày 1: Khởi hành từ Đà Nẵng, tham quan phố cổ Hội An, check-in khách sạn.\n- Ngày 2: Tham quan thánh địa Mỹ Sơn, trở về Đà Nẵng.', 2000000, '2024-06-05', '2024-06-06', 1800000, 'Đà Nẵng', 'Ô tô', 'NNSGN4505-006-160524VJ-9', 'https://www.vietnambooking.com/wp-content/uploads/2018/12/du-lich-hoi-an-3.jpg'),
(3, 'Tour du lịch Phong Nha Kẻ Bàng 2 ngày 1 đêm - Quảng Bình Travel', 13, 'Cuộc phiêu lưu 3 ngày khám phá các hang động tại Vườn quốc gia Phong Nha-Kẻ Bàng.\nLịch trình:\n- Ngày 1: Khởi hành từ Đồng Hới, tham quan động Phong Nha, check-in khách sạn.\n- Ngày 2: Khám phá động Thiên Đường và suối nước Moọc.\n- Ngày 3: Tham quan động Tiên Sơn, trở về Đồng Hới.', 2500000, '2024-06-10', '2024-06-12', 2250000, 'Đồng Hới', 'Xe khách', 'NNSGN4505-006-160524VJ-B', 'https://celinaresort.com/wp-content/uploads/2021/03/vung-chua-dong-phong-nha-05-1280x650.jpg'),
(4, 'Tour du lịch Sapa hấp dẫn với những trải nghiệm tuyệt vời', 14, 'Chuyến trekking 3 ngày qua các thửa ruộng bậc thang và các bản làng dân tộc ở Sapa.\nLịch trình:\n- Ngày 1: Khởi hành từ Hà Nội, check-in khách sạn tại Sapa, tham quan bản Cát Cát.\n- Ngày 2: Trekking qua thung lũng Mường Hoa, bản Tả Van, check-in homestay.\n- Ngày 3: Tham quan núi Hàm Rồng, trở về Hà Nội.', 2200000, '2024-06-15', '2024-06-17', 2000000, 'Hà Nội', 'Tàu hỏa', 'NNSGN4505-006-160524VJ-0', 'https://www.kkday.com/vi/blog/wp-content/uploads/du-lich-sapa.jpg'),
(5, 'Tour thành phố Đà Nẵng trong ngày', 15, 'Chuyến tham quan 1 ngày khám phá các điểm đến và địa danh nổi bật của Đà Nẵng.\r\nLịch trình:\r\n\r\n- Buổi sáng: Tham quan Ngũ Hành Sơn, chùa Linh Ứng.\r\n- Buổi chiều: Tham quan cầu Rồng, bãi biển Mỹ Khê.', 1000000, '2024-06-20', '2024-06-20', NULL, 'Đà Nẵng', 'Xe khách', 'NNSGN4505-006-160524VJ-Z', 'https://vcdn1-dulich.vnecdn.net/2022/06/01/CauVangDaNang-1654082224-7229-1654082320.jpg?w=0&h=0&q=100&dpr=2&fit=crop&s=MeVMb72UZA27ivcyB3s7Kg'),
(6, 'Tour du lịch Nha Trang cực rẻ cực chất', 16, 'Kỳ nghỉ 4 ngày tại Nha Trang với các hoạt động lặn biển và tham quan đảo.\nLịch trình:\n- Ngày 1: Khởi hành từ TP. Hồ Chí Minh, check-in khách sạn, tham quan tháp Bà Ponagar.\n- Ngày 2: Tham gia tour 4 đảo, lặn biển tại Hòn Mun.\n- Ngày 3: Tham quan Vinpearl Land.\n- Ngày 4: Tự do tắm biển, trở về TP. Hồ Chí Minh.', 4000000, '2024-06-25', '2024-06-28', 3600000, 'TP. Hồ Chí Minh', 'Máy bay', 'NNSGN4505-006-160524VJ-L', 'https://static.vinwonders.com/production/nha-trang-o-dau-1.jpg'),
(7, 'Tour du lịch Huế một ngày một đêm cực xịn cực phê', 17, 'Chuyến tham quan 2 ngày các di tích lịch sử và điểm tham quan tại cố đô Huế.\nLịch trình:\n- Ngày 1: Khởi hành từ Đà Nẵng, tham quan Đại Nội, chùa Thiên Mụ.\n- Ngày 2: Tham quan lăng Khải Định, lăng Minh Mạng, trở về Đà Nẵng.', 1500000, '2024-07-01', '2024-07-02', 1350000, 'Đà Nẵng', 'Ô tô', 'NNSGN4505-006-160524VJ-E', 'https://static.vinwonders.com/2023/02/dia-diem-du-lich-hue-01.jpg'),
(8, 'Tour Đồng bằng sông Cửu Long: Khám phá 8 tỉnh miền Tây', 18, 'Chuyến tham quan 2 ngày khám phá đồng bằng sông Cửu Long, bao gồm chợ nổi và các làng địa phương.\nLịch trình:\n- Ngày 1: Khởi hành từ TP. Hồ Chí Minh, tham quan chợ nổi Cái Bè, check-in homestay.\n- Ngày 2: Tham quan vườn trái cây, làng nghề truyền thống, trở về TP. Hồ Chí Minh.', 1800000, '2024-07-05', '2024-07-06', 1600000, 'TP. Hồ Chí Minh', 'Xe khách', 'NNSGN4505-006-160524VJ-Q', 'https://media.vneconomy.vn/images/upload/2023/10/23/367750245-10161705392087952-3716617474891396023-n.jpg'),
(9, 'Trải nghiệm địa đạo Củ Chi một ngày duy nhất', 19, 'Chuyến tham quan nửa ngày khám phá địa đạo Củ Chi và tìm hiểu về ý nghĩa lịch sử của chúng trong chiến tranh Việt Nam.\nLịch trình:\n- Buổi sáng: Khởi hành từ TP. Hồ Chí Minh, tham quan địa đạo Củ Chi, trở về TP. Hồ Chí Minh.', 500000, '2024-07-10', '2024-07-10', NULL, 'TP. Hồ Chí Minh', 'Xe khách', 'NNSGN4505-006-160524VJ-YY', 'https://huunghitour.com/wp-content/uploads/2023/04/dia-dao-cu-chi.jpg'),
(10, 'Tour Đảo Phú Quốc - Khám phá 2, 3, 4, 5 đảo + ngắm san hô', 20, 'Kỳ nghỉ 5 ngày thư giãn trên đảo Phú Quốc, bao gồm nghỉ tại resort và tham quan đảo.\nLịch trình:\n- Ngày 1: Khởi hành từ TP. Hồ Chí Minh, check-in resort.\n- Ngày 2: Tham quan vườn tiêu, nhà thùng nước mắm, chợ đêm.\n- Ngày 3: Tham quan bãi Sao, làng chài Hàm Ninh.\n- Ngày 4: Tham quan Vinpearl Safari, vui chơi tại VinWonders.\n- Ngày 5: Tự do tắm biển, trở về TP. Hồ Chí Minh.', 5000000, '2024-07-15', '2024-07-19', 4500000, 'TP. Hồ Chí Minh', 'Máy bay', 'NNSGN4505-006-160524VJ-UU', 'https://static.vinwonders.com/production/dien-tich-dao-phu-quoc-1.jpeg');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `pass` varchar(50) DEFAULT NULL,
  `full_name` varchar(100) NOT NULL,
  `address` varchar(250) DEFAULT NULL,
  `phone_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `email`, `pass`, `full_name`, `address`, `phone_number`) VALUES
(1, 'nguyen.van.a@gmail.com', 'password1', 'Nguyễn Văn A', '123 Đường A, Quận 1, TP. Hồ Chí Minh', 1234567890),
(2, 'tran.thi.b@gmail.com', 'password2', 'Trần Thị B', '456 Đường B, Quận 2, TP. Hồ Chí Minh', 2147483647),
(3, 'le.van.c@gmail.com', 'password3', 'Lê Văn C', '789 Đường C, Quận 3, TP. Hồ Chí Minh', 2147483647),
(4, 'pham.thi.d@gmail.com', 'password4', 'Phạm Thị D', '101 Đường D, Quận 4, TP. Hồ Chí Minh', 2147483647),
(5, 'hoang.van.e@gmail.com', 'password5', 'Hoàng Văn E', '202 Đường E, Quận 5, TP. Hồ Chí Minh', 2147483647),
(6, 'vu.thi.f@gmail.com', 'password6', 'Vũ Thị F', '303 Đường F, Quận 6, TP. Hồ Chí Minh', 2147483647),
(7, 'ngo.van.g@gmail.com', 'password7', 'Ngô Văn G', '404 Đường G, Quận 7, TP. Hồ Chí Minh', 2147483647),
(8, 'dao.thi.h@gmail.com', 'password8', 'Đào Thị H', '505 Đường H, Quận 8, TP. Hồ Chí Minh', 2147483647),
(9, 'bui.van.i@gmail.com', 'password9', 'Bùi Văn I', '606 Đường I, Quận 9, TP. Hồ Chí Minh', 2147483647),
(10, 'nguyen.thi.j@gmail.com', 'password10', 'Nguyễn Thị J', '707 Đường J, Quận 10, TP. Hồ Chí Minh', 1234567891),
(11, 'tran.van.k@gmail.com', 'password11', 'Trần Văn K', '808 Đường K, Quận 11, TP. Hồ Chí Minh', 2147483647),
(12, 'le.thi.l@gmail.com', 'password12', 'Lê Thị L', '909 Đường L, Quận 12, TP. Hồ Chí Minh', 2147483647),
(13, 'pham.van.m@gmail.com', 'password13', 'Phạm Văn M', '1010 Đường M, Quận Bình Thạnh, TP. Hồ Chí Minh', 2147483647),
(14, 'hoang.thi.n@gmail.com', 'password14', 'Hoàng Thị N', '1111 Đường N, Quận Gò Vấp, TP. Hồ Chí Minh', 2147483647),
(15, 'vu.van.o@gmail.com', 'password15', 'Vũ Văn O', '1212 Đường O, Quận Tân Bình, TP. Hồ Chí Minh', 2147483647),
(24, 'adcs@gmail.com', NULL, 'Hoa Đà', 'H', 2147483647),
(25, 'nguyen.van.a@gmail.com', 'vantan123', 'Phạm Hoa', NULL, 1234567892),
(26, 'nguyen.77an.a@gmail.com', 'vantan123', 'Phạm HoaBam', NULL, 1234567897),
(27, 'hoacongtu@gmail.com', '@@@vantan123', 'Phạm Hoa', NULL, 921063009),
(28, 'hoacongtu5@gmail.com', '@@@vantan123', 'Phạm Hoa', NULL, 921063007),
(29, 'thyatho@gmail.com', 'tho123', 'thaytho', NULL, 2147483647),
(30, 'thaytho@gmail.com', 'abc123', 'Thầy Thơ', NULL, 2147483647),
(31, 'thaythotm@gmail.com', 'abc123', 'Thầy Nam', NULL, 924886556),
(32, 'thaytho123@gmail.com', 'abc123', 'Thầy Thơ', NULL, 921231234),
(33, 'thaytho123@gmail.com', NULL, 'Thầy Thơ', 'Hồng Sơn, Huyện Hàm Thuận Bắc', 921231234),
(34, 'thaytho123@gmail.com', NULL, 'Thầy Thơ', NULL, 921231234);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `booking_tour` (`tour_id`),
  ADD KEY `booking_user` (`user_id`);

--
-- Chỉ mục cho bảng `destinations`
--
ALTER TABLE `destinations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `guests`
--
ALTER TABLE `guests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `guests_booking` (`booking_id`);

--
-- Chỉ mục cho bảng `invoices`
--
ALTER TABLE `invoices`
  ADD PRIMARY KEY (`id`),
  ADD KEY `invoices_booking` (`booking_id`);

--
-- Chỉ mục cho bảng `tours`
--
ALTER TABLE `tours`
  ADD PRIMARY KEY (`id`),
  ADD KEY `tour_des` (`destination_id`);

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `bookings`
--
ALTER TABLE `bookings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT cho bảng `destinations`
--
ALTER TABLE `destinations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT cho bảng `guests`
--
ALTER TABLE `guests`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT cho bảng `invoices`
--
ALTER TABLE `invoices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT cho bảng `tours`
--
ALTER TABLE `tours`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `bookings`
--
ALTER TABLE `bookings`
  ADD CONSTRAINT `booking_tour` FOREIGN KEY (`tour_id`) REFERENCES `tours` (`id`),
  ADD CONSTRAINT `booking_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

--
-- Các ràng buộc cho bảng `guests`
--
ALTER TABLE `guests`
  ADD CONSTRAINT `guests_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`);

--
-- Các ràng buộc cho bảng `invoices`
--
ALTER TABLE `invoices`
  ADD CONSTRAINT `invoices_booking` FOREIGN KEY (`booking_id`) REFERENCES `bookings` (`id`);

--
-- Các ràng buộc cho bảng `tours`
--
ALTER TABLE `tours`
  ADD CONSTRAINT `tour_des` FOREIGN KEY (`destination_id`) REFERENCES `destinations` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

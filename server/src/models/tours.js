const { sequelize } = require('../util/mysql'); // Import sequelize từ mysql.js
const Sequelize = require('sequelize');

const tours = sequelize.define('tours', {
    tour_name: Sequelize.STRING,
    description: Sequelize.TEXT,
    departure_location: Sequelize.STRING,
    code_tour: Sequelize.STRING,
    start_date: Sequelize.STRING,
    end_date: Sequelize.STRING,
    transportation: Sequelize.STRING,
    price: Sequelize.INTEGER,
    discount_price: Sequelize.INTEGER,
    destination_id: Sequelize.INTEGER,
    img: Sequelize.TEXT,
}, { timestamps: false });

class TourTable {
    constructor(tours) {
        this.tours = tours;
    }

    // Phương thức lấy toàn bộ dữ liệu
    getAllTours() {
        return this.tours.findAll();
    }

    // Phương thức lấy dữ liệu theo id
    getTourById(id) {
        return this.tours.findByPk(id);
    }

    // Phương thức lấy các tour có discount_price khác null
    getToursWithDiscount() {
        return this.tours.findAll({
            where: {
                discount_price: {
                    [Sequelize.Op.ne]: null
                }
            }
        });
    }
}

// Tạo một thể hiện của lớp TourTable
const tourTableInstance = new TourTable(tours);

module.exports = tourTableInstance;

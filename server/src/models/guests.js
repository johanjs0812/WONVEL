const { sequelize } = require('../util/mysql'); // Import sequelize từ mysql.js
const Sequelize = require('sequelize');

const guests = sequelize.define('guests', {
    name: Sequelize.STRING,
    gender: Sequelize.STRING,
    birthday: Sequelize.STRING,
    booking_id: Sequelize.INTEGER,
}, { timestamps: false });

class GuestsTable {
    constructor(x) {
        this.guests = x;
    }

    // Phương thức lấy toàn bộ dữ liệu
    getAll() {
        return this.guests.findAll();
    }

    // Phương thức lấy dữ liệu theo id
    getById(id) {
        return this.guests.findByPk(id);
    }

    // Phương thức thêm nhiều dữ liệu vào bảng
    addMultiple(dataArray) {
        return this.guests.bulkCreate(dataArray);
    }
}

const guestsTableInstance = new GuestsTable(guests);

module.exports = guestsTableInstance;

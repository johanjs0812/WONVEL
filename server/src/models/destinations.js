const { sequelize } = require('../util/mysql');
const Sequelize = require('sequelize');

const table = sequelize.define('destinations', {
    des: Sequelize.STRING,
    destination_name: Sequelize.STRING,
    provinces: Sequelize.STRING,
    image_url: Sequelize.TEXT,
}, { timestamps: false });

class DestinationTable {
    constructor(table) {
        this.table = table;
    }

    // Phương thức lấy toàn bộ dữ liệu
    getAll() {
        return this.table.findAll();
    }

    // Phương thức lấy dữ liệu theo id
    getById(id) {
        return this.table.findByPk(id);
    }
}

// Tạo một thể hiện của lớp TourTable
const destinationInstance = new DestinationTable(table);

module.exports = destinationInstance;

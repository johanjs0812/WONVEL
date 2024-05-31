const { sequelize } = require('../util/mysql'); // Import sequelize từ mysql.js
const Sequelize = require('sequelize');

const invoices = sequelize.define('invoices', {
    booking_id: Sequelize.INTEGER,
    invoice_date: Sequelize.STRING,
    total_amount: Sequelize.INTEGER,
    payment_method: Sequelize.STRING,
}, { timestamps: false });

class InvoicesTable {
    constructor(x) {
        this.invoices = x;
    }

    // Phương thức lấy toàn bộ dữ liệu
    getAll() {
        return this.invoices.findAll();
    }

    // Phương thức lấy dữ liệu theo id
    getById(id) {
        return this.invoices.findByPk(id);
    }

    // Phương thức thêm dữ liệu vào bảng
    add(data) {
        return this.invoices.create(data);
    }
}

const invoicesTableInstance = new InvoicesTable(invoices);

module.exports = invoicesTableInstance;

const { sequelize } = require('../util/mysql'); // Import sequelize từ mysql.js
const Sequelize = require('sequelize');
const { Op } = require('sequelize'); // Nếu bạn đang sử dụng CommonJS

const user = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        allowNull: false
    },
    pass: {
        type: Sequelize.STRING,
        allowNull: true
    },
    full_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    phone_number: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, { 
    timestamps: false,
    freezeTableName: true 
});

class UsersTable {
    constructor(x) {
        this.user = x;
    }

    // Phương thức lấy toàn bộ dữ liệu
    getAll() {
        return this.user.findAll();
    }

    // Phương thức lấy dữ liệu theo id
    getById(id) {
        return this.user.findByPk(id);
    }

    // Phương thức thêm dữ liệu vào bảng
    add(data) {
        return this.user.create(data);
    }

    // Phương thức kiểm tra email và mật khẩu
    checkLogin(email, pass) {
        return this.user.findOne({ where: { email: email, pass: pass, pass: { [Op.ne]: null } } });
    }    

    checkSingup(phonenumber, email) {
        return this.user.findOne({ 
            where: { 
                [Op.or]: [
                    { email: email, pass: { [Op.ne]: null } },
                    { phone_number: phonenumber, pass: { [Op.ne]: null } }
                ]
            } 
        });
    }
     
    
}

const usersTableInstance = new UsersTable(user);

module.exports = usersTableInstance;

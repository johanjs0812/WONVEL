const express = require('express');
const { getData, getDataId, addData, getPayment} = require('../controllers/bookings');

const bookingsRouter = express.Router();

bookingsRouter.get('/api/v1/bookings', getData);

bookingsRouter.get('/api/v1/bookings/:id', getDataId);

bookingsRouter.get('/api/v2/bookings/payment/:id', getPayment);

bookingsRouter.post('/api/v1/bookings', addData);

module.exports = bookingsRouter;

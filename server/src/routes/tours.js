const express = require('express');
const { getData, getDataByCategory, getDataId, getDiscountPrice, getDataAndDes} = require('../controllers/tours');

const tourRouter = express.Router();

tourRouter.get('/api/v1/tours', getData);
tourRouter.get('/api/v1/tours_des', getDataAndDes);

tourRouter.get('/api/v1/tours/:id', getDataId);

tourRouter.get('/api/v2/tours/discount_price', getDiscountPrice);

module.exports = tourRouter;

const express = require('express');
const { getData, getDataId, addData} = require('../controllers/invoices');

const invoicesRouter = express.Router();

invoicesRouter.get('/api/v1/invoices', getData);

invoicesRouter.get('/api/v1/invoices/:id', getDataId);

invoicesRouter.post('/api/v1/invoices', addData);

module.exports = invoicesRouter;

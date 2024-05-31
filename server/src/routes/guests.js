const express = require('express');
const { getData, getDataId, allManyData} = require('../controllers/guests');

const guestsRouter = express.Router();

guestsRouter.get('/api/v1/guests', getData);

guestsRouter.get('/api/v1/guests/:id', getDataId);

guestsRouter.post('/api/v2/guests', allManyData);

module.exports = guestsRouter;

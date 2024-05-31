const express = require('express');
const { getData, getDataId, addData, login, singup} = require('../controllers/users');

const usersRouter = express.Router();

usersRouter.get('/api/v1/users', getData);
usersRouter.get('/api/v1/users/:id', getDataId);

usersRouter.post('/api/v2/users/login', login);
usersRouter.post('/api/v2/users/singup', singup);

usersRouter.post('/api/v2/users', addData);

module.exports = usersRouter;

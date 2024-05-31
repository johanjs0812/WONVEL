const express = require('express');
const usersTableInstance  = require('../models/users');
const jwt = require('jsonwebtoken');

const Instance = usersTableInstance;

const getData = async (req, res, next) => {
    try {
        const respondata = await Instance.getAll();
        if (!respondata) {
            console.error('Failed to fetch data');
            return undefined;
        }
        const dataObjects = respondata.map(items => items.toJSON());
        res.json(dataObjects);
    } catch (err) {
        console.error('Failed to fetch cate', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const getDataId = async (req, res, next) => {
    try {
        const id = req.params.id;

        const respondata = await Instance.getById(id);

        if (!respondata) {
            console.error('Failed to fetch Data');
            return res.status(404).json({ error: 'data not found' });
        };

        const dataObjects = respondata.toJSON();

        res.json(dataObjects);

    } catch (err) {
        console.error('Failed to fetch data', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    };
};

const addData = async (req, res, next) => {
    try {
        const data = req.body; 
        console.log('bo', data)
        const respondata = await Instance.add(data);
        if (!respondata) {
            console.error('Failed to add data');
            return res.status(500).json({ error: 'Failed to add data' });
        }

        const dataObjects = respondata.toJSON();
        res.json(dataObjects);
    } catch (err) {
        console.error('Failed to add data', err);
        res.status(500).json({ error: 'Failed to add data' });
    }
};

const login = async (req, res, next) => {
    try {
        console.log('cmn',req.body)

        const user = await Instance.checkLogin(req.body.email, req.body.pass);
        console.log('xxx', user)
        if (!user) {
            console.error('Invalid email or password');
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        const userObject = user.toJSON();

        // Tạo token
        const token = jwt.sign(userObject, 'fpt_polytechnic');

        res.json({ ...userObject, token });
    } catch (err) {
        console.error('Failed to login', err);
        res.status(500).json({ error: 'Failed to login' });
    }
};

const singup = async (req, res, next) => {
    try {

        const user = await Instance.checkSingup(req.body.phone_number, req.body.email);
        console.log('ccc',user)
        if (user) {
            console.error('phone or email');
            return res.status(401).json({ error: 'phone or email' });
        }

        const respondata = await Instance.add(req.body);
        const userObject = respondata.toJSON();
        res.json(userObject);

    } catch (err) {
        console.error('Failed to login', err);
        res.status(500).json({ error: 'Failed to login' });
    }
};

module.exports = {
    getData,
    getDataId,
    addData,
    login,
    singup
};


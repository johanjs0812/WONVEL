const express = require('express');
const bookingsTableInstance  = require('../models/bookings');

const Instance = bookingsTableInstance;

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
        const respondata = await Instance.add(data);
        if (!respondata) {
            console.error('Failed to add data');
            return res.status(500).json({ error: 'Failed to add data' });
        }

        res.json(respondata);
    } catch (err) {
        console.error('Failed to add data', err);
        res.status(500).json({ error: 'Failed to add data' });
    }
};

const getPayment = async (req, res, next) => {
    try {
        const id = req.params.id;

        const respondata = await Instance.getWithRelations(id);

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
}

module.exports = {
    getData,
    getDataId,
    addData,
    getPayment
};


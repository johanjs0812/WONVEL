const express = require('express');
const tourTableInstance  = require('../models/guests');

const Instance = tourTableInstance;

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

const allManyData = async (req, res, next) => {
    try {
        const data = req.body;
        const result = await Instance.addMultiple(data);
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra khi thêm dữ liệu', error: error.message });
    }
};

module.exports = {
    getData,
    getDataId,
    allManyData
};


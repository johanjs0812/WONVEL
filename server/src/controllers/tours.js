const express = require('express');
const tourTableInstance  = require('../models/tours');
const destinationInstance  = require('../models/destinations');

const Instance = tourTableInstance;
const Instance2 = destinationInstance;

const getData = async (req, res, next) => {
    try {
        const respondata = await Instance.getAllTours();
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

        const respondata = await Instance.getTourById(id);

        if (!respondata) {
            console.error('Failed to fetch Data');
            return res.status(404).json({ error: 'data not found' });
        };

        const dataObjects = respondata.toJSON();

        const respondata2 = await Instance2.getById(dataObjects.destination_id);

        const dataObjects2 = respondata2.toJSON();

        res.json({ tour: dataObjects, destination: dataObjects2 });

    } catch (err) {
        console.error('Failed to fetch data', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    };
};

const getDataByCategory = async (req, res, next) => {
    try {

        const categoryId = req.params.id;

        if (!categoryId) {
            return res.status(400).json({ error: 'No categoryId provided' });
        }
        const response = await Instance.getTourById(categoryId);
        
        if (!response) {
            console.error('Failed to fetch response');
            return res.status(404).json({ error: 'No response found for this category' });
        }
        const object = response.map(x => {
            return x.toJSON();
        });

        res.json(object);

    } catch (err) {
        console.error('Failed to fetch articles', err);
        res.status(500).json({ error: 'Failed to fetch articles' });
    }
};

const getDiscountPrice = async (req, res, next) => {
    try {
        const respondata = await Instance.getToursWithDiscount();
        if (!respondata) {
            console.error('Failed to fetch data');
            return undefined;
        }
        const dataObjects = respondata.map(items => items.toJSON());
        res.json(dataObjects);
    } catch (err) {
        console.error('Failed to fetch data err', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

const getDataAndDes = async (req, res, next) => {
    try {
        const respondata = await Instance.getAllTours();

        if (!respondata) {
            console.error('Failed to fetch Data');
            return res.status(404).json({ error: 'data not found' });
        };

        const dataObjects = respondata.map(obj => obj.toJSON());

        // Duyệt qua từng tour
        for (let i = 0; i < dataObjects.length; i++) {
            // Lấy destination_id của mỗi tour
            const destinationId = dataObjects[i].destination_id;

            // Lấy dữ liệu tương ứng từ bảng destinations
            const respondata2 = await Instance2.getById(destinationId);

            // Thêm dữ liệu từ bảng destinations vào đối tượng tour
            dataObjects[i].destination = respondata2.toJSON();
        }

        res.json({ tours: dataObjects });

    } catch (err) {
        console.error('Failed to fetch data', err);
        res.status(500).json({ error: 'Failed to fetch data' });
    };
};


module.exports = {
    getData,
    getDataByCategory,
    getDataId,
    getDiscountPrice,
    getDataAndDes
};


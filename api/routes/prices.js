const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Handling Get requests to /prices'
    });
});

router.post('/', (req, res, next) => {
    const priceItem = {
        name: req.body.name,
        hours: req.body.hours
    }
    res.status(200).json({
        message: 'Handling Post requests to /prices',
        createdPriceItem: priceItem
    });
});

router.get('/:priceId',(req, res, next) => {
    const id = req.params.priceId;
    if (id == 'special') {
        res.status(200).json({
            message: 'You discovered the special ID',
            id: id
        });
    } else {
        res.status(200).json({
            message: 'You passed an ID'
        })
    }
});

router.patch('/:priceId',(req, res, next) => {
    res.status(200).json({
        message:  'Updated price!'
    });
});

router.delete('/:priceId',(req, res, next) => {
    res.status(200).json({
        message:  'Deleted price!'
    });
});

module.exports = router;
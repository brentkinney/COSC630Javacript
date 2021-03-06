const express = require('express');
const router = express.Router();
const PriceItem = require('../models/priceitem')
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
    PriceItem.find()
    .exec()
    .then(docs => {
        console.log(docs);
        res.status(200).json(docs);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.post('/', (req, res, next) => {
    const priceItem = new PriceItem({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        hours: req.body.hours
    });
    priceItem
    .save()
    .then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Handling Post requests to /prices',
            createdPriceItem: result
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
    
});

router.get('/:priceId',(req, res, next) => {
    const id = req.params.priceId;
    PriceItem.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc) {
            res.status(200).json(doc);
        } else {
            res.status(404).json({message: 'No valid entry found'});
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
});

router.patch('/:priceId',(req, res, next) => {
    const id = req.params.priceId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    PriceItem.update({_id: id}, {$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

router.delete('/:priceId',(req, res, next) => {
    const id = req.params.priceId;
    PriceItem.remove({_id: id})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

module.exports = router;
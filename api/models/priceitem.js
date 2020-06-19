const mongoose = require('mongoose');

const PriceItemSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    hours: String
});

module.exports = mongoose.model('PriceItem', PriceItemSchema);
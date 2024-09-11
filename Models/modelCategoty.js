const mongoose = require("mongoose");
const Toy=require("./modelToy")

const categorySchema = mongoose.Schema({
    name: { type: String, minLength: 4, required: true },
    toys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Toy' }]
});

module.exports = mongoose.model('Category', categorySchema);
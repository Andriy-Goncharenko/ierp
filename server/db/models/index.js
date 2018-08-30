const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let specificationSchema = new Schema({
    _id: String,
    tables: Array,
    files: Array,
    date: {type: Date, default: Date.now},
    saveFlag: {type: Boolean, default: false}
});
mongoose.connect('mongodb://localhost/ierp-db');

let Specification = mongoose.model('Specification', specificationSchema);

module.exports = {Specification};
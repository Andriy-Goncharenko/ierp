const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let specificationSchema = new Schema({
    _id: String,
    tables: Array,
    files: Array,
    date: {type: Date, default: Date.now},
    saveFlag: {type: Boolean, default: false}
});

specificationSchema.statics.findById = function (_id, cb) {
    return this.findOne({_id}, cb);
};
specificationSchema.statics.updateById = function (_id, obj, cb) {
    return this.updateOne(_id, obj, cb);
};
mongoose.connect('mongodb://admin:11212217q@ds229380.mlab.com:29380/ierp-db');

let Specification = mongoose.model('Specification', specificationSchema);

module.exports = {Specification};
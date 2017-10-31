var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HeapItemSchema = new Schema({
    id: String,
    name: String,
    link: String,
    address: String,
    note: String,
    status: String
});

var HeapItemModel = mongoose.model('heapitem', HeapItemSchema);

module.exports = HeapItemModel;
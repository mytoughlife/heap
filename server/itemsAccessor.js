
var mongoose = require('mongoose');
var uuid = require('uuid');

mongoose.connect(process.env.MONGO_DB);

var HeapItem = require('./heapItem.js');


var accessor =
{
    getAll : function(query, done) {
        
        HeapItem.find(query, function(err, items) {
            if (err) { 
                done(null, items);
            }
            else {
                done(null, items);
            }
        });
    },

    get: function(id, done) {
        HeapItem.findOne({id: id}, done);
    },

    create: function(item, done) {
        var id = uuid.v4();

        var heapItem = new HeapItem({
            id: id,
            name: item.name,
            link: item.link,
            address: item.address,
            note: item.note,
            status: item.status
        });

        heapItem.save(function(err) {
            done(err, heapItem);
        });
    },

    update: function(id, item, done) {
        HeapItem.findOne({id: id}, function(err, existing) {
            if (err) {
                done(err, null);
            }
            else {
                existing.name = item.name;
                existing.link = item.link;
                existing.address = item.address;
                existing.note = item.note;
                existing.status = item.status;
                
                existing.save(function(err) {
                    done(err, existing);
                });
            }
        });
    },

    delete: function(id, done) {
        HeapItem.remove({id: id}, function(err) {
            done(err, null);
        });
    }
};

module.exports = accessor;
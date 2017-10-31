
var axios = require('axios');

var Api = {

    getAll(status)
    {
        var query = '/api/items';

        if (status === 'archived') {
            query = 'api/archivedItems';
        }

        return axios.get(query)
            .then(function(res){
                return res.data;
            });
    },

    create(item){
        item.status = 'active';
        return axios.post('/api/items', item)
            .then(function(res){
                console.log('New ID: ' + res.data.id);
                return res.data;
            });
    },

    update(id, item){

        return axios.put('/api/items/' + id, item)
            .then(function(res){
                return res.data;
            });
    },

    archive(item) {
        item.status = item.status === 'archived' ? 'active' : 'archived';
        return axios.put('/api/items/' + item.id, item)
            .then(function(res){
                return res.data;
            });
    },

    delete(id) {
        return axios.delete('/api/items/' + id)
            .then(function(res){
            });
    }
}

module.exports = Api;
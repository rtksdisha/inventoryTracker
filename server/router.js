const express = require('express')
const route = express.Router()
const crud = require('./mongoData/crud')
const axios = require('axios');
const { render } = require('express/lib/response');

//sending and receiving requests to homepage
route.get("/", function (req, res) {
    axios.get('http://localhost:3000/api/items')
        .then(function (response) {
            res.render('index', { items: response.data })
        })
        .catch(err => {
            res.status(500).send(err)
        })
});

route.get("/add-item", function (req, res) {
    res.render('addItem.ejs')
});

route.get("/edit-item", function(req,res){
    res.render('editItem.ejs')
});
//CRUD routes
route.post('/api/items', crud.create)
route.get('/api/items', crud.read)
route.put('/api/items/:id', crud.update)
route.delete('/api/items/:id', crud.delete)

module.exports = route
var express = require('express');
var searchRouter = express.Router();
var FileHandler = require('./fileHandler');

searchRouter.get('/:search', (req, res) => {
    console.log(req.params.search);
    let filehandler = new FileHandler();

    filehandler.readFile().then(todos => {
        var searchResult = todos.filter(todo => {
            return todo.description.search(req.params.search) >= 0
        })     
       
        // return result to client
        if(searchResult.length === 0) {
            res.send('no match found');
        } else {
            res.json(searchResult);
        }    
    });
    
})
module.exports = searchRouter;
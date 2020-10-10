var express = require('express');
var filterRouter = express.Router();
var FileHandler = require('./fileHandler');

filterRouter.use('/', (req, res, next)=>{
    next();
})

filterRouter.get('/complete/', (req, res) => {
    let filehandler = new FileHandler();
    filehandler.readFile().then(todo => {
        todo = todo.filter(todoNote => todoNote.completed === true);
        res.json(todo);
    });
})

//
module.exports = filterRouter;
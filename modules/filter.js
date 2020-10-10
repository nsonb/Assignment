var express = require('express');
var filterRouter = express.Router();
var FileHandler = require('./fileHandler');

filterRouter.use('/', (req, res, next)=>{
    next();
})

// route for filtering for complete status
filterRouter.get('/complete', (req, res) => {
    let filehandler = new FileHandler();
    filehandler.readFile().then(todo => {
        todo = todo.filter(todoNote => todoNote.completed === true);
        res.json(todo);
    });
})

// route for getting alphabetically sorted by name
filterRouter.get('/alphabet', (req, res) => {
    let filehandler = new FileHandler();
    filehandler.readFile().then(todo => {
        var result = todo.sort((a,b) => a.name.localeCompare(b.name));
        
        res.json(result);
    });
})

// route for getting reverse alphabetically sorted by name
filterRouter.get('/reverse', (req, res) => {
    let filehandler = new FileHandler();
    filehandler.readFile().then(todo => {
        var result = todo.sort((a,b) => a.name.localeCompare(b.name)*-1);
        
        res.json(result);
    });
})

module.exports = filterRouter;
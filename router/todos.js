var express = require('express');
var todoRouter = express.Router();
var todo = require('../models/todo')

// api paths to get all of the todos
todoRouter.get('/', (req, res) => {
    console.log(todo);
    res.json(todo);
})

// api path to add more todo
todoRouter.post('/', (req, res) => {
    console.log(req.body);
    // a block to check if enough data is supplied
    if(req.body == null || req.body.name == null || req.body.complete == null || req.body.description == null) {
        res.send('Not enough data point in todo');
        return;
    }

    todo.push({
        id: todo.length+1,
        name: req.body.name,
        description: req.body.description,
        completed: req.body.complete
    })
    res.json(todo);
})

// api path to remove a todo
todoRouter.delete('/:id', (req, res) => {
    // check if item exists before delete
    if(todo.findIndex((item) => {item.id === req.params.id}) < 0) {
        res.send('This todo does not exist');
        return;
    }
    todo = todo.filter(todoNote => todoNote.id !== Number(req.params.id));
    res.json(todo);
})

// api to update a todo
todoRouter.put('/', (req, res) => {
    // a block to check if enough data is supplied
    if(req.body == null || req.body.name == null || req.body.complete == null || req.body.description == null) {
        res.send('Not enough data point in todo');
        return;
    }
    // find the id of the todo that needs to be replaced
    let index = todo.findIndex((item) => {return item.id === req.body.id});
    console.log(index);

    // check if item exists before replacement
    if(index < 0) {
        res.send('This todo does not exist');
        return;
    } else {
        let replacement = req.body;
        todo.splice(index, 1, replacement);
        console.log(todo);
        res.json(todo);
    }
    
})

module.exports = todoRouter;

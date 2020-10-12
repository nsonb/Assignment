var express = require('express');
var todoRouter = express.Router();
var FileHandler = require('./fileHandler');


// api paths to get all of the todos
todoRouter.get('/', (req, res) => {
    let filehandler = new FileHandler();
    filehandler.readFile().then(data => {
        console.log(data);
        if( data !== 'data error'){
            res.json(data);
        } else {
            res.send('data error');
        };
    });
})

// api path to add more todo
todoRouter.post('/', (req, res) => {
    let filehandler = new FileHandler();
    // a block to check if enough data is supplied
    if(req.body == null || req.body.name == null || req.body.completed == null || req.body.description == null) {
        res.send('Not enough data point in todo');
        return;
    }
    filehandler.readFile().then(todo => {
        console.log(todo); 
        todo.push({
            id: todo.length+1,
            name: req.body.name,
            description: req.body.description,
            completed: req.body.completed
        })
        filehandler.writeFile(todo).then((result) => {
            if(result === 'error') {
                res.send('error writing file')
            } else {
                res.send(todo);
            }
        })
        
    });
    
})

// api path to remove a todo
todoRouter.delete('/:id', (req, res) => {
    // check if item exists before delete
    let filehandler = new FileHandler();

    filehandler.readFile().then(todo => {
        let index = todo.findIndex((item) => {
            return item.id === Number(req.params.id);
        });

        if(index < 0) {
            res.send('This todo does not exist');
            return;
        }
        todo = todo.filter(todoNote => todoNote.id !== Number(req.params.id));
        filehandler.writeFile(todo).then((result) => {
            if(result === 'error') {
                res.send('error writing file')
            } else {
                res.json(todo);
            }
        })
    });
    
})

// api to update a todo
todoRouter.put('/', (req, res) => {
    let filehandler = new FileHandler();
    // a block to check if enough data is supplied
    if(req.body == null || req.body.name == null || req.body.completed == null || req.body.description == null) {
        res.send('Not enough data point in todo');
        return;
    }

    filehandler.readFile().then(todo => {
        console.log(todo); 
        // find the id of the todo that needs to be replaced
        let index = todo.findIndex((item) => item.id === req.body.id);

        // check if item exists before replacement
        if(index < 0) {
            res.send('This todo does not exist');
            return;
        } else {
            let replacement = req.body;
            todo.splice(index, 1, replacement);
            console.log(todo);
            filehandler.writeFile(todo).then((result) => {
                if(result === 'error') {
                    res.send('error writing file')
                } else {
                    res.json(todo);
                }
            }).catch((e) => {
                console.log(e);
            })
        }
    });  
})

module.exports = todoRouter;

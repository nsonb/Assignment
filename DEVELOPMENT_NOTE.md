### todo assignment
----------------------------------------------------------------------------------------------------------------------------
# first step
The first of the tasks was to find a way to get all the todos from models/todo.js, which 
is simple task by using:
        
        var todo = require('./model/todo.js');

        app.get('/todos', (req, res) => {
            console.log(todo);
            res.json(todo);
        })

# second step
Second step is add to the todo list, which is accomplisted using app.post, the resulted todo is then
sent back to the client.

        app.post('/todos', (req, res) => {
            todo.push({
                id: todo.length+1,
                name: req.body.name,
                completed: req.body.complete
            })
            res.json(todo);
        })

Here a new problem arises when using Postman to test out the api: if one of the element in the body is missing,
the app can break in the future since missing elements. So a small check is added to the api call:

        todoRouter.post('/todos', (req, res) => {
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

# third step
Similar to the second step, an app.put() is used together with a check:
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

# forth step
Remove an todo entry requirement is accomplised with app.delete() with a check to see if the element exists before deleting:
        todoRouter.delete('/:id', (req, res) => {
            // check if item exists before delete
            if(todo.findIndex((item) => {item.id === req.params.id}) < 0) {
                res.send('This todo does not exist');
                return;
            }
            todo = todo.filter(todoNote => todoNote.id !== Number(req.params.id));
            res.json(todo);
        })

----------------------------------------------------------------------------------------------------------------------------
### filter assignment
At this point of development, if a new filter route is added into the app.js, the application will look more complicated than it needs to be, so it is a good idea to use module routing so it is easier to debug the application in the future. So at this point all the todos functions are moved to /router/todos.js then app.js will import todos.js and reroute the request there:
        app.use('/todos', todoRouter);

filter.js is creater as a module router then created in the same thought process as todos router. A new problem occurs: the todo variable in the original app.js, which is then moved to todos.js, is not visible to filter.js, which means if filter import the todo.js in /models, it will not have the latest modified data.

const  express    = require('express'),
       app        = express(),
       port       = process.env.PORT || 3000,
       bodyParser = require('body-parser');

var todo = require('./models/todo')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => res.send('Welcome to todo app'));

// api paths to get all of the todos
app.get('/todos', (req, res) => {
    console.log(todo);
    res.json(todo);
})

// api path to add more todo
app.post('/addtodos', (req, res) => {
    console.log(req.body);
    res.send('data receive');
})

app.listen(port, () => console.log(`Server is running on ${port}`));
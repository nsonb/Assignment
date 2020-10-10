const  express    = require('express'),
       app        = express(),
       port       = process.env.PORT || 3000,
       bodyParser = require('body-parser');

var todoRouter = require('./router/todos')
var filterRouter = require('./router/filter');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/', (req, res) => res.send('Welcome to todo app'));
// router for exercise 1; todos get, add, remove and update
app.use('/todos', todoRouter);

// router for exercise 2; filering
app.use('/filter', filterRouter)


app.listen(port, () => console.log(`Server is running on ${port}`));
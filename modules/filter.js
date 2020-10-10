var express = require('express');
var filterRouter = express.Router();

filterRouter.use('/', (req, res, next)=>{
    res.send('arrived at filter');
    next();
})

filterRouter.get('/complete/', () => {
    
})

//
module.exports = filterRouter;
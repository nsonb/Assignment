var express = require('express');
var filterRouter = express.Router();

filterRouter.use('/', (req, res)=>{
    res.send('arrived at filter');
})
module.exports = filterRouter;
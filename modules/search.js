var express = require('express');
var searchRouter = express.Router();
var FileHandler = require('./fileHandler');

searchRouter.get('/:search', (req, res) => {
    console.log(req.params.search);
    res.send('request received');
})
module.exports = searchRouter;
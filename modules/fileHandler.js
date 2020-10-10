var fs = require('fs');
var todo = require('../models/todo') ;

class FileHandler  {
    writeFile(todo) {
        return new Promise((resolve) => {
            fs.writeFile('./models/todo.json', JSON.stringify(todo), (err) => {
                if (err) resolve('error') ;
                resolve('file written done');
            })
        })
    }

    readFile = () => {
        return new Promise((resolve) => {
            fs.readFile('./models/todo.json', 'utf-8', (err, data) => {
                if(err) {
                    console.log(err);
                    resolve('data error');
                }
                resolve(JSON.parse(data));
            })
        })
    }
}

module.exports = FileHandler;
const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) =>{
    fs.readFile('./data.json', 'utf-8', (err, data) =>{
        if (err){
            console.log(err);
            res.status(500).send('Internal Server Error');
        }
        else {
            const todos = JSON.parse(data);
            res.render('data', {todos: todos});
        }

    });
});

module.exports = router
const bodyParser = require('body-parser');
const express = require('express');
const fs = require('fs');


const app = express();
const port = 3000;
// Middleware cho static files (CSS, JS, hình ảnh)
app.use(express.static(path.join('public')));
// Cấu hình view engine là Pug
app.set('view engine', 'pug');
app.set('view', path.join(__dirname, 'view'));


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/data', (req, res) =>{
    res.render('data', {todos})
})
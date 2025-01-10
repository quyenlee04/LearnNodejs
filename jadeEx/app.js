const bodyParser = require('body-parser');
const { time } = require('console');
const express = require('express'); 
const path = require('path'); 
const { title } = require('process');

const app = express(); 
const port = 3000; 
// Middleware cho static files (CSS, JS, hình ảnh) 
app.use(express.static(path.join('public'))); 
// Cấu hình view engine là Pug 
app.set('view engine', 'pug'); 
app.set('views', path.join(__dirname, 'views')); 


app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.get('/', (req, res) => { 
res.render('index', { title: 'Hey', message: 'Xin chao cac bạn Truong Dai hoc Gia Dinh' }) 
}); 

app.get('/login', (req, res) => { 
    res.render(`login`) ;
    }); 
app.post('/login', (req, res) => {
       const {username, password} = req.body;
       if(username ==='admin'&& password ==='admin'){
        res.render('index', {title: 'hey', message: ('login success')});
       }else{
        res.send('login fail');
       }
        
        });

app.get('/register', (req, res) => { 
        res.render(`register`) ;
     }); 
     
app.get('/upload', (req, res) => { 
        res.render(`upload`) ;
     }); 



app.post('/user', (req, res) => {
console.log(req.query);
res.send('get user');
});
app.listen(port, () => { 
console.log(`Server listening on port ${port}`) 
});
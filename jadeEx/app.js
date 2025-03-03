const bodyParser = require('body-parser');
const { time } = require('console');
const express = require('express');
const path = require('path');
const multer = require('multer');
const { title } = require('process');

const app = express();
const port = process.env.PORT;
const qrcodeRouter = require('./qrcode');
const todosRouter = require('./todo');

console.log(process.env)

// Middleware cho static files (CSS, JS, hình ảnh) 
app.use(express.static(path.join(__dirname, 'public')));
// Cấu hình view engine là Pug 
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());

app.use('/qrcode', qrcodeRouter);
app.use('/todo', todosRouter);

app.get('/', (req, res) => {
    res.render('index', { title: 'Hey', message: 'Xin chao cac bạn Truong Dai hoc Gia Dinh' })
});


app.get('/login', (req, res) => {
    res.render(`login`);
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin') {
        res.render('index', { title: 'hey', message: ('login success') });
    } else {
        res.send('login fail');
    }

});

app.get('/register', (req, res) => {
    res.render(`register`);
});

app.get('/upload', (req, res) => {
    res.render(`upload`);
});

// Cấu hình lưu trữ với multer để giữ nguyên tên file
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Thư mục lưu file
    },
    filename: (req, file, cb) => {
        // Generate random filename with original extension
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const fileExtension = path.extname(file.originalname);
        cb(null, uniqueSuffix + fileExtension);
    },
});
// Khởi tạo multer với cấu hình storage
const upload = multer({ storage: storage });

app.post('/upload', upload.single('file'), (req, res) => {
    const { username, password } = req.body;
    const file = req.file;


    res.send(
        `<h1>Upload successful</h1>
        <p>Username: ${username}</p>
        <p>Password: ${password}</p>
        <p>save: ${file.path}</p>
        <p>File: ${file.originalname}</p>`

    );
});

app.post('/user', (req, res) => {
    console.log(req.query);
    res.send('get user');
});

app.get('/books/:bookId', (req, res) => {
    console.log(req.params);
    const bookId = req.params.bookId;
    res.send(`Book ID: ${bookId}`);
});
app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
});
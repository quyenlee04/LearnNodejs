const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
// Middleware cho static files (CSS, JS, hình ảnh)
app.use(express.static(path.join(__dirname, 'public')));
// Cấu hình view engine là Pug
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.get('/', (req, res) => {
res.render('index', { title: 'Hey', message: 'Xin chao cac bạn Truong Dai hoc Gia Dinh' })
});
app.listen(port, () => {
console.log(`Server listening on port ${port}`)
});
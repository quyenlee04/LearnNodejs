const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const port = 3000 || process.env.PORT;
const app = express();
app.use(cors());
const morgan = require('morgan');
app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.set('view engine', 'pug');
app.set('views', './src/views');
const connection = require('./src/utils/connectDB');

app.use(express.static(path.join(__dirname, 'public')));
//CODE HERE



app.get('/', (req, res) => {
    res.render('index',); //{user: {name: 'admin', email: 'hello'}});
});

const userRoute = require('./src/routes/userRoute');
app.use('/user', userRoute);

// async function test(req, res) {
//     try {
//         const query = 'SELECT * FROM employee where EMP_NO = ?';
//         const [rows, fields] = await connection.execute(query, ['E001']);
//         console.log(rows);
//         //console.log(fields);
//     } catch (error) {
//         console.log(error);
//     }

// }
// test();


// Middleware xử lý lỗi 404: Khi không có route nào khớp
app.use((req, res, next) => {
    console.log('404 middleware hit');
    res.status(404).render('error404');
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
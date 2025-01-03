var express = require('express');
var app = express();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/index.htm', function (req, res) {
res.sendFile( __dirname + "/" + "index.htm" );
})

app.get('/process_get', function (req, res) {

// Chuan bi output trong dinh dang JSON
response = {
first_name:req.query.first_name,
last_name:req.query.last_name
};
console.log(response);
res.end(JSON.stringify(response));
})

app.post('/process_post', function (req, res) {
    // Chuẩn bị output trong định dạng JSON
    response = {
      first_name: req.body.first_name,
      last_name: req.body.last_name
    };
    console.log(response);
    res.end(JSON.stringify(response));
  });
  

var server = app.listen(8080, function () {

var host = server.address().address
var port = server.address().port

console.log("Ung dung Node.js dang lang nghe tai dia chi: http://localhost", host, port)

})
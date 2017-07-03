var express = require("express");

var app = express();

var bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

var mongoose = require("mongoose");

var impObject = {
    'jwtSecret': 'xtyqwtzt00700tytx',
    'connStr': 'mongodb://localhost/test'
};

mongoose.connect(impObject.connStr);

app.use(express.static(__dirname + "/"));

app.get("/", function(request, response){
    response.sendfile('index.html');
});

require('./routes')(app);

app.listen(port, function(){
    console.log('Сервер запущен порт:' + port);
});
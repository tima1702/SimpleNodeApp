// подключение express
var express = require("express");
// создаем объект приложения
var app = express();

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var User = require("./modules/user");

app.use(bodyParser.json());

var mongoose = require("mongoose");

mongoose.connect('mongodb://localhost/test');

var TestUser = new User({
    name: "Test",
    email: "Test",
    password: "Test",
    age: "32",
    login: "Test"
});

/*TestUser.save(function(err) {
    if (err) throw err;

    console.log('User saved successfully!');
});
*/
app.use(express.static(__dirname + "/"));

// определяем обработчик для маршрута "/"
app.get("/", function(request, response){
});

app.post("/register", function (request, response) {
    console.log("Запрос дошел");
    if(!request.body) {
        console.log("Запрос дошел");
        return response.sendStatus(400);
    }
    var json = request.body;
    json = JSON.parse(json);

    console.log(json);
    response.send('123');
});




// начинаем прослушивать подключения на 3000 порту
app.listen(3000);
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

app.use(express.static(__dirname + "/"));

// определяем обработчик для маршрута "/"
app.get("/", function(request, response){
});


app.post("/register", function (request, response) {
    if(!request.body) {
        return response.sendStatus(400);
    }
    var json = request.body;
    json = JSON.parse(json);

    User.find({login: json.login}, function (err,user) {
        if (err) {
            console.log(err);
            response.send("2");
            return;
        }
        console.log(user.length);
        if(user.length == 0){
            var newUser = new User(json);

            newUser.save(function (error) {
                if(error){
                    console.log(error);
                    response.send("2");
                    return;
                }
                response.send("1");
            })
        } else {
            console.log('123');
            response.send("2");}
    });

});






// начинаем прослушивать подключения на 3000 порту
app.listen(3000);
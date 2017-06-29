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
            });
        } else {
            console.log('123');
            response.send("2");
        }
    });
});

app.post("/login", function(request,reponse){
    if(!request.body) {
        return response.sendStatus(400);
    }
    var json = request.body;
    json = JSON.parse(json);

    User.find({login: json.login, password: json.password},function (err,user){
        if(err) {
            reponse.send();
            throw err;
        }
        reponse.send(JSON.stringify(user));
    });
});

app.post("/updateUserInfo", function(request,reponse){
    if(!request.body) {
        return response.sendStatus(400);
    }
    var json = request.body;
    json = JSON.parse(json);
    console.log(json);
    User.findOneAndUpdate({"_id": json._id},{"$set":{"name":json.name,"age":json.age,"email":json.email}}).exec(function(err, user){
        if(err) {
            console.log(err);
            return response.sendStatus(400);
        } else {
            console.log(user);
        }
    });
    User.find({login: json.login},function (err,user){
        if(err) {
            reponse.send();
            throw err;
        }
        reponse.send(JSON.stringify(user));
    });
});

app.post("/updatePassword", function(request,reponse){
    if(!request.body) {
        return response.sendStatus(400);
    }
    var json = request.body;
    json = JSON.parse(json);
    console.log(request.body);
    User.findOneAndUpdate({"login": json.login},{"$set":{"password":json.password}}).exec(function(err, user){
        if(err) {
            //console.log(err);
            return reponse.sendStatus(400);
        } else {
            //console.log(user);
            return reponse.send("true");
        }
    });
});


// начинаем прослушивать подключения на 3000 порту
app.listen(3000);
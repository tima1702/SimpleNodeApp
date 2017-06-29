// подключение express
var express = require("express");
// создаем объект приложения
var app = express();

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var User = require("./modules/user");

var jwt = require('jsonwebtoken');


app.use(bodyParser.json());

var mongoose = require("mongoose");

//mongoose.connect('mongodb://localhost/test');

var impObject = {
    'jwtSecret': 'xtyqwtzt00700tytx',
    'connStr': 'mongodb://localhost/test'
};

mongoose.connect(impObject.connStr);

app.set('jwtSecret', impObject.jwtSecret);

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

    User.find({login: json.login, password: json.password},function (err,users){
        if(err) {
            reponse.send();
            throw err;
        }
        var user = users[0];
        var accessToken = jwt.sign({login: user.login}, app.get('jwtSecret'), {
            expiresIn: 60
        });
        console.log(user);

        reponse.send({
            'accessToken': accessToken,
            'name': user.name,
            'age': user.age,
            'email':user.email
        });
    });
});

app.post("/updateUserInfo", function(request,reponse){
    if(!request.body) {
        return response.sendStatus(400);
    }
    var json = request.body;
    json = JSON.parse(json);
    console.log(json);
    var token = json.accessToken;
    var decoded = jwt.decode(token);
    console.log(decoded);
    if(decoded == null){return reponse.send({
        numer:"-1",
        description: "false token"
    })}
    User.findOneAndUpdate({"login": decoded.login},{"$set":{"name":json.name,"age":json.age,"email":json.email}}).exec(function(err, user){
        if(err) {
            console.log(err);
            return response.sendStatus(400);
        }
    });
    User.find({login: decoded.login},function (err,users){
        if(err) {
            reponse.send();
            throw err;
        }
        var user = users[0];
        reponse.send({
            'name': user.name,
            'age': user.age,
            'email':user.email
        });
    });
});

app.post("/updatePassword", function(request,reponse){
    if(!request.body) {
        return response.sendStatus(400);
    }
    var json = request.body;
    json = JSON.parse(json);
    var token = json.accessToken;
    var decoded = jwt.decode(token);
    console.log(decoded);
    if(decoded == null){return reponse.send({
        numer:"-1",
        description: "false token"
    })}
    User.findOneAndUpdate({"login": decoded.login},{"$set":{"password":json.password}}).exec(function(err, user){
        if(err) {
            //console.log(err);
            return reponse.sendStatus(400);
        } else {
            return reponse.send("true");
        }
    });
});
app.post("/checkToken", function(request,reponse){
    if(!request.body) {
        return response.sendStatus(400);
    }
    var token = request.body[0];
    //console.log(request.body[0]);
    var decoded = jwt.decode(token);
    //console.log(decoded);
    if(decoded == null){return reponse.send({
        numer:"-1",
        description: "false token"
    })}
    return reponse.send({
        numer:"1",
        description: "Valid token"
    });
});

app.listen(3000);
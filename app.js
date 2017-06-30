// подключение express
var express = require("express");

var app = express();

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var User = require("./modules/user");

var jwt = require('jsonwebtoken');


app.use(bodyParser.json());

var mongoose = require("mongoose");

var impObject = {
    'jwtSecret': 'xtyqwtzt00700tytx',
    'connStr': 'mongodb://localhost/test'
};

var checkToken = function (token) {
    var decoded = jwt.decode(token);

    //console.log(decoded);
    if(decoded == null) return "";
    var exp = Math.floor(Date.now() / 1000) + (60);
    if ((exp - decoded.exp) > 120) return "";



    return decoded.login;

}





mongoose.connect(impObject.connStr);

app.set('jwtSecret', impObject.jwtSecret);

app.use(express.static(__dirname + "/"));

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
    console.log(json);
    User.find({login: json.login, password: json.password},function (err,users){
        if(err) {
            return reponse.send({numer: '-1', description:err});
        }
        if (users.length != 1) return reponse.send({numer: '-1', description:"Не верный пароль"});
        var user = users[0];
        console.log(users);
        var accessToken = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60), login: user.login}, app.get('jwtSecret'));
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
    var login = checkToken(token);
    if(login == "") return reponse.send({
        numer: "-1",
        descriptoin: "false token"
    });

    User.findOneAndUpdate({"login": login},{"$set":{"name":json.name,"age":json.age,"email":json.email}}).exec(function(err, user){
        if(err) {
            console.log(err);
            return reponse.sendStatus(400);
        }
    });
    User.find({login: login},function (err,users){
        if(err) reponse.send({
            numer: "-1",
            descriptoin: err
        });
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
    console.log(decoded);
    console.log("exp:" ,Math.floor(Date.now() / 1000) + (60));
    if(decoded == null){return reponse.send({
        numer:"-1",
        description: "false token"
    })}
    return reponse.send({
        numer:"1",
        description: "Valid token"
    });
});

app.post("/getAllUser", function(request,reponse){
    if(!request.body) {
        return response.sendStatus(400);
    }
    var token = request.body[0];
    var decoded = jwt.decode(token);
    if(decoded == null){return reponse.send({
        numer:"-1",
        description: "false token"
    })}
    User.find({},'name age login email',function (err,users) {
        if (err) return reponse.send({
            numer: "-1",
            description: err
        });
        return reponse.send(users);
    });
});

app.post("/deliteUser",function(request,reponse){
    if(!request.body) {
        return response.sendStatus(400);
    }
    var object = request.body;

    object = JSON.parse(object);
    var token = object.accessToken;
    var decoded = jwt.decode(token);
    if(decoded == null){return reponse.send({
        numer:"-1",
        description: "false token"
    })}
    User.remove({login:object.login},function (err) {
        if(err) return reponse.send({
            numer:"-1",
            description:err
        });
        console.log(object.login);
        console.log(decoded);
        if(object.login == decoded.login) return reponse.send({
            numer:"2",
            description: "Удаляем сами себя"
        });
        return reponse.send({
            numer:"1",
            description: "Удалили пользователя"
        });
    });
});


app.listen(3000);
var express = require("express");
var fs = require("fs");

var app = express();

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var User = require("./modules/user");

var jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

var mongoose = require("mongoose");



var impObject = {
    'jwtSecret': 'xtyqwtzt00700tytx',
    'connStr': 'mongodb://localhost/test'
};

var checkToken = function (token) {
    var decoded = jwt.decode(token);

    if(decoded == null) return "";
    var exp = Math.floor(Date.now() / 1000) + (60);
    console.log("Exp:",decoded.exp," : ",exp);
    if ((exp - decoded.exp) > 120) return "";
    return decoded.login;
}

mongoose.connect(impObject.connStr);

app.set('jwtSecret', impObject.jwtSecret);

app.use(express.static(__dirname + "/"));

app.get("/", function(request, response){
    response.sendfile('index.html');
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



app.post("/updateUserInfo",middleCheckToken, function(request,reponse){

    var json = request.body;
    json = JSON.parse(json);
    var login = request.login;

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

app.post("/updatePassword",middleCheckToken, function(request,reponse){

    var json = request.body;
    json = JSON.parse(json);
    var login = request.login;

    User.findOneAndUpdate({"login": login},{"$set":{"password":json.password}}).exec(function(err, user){
        if(err) {
            //console.log(err);
            return reponse.sendStatus(400);
        } else {
            return reponse.send("true");
        }
    });
});

app.post("/checkToken",middleCheckToken, function(request,reponse){
    return reponse.send({
        numer:"1",
        description: "Valid token"
    });
});

app.post("/getAllUser",middleCheckToken, function(request,reponse){

    User.find({},'name age login email',function (err,users) {
        if (err) return reponse.send({
            numer: "-1",
            description: err
        });
        return reponse.send(users);
    });
});

app.post("/deliteUser",middleCheckToken,function(request,reponse){

    var json = request.body;
    json = JSON.parse(json);
    var login = request.login;

    User.remove({login:json.login},function (err) {
    if(err) return reponse.send({
        numer:"-1",
        description:err
    });

    if(json.login == login) return reponse.send({
        numer:"2",
        description: "Ваши данные удалены!"
    });
    return reponse.send({
        numer:"1",
        description: "Удалили пользователя"
    });
    });
});

app.post('/getAdministration',middleCheckToken,function (request,reponse) {
   var html = fs.readFileSync("./static/administration/administration.html");
   reponse.end(html);
});



function middleCheckToken(request,reponse,next){

    if(!request.body) {
        return response.sendStatus(400);
    }
    var json = request.body;
    json = JSON.parse(json);
    var token = json.accessToken;
    var login = "";
    var decoded = jwt.decode(token);

    if(decoded == null) return reponse.send({
        numer: "-1",
        descriptoin: "Session end"
    });
    var exp = Math.floor(Date.now() / 1000) + (60);

    console.log("Exp:",decoded.exp," : ",exp);

    if ((exp - decoded.exp) > 120) return reponse.send({
        numer: "-1",
        descriptoin: "Session end"
    })
    else login = decoded.login;

    User.find({login:login},function (err,users){

        if(err) return reponse.send({
            numer: "-1",
            descriptoin: err
        });

        if(users.length != 1) return reponse.send({
            numer: "-1",
            descriptoin: "Session end"
        });
    });

    request.login = login;
    next();
}

app.listen(port, function(){
    console.log('Сервер запущен порт:' + port);
});
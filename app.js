var express = require("express");
var fs = require("fs");

var app = express();

var bodyParser = require('body-parser');

var jsonParser = bodyParser.json();

var User = require("./modules/user");
var Home = require("./modules/home");
var Room = require("./modules/room");

var jwt = require('jsonwebtoken');

const port = process.env.PORT || 3000;

app.use(bodyParser.json());

var mongoose = require("mongoose");

var impObject = {
    'jwtSecret': 'xtyqwtzt00700tytx',
    'connStr': 'mongodb://localhost/test'
};

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
        var accessToken = jwt.sign({exp: Math.floor(Date.now() / 1000) + (60),
                                    login: user.login,
                                    _id: user._id
                                    }, app.get('jwtSecret'));
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
    var _id = request._id;

    User.findOneAndUpdate({"_id": _id},{"$set":{"name":json.name,"age":json.age,"email":json.email}}).exec(function(err, user){
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
    var _id = request._id;

    User.findOneAndUpdate({"_id": _id},{"$set":{"password":json.password}}).exec(function(err, user){
        if(err) {
            //console.log(err);
            return reponse.sendStatus(400);
        } else {
            return reponse.send("true");
        }
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

app.post("/getAllHouse",middleCheckToken,function (request,reponse) {
    var user = request._id;
    Home.find({user:user},function (err,houses) {
        if(err)return reponse.send({
            numer:"-1",
            description:err
        });
        reponse.send(houses);
    });
});

app.post("/addNewHouse",middleCheckToken,function (request,reponse) {
    var user = request._id;
    var json = request.body;
    json = JSON.parse(json);

    var obj = {
        name: json.name,
        user: user
    };

    var newHome = new Home(obj);

    newHome.save(function (error){
        if(error) reponse.send({
            numer:-1,
            description:error
        });
        else reponse.send({
            numer:1,
            description:"Дом добавлен!"
        });
    });
});

app.post("/changeHomeName",middleCheckToken,function (request,reponse) {
    var user = request._id;
    var json = request.body;
    json = JSON.parse(json);
    Home.findOneAndUpdate({"_id": json._id,"user":user},{"$set":{"name":json.name}}).exec(function(err){
        if(err) reponse.send({
            numer:"-1",
            description:err
        });
        else reponse.send({
            numer: "1",
            description:"Имя изменено!"
        });
    });
});

app.post("/deleteHouse",middleCheckToken,function (request,reponse) {

    var user = request._id;
    var json = request.body;
    json = JSON.parse(json);

    Home.remove({_id:json._id,user:user},function (err) {
        if (err) return reponse.send({
            numer: "-1",
            description: err
        });
    });
    Room.remove({home:json._id},function (err) {
        if (err) return reponse.send({
            numer: "-1",
            description: err
        });
    });
    return reponse.send({
        numer: "1",
        description: "Дом удален"
    });
});

app.post("/getAllRooms",middleCheckToken,function (request,reponse) {

    var json = request.body;
    json = JSON.parse(json);

    var home= json.home;
    Room.find({home:home},function (err,rooms) {
        if(err)return reponse.send({
            numer:"-1",
            description:err
        });
        reponse.send(rooms);
    });
});


app.post("/addRoom",middleCheckToken,function (request,reponse) {
    var json = request.body;
    json = JSON.parse(json);
    console.log(json);
    var obj = {
        name: json.name,
        home: json.home
    };

    var newRoom = new Room(obj);

    newRoom.save(function (error){
        if(error) reponse.send({
            numer:-1,
            description:error
        });
        else reponse.send({
            numer:1,
            description:"Комната добавлена!"
        });
    });
});

app.post("/changeNameRoom",middleCheckToken,function (request,reponse) {

    var json = request.body;
    json = JSON.parse(json);

    Room.findOneAndUpdate({"_id": json._id,"home":json.home},{"$set":{"name":json.name}}).exec(function(err){
        if(err) reponse.send({
            numer:"-1",
            description:err
        });
        else reponse.send({
            numer: "1",
            description:"Имя изменено!"
        });
    });
});

app.post("/deleteRoom",middleCheckToken,function (request,reponse) {

    var json = request.body;
    json = JSON.parse(json);
    console.log(json);
    Room.remove({_id:json._id, home:json.home},function (err) {
        if (err) return reponse.send({
            numer: "-1",
            description: err
        });
    });

    return reponse.send({
        numer: "1",
        description: "Комната удалена"
    });
});


app.post('/getAdministration',middleCheckToken,function (request,reponse) {
   var html = fs.readFileSync("./static/administration/administration.html");
   reponse.end(html);
});

app.post('/getHouses',middleCheckToken,function (request,reponse) {
    var html = fs.readFileSync("./static/home/home.html");
    reponse.end(html);
});

app.post('/getUserInfo',middleCheckToken,function (request,reponse) {
    var html = fs.readFileSync("./static/userInfo/userInfo.html");
    reponse.end(html);
});

app.post('/getLogin', function (requsest,reponse) {
    var html = fs.readFileSync("./static/login/login.html");
    reponse.end(html);
});

app.post('/getRegistration', function (requsest,reponse) {
    var html = fs.readFileSync("./static/registration/registration.html");
    reponse.end(html);
});

function middleCheckToken(request,reponse,next){

    if(!request.body) {
        return response.sendStatus(400);
    }
    var json = request.body;
    //console.log(json);
    json = JSON.parse(json);

    var token = json.accessToken;
    var login = "";
    var _id ="";
    console.log(token);
    var decoded = jwt.decode(token);

    if(decoded == null) return reponse.send({
        numer: "-1",
        description: "Неверный токен"
    });
    var exp = Math.floor(Date.now() / 1000) + (60);

    console.log("Exp:",decoded.exp," : ",exp);

    if ((exp - decoded.exp) > 120) return reponse.send({
        numer: "-1",
        description: "Время действия токена истекло"
    })
    else{
        login = decoded.login;
        _id = decoded._id;
    }

    User.find({login:login,_id:_id},function (err,users){

        if(err) return reponse.send({
            numer: "-1",
            description: err
        });

        if(users.length != 1) return reponse.send({
            numer: "-1",
            description: "Пользователя с таким токеном не существует"
        });
    });

    request.login = login;
    request._id = _id;
    next();
}

app.listen(port, function(){
    console.log('Сервер запущен порт:' + port);
});
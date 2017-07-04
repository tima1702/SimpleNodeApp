var User = require("../modules/user");
var jwt = require('jsonwebtoken');
var impObject = {
    'jwtSecret': 'xtyqwtzt00700tytx',
    'connStr': 'mongodb://localhost/test'
};
var tokenEpired = 3000;

function registration(request, response) {

    if(!request.body) {
        return response.sendStatus(400);
    }
    var json = request.body;


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
}

function login(request,reponse){
    if(!request.body) {
        return response.sendStatus(400);
    }
    var json = request.body;

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
        }, impObject.jwtSecret);
        console.log(user);

        reponse.send({
            'accessToken': accessToken,
            'name': user.name,
            'age': user.age,
            'email':user.email
        });
    });
}

function middleCheckToken(request,reponse,next){

    if(!request.body) {
        return response.sendStatus(400);
    }
    var json = request.body;
    console.log("middle 1",json);
    console.log("middle 2",request.originalUrl);
    var token = json.accessToken;
    var login = "";
    var _id ="";
    //  console.log(token);
    var decoded = jwt.decode(token);

    if(decoded == null) return reponse.send({
        numer: "-1",
        description: "Invalid token!"
    });
    var exp = Math.floor(Date.now() / 1000) + (60);
    console.log("middle 3");
    //console.log("Exp:",decoded.exp," : ",exp);

    if ((exp - decoded.exp) > tokenEpired) return reponse.send({
        numer: "-1",
        description: "The token expired"
    })
    else{
        login = decoded.login;
        _id = decoded._id;
    }
    console.log("middle 4");
    User.find({login:login,_id:_id},function (err,users){
        console.log("middle 5");
        if(err) return reponse.send({
            numer: "-1",
            description: err
        });

        if(users.length != 1) return reponse.send({
            numer: "-1",
            description: "Invalid token!"
        }); else {
            request.login = login;
            request._id = _id;
            next();
        }
    });
}

module.exports = {
    registration: registration,
    login:login,
    middleCheckToken: middleCheckToken
}

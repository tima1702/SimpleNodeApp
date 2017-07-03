var User = require("../modules/user");

function updateUserInfo(request,reponse) {

    var json = request.body;
    // json = JSON.parse(json);
    var login = request.login;
    var _id = request._id;

    User.findOneAndUpdate({"_id": _id}, {
        "$set": {
            "name": json.name,
            "age": json.age,
            "email": json.email
        }
    }).exec(function (err, user) {
        if (err) {
            console.log(err);
            return reponse.sendStatus(400);
        }
    });
    User.find({login: login}, function (err, users) {
        if (err) reponse.send({
            numer: "-1",
            descriptoin: err
        });
        var user = users[0];
        reponse.send({
            'name': user.name,
            'age': user.age,
            'email': user.email
        });
    });
}

function updatePassword(request,reponse){

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
}

module.exports = {
    updateUserInfo: updateUserInfo,
    updatePassword: updatePassword
}
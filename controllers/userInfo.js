var User = require("../modules/user");

function updateUserInfo(request,reponse) {

    var json = request.body;

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
        } else{
            reponse.send({
                numer: "1",
                descriptoin: "User date update"
            });
        }
    });
}

function updatePassword(request,reponse){

    var json = request.body;

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
var User = require("../modules/user");

function getAllUser(request,reponse){

    User.find({},'name age login email _id',function (err,users) {
        if (err) return reponse.send({
            numer: "-1",
            description: err
        });
        return reponse.send(users);
    });
}
function deleteUser(request,reponse){

    var json = request.body;
    console.log(json);

    var login = request.login;

    var newUser = new User({
        _id: json.deleteLogin
    });
    console.log('123');
    /*User.remove({"_id":json.deleteLogin},function (err) {
        if(err) return reponse.send({
            numer:"-1",
            description:err
        });
        if(json.deleteLogin == request._id) return reponse.send({
            numer:"2",
            description: "Ваши данные удалены!"
        });
        return reponse.send({
            numer:"1",
            description: "Удалили пользователя"
        });
    });*/
    newUser.remove(function (err) {
        if(err) return reponse.send({
            numer:"-1",
            description:err
        });
        if(json.deleteLogin == request._id) return reponse.send({
            numer:"2",
            description: "You have deleted your data"
        });
        return reponse.send({
            numer:"1",
            description: "User deleted!"
        });
    });
}

module.exports = {
    getAllUser: getAllUser,
    deleteUser: deleteUser
}
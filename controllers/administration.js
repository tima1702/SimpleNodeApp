var User = require("../modules/user");

function getAllUser(request,reponse){

    User.find({},'name age login email',function (err,users) {
        if (err) return reponse.send({
            numer: "-1",
            description: err
        });
        return reponse.send(users);
    });
}
function deleteUser(request,reponse){

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
}

module.exports = {
    getAllUser: getAllUser,
    deleteUser: deleteUser
}
var HomeModel = require("../modules/home");
var Room = require("../modules/room");


var Home = new HomeModel();


function getAllHouses(request,reponse) {
    var user = request._id;
    HomeModel.find({user:user},function (err,houses) {
        if(err)return reponse.send({
            numer:"-1",
            description:err
        });
        reponse.send(houses);
    });
}

function addHouses(request,reponse) {
    var user = request._id;
    var json = request.body;


    var obj = {
        name: json.name,
        user: user
    };

    var newHome = new HomeModel(obj);

    newHome.save(function (error,home){
        if(error) reponse.send({
            numer:-1,
            description:error
        });
        else reponse.send(home);
    });
}

function updateHouses(request,reponse) {
    var user = request._id;
    var json = request.body;

    HomeModel.findOneAndUpdate({"_id": json._id,"user":user},{"$set":{"name":json.name}}).exec(function(err){
        if(err) reponse.send({
            numer:"-1",
            description:err
        });
        else reponse.send({
            numer: "1",
            description:"Имя изменено!"
        });
    });
}

function deleteHouses(request,reponse) {

    var user = request._id;
    var json = request.body;

    var newHome = HomeModel({
        _id:json._id,
        user:json.user
    });

    newHome.remove(function (err) {
        if (err) return reponse.send({
            numer: "-1",
            description: err
        }); else return reponse.send({
            numer: "1",
            description: "Дом удален"
        });
    });
    /*Home.remove({_id:json._id,user:user},function (err) {
        if (err) return reponse.send({
            numer: "-1",
            description: err
        });
        else return reponse.send({
            numer: "1",
            description: "Дом удален"
        });
    });*/
}

module.exports = {
    deleteHouses: deleteHouses,
    updateHouses: updateHouses,
    addHouses: addHouses,
    getAllHouses: getAllHouses
}

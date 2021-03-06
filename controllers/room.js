var Room = require("../modules/room");

function getAllRoom(request,reponse) {

    var json = request.body;


    var home= json.home;
    Room.find({home:home},function (err,rooms) {
        if(err)return reponse.send({
            numer:"-1",
            description:err
        });
        reponse.send(rooms);
    });
}

function addRoom(request,reponse) {
    var json = request.body;

    var obj = {
        name: json.name,
        home: json.home
    };

    var newRoom = new Room(obj);

    newRoom.save(function (error,room){
        if(error) reponse.send({
            numer:-1,
            description:error
        });
        else reponse.send(room);
    });
}

function updateRoom(request,reponse) {

    var json = request.body;

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
}

function deleteRoom(request,reponse) {

    var json = request.body;

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
}

module.exports = {
    deleteRoom:deleteRoom,
    updateRoom:updateRoom,
    addRoom:addRoom,
    getAllRoom:getAllRoom
}
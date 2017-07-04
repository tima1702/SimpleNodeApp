var mongoose = require('mongoose');
var Room = require('../modules/room');

var Schema = mongoose.Schema;

var homeShema = new Schema({
    name: String,
    user: {type: Schema.Types.ObjectId, required:true}
});

homeShema.post('remove', function (doc) {
    console.log("Комнаты", doc);
    Room.remove({"home": doc._id}, function (err,room) {
        if (err) return;
    });
});

var Home = mongoose.model('Home',homeShema);



module.exports = Home;



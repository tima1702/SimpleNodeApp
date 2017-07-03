var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var roomShema = new Schema({
    name: String,
    home: {type: Schema.Types.ObjectId, required:true}
});

var Room = mongoose.model('Room',roomShema);

module.exports = Room;
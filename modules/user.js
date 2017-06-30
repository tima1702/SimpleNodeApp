var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userShema = new Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    login: String
});

var User = mongoose.model('User',userShema);

module.exports = User;

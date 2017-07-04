var mongoose = require('mongoose');
var Home = require('../modules/home')

var Schema = mongoose.Schema;

var userShema = new Schema({
    name: String,
    email: String,
    password: String,
    age: Number,
    login: { type: String, unique: true }
});

userShema.post('remove',function (doc) {

    Home.find({"user":doc._id}, function (err,home) {
        if(err) console.log(err);
        for(var i = 0; i < home.length; i++){
            var delHome = new Home(home[i]);
            delHome.remove(function (err) {
                if(err) console.log(err);
            });
        }
    });
});


var User = mongoose.model('User',userShema);

module.exports = User;

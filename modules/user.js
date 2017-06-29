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

//User.find

//module.exports.modelUser = User;
/*
var findUserByLogin = function(loginUser,callback){
    User.find({ login: loginUser}, function (err, user){
        callback(user);
    });
}
*/
/*var registration = function(obj){
    findUserByLogin(obj.login, function(obj){
        if(user == []);

    })
    var result = "2";
    var newUser = new User(obj);
    newUser.save(function(err) {
        if (err) throw err;
        //this.result = "1";
        console.log("Выход 3");
    });
    return result;
}*/

module.exports = User;
//module.exports.findUserByLogin = findUserByLogin;
//module.exports.registration = registration;
var users = require("../controllers/user");
var userInfo = require("../controllers/userInfo");
var administration = require("../controllers/administration");
var home = require("../controllers/home");
var rooms = require("../controllers/room");
var page = require("../controllers/page");

module.exports = function ( app ) {
    app.post("/register", users.registration);
    app.post("/login", users.login);
}


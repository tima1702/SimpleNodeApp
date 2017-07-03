var users = require("../controllers/user");
var userInfo = require("../controllers/userInfo");
var administration = require("../controllers/administration");
var home = require("../controllers/home");
var rooms = require("../controllers/room");
var page = require("../controllers/page");

module.exports = function (app) {
    app.post("/getAllUser", users.middleCheckToken, administration.getAllUser);

    app.post("/deleteUser", users.middleCheckToken, administration.deleteUser);
}
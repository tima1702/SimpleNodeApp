var users = require("../controllers/user");
var userInfo = require("../controllers/userInfo");
var administration = require("../controllers/administration");
var home = require("../controllers/home");
var rooms = require("../controllers/room");
var page = require("../controllers/page");

module.exports = function ( app ) {
    app.post("/updateUserInfo", users.middleCheckToken, userInfo.updateUserInfo);

    app.post("/updatePassword", users.middleCheckToken, userInfo.updatePassword);
}


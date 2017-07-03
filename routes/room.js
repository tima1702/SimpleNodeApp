var users = require("../controllers/user");
var userInfo = require("../controllers/userInfo");
var administration = require("../controllers/administration");
var home = require("../controllers/home");
var rooms = require("../controllers/room");
var page = require("../controllers/page");

module.exports = function ( app ) {
    app.post("/getAllRooms", users.middleCheckToken, rooms.getAllRoom);

    app.post("/addRoom", users.middleCheckToken, rooms.addRoom);

    app.post("/changeNameRoom", users.middleCheckToken, rooms.updateRoom);

    app.post("/deleteRoom", users.middleCheckToken, rooms.deleteRoom);
}
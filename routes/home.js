var users = require("../controllers/user");
var userInfo = require("../controllers/userInfo");
var administration = require("../controllers/administration");
var home = require("../controllers/home");
var rooms = require("../controllers/room");
var page = require("../controllers/page");

module.exports = function ( app ) {
    app.post("/getAllHouse", users.middleCheckToken, home.getAllHouses);

    app.post("/addNewHouse", users.middleCheckToken, home.addHouses);

    app.post("/changeHomeName", users.middleCheckToken, home.updateHouses);

    app.post("/deleteHouse", users.middleCheckToken, home.deleteHouses);

}
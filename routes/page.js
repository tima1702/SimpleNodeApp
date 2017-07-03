var users = require("../controllers/user");
var page = require("../controllers/page");

module.exports = function ( app ) {
    app.post('/getAdministration', users.middleCheckToken, page.getAdministration);

    app.post('/getHouses', users.middleCheckToken,page.getHome);

    app.post('/getUserInfo', users.middleCheckToken,page.getUserInfo);

    app.post('/getLogin', page.getLogin);

    app.post('/getRegistration', page.getRegistration);
}
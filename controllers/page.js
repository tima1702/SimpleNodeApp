var fs = require("fs");

function getAdministration(request,reponse) {
    var html = fs.readFileSync("./static/administration/administration.html");
    reponse.end(html);
}

function getHome(request,reponse) {
    var html = fs.readFileSync("./static/home/home.html");
    reponse.end(html);
}

function getUserInfo(request,reponse) {
    var html = fs.readFileSync("./static/userInfo/userInfo.html");
    reponse.end(html);
}

function getLogin(requsest,reponse) {
    var html = fs.readFileSync("./static/login/login.html");
    reponse.end(html);
}

function getRegistration(requsest,reponse) {
    var html = fs.readFileSync("./static/registration/registration.html");
    reponse.end(html);
}

module.exports = {
    getAdministration:getAdministration,
    getHome:getHome,
    getUserInfo:getUserInfo,
    getLogin:getLogin,
    getRegistration:getRegistration
}
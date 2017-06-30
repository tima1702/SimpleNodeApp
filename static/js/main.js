//hash
String.prototype.hashCode = function(){
    if (Array.prototype.reduce){
        return this.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
    }
    var hash = 0;
    if (this.length === 0) return hash;
    for (var i = 0; i < this.length; i++) {
        var character  = this.charCodeAt(i);
        hash  = ((hash<<5)-hash)+character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

function removeAllError(){
    var bool = true;
    while(bool){
        bool = VT.removeClass('.error', 'error');
    }
}

function loadLogin(helpMessage){
    checkAccessToken();
    helpMessage = helpMessage || "";


    if(localStorage.getItem('accessToken')){
        loadUserInfo();
        return;
    }

    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('GET','/static/login/login.html',[],'',function (p) {
        content.innerHTML +=p;
    });

    window.setTimeout(writeHelpMessage,50,helpMessage);
}
function writeHelpMessage(helpMessage){
    document.getElementById('help-message').innerHTML = "";
    document.getElementById('help-message').innerHTML += helpMessage;
}

function loadRegistration(){

    checkAccessToken();

    if(localStorage.getItem('accessToken')){
        loadUserInfo();
        return;
    }

    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('GET','/static/registration/registration.html',[],'',function (p) {
        content.innerHTML +=p;
    });
}

function loadHome(){

    checkAccessToken();

    if(!localStorage.getItem('accessToken')){
        loadLogin();
        return;
    }

    navigation();

    VT.send('GET','static/home/home.html',[],'',function (p) {
        document.getElementById('content').innerHTML = "";
        document.getElementById('content').innerHTML +=p;
    });

    document.getElementById('content')

    return true;

}

function loadHomes() {
    loadHome();

    window.setTimeout(loadTask,100);
}

function loadTask() {

    task5_1();
    task5_2();

}

function loaderUserInfo(){

    console.log(localStorage.getItem('accessToken'));
    if(!localStorage.getItem('accessToken')){
        loadLogin();
        return;
    }

    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('GET','/static/userInfo/userInfo.html',[],'',function (p) {
        content.innerHTML +=p;
    });

    window.setTimeout(setUserData,100);
}

function loadUserInfo() {
    checkAccessToken();
    window.setTimeout(loaderUserInfo,30);
}

function loadAdministration(){

    if(!localStorage.getItem('accessToken')){
        loadLogin();
        return;
    }
    var object = {
        accessToken: localStorage.getItem('accessToken')
    };

    object = JSON.stringify(object);
    console.log(object);

    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('POST','getAdministration',[object],function (p) {
        console.log(p);
        loadLogin();
        return;
    },function (p) {
        if(!p.numer) {
            content.innerHTML += p;
            window.setTimeout(getUsers,100);
        }
        else {
            console.log(p);
            loadLogin(p.description);
            return;
        }
    });
}

function hideErr(query){
    VT.removeClass(query, "error");
}

function navigation(){

    if(localStorage.getItem('accessToken')){
        VT.addClass('#nav-reg','hide');
        VT.addClass('#nav-log','hide');
        VT.removeClass('#nav-inf','hide');
        VT.removeClass('#nav-home','hide');
        VT.removeClass('#nav-out','hide');
        VT.removeClass('#nav-adm','hide');
    } else{
        VT.removeClass('#nav-reg','hide');
        VT.removeClass('#nav-log','hide');
        VT.addClass('#nav-inf','hide');
        VT.addClass('#nav-home','hide');
        VT.addClass('#nav-out','hide');
        VT.addClass('#nav-adm','hide');
    }
}

function logOut() {
    localStorage.clear();
    loadLogin();
}

function checkAccessToken(){

    var token = localStorage.getItem('accessToken');
    if(!token) return;

    var obj ={accessToken: token};
    obj = JSON.stringify(obj);

    VT.send('POST','/checkToken',[obj],function (e) {
        console.log(e);
    },function (p) {
        console.log(p);
        if(p.numer =="-1") {
            localStorage.clear();
            //console.log(localStorage);
        }
});
}

if(localStorage.getItem('accessToken')){
    loadUserInfo();
} else{
    loadLogin();
}


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

function loadLogin(){
    checkAccessToken();

    if(localStorage.getItem('accessToken')){
        loadUserInfo();
        return;
    }

    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('GET','/template/login.html',[],'',function (p) {
        content.innerHTML +=p;
    });
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
    VT.send('GET','/template/registration.html',[],'',function (p) {
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

    VT.send('GET','/template/home.html',[],'',function (p) {
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
    VT.send('GET','/template/userInfo.html',[],'',function (p) {
        content.innerHTML +=p;
    });

    window.setTimeout(setUserData,100);
}

function loadUserInfo() {
    checkAccessToken();
    window.setTimeout(loaderUserInfo,30);
}

function loadAdministration(){
    console.log(localStorage.getItem('accessToken'));
    if(!localStorage.getItem('accessToken')){
        loadLogin();
        return;
    }

    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('GET','/template/administration.html',[],'',function (p) {
        content.innerHTML +=p;
    });

    window.setTimeout(getUsers,100);
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
    VT.send('POST','/checkToken',[token],function (e) {
        console.log(e);
    },function (p) {
        console.log(p);
        if(p.numer =="-1") {

            localStorage.clear();
            console.log(localStorage);
        }
});
}

if(localStorage.getItem('accessToken')){
    loadUserInfo();

} else{
    loadLogin();
}


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

    if(sessionStorage.getItem('isLogin')){
        loadUserInfo();
        return;
    }


    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('GET','/test2/template/login.html',[],'',function (p) {
        content.innerHTML +=p;
    });
}

function loadRegistration(){

    if(sessionStorage.getItem('isLogin')){
        loadUserInfo();
        return;
    }

    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('GET','/test2/template/registration.html',[],'',function (p) {
        content.innerHTML +=p;
    });
}

function loadHome(){

    if(!sessionStorage.getItem('isLogin')){
        loadLogin();
        return;
    }
    navigation();

    VT.send('GET','/test2/template/home.html',[],'',function (p) {
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

function loadUserInfo(){

    if(!sessionStorage.getItem('isLogin')){
        loadLogin();
        return;
    }

    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('GET','/test2/template/userInfo.html',[],'',function (p) {
        content.innerHTML +=p;
    });

    window.setTimeout(setUserData,100);
}

function hideErr(query){
    VT.removeClass(query, "error");
}

function navigation(){

    if(sessionStorage.getItem('isLogin')){
        VT.addClass('#nav-reg','hide');
        VT.addClass('#nav-log','hide');
        VT.removeClass('#nav-inf','hide');
        VT.removeClass('#nav-home','hide');
        VT.removeClass('#nav-out','hide');
    } else{
        VT.removeClass('#nav-reg','hide');
        VT.removeClass('#nav-log','hide');
        VT.addClass('#nav-inf','hide');
        VT.addClass('#nav-home','hide');
        VT.addClass('#nav-out','hide');
    }
}
function logOut() {
    sessionStorage.clear();
    loadLogin();
}

if(sessionStorage.getItem('isLogin')){
    loadUserInfo();

} else{
    loadLogin();
}


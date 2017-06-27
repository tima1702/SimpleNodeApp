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
    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('GET','/test2/template/login.html',[],'',function (p) {
        content.innerHTML +=p;
    });
}

function loadRegistration(){
    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('GET','/test2/template/registration.html',[],'',function (p) {
        content.innerHTML +=p;
    });
}

function loadHome(){
    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('GET','/test2/template/home.html',[],'',function (p) {
        content.innerHTML +=p;
    });
    //alert("123");
}

function loadHomes() {
    loadHome();
}


function loadUserInfo(){
    navigation();
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('GET','/test2/template/userInfo.html',[],'',function (p) {
        content.innerHTML +=p;
    });
}

function navigation(){
    console.log(sessionStorage.getItem('isLogin'));
    if(sessionStorage.getItem('isLogin')){
        VT.addClass('#nav-reg','hide');
        VT.addClass('#nav-log','hide');
        VT.removeClass('#nav-inf','hide');
        VT.removeClass('#nav-home','hide');
    } else{
        VT.removeClass('#nav-reg','hide');
        VT.removeClass('#nav-log','hide');
        VT.addClass('#nav-inf','hide');
        VT.addClass('#nav-home','hidden');
    }
}
if(sessionStorage.getItem('isLogin')){
    loadUserInfo();
} else{
    loadLogin();
}

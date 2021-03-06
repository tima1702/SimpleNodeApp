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

    helpMessage = helpMessage || "";

    if(localStorage.getItem('accessToken')){
        loadUserInfo();
        return;
    }
    window.location = "#login";
    navigation("#nav-log");
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('POST','getLogin',[],function (p){
        console.log(p);
        },
        function (p) {
            content.innerHTML +=p
    });

    window.setTimeout(writeHelpMessage,50,helpMessage);
}
function writeHelpMessage(helpMessage){
    document.getElementById('help-message').innerHTML = "";
    document.getElementById('help-message').innerHTML += helpMessage;
}

function loadRegistration(){

    if(localStorage.getItem('accessToken')){
        loadUserInfo();
        return;
    }
    window.location = "#registration";
    navigation("#nav-reg");
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('POST','getRegistration',[],function (p){
            console.log(p);
        },
        function (p) {
            content.innerHTML +=p
        });
}



function loadTask() {
    getAllHouse();
    window.setTimeout(task5_2,30);

}

function loadUserInfo(){


    if(!localStorage.getItem('accessToken')){
        loadLogin();
        return;
    }
    var obj= {
        accessToken: localStorage.getItem('accessToken')
    };

    window.location = "#user";
    navigation("#nav-inf");
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('POST','getUserInfo',obj,function (p) {
        localStorage.clear();
        loadLogin(p.description);
        return;
    },function (p) {
        if(!p.numer) {
            content.innerHTML += p;
            window.setTimeout(setUserData,10);
        }
        else {
            localStorage.clear();

            loadLogin(p.description);
            return;
        }
    });
}



function loadAdministration(){

    if(!localStorage.getItem('accessToken')){
        loadLogin();
        return;
    }
    var obj= {
        accessToken: localStorage.getItem('accessToken')
    };



    navigation("#nav-adm");
    window.location = "#adinistration";
    var content = document.getElementById('content');
    content.innerHTML = "";

    VT.send('POST','getAdministration',obj,function (p) {
        localStorage.clear();
        loadLogin(p.description);
        return;
    },function (p) {
        if(!p.numer) {
            content.innerHTML += p;
            window.setTimeout(getUsers,10);
        }
        else {
            localStorage.clear();
            loadLogin(p.description);
            return;
        }
    });
}

function hideErr(query){
    VT.removeClass(query, "error");
}


function navigation(query){
    VT.removeClass(".selected","selected");
    VT.addClass(query,"selected");

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

function addSpinerGlif(button,str){
    button.innerHTML = "";
    button.innerHTML = '<i class="fa fa-spinner fa-spin" aria-hidden="true"></i><span>  ' + str + '</span>';
    //VT.addEl(button,html);
}

function addCheckGlif(button,str){
    button.innerHTML = "";
    button.innerHTML = '<i class="fa fa-check" aria-hidden="true"></i><span>  ' + str + '</span>';
    //VT.addEl(button,html);
}

function addTimesGlif(button,str) {
    button.innerHTML = "";
    button.innerHTML = '<i class="fa fa-times" aria-hidden="true"></i><span>  ' + str + '</span>';
    //VT.addEl(button,html);
}

function removeGlif(button, str){
    button.innerHTML = "";
    button.innerHTML = '<span>' + str + '</span>';
    //VT.addEl(button,html);
}

function logOut() {
    localStorage.clear();
    loadLogin();
}

if(localStorage.getItem('accessToken')){
    var x = location.hash;
    var flag = true;
    if(x == "#user") {loadUserInfo(); flag = false}
    if(x == "#home") {loadHomes(); flag = false}
    if(x == "#adinistration") {loadAdministration();flag = false}
    if(flag) loadUserInfo();
} else{
    var x = location.hash;
    if(x == "#registration") loadRegistration();
    else loadLogin();
}


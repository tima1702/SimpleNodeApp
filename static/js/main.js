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
            window.setTimeout(setUserData,100);
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

    var content = document.getElementById('content');
    content.innerHTML = "";

    VT.send('POST','getAdministration',obj,function (p) {
        localStorage.clear();
        loadLogin(p.description);
        return;
    },function (p) {
        if(!p.numer) {
            content.innerHTML += p;
            window.setTimeout(getUsers,100);
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

function addProgress(num){
    var progressBar = document.getElementById('progress-bar');

    var procent = getProgress();


    //if(procent == 100) return 100;

    if(procent > num && num != 0) return procent;


    procent = num;

    var str = "" + procent + "%";

    progressBar.style.width = str;
    return procent;
}




function addingProgress(){
    setTimeout(addProgress,100);
}


function getProgress(){
    var progressBar = document.getElementById('progress-bar');
    var procent = progressBar.style.width;
    procent = procent.slice(0, -1);
    procent = Number(procent);
    return procent;
}

function closeModalWindow(){
    VT.addClass("#popup1",'hide');
    var progressBar = document.getElementById('progress-bar');
    var procent = getProgress();

    procent = 0;

    var str = "" + procent + "%";
    progressBar.style.width = str;

    addDescriptonHimt("");
    hideModalButton();
    VT.removeClass('#progress-bar','progress-bar-danger');
}

function openModalWindow(text) {
    text = text || "Loading information";
    VT.removeClass("#popup1",'hide');
    addDescriptionModal(text);
}

function hideModalButton() {
    VT.addClass("#mod-btn",'hide');
}
function showModalButton(){
    VT.removeClass("#mod-btn",'hide');
}

function exampleModal(){
    openModalWindow();
    setTimeout(addProgress,3000,30);
    setTimeout(addProgress,6000,60);
    setTimeout(addProgress,9000,90);
    setTimeout(addProgress,10000,100);
    setTimeout(showModalButton,11000);
    setTimeout(addDescriptonHimt,11000,"In hac habitasse platea dictumst.");
}

function exampleError(){
    openModalWindow();
    setTimeout(addProgress,3000,30);
    setTimeout(addProgress,6000,60);
    setTimeout(errModal,7000);
    setTimeout(showModalButton,7000);
    setTimeout(addDescriptonHimt,7000,"Error");
}

function successModal(text){
    text = text || "Success!";
    addProgress(100);
    setTimeout(addDescriptonHimt,350,text);
    setTimeout(showModalButton,350);
}

function modalTokenError(text){
    text = text || "Token error!";
    setTimeout(addDescriptonHimt,250,text);
    setTimeout(errModal,250);
    setTimeout(closeModalWindow,2000);
    setTimeout(loadLogin, 2000,text);
}

function modalError(text){
    text = text || "Error!";
    errModal();
    addDescriptonHimt(text);
}


function errModal(){
    VT.addClass('#progress-bar','progress-bar-danger');
}
function exampleErrorToken() {
    openModalWindow();
    setTimeout(addProgress,3000,30);
    setTimeout(addProgress,6000,60);
    setTimeout(errModal,7000);
    //setTimeout(showModalButton,7000);
    setTimeout(addDescriptonHimt,7000,"Error token");
    setTimeout(closeModalWindow,8000);
    setTimeout(loadLogin, 8000,"Error token");
    //console.log("123");
    //loadLogin();
}

function addDescriptonHimt(text){
    document.getElementById('himt').innerText = text;

}

function addDescriptionModal(text){
    document.getElementById('desc').innerText = text;
}

function loadProgress(num){
    if(num < getProgress()) return false;

    for(var i = 0; i < getProgress(); i++) addingProgress();

    //return true;
}

function closeProgress(){

}

function logOut() {
    localStorage.clear();
    loadLogin();
}

if(localStorage.getItem('accessToken')){
    loadUserInfo();
} else{
    loadLogin();
}


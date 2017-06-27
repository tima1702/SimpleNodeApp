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


function registration(form){

    if(!validateRegistration()) return false;
    var obj=getObjectRegistration();
    var serialObj =JSON.stringify(obj);
    //console.log(serialObj);
    if(!(localStorage.getItem(obj.login) == null || localStorage.getItem(obj.login) == undefined)) {
        alert("Пользователь с таким логином зарегистрировался в системе");
        return false;
    }
    localStorage.setItem(obj.login,serialObj);

    form.reset();
    alert("Вы зарегистрированны в системе!");
}

function getObjectRegistration(){
    //var form = document.getElementById('form');
    var object = new Object();

    object.login = document.getElementById('login').value;
    object.email = document.getElementById('inputEmail').value;
    var str = document.getElementById('inputPassword').value;
    object.password = str.hashCode();
    object.age = document.getElementById('age').value;
    object.name = document.getElementById('firstName').value;

    return object;
}

function validateRegistration(){
    removeAllError();

    var str = document.getElementById('login').value;
    var parrent = /^[a-zA-z]{1}[a-zA-Z1-9]{3,20}/i;
    if(!parrent.test(str)) VT.addClass(".help-login",'error');

    str = document.getElementById('inputEmail').value;
    parrent = /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i;
    if(!parrent.test(str)) VT.addClass('.help-email','error');

    if((document.getElementById('inputPassword').value != document.getElementById('confirmPassword').value) ||
        (document.getElementById('inputPassword').value.length < 5)) VT.addClass('.help-password','error');

    if(VT.getAllEl('.error').length == 0) return true;
    return false;
}

function removeAllError(){
    var bool = true;
    while(bool){
        bool = VT.removeClass('.error', 'error');
    }
}

function validateLogin() {
    removeAllError();

    var str = document.getElementById('login').value;
    var parrent = /^[a-zA-Z]{1}[a-zA-Z1-9]{3,20}/i;
    if(!parrent.test(str)) VT.addClass(".help-login",'error');

    if(document.getElementById('inputPassword').value.length < 5) VT.addClass('.help-password','error');

    if(VT.getAllEl('.error').length == 0) return true;
    return false;
}

function getObjectLogin(){
    var object = new Object();

    object.login = document.getElementById('login').value;
    var str = document.getElementById('inputPassword').value;
    object.password = str.hashCode();

    return object;
}

function userLogin(form){

    if(!validateLogin()) return false;
    var obj = getObjectLogin();
    var userInfo = localStorage.getItem(obj.login);

    if(userInfo == null && userInfo == undefined){
        alert("Пользователь с  таким логином не зарегистрирован!");
        return false;
    };

    userInfo = JSON.parse(userInfo);

    if(obj.password != userInfo.password) {
        alert("Пароли не совпадают!");
        return false;
    };
    sessionStorage.setItem("isLogin",true);
    for(var key in userInfo){
        if(key != "password") sessionStorage.setItem(key,userInfo[key]);
    }
    alert("Вход выполнен!");
    form.reset();
}

function updateLocalFromSession(){

    var session = sessionStorage;
    var userInfo = localStorage.getItem(session.login);

    userInfo = JSON.parse(userInfo);
    //переписать
    for(var key in userInfo)
        for(var key1 in session)
            if(key1 == key) userInfo[key] = session[key];

    userInfo = JSON.stringify(userInfo);

    localStorage.setItem(session.login,userInfo);
}


function changeName(){

    VT.removeClass('.help-name','error');

    var name = document.getElementById('firstName').value;
    var parrent = /[a-zA-Zа-яА-Я]{3,25}/;

    if(!parrent.test(name)){
        VT.addClass('.help-name','error');
        return false;
    };

    sessionStorage.setItem('name',name);
    updateLocalFromSession();
}

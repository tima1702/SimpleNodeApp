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

function getInfoObj(){
    var object = new Object();

    object.email = document.getElementById('inputEmail').value;
    object.age = document.getElementById('age').value;
    object.name = document.getElementById('firstName').value;

    return object;
}

function validInfo(object){
    removeAllError();

    var str = object.email;
    var parrent = /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i;
    if(!parrent.test(str)) VT.addClass('.help-email','error');

    str = object.name;
    parrent = parrent = /[a-zA-Zа-яА-Я]{3,25}/;
    if((!parrent.test(str)) & (str != "")) VT.addClass('.help-name','error');

    if(document.getElementById('age').value != "") {
        var age = object.age;
        age = Number(age);
        if (age < 1 || age > 120) VT.addClass('.help-age', 'error');
    }

    if(VT.getAllEl('.error').length == 0) return true;
    return false;
}
function updateSession(object){
    for(key in object)
        sessionStorage.setItem(key,object[key]);
}

function changeAll(){
    var object = getInfoObj();

    if(!validInfo(object)) return false;

    updateSession(object);

    object = JSON.stringify(sessionStorage);

    VT.send('POST','/updateUserInfo',[object], function (e) {
        console.log(e);
    },function (p) {
        console.log(p);
        if(p.numer == "-1"){
            sessionStorage.clear();
            loadLogin();
            return;
        }
        var userInfo = p[0];
        sessionStorage.setItem("isLogin",true);
        for(var key in userInfo)
             sessionStorage.setItem(key,userInfo[key]);
    });
    //updateLocalFromSession();
    setUserData();
    alert("Данные обновлены");
}

function setUserData(){
    var session = sessionStorage;

    document.getElementById('age').value = session.age;


    document.getElementById('inputEmail').value = session.email;

    document.getElementById('firstName').value = session.name;
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

    document.getElementById('firstName').value = "";
    alert("Имя измененно");
}

function changeAge(){
    VT.removeClass('.help-age');

    var age = document.getElementById('age').value;
    age = Number(age);

    if( age < 1 || age >120 ){
        VT.addClass('.help-age','error');
        return false;
    }

    sessionStorage.setItem('age',age);
    updateLocalFromSession();


    document.getElementById('age').value = "";
    alert("Возраст изменен");
}

function changeEmail(){
    VT.removeClass('.help-email','error');

    var email = document.getElementById('inputEmail').value;
    var parrent = /[0-9a-z_]+@[0-9a-z_]+\.[a-z]{2,5}/i;;

    if(!parrent.test(email)){
        VT.addClass('.help-email','error');
        return false;
    };

    sessionStorage.setItem('email',email);
    updateLocalFromSession();

    document.getElementById('inputEmail').value = "";
    alert("Почта измененна");
}

function changePassword(){
    VT.removeClass('.help-password','error');

    if((document.getElementById('inputPassword').value != document.getElementById('confirmPassword').value) ||
        (document.getElementById('inputPassword').value.length < 5)) {
        VT.addClass('.help-password', 'error');
        return false;
    }

    var password = document.getElementById('inputPassword').value;
    password = password.hashCode();

    var object = {
        login: sessionStorage.getItem('login'),
        password: password
    };

    object = JSON.stringify(object);
    console.log(object);

    VT.send('POST','/updatePassword',[object],function (e) {
        console.log(e);
    },function (p) {
        if(p != true){
            alert("Ошибка");
            return;
        };
        document.getElementById('inputPassword').value = "";
        document.getElementById('confirmPassword').value ="";
        alert("Пароль изменнен");
    });
}

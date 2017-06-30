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
    parrent = parrent = /[a-zа-я]{3,25}/;
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
        localStorage.setItem(key,object[key]);
}

function changeAll(){
    var object = getInfoObj();

    if(!validInfo(object)) return false;

    updateSession(object);

    object = JSON.stringify(localStorage);

    VT.send('POST','/updateUserInfo',[object], function (e) {
        console.log(e);
    },function (p) {
        console.log(p);
        if(p.numer == "-1"){
            localStorage.clear();
            return loadLogin(p.description);
        }
        var userInfo = p[0];

        for(var key in userInfo) localStorage.setItem(key,userInfo[key]);

        setUserData();
        //alert("Данные обновлены");
    });
}

function setUserData(){
    var session = localStorage;

    document.getElementById('age').value = session.age;


    document.getElementById('inputEmail').value = session.email;

    document.getElementById('firstName').value = session.name;
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
        accessToken: localStorage.getItem('accessToken'),
        password: password
    };

    object = JSON.stringify(object);
    console.log(object);

    VT.send('POST','/updatePassword',[object],function (e) {
        console.log(e);
    },function (p) {
        if(p.numer == "-1"){
            localStorage.clear();
            return loadLogin(p.descriptoin);
        }
        if(p != true){
            alert("Ошибка");
            return;
        };

        document.getElementById('inputPassword').value = "";
        document.getElementById('confirmPassword').value ="";
        alert("Пароль изменнен");
    });
}

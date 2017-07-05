function getInfoObj(){
    var object = new Object();

    object.email = document.getElementById('inputEmail').value;
    object.age = document.getElementById('age').value;
    object.name = document.getElementById('firstName').value;
    object.accessToken = localStorage.getItem('accessToken');

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
    var obj = getInfoObj();

    if(!validInfo(obj)) return false;
    var button = document.getElementById('changeAll');

    VT.send('POST','/updateUserInfo',obj, function (e) {
        console.log(e);
        setUserData();
        setTimeout(addSpinerGlif,10,button,"Change...");
        setTimeout(addTimesGlif,400,button,"Error");
        setTimeout(removeGlif,1000,button,"Change");

    },function (p) {
        console.log(p);
        if(p.numer == "-1"){
            localStorage.clear();
            loadLogin(p.description);
            return;
        }else{
            updateSession(obj);
            setUserData();
            setTimeout(addSpinerGlif,10,button,"Change...");
            setTimeout(addCheckGlif,400,button,"Success!");
            setTimeout(removeGlif,1000,button,"Change");
        }
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

    if(document.getElementById('inputPassword').value != document.getElementById('confirmPassword').value){
        document.querySelector('.help-password').innerHTML = "Passwords do not match";
        VT.addClass('.help-password','error');
        return false;
    };

    if(document.getElementById('inputPassword').value.length < 5) {
        document.querySelector('.help-password').innerHTML = "Short password!";
        VT.addClass('.help-password','error');
        return false;
    }

    if(document.getElementById('age').value != "") {
        var age = document.getElementById('age').value;
        age = Number(age);
        if (age < 1 || age > 120) VT.addClass('.help-age', 'error');
    }

    var password = document.getElementById('inputPassword').value;
    password = password.hashCode();

    var obj= {
        accessToken: localStorage.getItem('accessToken'),
        password: password
    };
    var button = document.getElementById('changePass');
    VT.send('POST','/updatePassword',obj,function (e) {
        console.log(e);
        setTimeout(addSpinerGlif,10,button,"Change...");
        setTimeout(addTimesGlif,400,button,"Error");
        setTimeout(removeGlif,1000,button,"Change");
    },function (p) {
        if(p.numer == "-1"){
            localStorage.clear();
            loadLogin(p.description);
            return;
        }
        if(p != true){
            setTimeout(addSpinerGlif,10,button,"Change...");
            setTimeout(addTimesGlif,400,button,"Error");
            setTimeout(removeGlif,1000,button,"Change");
            return;
        };
        setTimeout(addSpinerGlif,10,button,"Change...");
        setTimeout(addCheckGlif,400,button,"Success!");
        setTimeout(removeGlif,1000,button,"Change");
        document.getElementById('inputPassword').value = "";
        document.getElementById('confirmPassword').value ="";
    });
}

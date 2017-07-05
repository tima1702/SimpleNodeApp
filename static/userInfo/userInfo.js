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
    openModalWindow("Change user information!");
    VT.send('POST','/updateUserInfo',obj, function (e) {
        console.log(e);
        setUserData();
        setTimeout(addProgress,first,50);
        setTimeout(errModal,second);
    },function (p) {
        console.log(p);
        if(p.numer == "-1"){
            localStorage.clear();
            setTimeout(addProgress,first,50);
            setTimeout(modalTokenError,second, p.description);
            return;
        }else{
            updateSession(obj);
            setUserData();
            setTimeout(addProgress,first,50);
            setTimeout(successModal,second,"Information changed");
        }
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
    openModalWindow("Change user password!");
    var password = document.getElementById('inputPassword').value;
    password = password.hashCode();

    var obj= {
        accessToken: localStorage.getItem('accessToken'),
        password: password
    };

    VT.send('POST','/updatePassword',obj,function (e) {
        console.log(e);
        setTimeout(addProgress,first,50);
        setTimeout(errModal,second);
    },function (p) {
        if(p.numer == "-1"){
            localStorage.clear();
            setTimeout(addProgress,first,50);
            setTimeout(modalTokenError,second, p.description);
            return;
        }
        if(p != true){
            setTimeout(addProgress,first,50);
            setTimeout(errModal,second)
            return;
        };

        document.getElementById('inputPassword').value = "";
        document.getElementById('confirmPassword').value ="";
        setTimeout(addProgress,first,50);
        setTimeout(successModal,second,"Password changed!");
    });
}

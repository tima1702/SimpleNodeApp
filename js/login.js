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

function userLogin(){

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

    loadUserInfo();
    //form.submit();
}


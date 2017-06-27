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
    loadLogin();
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

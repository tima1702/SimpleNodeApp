function registration(form){

    if(!validateRegistration()) return false;
    var obj=getObjectRegistration();
    var serialObj =JSON.stringify(obj);

    VT.send('POST','/register',[serialObj], function (e) {
        console.log(e);
    },function (p) {
        //console.log(p);
        if(p == "1") {
            //alert("Вы зарегистрированны в системе!");
            loadLogin();
        } else alert("Пользователь с таким логином зарегистрировался в системе");
    });
    form.reset();

}

function getObjectRegistration(){
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

    str = document.getElementById('firstName').value;
    parrent = parrent = /[a-zA-Zа-яА-Я]{3,25}/;
    if((!parrent.test(str)) & (str != "")) VT.addClass('.help-name','error');

    if((document.getElementById('inputPassword').value != document.getElementById('confirmPassword').value) ||
        (document.getElementById('inputPassword').value.length < 5)) VT.addClass('.help-password','error');

    if(document.getElementById('age').value != "") {
        var age = document.getElementById('age').value;
        age = Number(age);
        if (age < 1 || age > 120) VT.addClass('.help-age', 'error');
    }

    if(VT.getAllEl('.error').length == 0) return true;
    return false;
}

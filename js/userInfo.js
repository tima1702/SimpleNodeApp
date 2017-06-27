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

    var login = sessionStorage.getItem('login');
    var userInfo = localStorage.getItem(login);

    userInfo = JSON.parse(userInfo);
    userInfo.password = password;
    userInfo = JSON.stringify(userInfo);

    localStorage.setItem(login,userInfo);

    document.getElementById('inputPassword').value = "";
    document.getElementById('confirmPassword').value ="";
    alert("Пароль изменнен");
}

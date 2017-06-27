function registration(){
    var obj = getObjectRegistration();
    console.log(obj);
    //return false;
    if(document.getElementById(inputPassword).value != document.getElementById(confirmPassword).value){

    };
    var serialObj =JSON.stringify(obj);
    console.log(serialObj);
    if(!(localStorage.getItem(obj.login) == null || localStorage.getItem(obj.login) == undefined)) {
        alert("Пользователь с таким логином зарегистрировался в системе");
        return false;
    }
    localStorage.setItem(obj.login,serialObj);

}

function getObjectRegistration(){
    //var form = document.getElementById('form');
    var object = new Object();

    object.login = document.getElementById('login').value;
    object.email = document.getElementById('inputEmail').value;
    object.password = document.getElementById('inputPassword').value;
    object.age = document.getElementById('age').value;
    object.name = document.getElementById('firstName').value;

    return object;
}
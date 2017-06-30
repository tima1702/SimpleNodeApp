function addTd(val){
    return "<td>" + val +"</td>";
}

function addTr(val){
    var str ="<tr>";
    str += addTd(val.login);
    str += addTd(val.email);
    str += addTd(val.name);
    if(val.age == null) val.age ="";
    str += addTd(val.age);
    str += addTd(val.button);
    str +="</tr>";
    console.log(str);
    VT.addEl("#tabl",str);
}

function getUsers(){
    document.getElementById('tabl').innerHTML ="";
    var token = localStorage.getItem('accessToken');
    VT.send('POST','/getAllUser',[token],function (e) {
        console.log(e);
    },function (p) {
        console.log(p);
        if(p.numer == '-1') return loadLogin();
        for(var i = 0; i < p.length; i++) {
            p[i].button = "<button onclick=\"deliteUser('" + p[i].login + "')\">Удалить</button>";
            addTr(p[i])
        };
    });
}

function deliteUser(login) {
    //console.log(login);
    var object = {
        accessToken: localStorage.getItem('accessToken'),
        login: login
    };

    object = JSON.stringify(object);
    VT.send('POST','/deliteUser',[object],function (e) {
        console.log(e);
    },function (p) {
        console.log(p);
        if(p.numer == "-1" || p.numer == "2") {
            console.log(p.description);
            localStorage.clear();
            loadLogin();
            return;
        }
        if(p.numer == "1"){
            console.log(p.description);
            getUsers();
        }
    });
}

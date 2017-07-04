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

    VT.addEl("#tabl",str);
}

function getUsers(){
    document.getElementById('tabl').innerHTML ="";
    var obj = {
        accessToken: localStorage.getItem('accessToken')
    }

    VT.send('POST','/getAllUser',obj,function (e) {
        console.log(e);
    },function (p) {

        if(p.numer == '-1') {
            localStorage.clear();
            loadLogin();
            return;
        }
        {
            for(var i = 0; i < p.length; i++) {
            p[i].button = "<button onclick=\"deliteUser('" + p[i]._id + "','" + p[i].login +"')\">Delete</button>";
            addTr(p[i])
        };}
    });
}

function confirmDelite(login){
    if(confirm("Your confirm delete " + login + "?"))return true;
    else return false;
}

function deliteUser(id,login) {
    //console.log(login);

    if(!confirmDelite(login)) return false;
    var obj = {
        accessToken: localStorage.getItem('accessToken'),
        deleteLogin: id
    };

    VT.send('POST','/deleteUser',obj,function (e) {
        console.log(e);
    },function (p) {
        //console.log(p);
        if(p.numer == "-1" || p.numer == "2") {
            //console.log(p.description);
            localStorage.clear();
            loadLogin(p.description);
            return;
        }else {
            console.log(p);
            deleteTr(login);
        }
    });
}

function deleteTr(login){
    var table = document.getElementById('tabl');
    var trs = table.rows;

    for(var i=0; i<trs.length; i++){
        if(trs[i].cells[0].innerText == login){
            table.deleteRow(i);
            return;
        }
    }
}

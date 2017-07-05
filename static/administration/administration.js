var first = 100;
var second = 750;

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
    openModalWindow("Load user information!");
    document.getElementById('tabl').innerHTML ="";
    var obj = {
        accessToken: localStorage.getItem('accessToken')
    }

    VT.send('POST','/getAllUser',obj,function (e) {
        setTimeout(addProgress,first,50);
        setTimeout(errModal,second);
    },function (p) {

        if(p.numer == '-1') {
            localStorage.clear();
            setTimeout(addProgress,first,50);
            setTimeout(modalTokenError,second, p.description);
            return;
        } else {
            for(var i = 0; i < p.length; i++) {
            p[i].button = "<button onclick=\"deliteUser('" + p[i]._id + "','" + p[i].login +"')\">Delete</button>";
            addTr(p[i])
        };
            setTimeout(addProgress,first,50);
            setTimeout(successModal,second,"Information loaded");
        }
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
    openModalWindow("Delete " + login);
    VT.send('POST','/deleteUser',obj,function (e) {
        setTimeout(addProgress,first,50);
        setTimeout(errModal,second);
        console.log(e);
    },function (p) {
        //console.log(p);
        if(p.numer == "-1" || p.numer == "2") {
            //console.log(p.description);
            setTimeout(addProgress,first,50);
            setTimeout(modalTokenError,second, p.description);
            return;
        }else {
            console.log(p);
            deleteTr(login);
            setTimeout(addProgress,first,50);
            setTimeout(successModal,second, p.description);
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

function task5_1(){
    var homeNames = getHomeNames();
    for(var i = 0; i < homeNames.length; i++){
        task3(homeNames[i],'#task5', i);
    }
}

function addHome() {
    var str = document.getElementById('newHome').value;

    if(validNewHome() == false){
        VT.addClass('#newHome','error-room');
        return;
    }

    VT.removeClass('#newHome','error-room');

    var object = {
        accessToken: localStorage.getItem('accessToken'),
        name: str
    };

    object = JSON.stringify(object);
    VT.send('POST', '/addNewHouse', [object], function (e) {
        console.log(e);
    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
            loadLogin(p.description);
            return;
        } else{
            console.log(p);
            document.getElementById('newHome').value = "";
            loadTask();
        }
    });
}

function getAllHouse() {
    document.getElementById('task5').innerHTML = "";
    var object = {
        accessToken: localStorage.getItem('accessToken')
    };
    object = JSON.stringify(object);
    VT.send('POST', '/getAllHouse', [object], function (e) {
        console.log(e);
    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
            loadLogin(p.description);
            return;
        } else{
            for(var i = 0; i < p.length; i++){
                task3(p[i].name,'#task5', p[i]._id);
            }
            if(p.length == 0) addDisabledHome();
            else removeDisabledHome();
        }
    });
}

function task5_2(){
    var select = document.getElementById('task5');
    var str = getSelectOptions(select);
    if (str == -1) str ="";
    document.getElementById('homeName').value = str;
    console.log(str);
    //input.value = str;
    roomSelector();
    //onRoomChange();
}

function changeHouseName(){
    var select = document.getElementById('task5');
    var id = getSelectOptionsValue(select);

    if(validHomeName() == false){
        VT.addClass('#homeName','error-room');
        return;
    }

    VT.removeClass('#homeName','error-room');

    var obj = {
        accessToken: localStorage.getItem('accessToken'),
        _id:id,
        name: document.getElementById('homeName').value
    };

    obj = JSON.stringify(obj);
    VT.send('POST', '/changeHomeName', [obj], function (e) {
        console.log(e);
    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
            loadLogin(p.description);
            return;
        } else{
            document.getElementById('task5').innerHTML = "";
            loadTask();
        }
    });
}

function deleteHouse() {
    var select = document.getElementById('task5');
    var id = getSelectOptionsValue(select);
    var obj = {
        accessToken: localStorage.getItem('accessToken'),
        _id:id
    };
    obj = JSON.stringify(obj);
    VT.send('POST', '/deleteHouse', [obj], function (e) {
        console.log(e);
    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
            loadLogin(p.description);
            return;
        } else{
            loadTask();
        }
    });
}

function removeErrorRoom(query){
    VT.removeClass(query, "error-room");
}

function validHomeName(){
    var str = document.getElementById('homeName').value;
    str = str.trim();

    if(str != "") return true;
    return false;
}

function getSelectOptions(select) {
    var result = -1;

    for (var i = 0; i < select.options.length; i++) {
        var option = select.options[i];
        if (option.selected) {
            result = option.innerText;
        }
    }
    return result;
}

function getSelectOptionsValue(select) {
    var result = -1;
    for (var i = 0; i < select.options.length; i++) {
        var option = select.options[i];
        if (option.selected) {
            result = option.value;
        }
    }
    return result;
}

function task3(str, query, value){
    var option = '<option value="'+value +'">' + str +'</option>';
    VT.addEl(query,option);
}

function getHomeNames() {
    var homeNames = home.map(function(item){
        return item.homeName;
    });

    return homeNames;
}

function roomSelector(){
    var select = document.getElementById('task5');
    var i = getSelectOptionsValue(select);
    if(i == -1)return;
    var object = {
        accessToken: localStorage.getItem('accessToken'),
        home: i
    };
    object = JSON.stringify(object);
    VT.send('POST', '/getAllRooms', [object], function (e) {
        console.log(e);
    }, function (p) {
        if(p.numer == "-1"){
            localStorage.clear();
            loadLogin(p.description);
            return;
        } else {
            //console.log(p);
            if(p.length == 0) addDisabledRoom();
            else removeDisabledRoom();
            document.getElementById('rooms').innerHTML = "";
            for(var i = 0; i < p.length; i++){
                task3(p[i].name,'#rooms', p[i]._id);
            }
            onRoomChange();
        }
    });
}

function newRoom() {

    var str = document.getElementById('newRoom').value;
    var select = document.getElementById('task5');
    var home = getSelectOptionsValue(select);

    if(validNewRoom() == false){
        VT.addClass('#newRoom','error-room');
        return;
    }

    VT.removeClass('#newRoom','error-room');

    var object = {
        accessToken: localStorage.getItem('accessToken'),
        name: str,
        home:home
    };

    object = JSON.stringify(object);
    VT.send('POST', '/addRoom', [object], function (e) {
        console.log(e);
    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
            loadLogin(p.description);
            return;
        } else{
            console.log(p);
            document.getElementById('newRoom').value = "";
            loadTask();
        }
    });
}

function deleteRoom() {
    var select = document.getElementById('task5');
    var home = getSelectOptionsValue(select);
    select = document.getElementById('rooms');
    var _id = getSelectOptionsValue(select);

    var object = {
        accessToken: localStorage.getItem('accessToken'),
        _id: _id,
        home: home
    };
    console.log(object);

    object = JSON.stringify(object);
    VT.send('POST', '/deleteRoom', [object], function (e) {
        console.log(e);
    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
            loadLogin(p.description);
            return;
        } else{
            roomSelector();
        }
    });

}

function changeRoomName(){

    var str = document.getElementById('roomName').value;
    var select = document.getElementById('task5');
    var home = getSelectOptionsValue(select);
    select = document.getElementById('rooms');
    var _id = getSelectOptionsValue(select);

    if(validRoomName() == false){
        VT.addClass('#roomName','error-room');
        return;
    }

    VT.removeClass('#roomName','error-room');

    var object = {
        accessToken: localStorage.getItem('accessToken'),
        name: str,
        home: home,
        _id: _id
    };

    object = JSON.stringify(object);

    console.log(object);
    VT.send('POST', '/changeNameRoom', [object], function (e) {
        console.log(e);
    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
            loadLogin(p.description);
            return;
        } else{
            document.getElementById('roomName').innerHTML = "";
            roomSelector();
        }
    });
}

function onRoomChange() {
    var select = document.getElementById('rooms');
    var str = getSelectOptions(select);
    if(str == -1) str = "";
    document.getElementById('roomName').value = str;
}

function validRoomName(){
    var str = document.getElementById('roomName').value;
    str = str.trim();

    if(str != "") return true;
    return false;
}

function validNewHome(){
    var str = document.getElementById('newHome').value;
    str = str.trim();

    if(str != "") return true;
    return false;
}

function validNewRoom(){
    var str = document.getElementById('newRoom').value;
    str = str.trim();

    if(str != "") return true;
    return false;
}

function addDisabledHome(){
    VT.setParam('#task5','disabled','disabled');
    VT.setParam('#delHome','disabled','disabled');
    VT.setParam('#homeName','disabled','disabled');
    VT.setParam('#upHome','disabled','disabled');
    VT.setParam('#rooms','disabled','disabled');
    VT.setParam('#roomName','disabled','disabled');
    VT.setParam('#upRoom','disabled','disabled');
    VT.setParam('#newRoom','disabled','disabled');
    VT.setParam('#addRoom','disabled','disabled');
    VT.setParam('#delRoom','disabled','disabled')
}

function removeDisabledHome(){
    VT.removeParam('#task5','disabled');
    VT.removeParam('#delHome','disabled');
    VT.removeParam('#homeName','disabled');
    VT.removeParam('#upHome','disabled');
    VT.removeParam('#rooms','disabled');
    VT.removeParam('#roomName','disabled');
    VT.removeParam('#upRoom','disabled');
    VT.removeParam('#newRoom','disabled');
    VT.removeParam('#addRoom','disabled');
}

function addDisabledRoom() {
    VT.setParam('#rooms','disabled','disabled');
    VT.setParam('#roomName','disabled','disabled');
    VT.setParam('#upRoom','disabled','disabled');
    VT.setParam('#delRoom','disabled','disabled');
}

function removeDisabledRoom() {
    VT.removeParam('#rooms','disabled','disabled');
    VT.removeParam('#roomName','disabled','disabled');
    VT.removeParam('#upRoom','disabled','disabled');
    VT.removeParam('#delRoom','disabled','disabled');
}
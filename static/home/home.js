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
        }
    });
}

function task5_2(){
    var select = document.getElementById('task5');
    var str = getSelectOptions(select);
    document.getElementById('homeName').value = str;
    //input.value = str;
    //roomSelector();
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

function getRoomName(){
    var select = document.getElementById('task5');
    var i = getSelectOptionsValue(select);

    var rooms = home[i].rooms;

    var roomNames = rooms.map(function (item) {
        return item.roomName;
    });

    return roomNames;
}

function roomSelector(){
    document.getElementById('rooms').innerHTML = "";
    var rooms = getRoomName();
    for(var i = 0; i < rooms.length; i++){
        task3(rooms[i],'#rooms', i);
    }
}

function changeRoomName(){
    var select = document.getElementById('task5');
    var id = getSelectOptionsValue(select);
    select = document.getElementById('rooms');
    var id2 = getSelectOptionsValue(select);

    if(validRoomName() == false){
        VT.addClass('#roomName','error-room');
        return;
    }

    VT.removeClass('#roomName','error-room');

    home[id].rooms[id2].roomName = document.getElementById('roomName').value;

    document.getElementById('rooms').innerHTML = "";
    roomSelector();
    onRoomChange();
}

function onRoomChange() {
    var select = document.getElementById('rooms');
    var str = getSelectOptions(select);
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
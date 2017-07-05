function addHome() {

    if(validNewHome() == false){
        VT.addClass('#newHome','error-room');
        return;
    }
    var str = document.getElementById('newHome').value;
    str = str.trim();
    document.getElementById('newHome').value = str;
    //openModalWindow("Information about the house is loaded");
    VT.removeClass('#newHome','error-room');

    var obj = {
        accessToken: localStorage.getItem('accessToken'),
        name: str
    };
    var button = document.getElementById('addHome');
    VT.send('POST', '/addNewHouse', obj, function (e) {
        console.log(e);
        //setTimeout(addProgress,first,50);
        //setTimeout(errModal,second);
        setTimeout(addSpinerGlif,10,button,"Add...");
        setTimeout(addTimesGlif,400,button,"Error");
        setTimeout(removeGlif,1000,button,"Add");

    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
            //setTimeout(addProgress,first,50);
            //setTimeout(modalTokenError,second, p.description);
            //loadLogin(p.description);
            return;
        } else{
            //setTimeout(addProgress,first,50);
            console.log(p);
            document.getElementById('newHome').value = "";
            task3(p.name, "#task5",p._id);
            //loadTask();
            //setTimeout(successModal,second,"House added");
            setTimeout(addSpinerGlif,10,button,"Add...");
            setTimeout(addCheckGlif,400,button,"Success!");
            setTimeout(removeGlif,1000,button,"Add");
            removeDisabledHome();
            addDisabledRoom();
            task5_2();
        }
    });
}



function loadHomes(){
    if(!localStorage.getItem('accessToken')){
        loadLogin();
        return;
    }
    var obj = {
        accessToken: localStorage.getItem('accessToken')
    };

    location.has = "#home";
    navigation("#nav-home");
    var content = document.getElementById('content');
    content.innerHTML = "";
    VT.send('POST','getHouses',obj,function (p) {
        console.log(p);
        localStorage.clear();
        loadLogin(p.description);
        return;
    },function (p) {
        if(!p.numer) {
            content.innerHTML += p;
            window.setTimeout(loadTask,100);
        }
        else {
            console.log(p);
            localStorage.clear();
            loadLogin(p.description);
            return;
        }
    });

}

function getAllHouse() {
    //openModalWindow("Loading houses and rooms information");
    document.getElementById('task5').innerHTML = "";
    var obj = {
        accessToken: localStorage.getItem('accessToken')
    };
    VT.send('POST', '/getAllHouse', obj, function (e) {
        console.log(e);
      //  setTimeout(addProgress,first,50);
      //  setTimeout(modalError,second,50);

    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
        //    setTimeout(addProgress,first,50);
          //  setTimeout(modalTokenError,second,p.description);
            loadLogin(p.description);
            return;
        } else{
            for(var i = 0; i < p.length; i++){
                task3(p[i].name,'#task5', p[i]._id);
            }
            if(p.length == 0) addDisabledHome();
            else removeDisabledHome();

            //setTimeout(addProgress,first,50);
            //setTimeout(successModal,second,"Information uploaded");
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
    setTimeout(roomSelector,20);
    //onRoomChange();
}

function changeHouseName(){
    var select = document.getElementById('task5');
    var id = getSelectOptionsValue(select);

    if(validHomeName() == false){
        VT.addClass('#homeName','error-room');
        return;
    }

    var str = document.getElementById('homeName').value;
    str = str.trim();

    VT.removeClass('#homeName','error-room');
    //openModalWindow("Change name...");
    var obj = {
        accessToken: localStorage.getItem('accessToken'),
        _id:id,
        name: str
    };



    var button = document.getElementById('upHome');
    VT.send('POST', '/changeHomeName', obj, function (e) {
        console.log(e);
        setTimeout(addSpinerGlif,10,button,"Change...");
        setTimeout(addTimesGlif,400,button,"Error");
        setTimeout(removeGlif,1000,button,"Change");
        //setTimeout(addProgress,first,50);
        //setTimeout(modalError,second);
    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
            //loadLogin(p.description);
            //setTimeout(addProgress,first,50);
            //setTimeout(modalTokenError,second,p.description);
            return;
        } else{
            //document.getElementById('task5').innerHTML = "";
            document.getElementById('homeName').value = str;
            changeOptions(select,obj.name,obj._id);
            //setTimeout(disableOnHouse,10);
            setTimeout(addSpinerGlif,10,button,"Change...");
            setTimeout(addCheckGlif,400,button,"Success!");
            setTimeout(removeGlif,1000,button,"Change");
            //setTimeout(unDisableOnHouse,600);
            //setTimeout(addProgress,first,50);
            //setTimeout(successModal,second,"Name changed!");
            //loadTask();
        }
    });
}

function deleteHouse() {
    //openModalWindow("Delete house...");
    var select = document.getElementById('task5');
    var id = getSelectOptionsValue(select);
    var obj = {
        accessToken: localStorage.getItem('accessToken'),
        _id:id
    };
    var button = document.getElementById('delHome');
    VT.send('POST', '/deleteHouse', obj, function (e) {
        console.log(e);
        //setTimeout(addProgress,first,50);
        //setTimeout(modalError,second,e);
        setTimeout(addSpinerGlif,10,button,"Deletion...");
        setTimeout(addTimesGlif,400,button,"Error");
        setTimeout(removeGlif,1000,button,"Delete");
    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
            loadLogin(p.description);
;
            return;
        } else{
            console.log(p);
            deleteOption(select,obj._id);
            setTimeout(disableOnHouse,10);
            setTimeout(addSpinerGlif,10,button,"Deletion...");
            setTimeout(addCheckGlif,400,button,"Success!");
            setTimeout(removeGlif,1000,button,"Delete");

            if(select.length == 0){
                resetRoom();
                document.getElementById('homeName').value ="";
            } else {
                setTimeout(unDisableOnHouse,600);
                setTimeout(task5_2,600);
                //task5_2();
            }
            //setTimeout(addProgress,first,50);

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

function changeOptions(select,str,_id){
    for(var i = 0; i < select.length; i++){
        var option = select.options[i];
        if(option.value == _id) {option.innerHTML = str; return;}
    }
}

function deleteOption(select,_id) {
    for(var i = 0; i < select.length; i++){
        var option = select.options[i];
        if(option.value == _id) {option.remove(); return;}
    }
}


function task3(str, query, value){
    // var option = '<option value="'+value +'">' + str +'</option>';
    var opt = document.createElement('option');
    VT.setParam(opt,'value',value);
    VT.updateEl(opt,str);
    var sel = VT.getEl(query);
    sel.appendChild(opt);
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

    VT.send('POST', '/getAllRooms', object, function (e) {
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

    str = str.trim();
    //openModalWindow("Information about the room is loaded");
    VT.removeClass('#newRoom','error-room');

    var object = {
        accessToken: localStorage.getItem('accessToken'),
        name: str,
        home:home
    };

    var button = document.getElementById('addRoom');
    VT.send('POST', '/addRoom', object, function (e) {
        console.log(e);
        setTimeout(addSpinerGlif,10,button,"Add...");
        setTimeout(addTimesGlif,400,button,"Error");
        setTimeout(removeGlif,1000,button,"Add");
    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
            loadLogin(p.description)
            return;
        } else{
            //console.log(p);
            document.getElementById('newRoom').value = "";
            task3(p.name, "#rooms",p._id);
            //loadTask();
            removeDisabledRoom();
            onRoomChange();
            setTimeout(addSpinerGlif,10,button,"Add...");
            setTimeout(addCheckGlif,400,button,"Success!");
            setTimeout(removeGlif,1000,button,"Add");
            //setTimeout(addProgress,first,50);
            //setTimeout(successModal,second,"Room added!");
        }
    });
}

function deleteRoom() {

    var select = document.getElementById('task5');
    var home = getSelectOptionsValue(select);
    select = document.getElementById('rooms');
    var _id = getSelectOptionsValue(select);

    var obj= {
        accessToken: localStorage.getItem('accessToken'),
        _id: _id,
        home: home
    };

    var button = document.getElementById('delRoom');

    VT.send('POST', '/deleteRoom', obj, function (e) {
        console.log(e);

        setTimeout(addSpinerGlif,10,button,"Delete...");
        setTimeout(addTimesGlif,400,button,"Error");
        setTimeout(removeGlif,1000,button,"Delete");
    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
          //  setTimeout(addProgress,first,50);
            //setTimeout(modalTokenError,second, p.description);
            loadLogin(p.description);
            return;
        } else{
            //roomSelector();
            deleteOption(select,obj._id);
            if(select.length == 0){addDisabledRoom();}
            onRoomChange();

            setTimeout(addSpinerGlif,10,button,"Delete...");
            setTimeout(addCheckGlif,400,button,"Success!");
            setTimeout(removeGlif,1000,button,"Delete");
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
    str = str.trim();
    var obj = {
        accessToken: localStorage.getItem('accessToken'),
        name: str,
        home: home,
        _id: _id
    };
    var button = document.getElementById('upRoom');
    VT.send('POST', '/changeNameRoom', obj, function (e) {
        console.log(e);

    }, function (p) {
        if(p.numer == "-1") {
            console.log(p);
            localStorage.clear();
            loadLogin(p.description);
            return;
        } else{
            document.getElementById('roomName').innerHTML = "";
            changeOptions(select,obj.name,obj._id);
            document.getElementById('roomName').value = str;
            //roomSelector();
            setTimeout(addSpinerGlif,10,button,"Change...");
            setTimeout(addCheckGlif,400,button,"Success!");
            setTimeout(removeGlif,1000,button,"Change");
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

function resetRoom(){
    document.getElementById('rooms').innerHTML="";
    document.getElementById('roomName').value="";
}

function disableOnHouse(){
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

function unDisableOnHouse() {
    VT.removeParam('#task5','disabled');
    VT.removeParam('#delHome','disabled');
    VT.removeParam('#homeName','disabled');
    VT.removeParam('#upHome','disabled');
    VT.removeParam('#rooms','disabled');
    VT.removeParam('#roomName','disabled');
    VT.removeParam('#upRoom','disabled');
    VT.removeParam('#newRoom','disabled');
    VT.removeParam('#addRoom','disabled');
    VT.removeParam('#delRoom','disabled','disabled')
}
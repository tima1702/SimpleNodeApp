//дома
var home =
    [{
        "_id": "58873bae28f4bf912185591b",
        "id": "TEST_HOME2",
        "rooms": [{
            "accessories": [{
                "accessoryName": "second accessory",
                "id": "6C8057F6-7021-519B-B65A-88391D2285CE",
                "services": [{
                    "characteristics": [{
                        "accessType": "readable",
                        "id": "FC3B211D-B9B1-5AA2-8A64-FAB52936EC1B",
                        "characteristicName": "Name [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Lock Management 0F"
                    }, {
                        "accessType": "writable",
                        "id": "3BB2AC59-1029-5C06-885E-29E5ED3F78BD",
                        "characteristicName": "Lock Management Control Point [Write Only]",
                        "characteristicValue": "No value"
                    }, {
                        "accessType": "readable",
                        "id": "0F44E0C8-2A77-53CB-BA94-1E9C87F86DF5",
                        "characteristicName": "Version [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": ""
                    }, {
                        "accessType": "readable",
                        "id": "C8BF59AC-2978-5BDE-80A6-CE131D67403D",
                        "characteristicName": "Logs [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "<000100>"
                    }, {
                        "potential_status": "Need to IOS confirmation",
                        "potential_value": "No",
                        "accessType": "writable&readable",
                        "id": "66E7F17E-5A84-55BC-9003-0E014F9CFA92",
                        "characteristicName": "Audio Feedback",
                        "characteristicType": "isBoolean",
                        "characteristicValue": "No"
                    }, {
                        "accessType": "writable&readable",
                        "id": "8D023848-EF9A-5C45-8652-42ED7F99DD45",
                        "characteristicName": "Lock Management Auto Security Timeout",
                        "characteristicType": "isNumeric",
                        "characteristicValue": 49578,
                        "maximumValue": 86400
                    }, {
                        "accessType": "writable&readable",
                        "id": "5ABCF592-D77F-54ED-82D6-BE817CE41EC4",
                        "characteristicName": "Administrator Only Access",
                        "characteristicType": "isBoolean",
                        "characteristicValue": "No"
                    }, {
                        "accessType": "readable",
                        "id": "FECB1CA0-68DE-5F2C-BF3C-9070600BF8E8",
                        "characteristicName": "Lock Mechanism Last Known Action [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Interior Secured",
                        "maximumValue": 8
                    }, {
                        "accessType": "readable",
                        "id": "C0DCA812-DC7B-5528-8BFF-DDC78EC3896F",
                        "characteristicName": "Current Door State [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Open",
                        "maximumValue": 4
                    }, {
                        "accessType": "readable",
                        "id": "ACB10BA9-DACE-5939-9B67-776E97A6E085",
                        "characteristicName": "Motion Detected [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "No"
                    }], "id": "A9ED3DBF-4DE2-536B-B5E5-316A645E1281", "serviceName": "Lock Management 0F"
                }]
            }], "id": "1AE2A26F-EA5D-5E21-B0CB-F29663E33172", "roomName": "Rom1"
        }, {
            "accessories": [{
                "potential_status": "Need to IOS confirmation",
                "potential_value": "asda2",
                "services": [],
                "id": "fd98af77-34e6-cf1a-27b9-e0784e7d2577",
                "accessoryName": "asda"
            }], "id": "5e168e5d-b3d8-7dfa-aee6-2d7ca3662657", "roomName": "r2"
        }],
        "updateBy": "58749290b63a88a048c327ce",
        "OwnedBy": "58749290b63a88a048c327ce",
        "__v": 0,
        "Createdate": "2017-01-24T11:34:06.863Z",
        "last_update": "2017-01-27T12:04:06.172Z",
        "homeName": "Test3",
        "potential_status": "Confirmed"
    }, {
        "_id": "58873bae28f4bf912185591a",
        "id": "TEST HOME 1",
        "rooms": [{
            "accessories": [{
                "accessoryName": "My Accessory",
                "id": "7B63C138-D52B-552E-8824-975436F9BEC8",
                "services": [{
                    "id": "8F10D9EB-8527-5C06-9D3D-90620B5B8BA6",
                    "serviceName": "GL100",
                    "characteristics": [{
                        "potential_status": "Confirmed",
                        "id": "082C3485-1378-595C-A97F-90E9F5B62099",
                        "accessType": "readable",
                        "characteristicName": "Lock Mechanism Current State (Read Only)",
                        "maximumValue": "3",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Secured"
                    }, {
                        "potential_value": 1,
                        "potential_status": "Need to IOS confirmation",
                        "id": "EBC5D0C7-C970-5951-85DD-C940B26499A8",
                        "accessType": "writable&readable",
                        "characteristicName": "Lock Mechanism Target State",
                        "maximumValue": "1",
                        "characteristicType": "hasPredeterminedValueDescriptions",
                        "characteristicValue": 0
                    }, {
                        "id": "2A390E83-657E-596C-874F-5C43EA87103C",
                        "accessType": "readable",
                        "characteristicName": "Name (Read Only)",
                        "characteristicType": "isLabel",
                        "characteristicValue": "lock_mechanism"
                    }]
                }, {
                    "characteristics": [{
                        "accessType": "readable",
                        "id": "C9EE8868-9825-5E9D-AAF0-6F5CE3B83CFF",
                        "characteristicName": "Name (Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Lock Management 90"
                    }, {
                        "accessType": "writable",
                        "id": "0136EF08-7D67-5774-B967-9B39148A3BD9",
                        "characteristicName": "Lock Management Control Point (Write Only]",
                        "characteristicValue": "No value"
                    }, {
                        "potential_status": "Need to IOS confirmation",
                        "potential_value": "Secured",
                        "id": "E3B2CAC7-50D0-5B57-A44D-4BAC8602F1EA",
                        "accessType": "writable&readable",
                        "characteristicName": "Lock Mechanism Target State",
                        "maximumValue": "1",
                        "characteristicType": "hasPredeterminedValueDescriptions",
                        "characteristicValue": "Secured"
                    }, {
                        "accessType": "readable",
                        "id": "47A68481-E76B-5EF6-B444-4E39D2979690",
                        "characteristicName": "Version [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": ""
                    }, {
                        "accessType": "readable",
                        "id": "A9E25292-1FA7-56DA-86F7-1BBA5CD02961",
                        "characteristicName": "Logs [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "<000100>"
                    }, {
                        "accessType": "writable&readable",
                        "id": "8022B31C-6555-5FCA-A747-EC0ED7CDDBF9",
                        "characteristicName": "Audio Feedback",
                        "characteristicType": " ",
                        "characteristicValue": "No"
                    }, {
                        "accessType": "writable&readable",
                        "id": "0E94735D-C2F3-56B7-ADB0-B69B77E966E0",
                        "characteristicName": "Lock Management Auto Security Timeout",
                        "characteristicType": "isNumeric",
                        "characteristicValue": 50182,
                        "maximumValue": 86400
                    }, {
                        "potential_status": "Need to IOS confirmation",
                        "potential_value": "Yes",
                        "accessType": "writable&readable",
                        "id": "977C3E7E-4D09-596F-9303-ECCE614532BB",
                        "characteristicName": "Administrator Only Access",
                        "characteristicType": "isBoolean",
                        "characteristicValue": "Yes"
                    }, {
                        "accessType": "readable",
                        "id": "AAC1773D-CDCD-592E-A113-A393169CA03A",
                        "characteristicName": "Lock Mechanism Last Known Action (Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Interior Secured",
                        "maximumValue": 8
                    }, {
                        "accessType": "readable",
                        "id": "417DB275-B05E-5D0F-AF26-83DD834747EB",
                        "characteristicName": "Current Door State (Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Open",
                        "maximumValue": 4
                    }, {
                        "accessType": "readable",
                        "id": "EC276130-A71E-5F34-AE61-E018F417A395",
                        "characteristicName": "Motion Detected (Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "No"
                    }], "id": "3440B460-77F3-55DB-9DAC-DB94A034F5FE", "serviceName": "Lock Management 90"
                }]
            }, {"services": [], "id": "7b146e68-028c-7e88-8f23-35d9a09f8d22", "accessoryName": "MyAcs"}],
            "id": "CC7C929D-D0AE-5939-AD7E-02AC059F556C",
            "roomName": "Room"
        }, {
            "accessories": [{
                "services": [],
                "id": "e4e23ad6-0aec-4998-3251-d90ddf6d0a8c",
                "accessoryName": "acs"
            }, {
                "services": [],
                "id": "44e6b532-9a70-2df9-017b-51800568d91c",
                "accessoryName": "csasd"
            }, {"services": [], "id": "17cbf126-08df-0c2a-b87d-770e2ec51767", "accessoryName": "adcas"}],
            "id": "5db61831-e4d6-de9b-478e-d0429c0b4805",
            "roomName": "My Rooom"
        }],
        "updateBy": "58749290b63a88a048c327ce",
        "OwnedBy": "58749290b63a88a048c327ce",
        "__v": 0,
        "Createdate": "2017-01-24T11:34:06.862Z",
        "last_update": "2017-01-27T12:03:53.698Z",
        "homeName": "New TEST",
        "potential_status": "Confirmed"
    }, {
        "_id": "588755f714927e0d38856405",
        "id": "TEST HOME 3",
        "rooms": [{
            "accessories": [{
                "accessoryName": "My Accessory",
                "id": "7B63C138-D52B-552E-8824-975436F9BEC8",
                "services": [{
                    "id": "8F10D9EB-8527-5C06-9D3D-90620B5B8BA6",
                    "serviceName": "GL100",
                    "characteristics": [{
                        "potential_status": "Confirmed",
                        "id": "082C3485-1378-595C-A97F-90E9F5B62099",
                        "accessType": "readable",
                        "characteristicName": "Lock Mechanism Current State (Read Only)",
                        "maximumValue": "3",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Secured"
                    }, {
                        "potential_status": "Confirmed",
                        "id": "EBC5D0C7-C970-5951-85DD-C940B26499A8",
                        "accessType": "writable&readable",
                        "characteristicName": "Lock Mechanism Target State",
                        "maximumValue": "1",
                        "characteristicType": "hasPredeterminedValueDescriptions",
                        "characteristicValue": 0
                    }, {
                        "id": "2A390E83-657E-596C-874F-5C43EA87103C",
                        "accessType": "readable",
                        "characteristicName": "Name (Read Only)",
                        "characteristicType": "isLabel",
                        "characteristicValue": "lock_mechanism"
                    }]
                }, {
                    "characteristics": [{
                        "accessType": "readable",
                        "id": "C9EE8868-9825-5E9D-AAF0-6F5CE3B83CFF",
                        "characteristicName": "Name (Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Lock Management 90"
                    }, {
                        "accessType": "writable",
                        "id": "0136EF08-7D67-5774-B967-9B39148A3BD9",
                        "characteristicName": "Lock Management Control Point (Write Only]",
                        "characteristicValue": "No value"
                    }, {
                        "potential_status": "Need to IOS confirmation",
                        "potential_value": "Secured",
                        "id": "E3B2CAC7-50D0-5B57-A44D-4BAC8602F1EA",
                        "accessType": "writable&readable",
                        "characteristicName": "Lock Mechanism Target State",
                        "maximumValue": "1",
                        "characteristicType": "hasPredeterminedValueDescriptions",
                        "characteristicValue": "Secured"
                    }, {
                        "accessType": "readable",
                        "id": "47A68481-E76B-5EF6-B444-4E39D2979690",
                        "characteristicName": "Version [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": ""
                    }, {
                        "accessType": "readable",
                        "id": "A9E25292-1FA7-56DA-86F7-1BBA5CD02961",
                        "characteristicName": "Logs [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "<000100>"
                    }, {
                        "accessType": "writable&readable",
                        "id": "8022B31C-6555-5FCA-A747-EC0ED7CDDBF9",
                        "characteristicName": "Audio Feedback",
                        "characteristicType": " ",
                        "characteristicValue": "No"
                    }, {
                        "accessType": "writable&readable",
                        "id": "0E94735D-C2F3-56B7-ADB0-B69B77E966E0",
                        "characteristicName": "Lock Management Auto Security Timeout",
                        "characteristicType": "isNumeric",
                        "characteristicValue": 50182,
                        "maximumValue": 86400
                    }, {
                        "potential_status": "Need to IOS confirmation",
                        "potential_value": "No",
                        "accessType": "writable&readable",
                        "id": "977C3E7E-4D09-596F-9303-ECCE614532BB",
                        "characteristicName": "Administrator Only Access",
                        "characteristicType": "isBoolean",
                        "characteristicValue": "Yes"
                    }, {
                        "accessType": "readable",
                        "id": "AAC1773D-CDCD-592E-A113-A393169CA03A",
                        "characteristicName": "Lock Mechanism Last Known Action (Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Interior Secured",
                        "maximumValue": 8
                    }, {
                        "accessType": "readable",
                        "id": "417DB275-B05E-5D0F-AF26-83DD834747EB",
                        "characteristicName": "Current Door State (Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Open",
                        "maximumValue": 4
                    }, {
                        "accessType": "readable",
                        "id": "EC276130-A71E-5F34-AE61-E018F417A395",
                        "characteristicName": "Motion Detected (Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "No"
                    }], "id": "3440B460-77F3-55DB-9DAC-DB94A034F5FE", "serviceName": "Lock Management 90"
                }]
            }], "id": "CC7C929D-D0AE-5939-AD7E-02AC059F556C", "roomName": "Room"
        }],
        "updateBy": "58749290b63a88a048c327ce",
        "OwnedBy": "58749290b63a88a048c327ce",
        "__v": 0,
        "Createdate": "2017-01-24T13:26:15.222Z",
        "last_update": "2017-01-24T13:26:11.066Z",
        "homeName": "New TEST",
        "potential_status": "Confirmed"
    }, {
        "_id": "588755f714927e0d38856406",
        "id": "TEST_HOME4",
        "rooms": [{
            "accessories": [{
                "accessoryName": "second accessory",
                "id": "6C8057F6-7021-519B-B65A-88391D2285CE",
                "services": [{
                    "characteristics": [{
                        "accessType": "readable",
                        "id": "FC3B211D-B9B1-5AA2-8A64-FAB52936EC1B",
                        "characteristicName": "Name [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Lock Management 0F"
                    }, {
                        "accessType": "writable",
                        "id": "3BB2AC59-1029-5C06-885E-29E5ED3F78BD",
                        "characteristicName": "Lock Management Control Point [Write Only]",
                        "characteristicValue": "No value"
                    }, {
                        "accessType": "readable",
                        "id": "0F44E0C8-2A77-53CB-BA94-1E9C87F86DF5",
                        "characteristicName": "Version [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": ""
                    }, {
                        "accessType": "readable",
                        "id": "C8BF59AC-2978-5BDE-80A6-CE131D67403D",
                        "characteristicName": "Logs [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "<000100>"
                    }, {
                        "potential_status": "Confirmed",
                        "potential_value": "No",
                        "accessType": "writable&readable",
                        "id": "66E7F17E-5A84-55BC-9003-0E014F9CFA92",
                        "characteristicName": "Audio Feedback",
                        "characteristicType": "isBoolean",
                        "characteristicValue": "Yes"
                    }, {
                        "accessType": "writable&readable",
                        "id": "8D023848-EF9A-5C45-8652-42ED7F99DD45",
                        "characteristicName": "Lock Management Auto Security Timeout",
                        "characteristicType": "isNumeric",
                        "characteristicValue": 49578,
                        "maximumValue": 86400
                    }, {
                        "accessType": "writable&readable",
                        "id": "5ABCF592-D77F-54ED-82D6-BE817CE41EC4",
                        "characteristicName": "Administrator Only Access",
                        "characteristicType": "isBoolean",
                        "characteristicValue": "No"
                    }, {
                        "accessType": "readable",
                        "id": "FECB1CA0-68DE-5F2C-BF3C-9070600BF8E8",
                        "characteristicName": "Lock Mechanism Last Known Action [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Interior Secured",
                        "maximumValue": 8
                    }, {
                        "accessType": "readable",
                        "id": "C0DCA812-DC7B-5528-8BFF-DDC78EC3896F",
                        "characteristicName": "Current Door State [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "Open",
                        "maximumValue": 4
                    }, {
                        "accessType": "readable",
                        "id": "ACB10BA9-DACE-5939-9B67-776E97A6E085",
                        "characteristicName": "Motion Detected [Read Only]",
                        "characteristicType": "isLabel",
                        "characteristicValue": "No"
                    }], "id": "A9ED3DBF-4DE2-536B-B5E5-316A645E1281", "serviceName": "Lock Management 0F"
                }]
            }, {
                "services": [],
                "id": "6624f2ab-2393-bded-739f-5c92d28b9331",
                "accessoryName": "asdfasdf"
            }, {"services": [], "id": "e15bcb79-c1fd-c0b0-20fe-d627b7d57670", "accessoryName": "opopopop"}],
            "id": "1AE2A26F-EA5D-5E21-B0CB-F29663E33172",
            "roomName": "Rom1"
        }],
        "updateBy": "58749290b63a88a048c327ce",
        "OwnedBy": "58749290b63a88a048c327ce",
        "__v": 0,
        "Createdate": "2017-01-24T13:26:15.223Z",
        "last_update": "2017-01-27T12:04:22.394Z",
        "homeName": "Test3",
        "potential_status": "Confirmed"
    }];


function task5_1(){
    var homeNames = getHomeNames();
    for(var i = 0; i < homeNames.length; i++){
        task3(homeNames[i],'#task5', i);
    }
}
function task5_2(){
    var select = document.getElementById('task5');
    var str = getSelectOptions(select);
    document.getElementById('homeName').value = str;
    //input.value = str;
    roomSelector();
    onRoomChange();
}

function task5_3(){
    var select = document.getElementById('task5');
    var id = getSelectOptionsValue(select);
    if(validHomeName() == false){
        VT.addClass('#homeName','error-room');
        return;
    }

    VT.removeClass('#homeName','error-room');

    home[id].homeName = document.getElementById('homeName').value;

    document.getElementById('task5').innerHTML = "";
    task5_1();
    task5_2();
    roomSelector();
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
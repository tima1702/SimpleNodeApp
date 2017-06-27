///---------------------------vanilla tools -----------------//


var VT = (function () {
    function getEl(query) {
        if (typeof query === 'string') {
            query = document.querySelector(query)
        }
        if (!query) {
            return null;
        }
        return query
    }
    function getAllEl(query) {
        return document.querySelectorAll(query)
    }

    function getHTML(el) {
        if (typeof el === 'string') {
            el = document.querySelector(el)
        }
        if (!el) {
            return null;
        }
        return el.innerHTML;
    }

    function isDefined(v){
        if (typeof v === 'undefined' || v === null)
            return false;
        else
            return true;
    }


    function uuidGenerator() {
        var S4 = function() {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        };
        return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
    }

    function showModal(query, body){
        var el = getEl(query);
        if(el){
            if(body){
                el.innerHTML = body;
            }
            addClass(el,'in');
            addClass('body','modal-open');
        }
        else{
            return false;
        }
    }


    function closeModal(query){
        var el = getEl(query);
        if(el){
            var el_error = getAllEl('input.error');
            el_error && [].forEach.call(el_error,function(item){
                removeClass(item, 'error');
            });
            removeClass(el,'in');
            removeClass('body','modal-open');
        }
        else{
            return false;
        }
    }

    function modalCloseHandler(e){
        var parents = getParent(e);
        parents.forEach(function(node){
            if(node.classList && node.classList.contains('modal')){
                closeModal(node);
            }
        })
    }

// Use a closure to prevent the global namespace from be
// polluted.
    (function() {
        // Define StopIteration as part of the global scope if it
        // isn't already defined.
        if(typeof StopIteration == "undefined") {
            StopIteration = new Error("StopIteration");
        }

        // The original version of Array.prototype.forEach.
        var oldForEach = Array.prototype.forEach;

        // If forEach actually exists, define forEach so you can
        // break out of it by throwing StopIteration.  Allow
        // other errors will be thrown as normal.
        if(oldForEach) {
            Array.prototype.forEach = function() {
                try {
                    oldForEach.apply(this, [].slice.call(arguments, 0));
                }
                catch(e) {
                    if(e !== StopIteration) {
                        throw e;
                    }
                }
            };
        }
    })();

    function getParent(node) {
        var nodes = [node];
        while (node.parentNode) {
            node = node.parentNode;
            nodes.push(node);
        }
        return nodes;
    }

    function getValue(el) {
        if (typeof el === 'string') {
            el = document.querySelector(el)
        }
        if (!el) {
            return null;
        }
        return el.type == "checkbox" ? el.checked : el.value || '';
    }

    function getParam(el,param) {
        if(!param) return '';
        if (typeof el === 'string') {
            el = document.querySelector(el)
        }
        if (!el) {
            return null;
        }  return el.getAttribute(param) || '';
    }

    function setParam(el,param,val) {
        if(!param) return '';
        if (typeof el === 'string') {
            el = document.querySelector(el)
        }
        if (!el) {
            return null;
        }  return el.setAttribute(param,val) || '';
    }

    function removeParam(el,param,val) {
        if(!param) return '';
        if (typeof el === 'string') {
            el = document.querySelector(el)
        }
        if (!el) {
            return null;
        }  return el.removeAttribute(param) || '';
    }

    function setValue(el,value) {
        if (typeof el === 'string') {
            el = document.querySelector(el)
        }
        if (!el) {
            return null;
        }
        el.value  = value || '';
        return true;
    }

    function el_class_act(query, className, action) {
        if (!action) return false;
        var el = getEl(query);
        if (el) {
            el.classList[action](className);
            return true;
        }
        else {
            return false;
        }
    }

    function addClass(query, className) {
        return el_class_act(query, className, 'add');
    }

    function removeClass(query, className) {
        return el_class_act(query, className, 'remove');
    }

    function hideEl(query) {
        return addClass(query, "hidden");
    }

    function showEl(query) {
        return removeClass(query, "hidden")
    }

    function updateEl(el, html) {
        if (typeof el === 'string') {
            el = document.querySelector(el)
        }
        if (!el) {
            return null;
        }

        el.innerHTML = html;
    }

    function addEl(parentEl, html, first) {
        if (typeof parentEl === 'string') {
            parentEl = document.querySelector(parentEl)
        }
        if (!parentEl) {
            return null;
        }
        if (!!first)
            parentEl.innerHTML = html + parentEl.innerHTML;
        else
            parentEl.innerHTML += html;
    }

    function ccb(data, cb) {
        if (typeof cb == "function") {
            cb(data);
        }
        else if (cb) {
            cb = data;
        }
    }

    function extendEl(el, html) {
        if (typeof el === 'string') {
            el = document.querySelector(el)
        }
        if (!el) {
            return null;
        }

        el.innerHTML = el.innerHTML && el.innerHTML.replace(/sfade/gi,'') || '';
        el.innerHTML += html;
    }

    function send(method, url, params, ecb, scb) {
        if (!method || !url) ecb({error: "no params"});
        params = params ? JSON.stringify(params) : null;
        method = method.toUpperCase();

        if(method == "GET" && params)
            if(url.indexOf('?') >-1)
                url += "&" + obj_to_query_str(params);
            else
                url += '?' + obj_to_query_str(params);

        var xhr = new XMLHttpRequest();


        xhr.open(method, url, true);
        xhr.setRequestHeader('Accept', 'application/json, text/plain, */*');
        xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');


        xhr.onreadystatechange = function () {
            var DONE = 4; // readyState 4 means the request is done.
            var OK = 200; // status 200 is a successful return.
            if (xhr.readyState === DONE) {
                if (xhr.status === OK) {
                    return scb(fromJSON(xhr.responseText));
                }
                else {
                    return ecb(xhr.status,fromJSON(xhr.responseText));
                }
            }
        };
        xhr.send(params);
    }

    function copy(item) {
        if (!item) return {};
        try {
            var _copy = JSON.parse(JSON.stringify(item));
            return _copy;
        }
        catch (e) {
            return {};
        }
    }

    var fromJSON = function (item, strict) {
        if (!item) return null;
        try {
            return JSON.parse(item);
        }
        catch (e) {
            return strict ? null : item;
        }
    };

    var getLoadingHTML = function (w, h, marginTop, marginBottom) {
        marginTop = parseInt(marginTop) || false;
        marginBottom = parseInt(marginBottom) || false;
        w = parseInt(w) || false;
        h = parseInt(h) || false;
        var mTop = ' ' + (marginTop ? 'margin-top: ' + marginTop + 'px; ' : ' margin-top: 0px;');
        var mBottom = ' ' + (marginBottom ? ' margin-bottom: ' + marginBottom + 'px; ' : ' margin-bottom: 0px;');
        var mw = ' ' + (w ? ' width: ' + w + 'px; ' : ' ');
        var mh = ' ' + (w ? ' height: ' + w + 'px; ' : ' ');
        var style = mw + mh + mTop + mBottom;
        var a = '<div class="sk-circle"' +
            'style="'
            + style + '">' +
            '<div class="sk-circle1 sk-child"></div>' +
            '<div class="sk-circle2 sk-child"></div>' +
            '<div class="sk-circle3 sk-child"></div>' +
            '<div class="sk-circle4 sk-child"></div>' +
            '<div class="sk-circle5 sk-child"></div>' +
            '<div class="sk-circle6 sk-child"></div>' +
            '<div class="sk-circle7 sk-child"></div>' +
            '<div class="sk-circle8 sk-child"></div>' +
            '<div class="sk-circle9 sk-child"></div>' +
            '<div class="sk-circle10 sk-child"></div>' +
            '<div class="sk-circle11 sk-child"></div>' +
            '<div class="sk-circle12 sk-child"></div>' +
            '</div>';
        return a;
    };

    var show_loading = function (loading_el_query, hide_el_query) {
        var loading = document.querySelector(loading_el_query + " > loading");
        if (loading) {
            loading.innerHTML = getLoadingHTML(loading.getAttribute('w'),
                loading.getAttribute('h'),
                loading.getAttribute('marginTop'),
                loading.getAttribute('marginBottom'));
            showEl(loading_el_query);
            hideEl(hide_el_query);
        }
    };

    var hide_loading = function (loading_el_query, show_el_query) {
        hideEl(loading_el_query);
        showEl(show_el_query);
    };

    var getSwitchHtml = function (id, name,checked,click,params,disabled) {
        var a = '<div class="switch-field" data-id="' + id + '" ' + params + ' >' +
            '<input ' + (disabled ? 'disabled' : '') + ' onclick="' + click + '" type="radio" id="'+ id +  '_on" name="' + id+name + '" value="yes" ' + (checked ? 'checked':'') + '/>' +
            '<label for="'+ id +  '_on" class="on">On</label>' +
            '<input  ' + (disabled ? 'disabled' : '') + ' onclick="' + click + '" type="radio" id="'+ id +  '_off" name="' + id+name + '" value="no" ' + (!checked ? 'checked':'') + ' />' +
            '<label for="'+ id +  '_off" class="off">Off</label>' +
            '</div>'
        return a
    };

    var obj_forEach = function(obj,cb){
        for(var index in obj) {
            cb(obj[index],index)
        }
    };

    var findWhere = function(arr,source){
        if(!(arr && arr.length && source)){
            return {};
        }
        var id = findIndex(arr,source);
        if(id > -1){
            return copy(arr[id]);
        }
        return {};
    };


    var findIndex = function(arr,source){
        var res = -1;
        arr.forEach(function(item,index){
            var found = true;
            obj_forEach(source,function(val,key){
                if(item[key] != val){
                    found = false;
                }
            });
            if(found && res == -1){
                res = index;
            }
        });
        return res;
    };

    function isArray(v){
        return  Object.prototype.toString.call(v) === '[object Array]';
    }

    function isEqual(arr1,arr2){
        if(!(isArray(arr1) && isArray(arr2))){
            return false;
        }
        return JSON.stringify(arr1) == JSON.stringify(arr2);
    }


    function isNumber(v){
        return  /^\d+$/.test(v);
    }


    var toCapitalize = function(item){
        if (!item) return '';
        return item.replace(item[0],item[0].toUpperCase());
    };

    return {
        isNumber:isNumber,
        isDefined:isDefined,
        isArray:isArray,
        isEqual:isEqual,
        toCapitalize:toCapitalize,
        uuidGenerator:uuidGenerator,
        showModal:showModal,
        closeModal:closeModal,
        modalCloseHandler:modalCloseHandler,
        getEl:getEl,
        getAllEl:getAllEl,
        getHTML:getHTML,
        getParent:getParent,
        getValue:getValue,
        setValue:setValue,
        getParam:getParam,
        setParam:setParam,
        removeParam:removeParam,
        addClass:addClass,
        removeClass:removeClass,
        showEl:showEl,
        updateEl:updateEl,
        addEl:addEl,
        extendEl:extendEl,
        ccb:ccb,
        send:send,
        copy:copy,
        fromJSON:fromJSON,
        getLoadingHTML:getLoadingHTML,
        show_loading:show_loading,
        hide_loading:hide_loading,
        getSwitchHtml:getSwitchHtml,
        obj_forEach:obj_forEach,
        findWhere:findWhere,   // return  object in array  (array,{search_field:search_value})
        findIndex:findIndex    // return index of the object in array (array,{search_field:search_value})
    }
})();
///----------------------------end vanilla tools----------------------------------------------

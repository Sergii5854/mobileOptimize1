//! TrackJS JavaScript error monitoring agent.
//! COPYRIGHT (c) 2017 ALL RIGHTS RESERVED
//! See License at https://trackjs.com/terms/
(function(g,n,l){"use awesome";if(g.trackJs)g.console&&g.console.warn&&g.console.warn("TrackJS global conflict");else{var p=function(a,b){this.config=a;this.onError=b;a.enabled&&this.watch()};p.prototype={watch:function(){d.forEach(["EventTarget","Node","XMLHttpRequest"],function(a){d.has(g,a+".prototype.addEventListener")&&d.hasOwn(g[a].prototype,"addEventListener")&&this.wrapEventTarget(g[a].prototype)},this);this.wrapTimer("setTimeout");this.wrapTimer("setInterval")},wrap:function(a){function b(){try{return a.apply(this,
    arguments)}catch(b){throw c.onError("catch",b,{bindTime:e,bindStack:f}),d.wrapError(b);}}var c=this;try{if(!d.isFunction(a)||d.hasOwn(a,"__trackjs__"))return a;if(d.hasOwn(a,"__trackjs_state__"))return a.__trackjs_state__}catch(m){return a}var e,f;if(c.config.bindStack)try{throw Error();}catch(m){f=m.stack,e=d.isoNow()}for(var h in a)d.hasOwn(a,h)&&(b[h]=a[h]);b.prototype=a.prototype;b.__trackjs__=!0;return a.__trackjs_state__=b},wrapEventTarget:function(a){var b=this;d.has(a,"addEventListener.call")&&
d.has(a,"removeEventListener.call")&&(d.patch(a,"addEventListener",function(a){return function(e,f,h,m){try{d.has(f,"handleEvent")&&(f.handleEvent=b.wrap(f.handleEvent))}catch(k){}return a.call(this,e,b.wrap(f),h,m)}}),d.patch(a,"removeEventListener",function(a){return function(b,f,h,d){try{f=f&&(f.__trackjs_state__||f)}catch(k){}return a.call(this,b,f,h,d)}}))},wrapTimer:function(a){var b=this;d.patch(g,a,function(a){return function(e,f){var h=Array.prototype.slice.call(arguments),m=h[0];d.isFunction(m)&&
(h[0]=b.wrap(m));return d.has(a,"apply")?a.apply(this,h):a(h[0],h[1])}})}};var t=function(a){this.initCurrent(a)};t.prototype={current:{},initOnly:{cookie:!0,enabled:!0,token:!0,callback:{enabled:!0},console:{enabled:!0},navigation:{enabled:!0},network:{enabled:!0,fetch:!0},visitor:{enabled:!0},window:{enabled:!0,promise:!0}},defaults:{application:"",cookie:!1,dedupe:!0,enabled:!0,errorURL:"https://capture.trackjs.com/capture",errorNoSSLURL:"http://capture.trackjs.com/capture",faultURL:"https://usage.trackjs.com/fault.gif",
    onError:function(){return!0},serialize:function(a){function b(a){var c="<"+a.tagName.toLowerCase();a=a.attributes||[];for(var b=0;b<a.length;b++)c+=" "+a[b].name+'="'+a[b].value+'"';return c+">"}if(""===a)return"Empty String";if(a===l)return"undefined";if(d.isString(a)||d.isNumber(a)||d.isBoolean(a)||d.isFunction(a))return""+a;if(d.isElement(a))return b(a);var c;try{c=JSON.stringify(a,function(a,c){return c===l?"undefined":d.isNumber(c)&&isNaN(c)?"NaN":d.isError(c)?{name:c.name,message:c.message,
        stack:c.stack}:d.isElement(c)?b(c):c})}catch(f){c="";for(var e in a)a.hasOwnProperty(e)&&(c+=',"'+e+'":"'+a[e]+'"');c=c?"{"+c.replace(",","")+"}":"Unserializable Object"}return c.replace(/"undefined"/g,"undefined").replace(/"NaN"/g,"NaN")},sessionId:"",token:"",userId:"",version:"",callback:{enabled:!0,bindStack:!1},console:{enabled:!0,display:!0,error:!0,warn:!1,watch:["log","debug","info","warn","error"]},navigation:{enabled:!0},network:{enabled:!0,error:!0,fetch:!0},visitor:{enabled:!0},usageURL:"https://usage.trackjs.com/usage.gif",
    window:{enabled:!0,promise:!0}},initCurrent:function(a){if(this.validate(a,this.defaults,"config",{}))return this.current=d.defaultsDeep({},a,this.defaults),!0;this.current=d.defaultsDeep({},this.defaults);console.log("init current config",this.current);return!1},setCurrent:function(a){return this.validate(a,this.defaults,"config",this.initOnly)?(this.current=d.defaultsDeep({},a,this.current),!0):!1},validate:function(a,b,c,e){var f=!0;c=c||"";e=e||{};for(var h in a)if(a.hasOwnProperty(h))if(b.hasOwnProperty(h)){var d=
    typeof b[h];d!==typeof a[h]?(console.warn(c+"."+h+": property must be type "+d+"."),f=!1):"[object Array]"!==Object.prototype.toString.call(a[h])||this.validateArray(a[h],b[h],c+"."+h)?"[object Object]"===Object.prototype.toString.call(a[h])?f=this.validate(a[h],b[h],c+"."+h,e[h]):e.hasOwnProperty(h)&&(console.warn(c+"."+h+": property cannot be set after load."),f=!1):f=!1}else console.warn(c+"."+h+": property not supported."),f=!1;return f},validateArray:function(a,b,c){var e=!0;c=c||"";for(var f=
    0;f<a.length;f++)d.contains(b,a[f])||(console.warn(c+"["+f+"]: invalid value: "+a[f]+"."),e=!1);return e}};var u=function(a,b,c,e,f,h,d){this.util=a;this.log=b;this.onError=c;this.onFault=e;this.serialize=f;d.enabled&&(h.console=this.wrapConsoleObject(h.console,d))};u.prototype={wrapConsoleObject:function(a,b){a=a||{};var c=a.log||function(){},e=this,f;for(f=0;f<b.watch.length;f++)(function(f){var m=a[f]||c;a[f]=function(){try{var a=Array.prototype.slice.call(arguments);e.log.add("c",{timestamp:e.util.isoNow(),
    severity:f,message:e.serialize(1===a.length?a[0]:a)});if(b[f])if(d.isError(a[0])&&1===a.length)e.onError("console",a[0]);else try{throw Error(e.serialize(1===a.length?a[0]:a));}catch(c){e.onError("console",c)}b.display&&(e.util.hasFunction(m,"apply")?m.apply(this,a):m(a[0]))}catch(c){e.onFault(c)}}})(b.watch[f]);return a},report:function(){return this.log.all("c")}};var v=function(a,b,c,e,f){this.config=a;this.util=b;this.log=c;this.window=e;this.document=f;this.correlationId=this.token=null;this.initialize()};
    v.prototype={initialize:function(){this.token=this.getCustomerToken();this.correlationId=this.getCorrelationId()},getCustomerToken:function(){if(this.config.current.token)return this.config.current.token;var a=this.document.getElementsByTagName("script");return a[a.length-1].getAttribute("data-token")},getCorrelationId:function(){var a;if(!this.config.current.cookie)return this.util.uuid();try{a=this.document.cookie.replace(/(?:(?:^|.*;\s*)TrackJS\s*\=\s*([^;]*).*$)|^.*$/,"$1"),a||(a=this.util.uuid(),
        this.document.cookie="TrackJS="+a+"; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/")}catch(b){a=this.util.uuid()}return a},report:function(){return{application:this.config.current.application,correlationId:this.correlationId,sessionId:this.config.current.sessionId,token:this.token,userId:this.config.current.userId,version:this.config.current.version}}};var w=function(){this.loadedOn=(new Date).getTime();this.originalUrl=d.getLocation();this.referrer=n.referrer};w.prototype={discoverDependencies:function(){var a=
        {};g.jQuery&&g.jQuery.fn&&g.jQuery.fn.jquery&&(a.jQuery=g.jQuery.fn.jquery);g.jQuery&&g.jQuery.ui&&g.jQuery.ui.version&&(a.jQueryUI=g.jQuery.ui.version);g.angular&&g.angular.version&&g.angular.version.full&&(a.angular=g.angular.version.full);for(var b in g)if("_trackJs"!==b&&"_trackJS"!==b&&"_trackjs"!==b&&"webkitStorageInfo"!==b&&"webkitIndexedDB"!==b&&"top"!==b&&"parent"!==b&&"frameElement"!==b)try{if(g[b]){var c=g[b].version||g[b].Version||g[b].VERSION;"string"===typeof c&&(a[b]=c)}}catch(e){}return a},
        report:function(){return{age:(new Date).getTime()-this.loadedOn,dependencies:this.discoverDependencies(),originalUrl:this.originalUrl,referrer:this.referrer,userAgent:g.navigator.userAgent,viewportHeight:g.document.documentElement.clientHeight,viewportWidth:g.document.documentElement.clientWidth}}};var y=function(a){this.util=a;this.appender=[];this.maxLength=30};y.prototype={all:function(a){var b=[],c,e;for(e=0;e<this.appender.length;e++)(c=this.appender[e])&&c.category===a&&b.push(c.value);return b},
        clear:function(){this.appender.length=0},truncate:function(){this.appender.length>this.maxLength&&(this.appender=this.appender.slice(Math.max(this.appender.length-this.maxLength,0)))},add:function(a,b){var c=this.util.uuid();this.appender.push({key:c,category:a,value:b});this.truncate();return c},get:function(a,b){var c,e;for(e=0;e<this.appender.length;e++)if(c=this.appender[e],c.category===a&&c.key===b)return c.value;return!1}};var z=function(a,b){this.log=a;this.options=b;b.enabled&&this.watch()};
    z.prototype={isCompatible:function(a){a=a||g;return!d.has(a,"chrome.app.runtime")&&d.has(a,"addEventListener")&&d.has(a,"history.pushState")},record:function(a,b,c){this.log.add("h",{type:a,from:d.truncate(b,250),to:d.truncate(c,250),on:d.isoNow()})},report:function(){return this.log.all("h")},watch:function(){if(this.isCompatible()){var a=this,b=d.getLocationURL().relative;g.addEventListener("popstate",function(){var c=d.getLocationURL().relative;a.record("popState",b,c);b=c},!0);d.forEach(["pushState",
        "replaceState"],function(c){d.patch(history,c,function(e){return function(){b=d.getLocationURL().relative;var f=e.apply(this,arguments),h=d.getLocationURL().relative;a.record(c,b,h);b=h;return f}})})}}};var A=function(a,b,c,e,f,d){this.util=a;this.log=b;this.onError=c;this.onFault=e;this.window=f;this.options=d;d.enabled&&this.initialize(f)};A.prototype={initialize:function(a){a.XMLHttpRequest&&this.util.hasFunction(a.XMLHttpRequest.prototype.open,"apply")&&this.watchNetworkObject(a.XMLHttpRequest);
        a.XDomainRequest&&this.util.hasFunction(a.XDomainRequest.prototype.open,"apply")&&this.watchNetworkObject(a.XDomainRequest);this.options.fetch&&d.isWrappableFunction(a.fetch)&&this.watchFetch()},watchFetch:function(){var a=this.log,b=this.options,c=this.onError;d.patch(g,"fetch",function(e){return function(f,h){var m=f instanceof Request?f:new Request(f,h),k=e.apply(g,arguments);k.__trackjs_state__=a.add("n",{type:"fetch",startedOn:d.isoNow(),method:m.method,url:m.url});return k.then(function(e){var f=
        a.get("n",k.__trackjs_state__);f&&(d.defaults(f,{completedOn:d.isoNow(),statusCode:e.status,statusText:e.statusText}),b.error&&400<=e.status&&c("ajax",f.statusCode+" "+f.statusText+": "+f.method+" "+f.url));return e})["catch"](function(e){var f=a.get("n",k.__trackjs_state__);f&&(d.defaults(f,{completedOn:d.isoNow(),statusCode:0,statusText:(e||"").toString()}),b.error&&c("ajax",e));throw e;})}})},watchNetworkObject:function(a){var b=this,c=a.prototype.open,e=a.prototype.send;a.prototype.open=function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 b){var e=(b||"").toString();0>e.indexOf("localhost:0")&&(this._trackJs={method:a,url:e});return c.apply(this,arguments)};a.prototype.send=function(){try{if(!this._trackJs)return e.apply(this,arguments);this._trackJs.logId=b.log.add("n",{type:"xhr",startedOn:b.util.isoNow(),method:this._trackJs.method,url:this._trackJs.url});b.listenForNetworkComplete(this)}catch(a){b.onFault(a)}return e.apply(this,arguments)};return a},listenForNetworkComplete:function(a){var b=this;b.window.ProgressEvent&&a.addEventListener&&
    a.addEventListener("readystatechange",function(){4===a.readyState&&b.finalizeNetworkEvent(a)},!0);a.addEventListener?a.addEventListener("load",function(){b.finalizeNetworkEvent(a);b.checkNetworkFault(a)},!0):setTimeout(function(){try{var c=a.onload;a.onload=function(){b.finalizeNetworkEvent(a);b.checkNetworkFault(a);"function"===typeof c&&b.util.hasFunction(c,"apply")&&c.apply(a,arguments)};var e=a.onerror;a.onerror=function(){b.finalizeNetworkEvent(a);b.checkNetworkFault(a);"function"===typeof oldOnError&&
    e.apply(a,arguments)}}catch(f){b.onFault(f)}},0)},finalizeNetworkEvent:function(a){if(a._trackJs){var b=this.log.get("n",a._trackJs.logId);b&&(b.completedOn=this.util.isoNow(),b.statusCode=1223==a.status?204:a.status,b.statusText=1223==a.status?"No Content":a.statusText)}},checkNetworkFault:function(a){if(this.options.error&&400<=a.status&&1223!=a.status){var b=a._trackJs||{};this.onError("ajax",a.status+" "+a.statusText+": "+b.method+" "+b.url)}},report:function(){return this.log.all("n")}};var q=
        function(a,b){this.util=a;this.config=b;this.disabled=!1;this.throttleStats={attemptCount:0,throttledCount:0,lastAttempt:(new Date).getTime()};g.JSON&&g.JSON.stringify||(this.disabled=!0)};q.prototype={errorEndpoint:function(a){var b=this.config.current.errorURL;this.util.testCrossdomainXhr()||-1!==g.location.protocol.indexOf("https")||(b=this.config.current.errorNoSSLURL);return b+"?token="+a},usageEndpoint:function(a){return this.appendObjectAsQuery(a,this.config.current.usageURL)},trackerFaultEndpoint:function(a){return this.appendObjectAsQuery(a,
        this.config.current.faultURL)},appendObjectAsQuery:function(a,b){b+="?";for(var c in a)a.hasOwnProperty(c)&&(b+=encodeURIComponent(c)+"="+encodeURIComponent(a[c])+"&");return b},getCORSRequest:function(a,b){var c;this.util.testCrossdomainXhr()?(c=new g.XMLHttpRequest,c.open(a,b),c.setRequestHeader("Content-Type","text/plain")):"undefined"!==typeof g.XDomainRequest?(c=new g.XDomainRequest,c.open(a,b)):c=null;return c},sendTrackerFault:function(a){this.throttle(a)||((new Image).src=this.trackerFaultEndpoint(a))},
        sendUsage:function(a){(new Image).src=this.usageEndpoint(a)},sendError:function(a,b){var c=this;if(!this.disabled&&!this.throttle(a))try{var e=this.getCORSRequest("POST",this.errorEndpoint(b));e.onreadystatechange=function(){4===e.readyState&&200!==e.status&&(c.disabled=!0)};e._trackJs=l;e.send(g.JSON.stringify(a))}catch(f){throw this.disabled=!0,f;}},throttle:function(a){var b=(new Date).getTime();this.throttleStats.attemptCount++;if(this.throttleStats.lastAttempt+1E3>=b){if(this.throttleStats.lastAttempt=
                b,10<this.throttleStats.attemptCount)return this.throttleStats.throttledCount++,!0}else a.throttled=this.throttleStats.throttledCount,this.throttleStats.attemptCount=0,this.throttleStats.lastAttempt=b,this.throttleStats.throttledCount=0;return!1}};var d=function(){function a(c,e,f,h){f=f||!1;h=h||0;d.forEach(e,function(e){d.forEach(d.keys(e),function(d){null===e[d]||e[d]===l?c[d]=e[d]:f&&10>h&&"[object Object]"===b(e[d])?(c[d]=c[d]||{},a(c[d],[e[d]],f,h+1)):c.hasOwnProperty(d)||(c[d]=e[d])})});return c}
        function b(a){return Object.prototype.toString.call(a)}return{addEventListenerSafe:function(a,b,f,d){a.addEventListener?a.addEventListener(b,f,d):a.attachEvent&&a.attachEvent("on"+b,f)},afterDocumentLoad:function(a){var b=!1;"complete"===n.readyState?d.defer(a):(d.addEventListenerSafe(n,"readystatechange",function(){"complete"!==n.readyState||b||(d.defer(a),b=!0)}),setTimeout(function(){b||(d.defer(a),b=!0)},1E4))},bind:function(a,b){return function(){return a.apply(b,Array.prototype.slice.call(arguments))}},
            contains:function(a,b){var f;for(f=0;f<a.length;f++)if(a[f]===b)return!0;return!1},defaults:function(c){return a(c,Array.prototype.slice.call(arguments,1),!1)},defaultsDeep:function(c){return a(c,Array.prototype.slice.call(arguments,1),!0)},defer:function(a,b){setTimeout(function(){a.apply(b)})},forEach:function(a,b,f){if(a.forEach)return a.forEach(b,f);for(var d=0;d<a.length;)b.call(f,a[d],d,a),d++},getLocation:function(){return g.location.toString().replace(/ /g,"%20")},getLocationURL:function(){return d.parseURL(d.getLocation())},
            has:function(a,b){try{for(var f=b.split("."),d=a,g=0;g<f.length;g++)if(d[f[g]])d=d[f[g]];else return!1;return!0}catch(k){return!1}},hasFunction:function(a,b){try{return!!a[b]}catch(f){return!1}},hasOwn:function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},isArray:function(a){return"[object Array]"===b(a)},isBoolean:function(a){return"boolean"===typeof a||d.isObject(a)&&"[object Boolean]"===b(a)},isBrowserIE:function(a){a=a||g.navigator.userAgent;var b=a.match(/Trident\/([\d.]+)/);return b&&
            "7.0"===b[1]?11:(a=a.match(/MSIE ([\d.]+)/))?parseInt(a[1],10):!1},isBrowserSupported:function(){var a=this.isBrowserIE();return!a||8<=a},isError:function(a){if(!d.isObject(a))return!1;var e=b(a);return"[object Error]"===e||"[object DOMException]"===e||d.isString(a.name)&&d.isString(a.message)},isElement:function(a){return d.isObject(a)&&1===a.nodeType},isFunction:function(a){return!(!a||"function"!==typeof a)},isNumber:function(a){return"number"===typeof a||d.isObject(a)&&"[object Number]"===b(a)},
            isObject:function(a){return!(!a||"object"!==typeof a)},isString:function(a){return"string"===typeof a||!d.isArray(a)&&d.isObject(a)&&"[object String]"===b(a)},isWrappableFunction:function(a){return this.isFunction(a)&&this.hasFunction(a,"apply")},isoNow:function(){var a=new Date;return a.toISOString?a.toISOString():a.getUTCFullYear()+"-"+this.pad(a.getUTCMonth()+1)+"-"+this.pad(a.getUTCDate())+"T"+this.pad(a.getUTCHours())+":"+this.pad(a.getUTCMinutes())+":"+this.pad(a.getUTCSeconds())+"."+String((a.getUTCMilliseconds()/
                1E3).toFixed(3)).slice(2,5)+"Z"},keys:function(a){if(!d.isObject(a))return[];var b=[],f;for(f in a)a.hasOwnProperty(f)&&b.push(f);return b},noop:function(){},pad:function(a){a=String(a);1===a.length&&(a="0"+a);return a},parseURL:function(a){var b=a.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);if(!b)return{};b={protocol:b[2],host:b[4],path:b[5],query:b[6],hash:b[8]};b.origin=(b.protocol||"")+"://"+(b.host||"");b.relative=(b.path||"")+(b.query||"")+(b.hash||"");b.href=a;return b},
            patch:function(a,b,f){a[b]=f(a[b]||d.noop)},testCrossdomainXhr:function(){return"withCredentials"in new XMLHttpRequest},truncate:function(a,b){if(a.length<=b)return a;var f=a.length-b;return a.substr(0,b)+"...{"+f+"}"},tryGet:function(a,b){try{return a[b]}catch(f){}},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(a){var b=16*Math.random()|0;return("x"==a?b:b&3|8).toString(16)})},wrapError:function(a){if(a.innerError)return a;var b=Error("TrackJS Caught: "+(a.message||
                a));b.description="TrackJS Caught: "+a.description;b.file=a.file;b.line=a.line||a.lineNumber;b.column=a.column||a.columnNumber;b.stack=a.stack;b.innerError=a;return b}}}(),B=function(a,b,c,e,f,d){this.util=a;this.log=b;this.onError=c;this.onFault=e;this.options=d;this.document=f;d.enabled&&this.initialize(f)};B.prototype={initialize:function(a){var b=this.util.bind(this.onDocumentClicked,this),c=this.util.bind(this.onInputChanged,this);a.addEventListener?(a.addEventListener("click",b,!0),a.addEventListener("blur",
        c,!0)):a.attachEvent&&(a.attachEvent("onclick",b),a.attachEvent("onfocusout",c))},onDocumentClicked:function(a){try{var b=this.getElementFromEvent(a);b&&b.tagName&&(this.isDescribedElement(b,"a")||this.isDescribedElement(b,"button")||this.isDescribedElement(b,"input",["button","submit"])?this.writeVisitorEvent(b,"click"):this.isDescribedElement(b,"input",["checkbox","radio"])&&this.writeVisitorEvent(b,"input",b.value,b.checked))}catch(c){this.onFault(c)}},onInputChanged:function(a){try{var b=this.getElementFromEvent(a);
        if(b&&b.tagName)if(this.isDescribedElement(b,"textarea"))this.writeVisitorEvent(b,"input",b.value);else if(this.isDescribedElement(b,"select")&&b.options&&b.options.length)this.onSelectInputChanged(b);else this.isDescribedElement(b,"input")&&!this.isDescribedElement(b,"input",["button","submit","hidden","checkbox","radio"])&&this.writeVisitorEvent(b,"input",b.value)}catch(c){this.onFault(c)}},onSelectInputChanged:function(a){if(a.multiple)for(var b=0;b<a.options.length;b++)a.options[b].selected&&
    this.writeVisitorEvent(a,"input",a.options[b].value);else 0<=a.selectedIndex&&a.options[a.selectedIndex]&&this.writeVisitorEvent(a,"input",a.options[a.selectedIndex].value)},writeVisitorEvent:function(a,b,c,e){"password"===this.getElementType(a)&&(c=l);this.log.add("v",{timestamp:this.util.isoNow(),action:b,element:{tag:a.tagName.toLowerCase(),attributes:this.getElementAttributes(a),value:this.getMetaValue(c,e)}})},getElementFromEvent:function(a){return a.target||n.elementFromPoint(a.clientX,a.clientY)},
        isDescribedElement:function(a,b,c){if(a.tagName.toLowerCase()!==b.toLowerCase())return!1;if(!c)return!0;a=this.getElementType(a);for(b=0;b<c.length;b++)if(c[b]===a)return!0;return!1},getElementType:function(a){return(a.getAttribute("type")||"").toLowerCase()},getElementAttributes:function(a){for(var b={},c=0;c<a.attributes.length;c++)"value"!==a.attributes[c].name.toLowerCase()&&(b[a.attributes[c].name]=a.attributes[c].value);return b},getMetaValue:function(a,b){return a===l?l:{length:a.length,pattern:this.matchInputPattern(a),
            checked:b}},matchInputPattern:function(a){return""===a?"empty":/^[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/.test(a)?"email":/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/.test(a)||/^(\d{4}[\/\-](0?[1-9]|1[012])[\/\-]0?[1-9]|[12][0-9]|3[01])$/.test(a)?"date":/^(?:(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?)?([2-9]1[02-9]|[2-9][02-9]1|[2-9][02-9]{2})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/.test(a)?
            "usphone":/^\s*$/.test(a)?"whitespace":/^\d*$/.test(a)?"numeric":/^[a-zA-Z]*$/.test(a)?"alpha":/^[a-zA-Z0-9]*$/.test(a)?"alphanumeric":"characters"},report:function(){return this.log.all("v")}};var C=function(a,b,c,e,f){this.onError=a;this.onFault=b;this.serialize=c;f.enabled&&this.watchWindowErrors(e);f.promise&&this.watchPromiseErrors(e)};C.prototype={watchPromiseErrors:function(a){var b=this;a.addEventListener?a.addEventListener("unhandledrejection",function(a){a=a||{};a=a.detail?d.tryGet(a.detail,
        "reason"):d.tryGet(a,"reason");if(a!==l){if(!d.isError(a))try{throw Error(b.serialize(a));}catch(e){a=e}b.onError("promise",a)}}):a.onunhandledrejection=function(a){b.onError("promise",a)}},watchWindowErrors:function(a){var b=this;d.patch(a,"onerror",function(a){return function(e,f,d,g,k){try{k=k||{},k.message=k.message||b.serialize(e),k.name=k.name||"Error",k.line=k.line||parseInt(d,10)||null,k.column=k.column||parseInt(g,10)||null,"[object Event]"!==Object.prototype.toString.call(e)||f?k.file=k.file||
        b.serialize(f):k.file=(e.target||{}).src,b.onError("window",k)}catch(x){b.onFault(x)}a.apply(this,arguments)}})}};var D=function(a,b,c,e,f,h,g,k,x,l,n,p,q,t,u,v){try{if(this.window=t,this.document=u,this.util=d,this.onError=this.util.bind(this.onError,this),this.onFault=this.util.bind(this.onFault,this),this.serialize=this.util.bind(this.serialize,this),this.config=new e(a),this.transmitter=new n(this.util,this.config),this.log=new k(this.util),this.api=new b(this.config,this.util,this.onError,this.serialize),
            this.metadata=new x(this.serialize),this.environment=new g,this.customer=new h(this.config,this.util,this.log,this.window,this.document),this.customer.token&&(this.apiConsoleWatcher=new f(this.util,this.log,this.onError,this.onFault,this.serialize,this.api,this.config.defaults.console),this.config.current.enabled&&(this.windowConsoleWatcher=new f(this.util,this.log,this.onError,this.onFault,this.serialize,this.window,this.config.current.console),this.util.isBrowserSupported()))){this.callbackWatcher=
        new c(this.config.current.callback,this.onError,this.onFault);this.visitorWatcher=new p(this.util,this.log,this.onError,this.onFault,this.document,this.config.current.visitor);this.navigationWatcher=new v(this.log,this.config.current.navigation);this.networkWatcher=new l(this.util,this.log,this.onError,this.onFault,this.window,this.config.current.network);this.windowWatcher=new q(this.onError,this.onFault,this.serialize,this.window,this.config.current.window);var r=this;d.afterDocumentLoad(function(){r.transmitter.sendUsage({token:r.customer.token,
        correlationId:r.customer.correlationId,application:r.config.current.application,x:r.util.uuid()})})}}catch(w){this.onFault(w)}};D.prototype={reveal:function(){if(this.customer.token)return this.api.addMetadata=this.metadata.addMetadata,this.api.removeMetadata=this.metadata.removeMetadata,this.api;this.config.current.enabled&&this.window.console&&this.window.console.warn&&this.window.console.warn("TrackJS could not find a token");return l},onError:function(){var a,b=!1;return function(c,e,f){if(d.isBrowserSupported()&&
        this.config.current.enabled)try{if(f=f||{bindStack:null,bindTime:null,force:!1},e&&d.isError(e)||(e={name:"Error",message:this.serialize(e,f.force)}),-1===e.message.indexOf("TrackJS Caught"))if(b&&-1!==e.message.indexOf("Script error"))b=!1;else{var h=d.defaultsDeep({},{bindStack:f.bindStack,bindTime:f.bindTime,column:e.column||e.columnNumber,console:this.windowConsoleWatcher.report(),customer:this.customer.report(),entry:c,environment:this.environment.report(),file:e.file||e.fileName,line:e.line||
    e.lineNumber,message:e.message,metadata:this.metadata.report(),nav:this.navigationWatcher.report(),network:this.networkWatcher.report(),url:(g.location||"").toString(),stack:e.stack,timestamp:this.util.isoNow(),visitor:this.visitorWatcher.report(),version:"2.10.2"});if(!f.force)try{if(!this.config.current.onError(h,e))return}catch(l){h.console.push({timestamp:this.util.isoNow(),severity:"error",message:l.message});var m=this;setTimeout(function(){m.onError("catch",l,{force:!0})},0)}if(this.config.current.dedupe){var k=
        (h.message+h.stack).substr(0,1E4);if(k===a)return;a=k}this.log.clear();setTimeout(function(){b=!1});b=!0;this.transmitter.sendError(h,this.customer.token)}}catch(l){this.onFault(l)}}}(),onFault:function(a){var b=this.transmitter||new q;a=a||{};a={token:this.customer.token,file:a.file||a.fileName,msg:a.message||"unknown",stack:(a.stack||"unknown").substr(0,500),url:this.window.location,v:"2.10.2",h:"a36ab4356e67dd6bcde8ff31f71cc2801b24744d",x:this.util.uuid()};b.sendTrackerFault(a)},serialize:function(a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  b){if(this.config.current.serialize&&!b)try{return this.config.current.serialize(a)}catch(c){this.onError("catch",c,{force:!0})}return this.config.defaults.serialize(a)}};p=new D(g._trackJs||g._trackJS||g._trackjs||{},function(a,b,c,e){return{attempt:function(a,e){try{var d=Array.prototype.slice.call(arguments,2);return a.apply(e||this,d)}catch(g){throw c("catch",g),b.wrapError(g);}},configure:function(b){return a.setCurrent(b)},track:function(a){var b=e(a);a=a||{};if(!a.stack)try{throw Error(b);
    }catch(d){a=d}c("direct",a)},watch:function(a,e){return function(){try{var d=Array.prototype.slice.call(arguments,0);return a.apply(e||this,d)}catch(g){throw c("catch",g),b.wrapError(g);}}},watchAll:function(a){var e=Array.prototype.slice.call(arguments,1),d;for(d in a)"function"===typeof a[d]&&(b.contains(e,d)||function(){var e=a[d];a[d]=function(){try{var a=Array.prototype.slice.call(arguments,0);return e.apply(this,a)}catch(d){throw c("catch",d),b.wrapError(d);}}}());return a},hash:"a36ab4356e67dd6bcde8ff31f71cc2801b24744d",
        version:"2.10.2"}},p,t,u,v,w,y,function(a){var b={};return{addMetadata:function(a,d){b[a]=d},removeMetadata:function(a){delete b[a]},report:function(){var c=[],d;for(d in b)b.hasOwnProperty(d)&&c.push({key:d,value:a(b[d])});return c},store:b}},A,q,B,C,g,n,z);g.trackJs=p.reveal()}})(window,document);
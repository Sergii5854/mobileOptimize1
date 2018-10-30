try{(function(global,doc,loc,nav){"use strict";var fuelXProcessor=function(){var pixelEndpoint="https://tr1.fuel451.com/",clientStagingPixelEndpoint="https://trdev.fuel451.com",attrCheckEndpoint="https://psr.fuel451.com/",attrCheckJSN="https://cdn.fuelx.com/js/checkAttrV3.min.js",historyChangeJS="https://cdn.fuelx.com/js/hChange.min.js",gaCookieKey="_ga",pixelLoaded=false,queryStr="",pixelId,bid,pageURL,userAgent,language,gaClientId,timestamp,localTimeStamp,eventList=[],initialized=false,trackCodeInitialized=false,isJSONSupported=false,isActiveX=false,version="1";var fireList=function(){var encodedStr="";if(eventList.length==0)return;if(isJSONSupported){encodedStr=encodeURIComponent(JSON.stringify(eventList))}if(isJSONSupported&&2e3>encodedStr.length+pixelEndpoint.length+queryStr.length+8){createPixel(pixelEndpoint+queryStr+"&y=js&l="+encodedStr)}else{for(var i=0;i<eventList.length;i++){fireOne(eventList[i])}}},fireOne=function(_event){var eventQS="";var eventAsArray=[];if(loc.href!==pageURL){runAttributionCheck()}for(var i in _event){if(_event.hasOwnProperty(i)&&(typeof _event[i]==="string"||typeof _event[i]==="number")){eventAsArray.push(i+"="+encodeURIComponent(_event[i]))}else{console.log("FuelX: Possible loss of tracking data. Value of "+i+" is not entered properly.")}}eventQS=eventQS+"y=qs&";eventQS=eventQS+eventAsArray.join("&");updateQueryStr();createPixel(pixelEndpoint+queryStr+"&"+eventQS)},fireEvent=function(_event){if(!initialized){console.log("FuelX: Pixel code not initialized. Please make sure fuelx('init') is included in the page.")}else{pixelLoaded?fireOne(_event):eventList.push(_event)}},createPixel=function(src){var pixel=createElement("img",src,"fxp_"+timestamp);pixel.className="fx-replay-exclude -ce-ignore sessioncamexclude inspectlet-sensitive";pixel.setAttribute("data-mf-replace","");pixel.setAttribute("data-recording-disable","");insertElementToDOM(pixel)},createScript=function(src){var script=createElement("script",src,"fxscr_"+timestamp);insertElementToDOM(script)},createElement=function(type,src,id){var element=doc.createElement(type);element.src=src;element.style.display="none";element.id=id;return element},insertElementToDOM=function(element){if(!doc.getElementById(element.id)){try{doc.getElementsByTagName("body")[0].appendChild(element)}catch(e){setTimeout(function(){insertElementToDOM(element)},10)}}},updateQueryStr=function(){var tempArray=[],pageURL=loc.href;if(document.getElementById("fxif2")){pageURL=pageURL+"&fi=2"}userAgent=nav?nav.userAgent:"";language=nav?nav.language:"";timestamp=!Date.now?(new Date).getTime():Date.now();gaClientId=readCookie(gaCookieKey);localTimeStamp=(new Date).toString();var referrer=doc.referrer;tempArray.push("?p="+pixelId);tempArray.push("b="+encodeURIComponent(bid));tempArray.push("t="+timestamp);tempArray.push("v="+version);tempArray.push("u="+encodeURIComponent(pageURL));tempArray.push("usr="+encodeURIComponent(userAgent));tempArray.push("ln="+encodeURIComponent(language));tempArray.push("gacid="+encodeURIComponent(gaClientId));tempArray.push("r="+encodeURIComponent(referrer));tempArray.push("lts="+encodeURIComponent(localTimeStamp));if(inIframe()){tempArray.push("i=1")}queryStr=tempArray.join("&")},inIframe=function(){try{return window.self!==window.top}catch(e){return false}},createCookie=function(cookieName,cookieValue,expiration){var expires="";if(expiration){var date=new Date;date.setTime(date.getTime()+expiration*60*60*1e3);expires="; expires="+date.toUTCString()}doc.cookie=cookieName+"="+cookieValue+expires+"; path=/"},readCookie=function(cookieName){var cookieNameEQ=cookieName+"=",ca=doc.cookie.split(";");for(var i=0;i<ca.length;i++){var c=ca[i];while(c.charAt(0)==" ")c=c.substring(1,c.length);if(c.indexOf(cookieNameEQ)==0)return c.substring(cookieNameEQ.length,c.length)}return null},getTrackCode=function(){pageURL=loc.href;var corsCookie=true;var exl=0;if(readCookie("fx_exl")){exl=readCookie("fx_exl")}sendXHR("POST",attrCheckEndpoint+"tc","b="+bid+"&u="+encodeURIComponent(pageURL)+"&lts="+encodeURIComponent(getGMTOffset())+"&exl="+exl,handleTrackCodeResponse,corsCookie);trackCodeInitialized=true},handleTrackCodeResponse=function(response){window.fxtcr=response.split(";");var responseArr=window.fxtcr;if(window.location.href.indexOf("utm_source")>-1){createCookie("utm_flag",20,.3)}if((!navigator.cookieEnabled||readCookie("fxdr"))&&responseArr[0]==2&&responseArr[1]==2&&(window.location.href.indexOf("FuelX")>-1||window.location.href.indexOf("fuelx")>-1||window.location.href.indexOf("VIDEO")>-1)){createScript(historyChangeJS)}if(responseArr[0]==2&&responseArr[6]=="e"){createCookie("fx_exl",responseArr[7],240)}if(responseArr[0]==1){window.fxbid=bid;createScript(attrCheckJSN)}},sendXHR=function(type,url,data,callback,cors){var cors=cors||false;var xhr=isActiveX?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest;xhr.onreadystatechange=function(){if(xhr.readyState===4&&xhr.status===200){callback(xhr.responseText)}};xhr.open(type,url,true);if(type==="POST"){xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");if(cors){xhr.withCredentials=true}}xhr.send(data)},runAttributionCheck=function(){var cookieEnabled=!!nav.cookieEnabled;if(typeof nav.cookieEnabled=="undefined"&&!cookieEnabled){doc.cookie=timestamp;cookieEnabled=doc.cookie.indexOf(timestamp)!=-1;trackCodeInitialized=true}if(cookieEnabled){getTrackCode()}},isEnvironmentStaging=function(_environment){if(typeof _environment!=="string"){return false}var productionAliases={production:true,prod:true,live:true};if(productionAliases[_environment.toLowerCase()]){return false}console.log("FuelX Pixel currently configured in staging environment with environment name:",_environment);console.log("Please remove "+_environment+" from the FuelX init function for production environments");return true},getGMTOffset=function(){var offSetString=(new Date).toString().split("GMT")[1];var timeZoneInteger=parseInt(offSetString.charAt(0)+offSetString.substring(1,3));return timeZoneInteger.toString()};this.fuelx=true;this.pageview=function(_pageName){var pageName=_pageName||"general";fireEvent({ev:"pageview",pn:pageName})};this.purchase=function(_params){var orderId=_params.orderId||"",orderValue=_params.orderValue||"",products=_params.products&&_params.products.constructor===Array?_params.products.join(";"):typeof _params.products==="string"?_params.products:"",email=_params.email||"",label=_params.label||"";if(orderValue!==""&&orderValue[0]==="$"){orderValue=orderValue[0]==="$"?orderValue.slice(1):orderValue}fireEvent({ev:"purchase",oid:orderId,ov:orderValue,pr:products,em:email,lb:label})};this.lead=function(_params){var leadId=_params.leadId||"",leadType=_params.leadType||"",email=_params.email||"",label=_params.label||"";fireEvent({ev:"lead",lid:leadId,lt:leadType,em:email,lb:label})};this.button_click=function(_buttonName){var buttonName=_buttonName||"";buttonName=typeof buttonName=="String"?buttonName:buttonName["bn"];fireEvent({ev:"button_click",bn:buttonName})};this.product=function(_params){var productId=_params.productId||"";fireEvent({ev:"product",pd:productId})};this.search=function(_keywords){var keywords=_keywords&&_keywords.constructor===Array?_keywords.join(";"):typeof _keywords==="string"?_keywords:"";fireEvent({ev:"search",kw:keywords})};this.add_to_cart=function(_params){var productId=_params.productId||"",value=_params.value||"",quantity=_params.quantity||"",label=_params.label||"";fireEvent({ev:"add_to_cart",pid:productId,va:value,qt:quantity,lb:label})};this.handleEvent=function(_args){var _this=this;var args=Array.prototype.slice.call(_args);var fn=args[0];var params=args.splice(1,args.length-1);this[fn]?this[fn].apply(_this,params):console.log("FuelX: Possible misconfiguration. The event "+fn+" doesn't exist.")};this.init=function(_pixelId,_bid,_environment,_pixelEndpoint,_attrCheckEndpoint){if(initialized){console.log("FuelX: Pixel being initialized twice.");return}initialized=true;pixelId=_pixelId;bid=_bid;if(!trackCodeInitialized){runAttributionCheck()}isJSONSupported=!(typeof JSON==="undefined"||JSON===null||!JSON.stringify);isActiveX=!!window.ActiveXObject;if(isEnvironmentStaging(_environment)){pixelEndpoint=_pixelEndpoint?_pixelEndpoint:clientStagingPixelEndpoint;attrCheckEndpoint=_attrCheckEndpoint?_attrCheckEndpoint:attrCheckEndpoint}updateQueryStr()};this.load=function(_eventQueue){for(var i=0;i<_eventQueue.length;i++){this.handleEvent(_eventQueue[i])}_eventQueue.length=0;pixelLoaded=true;fireList();if(bid&&pixelId&&!trackCodeInitialized){runAttributionCheck()}}};global.fuelxP=global.fuelxP||new fuelXProcessor;global.fuelxP.load(fuelxEQ?fuelxEQ:[])})(window,document,location,navigator)}catch(e){var errImg=document.createElement("img");errImg.src="https://tr1.fuelx.com/?u="+encodeURIComponent(location.href)+"&exm="+e+"&y=ex&v=1";console.log("FuelX: "+e)}
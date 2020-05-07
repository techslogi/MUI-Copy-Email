// ==UserScript==
// @name         MUI Copy e-mail
// @namespace    mui_copy_email
// @version      0.3
// @description  Grabs the email when you click the object.
// @updateURL    https://github.com/techslogi/MUI-Copy-Email/raw/master/MUI%20Copy%20e-mail.user.js
// @downloadURL	 https://github.com/techslogi/MUI-Copy-Email/raw/master/MUI%20Copy%20e-mail.user.js
// @author       Gabriel Boçon
// @match        https://secure.volvo.com/mgmui/User/*
// @grant        GM_notification
// @run-at       document-idle
// ==/UserScript==

//var MutationObserver = window.MutationObserver;
var myObserver = new MutationObserver (function(){
    console.log("modificou");
    addListener();
});
var elementToObserve = document.querySelector("#ContentPlaceHolder1_UpdPanelSearch");

myObserver.observe (elementToObserve, {subtree: true, childList: true});

addListener();

function addListener() {
    var emailObj = document.getElementById("ContentPlaceHolder1_GeneralData1_TxtPrimaryMailAddress");

    if (emailObj){
        console.log("adicionando listener");
        emailObj.addEventListener('click', function(event) {
            if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
                var textarea = document.createElement("textarea");
                textarea.textContent = emailObj.value;
                textarea.style.position = "fixed";
                document.body.appendChild(textarea);
                textarea.select();
                try {
                    return document.execCommand("copy");
                }
                catch (ex) {
                    console.warn("Copy to clipboard failed.", ex);
                    return false;
                }
                finally {
                    document.body.removeChild(textarea);
                    GM_notification ( {title: 'E-mail copied!', text: 'The e-mail ' + emailObj.value + ' has been copied!'} );
                }
            }
        });
    }
}
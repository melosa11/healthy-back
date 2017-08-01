/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
const DEFAULT = "20";
let powerPara = document.getElementById("power");
let settings = document.getElementById("settings");
let powerBttn = document.querySelector("input[type=checkbox]");
let isAlive = window.localStorage.getItem("alive") || "true";

//**BootUp **
if(isAlive === "true"){
    on();
}
else{
    off();
}

//**Settings**

settings.onclick = function () {
    browser.runtime.openOptionsPage();
}

//**Power**
powerBttn.onclick = function () {
    function onGet(result) {
        let interval = result.interval || DEFAULT;
        powerChange(interval)
    }
    function onError(error) {
        console.log(`Error: ${error}`)
        powerChange(DEFAULT);
    }

    var get = browser.storage.local.get("interval");
    get.then(onGet,onError);
    
    
}

function powerChange(interval) {
    if (powerBttn.checked) {
        on();
        browser.alarms.clearAll();
        browser.alarms.create(
            "",
            { periodInMinutes: parseInt(interval) }
        );
    }
    else {
        off();
        browser.alarms.clearAll();
    }
}

function on() {
    powerBttn.checked = true;
    window.localStorage.setItem("alive", "true");
    powerPara.textContent = "ON";
    browser.browserAction.setIcon({ path: "../icons/logo.svg" });
}

function off() {
    powerBttn.checked = false;
    window.localStorage.setItem("alive", "false");
    powerPara.textContent = "OFF";
    browser.browserAction.setIcon({ path: "../icons/logo-off.svg" });
}
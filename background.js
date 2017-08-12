/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
const DEFAULT = "20";
let isAlive = window.localStorage.getItem("alive") || "true";
//**Restore Settings **/
function onGet(result) {
    let interval = result.interval || DEFAULT;
    console.log(interval);
    createAlarm(interval);
}
function onError(error) {
    console.log(`Error: ${error}`);
    interval = DEFAULT;
    createAlarm(interval);
}
liveCheck(isAlive);
let get = browser.storage.local.get("interval");
get.then(onGet, onError);   

//**Main alarm func**/
function createAlarm(interval) {
    //creates alarm
    browser.alarms.create(
        "",
        { periodInMinutes: parseInt(interval)}
    );

    //creates notification
    function alarmListener(alarmInfo) {
        browser.notifications.create("hback", {
            "type": "basic",
            "title": "Your Body",
            "message": "Sit up straight!",
            "iconUrl": browser.extension.getURL("icons/notif-icon.svg")
        }
        )
    };

    browser.alarms.onAlarm.addListener(alarmListener);
}

// Check the live first time the browser is open 
function liveCheck(par) {
    if(par === "true"){
        browser.browserAction.setIcon({ path: "../icons/logo.svg" });
    }
    else{
        browser.browserAction.setIcon({ path: "../icons/logo-off.svg" });
    }
}
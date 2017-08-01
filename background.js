/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
const DEFAULT = "20";
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
            "iconUrl": browser.extension.getURL("icons/logo.svg")
        }
        )
    };

    browser.alarms.onAlarm.addListener(alarmListener);
}

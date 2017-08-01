/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
const DEFAULT = 20;
let form = document.querySelector("form");
let alert = document.getElementById("alert");


document.addEventListener("DOMContentLoaded", restoreSettings);
form.addEventListener("submit", saveSettings);

//Restore
function restoreSettings() {

    function onGet(result) {
        document.getElementById("interval").value = result.interval || DEFAULT;
    }
    function onError(error) {
        console.log(`Error: ${error}`)
        document.getElementById("interval").value = DEFAULT;
    }

    var get = browser.storage.local.get("interval");
    get.then(onGet,onError);
}


//Save
function saveSettings(e) {
    let interval = document.getElementById("interval").value;
    let isAlive = window.localStorage.getItem("alive") || "true";
    e.preventDefault();
    if (intCheck(interval) === true && isAlive === "true") {
        browser.storage.local.set({
            "interval": interval
        })
        //changes alarm
        browser.alarms.clearAll();
        browser.alarms.create(
            "",
            { periodInMinutes: parseInt(interval) }
        );
        //success message
        alert.textContent = "SAVED";
        alert.style.color = "green";

    }
    else if(isAlive === "false"){
        alert.textContent = "You can't change settings while the extention is not active.";
        alert.style.color = "red";
    }   
    else {
        //error message
        alert.textContent = intCheck(interval);
        alert.style.color = "red";
    }
}

//Input check
function intCheck(input) {
    let number = parseInt(input)
    if (number || number === 0) {
        if (number >= 1) {
            return true;
        }
        else {
            return "Interval must be more than 1 minute";
        }
    }
    else {
        return "Interval must be an integer";
    }
}

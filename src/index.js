
import * as Tone from "tone";

let heading;
let direction;

function init() {
    const button = document.getElementById("new-direction-button");
    //const button = document.createElement("button");
    button.innerHTML = "START COMPASS";

    //const button = document.getElementById("new-direction-button");
    button.addEventListener("click", startCompass);
}

function startCompass() {
    const button = document.getElementById("new-direction-button");
    button.removeEventListener("click", startCompass);
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
        DeviceOrientationEvent.requestPermission()
            .then((response) => {
            if (response === "granted") {
                window.addEventListener("deviceorientation", handler, true);
            } else {
                alert("has to be allowed!");
            }
        })
        .catch(() => alert("not supported"));
    } else {
        window.addEventListener("deviceorientationabsolute", handler, true);
    }
    button.innerHTML = "CHANGE DIRECTION";
    button.addEventListener("click", changeDirection);
}

function changeDirection() {
    direction = Math.random() * 360;
    var direction_arrow = document.getElementById("direction-arrow");
    direction_arrow.style.transform = `rotate(${-direction}deg)`;
}

function handler(e) {
    heading = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    diff_heading = Math.abs(heading - direction);
    var compass_arrow = document.getElementById("compass-arrow");
    compass_arrow.style.transform = `rotate(${-diff_heading}deg)`;
}

init();
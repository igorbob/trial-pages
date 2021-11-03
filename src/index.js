
import * as Tone from "tone";

const compass = document.getElementById("compass");
let heading;

function init() {
    compass.innerHTML = "iPhone???";

    const button = document.createElement("button");
    button.innerHTML = "click me";

    document.body.appendChild(button);

    var other_button = document.getElementById("new-direction-button");
    other_button.remove();


    //const button = document.getElementById("new-direction-button");
    button.addEventListener("click", startCompass);
}

function startCompass() {
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
        DeviceOrientationEvent.requestPermission()
            .then((response) => {
            if (response === "granted") {
                compass.innerHTML = "granted"
                window.addEventListener("deviceorientation", handler, true);
            } else {
                alert("has to be allowed!");
            }
        })
        .catch(() => alert("not supported"));
    } else {
        window.addEventListener("deviceorientationabsolute", handler, true);
    }
}

function handler(e) {
    heading = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    compass.innerHTML = heading;
    compassCircle.style.transform = `translate(-50%, -50%) rotate(${-compass}deg)`;
}

init();
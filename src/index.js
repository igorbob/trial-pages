
import * as Tone from "tone";

const synth = new Tone.Synth().toDestination();

let heading;
let direction;
let diff_heading;
let alarm_on;
let is_correct_heading;

function init() {
    const button = document.getElementById("new-direction-button");
    //const button = document.createElement("button");
    button.innerHTML = "START COMPASS";
    alarm_on = false;
    is_correct_heading = false;

    window.setInterval(soundAlarm, 1000);

    //const button = document.getElementById("new-direction-button");
    button.addEventListener("click", startCompass);
}

function startCompass() {
    Tone.start();

    const button = document.getElementById("new-direction-button");
    button.removeEventListener("click", startCompass);
    var isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

    if (isIOS) {
        DeviceOrientationEvent.requestPermission()
            .then((response) => {
            if (response === "granted") {
                changeDirection();
                window.addEventListener("deviceorientation", handler, true);
            } else {
                alert("has to be allowed!");
            }
        })
        .catch(() => alert("not supported"));
    } else {
        changeDirection();
        window.addEventListener("deviceorientationabsolute", handler, true);
    }
    button.innerHTML = "NEW DIRECTION";
    button.addEventListener("click", changeDirection);
}

function gracePeriodOver() {
    const button = document.getElementById("new-direction-button");
    button.disabled = false;
    alarm_on = true;
}

function changeDirection() {
    const button = document.getElementById("new-direction-button");
    button.disabled = true;
    alarm_on = false;

    window.setTimeout(gracePeriodOver, 5000);

    direction = Math.random() * 360;
    // var direction_arrow = document.getElementById("direction-arrow");
    // direction_arrow.style.transform = `rotate(${-direction}deg)`;
}

function handler(e) {
    heading = e.webkitCompassHeading || Math.abs(e.alpha - 360);
    
    diff_heading = heading - direction;

    is_correct_heading = (diff_heading > -6.0 && diff_heading < 6.0);

    var compass_arrow = document.getElementById("compass-arrow");
    
    if (diff_heading > -4.0 && diff_heading < 4.0) {
        compass_arrow.classList.add("correct");
    } else {
        compass_arrow.classList.remove("correct");
    }
    
    // const stats = document.getElementById("stats");
    // stats.innerHTML = `heading : ${heading} and direction : ${direction} , difference ${diff_heading}`
    
    compass_arrow.style.transform = `rotate(${-diff_heading}deg)`;
}

function soundAlarm() {
    if (alarm_on && !is_correct_heading) {
        synth.triggerAttackRelease("E5", "4n");
    }
}


init();
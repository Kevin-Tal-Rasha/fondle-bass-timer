// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

setInterval(() => {
    var timeDiff = (new Date(`${new Date().toLocaleDateString()} 17:30:00`) - new Date());
    var minutes = Math.floor(timeDiff / 1000 / 60);
    document.querySelector("#remain-minutes").innerHTML = minutes;

    var seconds = (timeDiff - minutes * 60 * 1000) / 1000;
    document.querySelector("#remain-seconds").innerHTML = seconds;

    document.querySelector("#remain-infinity").innerHTML = Number.MAX_VALUE;
}, 10); image.png
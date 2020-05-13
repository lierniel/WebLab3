document.addEventListener("DOMContentLoaded", function () {
    let clock = document.getElementById("clock");
    clock.innerHTML = new Date().toLocaleTimeString();
    setInterval(function () {
        clock.innerHTML = new Date().toLocaleTimeString();
    }, 1000)
});
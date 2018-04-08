import GameManager from "./logic/GameManager.js";

swal.setDefaults({
    allowOutsideClick: false,
    allowEscapeKey: false,
    grow: "fullscreen"
});

const manager = new GameManager();
manager.start();
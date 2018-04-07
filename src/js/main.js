import ScoreRowContainer from "./components/ScoreRowContainer.js";
import DiceRollContainer from "./components/DiceRollContainer.js";

const src = new ScoreRowContainer();
const drc = new DiceRollContainer();


// How many players dialog
swal({
    title: "How many players?",
    type: "question",
    input: "number",
    inputValue: 2,
    inputAttributes: {
        min: 2,
        max: 9
    },
    allowOutsideClick: false,
    allowEscapeKey: false,
    grow: "fullscreen"
}).then(numPlayersResult => {
    swal({
        type: "info",
        title: "Player 1's turn",
        //toast: true,
        showConfirmButton: false,
        timer: 3000,
        grow: "fullscreen"
    }).then(() => {
        swal({
            //toast: true,
            confirmButtonText: "Roll Dice",
            allowOutsideClick: false,
            allowEscapeKey: false,
            grow: "fullscreen"
        });
    });
});
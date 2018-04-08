import ScoreRowContainer from "./components/ScoreRowContainer.js";
import DiceRollContainer from "./components/DiceRollContainer.js";

// TODO: Move all of this into a Manager type object. Because other components will need
//       to know about the ScoreRowContainer in order to score dice
const src = new ScoreRowContainer();
const drc = new DiceRollContainer();

// The looping isn't going to work here. Maybe I can create an object
// that will know how to properly sequence the events that need
// to take place?
//
// I can make a Player class that will keep track of score for each player.
// I can then have them in an array and use reduce() to sequence the events
// as per https://stackoverflow.com/questions/36353344/javascript-promise-recursion-and-chaining
function askHowManyPlayers() {
    return swal({
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
    }).then(result => Number(result.value));
}

function rollDicePrompt(playerNum) {
    return swal({
        title: `Player ${playerNum}`,
        confirmButtonText: "Roll Dice",
        allowOutsideClick: false,
        allowEscapeKey: false,
        grow: "fullscreen"
    });
}

// How many players dialog
askHowManyPlayers()
.then(numPlayers => {

    for (let i = 0; i < numPlayers; i++) {
        rollDicePrompt(i + 1)
        .then(_ => {
            drc.rollRemainingDice();
        });
    }
    // swal({
    //     type: "info",
    //     title: "Player 1's turn",
    //     //toast: true,
    //     showConfirmButton: false,
    //     timer: 3000,
    //     grow: "fullscreen"
    // }).then(() => {
    //     swal({
    //         //toast: true,
    //         confirmButtonText: "Roll Dice",
    //         allowOutsideClick: false,
    //         allowEscapeKey: false,
    //         grow: "fullscreen"
    //     });
    // });
});
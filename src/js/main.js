import ScoreRowContainer from "./components/ScoreRowContainer.js";
import DiceRollContainer from "./components/DiceRollContainer.js";

const src = new ScoreRowContainer();
const drc = new DiceRollContainer();


// How many players dialog
// This is currently failing
iziToast.question({
    message: 'How many players?',
    timeout: false,
    close: false,
    rtl: false,
    drag: false,
    position: "center",
    progressBar: false,
    overlay: true,
    inputs: [
        "<input type='number' class='player-count-textbox' value='2' />",
        true
    ],
    buttons: [
        
        "<button>Yes</button>",
        function (instance, toast, button, e, inputs) {
            console.info(instance);
            console.info(toast);
            console.info(button);
            console.info(e);
            console.info(inputs);
        },
        true
    ]
});
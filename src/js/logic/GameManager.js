import ScoreRowContainer from "../components/ScoreRowContainer.js";
import DiceRollContainer from "../components/DiceRollContainer.js";
import SequentialPromiseChain from "../utilities/SequentialPromiseChain.js";
import Player from "./Player.js";

export default class GameManager {
    constructor() {
        this._scoreRow = new ScoreRowContainer();
        this._diceRoll = new DiceRollContainer();

        this._players = [];
    }

    start() {
        new Promise(resolve => {
            askGameType()
            .then(playGameSelected => {
                askHowManyPlayers()
                .then(numPlayers => {
                    this._players = []; // Maybe do this at the end before starting over
                    for (let i = 0; i < numPlayers; i++) {
                        this._players.push(new Player(i + 1));
                    }
                    resolve(playGameSelected);
                });
            });
        }).then(playGameSelected => {
            const promiseChain = new SequentialPromiseChain({
                array: this._players,
                promiseAccessor: player => rollDicePrompt(player.playerNumber)
                    .then(() => this._diceRoll.rollRemainingDice())
            });

            promiseChain.executeUntil(player => player.score >= 10000);
        });

        window.setTimeout(() => this._players[0].score = 10000, 10000);
    }
}

function askGameType() {
    return swal({
        title: "Game Mode",
        text: "Do you want to play the game or just keep score?",
        type: "question",
        confirmButtonText: "Play",
        cancelButtonText: "Score Only",
        showCancelButton: true
    }).then(result => result.value ? true : false);
}

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

function rollDicePrompt(playerNumber) {
    return swal({
        title: `Player ${playerNumber}`,
        confirmButtonText: "Roll Dice"
    });
}
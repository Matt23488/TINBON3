import ScoreRowContainer from "../components/ScoreRowContainer.js";
import DiceRollContainer from "../components/DiceRollContainer.js";
import Player from "./Player.js";

export default class GameManager {
    constructor() {
        this._scoreRow = new ScoreRowContainer();
        this._diceRoll = new DiceRollContainer();

        this._players = [];
    }

    async start() {
        let playGameSelected = false;
        let numPlayers = 0;

        async function gameLoop() {
            for (let i = 0; i < numPlayers; i++) {
                const player = this._players[i];
                if (playGameSelected) {
                    // TODO: Needs to be a loop here. Loop the rolling until
                    //       player stops scoring or busts.
                    await rollDicePrompt(player.playerNumber);
                    await this._diceRoll.rollRemainingDice();
                }
                else {
                    // TODO: This is just simulating each player taking 1 second on their turn.
                    //       It needs to be replaced with real logic for keeping score. Probably in
                    //       its own dialog, similar to how we select dice after we roll.
                    await new Promise(resolve => {
                        window.setTimeout(resolve, 1000);
                    });
                }
            }

            if (this._players.some(player => player.score >= 10000)) {
                console.log("End condition reached.");
                return false
            }
            else {
                return true;
            }
        }

        async function runOneGame() {
            this._players = [];
            playGameSelected = await askGameType();
            numPlayers = await askHowManyPlayers();
            for (let i = 0; i < numPlayers; i++) {
                this._players.push(new Player(i + 1));
            }

            // TODO: Remove this. This just makes sure the game will end when testing.
            window.setTimeout(() => this._players[0].score = 10000, 10000);
            while(await gameLoop.bind(this)());

            return await askToPlayAgain();
        }

        while(await runOneGame.bind(this)());
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
        }
    }).then(result => Number(result.value));
}

function rollDicePrompt(playerNumber) {
    return swal({
        title: `Player ${playerNumber}`,
        confirmButtonText: "Roll Dice"
    });
}

function askToPlayAgain() {
    return swal({
        title: "Play again",
        text: "Would you like to play another game?",
        type: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No"
    }).then(result => result.value ? true : false);
}
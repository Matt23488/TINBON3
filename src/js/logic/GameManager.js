import ScoreRowContainer from "../components/ScoreRowContainer.js";
import DiceRollContainer from "../components/DiceRollContainer.js";
import Player from "./Player.js";

export default class GameManager {
    constructor() {
        this._scoreRow = new ScoreRowContainer();
        this._diceRoll = new DiceRollContainer();

        this._players = [];
    }

    /**
     * Loads the ruleset into this._rules. It's safe to call if rules have already been loaded.
     */
    async loadRules() {
        if (!this._rules) {
            this._rules = await fetch("/src/rules.json").then(r => r.json());
        }
    }

    async start() {
        await this.loadRules();

        let playGameSelected = false;
        let numPlayers = 0;

        async function gameLoop() {
            for (let i = 0; i < numPlayers; i++) {
                const player = this._players[i];
                if (playGameSelected) {
                    // TODO: Needs to be a loop here. Loop the rolling until
                    //       player stops scoring or busts.
                    while(await askToRollDice(player.playerNumber)) {
                        await this._diceRoll.rollRemainingDice();
                        this._diceRoll.dice[0].value = 2;
                        this._diceRoll.dice[1].value = 2;
                        this._diceRoll.dice[2].value = 3;
                        this._diceRoll.dice[3].value = 3;
                        this._diceRoll.dice[4].value = 4;
                        this._diceRoll.dice[5].value = 6;
                        const matches = this._diceRoll.findScoreMatches(this._rules.scores);
                        if (matches.length === 0) {
                            await informOfBust();
                            break;
                        }
                        // { dice: string, selectedDOM: [] }[]
                        const selectedScores = askToScoreDice(this._diceRoll.dice);
                        // TODO: Find score values and increment the player's score accordingly
                        //       and also check if the dice they selected are valid. Probably need another loop here.
                        //       Which means we are getting many nested levels deep here, probably time to refactor.
                        //this._scoreRow.addScore(selectedScores.map(obj => obj.selectedDOM));
                    }
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

function askToRollDice(playerNumber) {
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

function informOfBust() {
    return swal({
        title: "Bust!",
        type: "error",
        showConfirmButton: false,
        allowOutsideClick: true,
        allowEscapeKey: true,
        toast: true,
        timer: 3000
    });
}

function askToScoreDice(dice) {
    return Promise.resolve(dice);
}
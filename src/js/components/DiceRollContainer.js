import Component from "./Component.js";
import Die from "./Die.js";
import { containsAll } from "../utilities/arrayUtils.js";

export default class DiceRollContainer extends Component {
    constructor() {
        super("diceRollContainer");

        super.appendTo("body");

        this.dice = [];

        for (let i = 0; i < 6; i++) {
            this.addDie(i + 1);
        }
    }

    _resetDice() {
        this.dice.forEach(die => die.scored = false);
    }

    addDie(value) {
        const die = new Die(this);
        die.value = value;
        this.dice.push(die);
    }

    // *findScoreMatches(scoreRules) {
    //     //const matches = [];
    //     const currentDice = this.dice.map(die => die.value);

    //     for (validScore of scoreRules) {
    //         // TODO: wildCards
    //         if (containsAll.bind(validScore.dice)(currentDice)) {
    //             // This means that the match was found.
    //             yield validScore;
    //         }
    //     }
    // }

    findScoreMatches(scoreRules) {
        const matches = [];
        const currentDice = this.dice.map(die => die.value);

        for (let validScore of scoreRules) {
            // TODO: wildCards
            if (containsAll(validScore.dice, currentDice)) {
                // This means that the match was found.
                matches.push(validScore);
            }
        }

        return matches;
    }

    rollRemainingDice() {
        // TODO: This should exclude dice that have been scored this round
        //this.dice.forEach(die => die.roll(1000));
        return Promise.all(this.dice.map(die => die.roll(1000)));
    }
}
import Component from "./Component.js";
import Die from "./Die.js";

export default class DiceRollContainer extends Component {
    constructor() {
        super("diceRollContainer");

        super.appendTo("body");

        this.dice = [];

        for (let i = 0; i < 6; i++) {
            this.addDie(i + 1);
        }
    }

    addDie(value) {
        const die = new Die(this);
        die.value = value;
        this.dice.push(die);
    }
}
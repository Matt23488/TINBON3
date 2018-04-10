import Component from "./Component.js";

export default class ScoreRowContainer extends Component {
    constructor() {
        super("scoreRowContainer");

        super.appendTo("body");
    }

    /**
     * Removes selected dice from dice pool and adds them to the scoring section.
     * @param {HTMLElement[][]} dice An array containing the dice DOM that needs to be scored.
     */
    addScore(dice) {
    }
}
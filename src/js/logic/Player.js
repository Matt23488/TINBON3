export default class Player {
    constructor(playerNumber) {
        this._score = 0;
        this._playerNumber = playerNumber;
    }

    get score() { return this._score; }
    set score(value) { this._score = value; }

    get playerNumber() { return this._playerNumber; }
}
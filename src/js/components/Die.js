import Component from "./Component.js";

export default class Die extends Component {
    constructor(diceRollContainer) {
        super("die");

        super.appendTo(diceRollContainer);
    }

    set value(val) {
        this._element.classList.remove(this._class);
        this._class = `die-${val}`;
        this._element.classList.add(this._class);
        this._value = val;
    }
    get value() {
        return this._value;
    }
}
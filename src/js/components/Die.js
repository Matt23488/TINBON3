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

    roll(timeout) {
        return new Promise(resolve => {
            const rolling = window.setInterval(() => {
                this.value = ~~(Math.random() * 6) + 1;
            }, 10);
            window.setTimeout(() => {
                window.clearInterval(rolling);
                resolve();
            }, timeout);
        });
    }
}
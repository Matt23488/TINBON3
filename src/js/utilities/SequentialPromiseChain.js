export default class SequentialPromiseChain {
    /**
     * Initialize the SequentialPromiseChain class.
     * @param {{ array: [], promiseAccessor?: (item) => Promise}} options Initialization options.
     */
    constructor(options) {
        if (!options) throw new Error("Missing 'options'.");
        if (!options.array) throw new Error("Missing required option 'array'.");
        if (!(options.array instanceof Array)) throw new Error("Invalid object passed as option 'array'.");
        if (options.array.length === 0) throw new Error("Option 'array' must have at least 1 item.");
        //if (!options.promiseAccessor && !(options.array[0] instanceof Promise)) throw new Error("Unable to resolve Promises from provided options.");

        // Technically missing validation for options.promiseAccessor to make sure it's a function
        let accessor = options.promiseAccessor;
        if (!accessor) {
            if (!(options.array[0] instanceof Promise)) throw new Error ("Unable to resolve Promises from provided options.");
            
            accessor = obj => obj;
        }
        else if (typeof accessor !== "function") throw new Error ("Invalid object passed as option 'promiseAccessor'.");

        this._array = options.array;
        this._accessor = accessor;
    }

    /**
     * Executes the promise chain over and over until the end condition is met.
     * @param {(item) => boolean} endCondition A function that will be applied to every item in the list and determine if the looping should stop.
     */
    executeUntil(endCondition) {
        function runThroughArray() {
            new Promise((resolve, reject) => {
                this._array.reduce((promise, current) => promise.then(() => this._accessor(current)), Promise.resolve())
                    .then(() => {
                        if (this._array.some(endCondition)) reject("End condition met.");
                        else resolve();
                    });
            }).then(runThroughArray.bind(this), console.log);
        }

        runThroughArray.bind(this)();
    }
}
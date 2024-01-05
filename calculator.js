import { EMPTY } from "./constants.js";

/** Calculator class that serves as interface with basic operations */
export class Calculator {
    /**
     * @type {string}
     */
    a = EMPTY;

    /**
     * @type {string}
     */
    b = EMPTY;

    /**
     * @type {string}
     */
    operator = EMPTY;

    /**
     * @returns {number}
     */
    add() {
        this.a += this.b
        this.b = EMPTY
        return this.a
    }
}

export class ScientificCalculator extends Calculator {
    sin() {
        console.log(this.a, this.b)
        this.a = Math.sin(this.b)
        this.b = EMPTY
        console.log(this.a, this.b)
        return this.a
    }
    cos() {
        this.a = Math.sin(this.b)
        this.b = EMPTY
        return this.a
    }
}

export class ProgrammingCalculator extends Calculator {
    shiftLeft() {
        this.a = (this.a << this.b)
        this.b = EMPTY
        return this.a
    }
    //...
}

export class CalculatorFactory {
    createCalculator(type) {
        switch (type) {
            case "scientific":
                return new ScientificCalculator();
            case "programming":
                return new ProgrammingCalculator();
            default:
                return new Calculator();
        }
    }
}

/**Singleton class to prevent multiple instances of the app*/
export class CalculatorApp {
    calculatorFactory = null;

    constructor() {
        if (CalculatorApp.instance) {
            throw new Error("Singleton classes can't be instantiated more than once.")
        }
        this.calculatorFactory = new CalculatorFactory()
        CalculatorApp.instance = this;
    }

    createCalculator(type) {
        return this.calculatorFactory.createCalculator(type);
    }
}
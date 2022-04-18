import React from "react";
import { useState } from "react";

const Calculator = () => {
    const [calc, setCalc] = useState("");
    const [result, setResult] = useState('0');

    const ops = ['/', '*', '-', '+', '.'];
    const updateCalc = value => {
        if (
            ops.includes(value) && calc === '' ||
            ops.includes(value) && ops.includes(calc.slice(-1))
        ) {
            return;
        }
        setCalc(calc + value);

        if (!ops.includes(value)) {
            setResult(eval(calc + value).toString());
        }
    }

    const createNumber = () => {
        const number = [];

        for (let i = 1; i < 10; i++) {
            number.push(
                <button onClick={() => updateCalc(i.toString())} key={i}><span>{i}</span></button>
            )
        }
        return number;
    };
    const calculate = () => {
        setCalc(eval(calc).toString());
    }
    const clearDisplay = () => {
        if (calc === '') {
            return;
        }
        const value = calc;
        setCalc(value);
    }

    return (
        <div className="wrapper">
            <div className="display">
                {result ? <span>({result})</span> : ''} {calc || "0"}
            </div>
            <div className="operators">
                <button onClick={() => updateCalc('/')}>/</button>
                <button onClick={() => updateCalc('*')}>*</button>
                <button onClick={() => updateCalc('-')}>-</button>
                <button onClick={() => updateCalc('+')}>+</button>

                <button onClick={clearDisplay}>C</button>
            </div>
            <div className="digits">
                {createNumber()}

                <button onClick={() => updateCalc('0')}>0</button>
                <button onClick={() => updateCalc('.')}>.</button>
                <button onClick={calculate}>=</button>
            </div>
            {/* <h1>Result: {result}</h1>
            <h3>Value: {value}</h3>
            <input type="text" value={value}
                onChange={event => setValue(event.target.value)}
            /> */}
        </div>
    );
};

export default Calculator;
import React, { useState } from "react";
import './styles/App.css'
// import Calculator from "./components/calculator";
import Wrapper from "./components/wrapper";
import Display from "./components/screen";
import Digits from "./components/digits";
import Buttons from "./components/buttons";
// import Operators from "./components/operators";

const btnValues = [
	["+-", "%", "C", "/"],
	[7, 8, 9, "X"],
	[4, 5, 6, "-"],
	[1, 2, 3, "+"],
	[0, ".", "="],
];

const App = () => {
	let [calc, setCalc] = useState({
		sign: "",
		num: 0,
		res: 0,
	});
	const numClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;

		if (removeSpaces(calc.num).length < 16) {
			setCalc({
				...calc,
				num:
					calc.num === 0 && value === "0"
						? "0"
						: removeSpaces(calc.num) % 1 === 0
							? toLocaleString(Number(removeSpaces(calc.num + value)))
							: toLocaleString(calc.num + value),
				res: !calc.sign ? 0 : calc.res,
			});
		}
	};
	// ----------------------------------------commaClickHandler function
	const commaClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;

		setCalc({
			...calc,
			num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
		});
	};
	// ----------------------------------------signClickHandler function
	const signClickHandler = (e) => {
		e.preventDefault();
		const value = e.target.innerHTML;

		setCalc({
			...calc,
			sign: value,
			res: !calc.res && calc.num ? calc.num : calc.res,
			num: 0,
		});
	};
	// ----------------------------------------equalsClickHandler function
	const equalsClickHandler = () => {
		if (calc.sign && calc.num) {
			const math = (a, b, sign) =>
				sign === "+"
					? a + b
					: sign === "-"
						? a - b
						: sign === "X"
							? a * b
							: a / b;

			setCalc({
				...calc,
				res:
					calc.num === "0" && calc.sign === "/"
						? "Can't divide with 0"
						: toLocaleString(
							math(
								Number(removeSpaces(calc.res)),
								Number(removeSpaces(calc.num)),
								calc.sign
							)
						),
				sign: "",
				num: 0,
			});
		}
	};
	// ----------------------------------------invertClickHandler function
	const invertClickHandler = () => {
		setCalc({
			...calc,
			num: calc.num ? toLocaleString(removeSpaces(calc.num) * -1) : 0,
			res: calc.res ? toLocaleString(removeSpaces(calc.res) * -1) : 0,
			sign: "",
		});
	};
	// ----------------------------------------percentClickHandler function
	const percentClickHandler = () => {
		let num = calc.num ? parseFloat(removeSpaces(calc.num)) : 0;
		let res = calc.res ? parseFloat(removeSpaces(calc.res)) : 0;

		setCalc({
			...calc,
			num: (num /= Math.pow(100, 1)),
			res: (res /= Math.pow(100, 1)),
			sign: "",
		});
	};
	// ----------------------------------------resetClickHandler function
	const resetClickHandler = () => {
		setCalc({
			...calc,
			sign: "",
			num: 0,
			res: 0,
		});
	};
	const toLocaleString = (num) =>
		String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

	const removeSpaces = (num) => num.toString().replace(/\s/g, "");
	return (
		<Wrapper>
			<Display value={calc.num ? calc.num : calc.res} />
			<Digits>
				{
					btnValues.flat().map((btn, i) => {
						return (
							<Buttons
								key={i}
								className={btn === "=" ? "operators" :
									btn === "C" ? "operators" :
										btn === "+-" ? "operators" :
											btn === "%" ? "operators" :
												btn === "/" ? "operators" :
													btn === "X" ? "operators" :
														btn === "-" ? "operators" :
															btn === "+" ? "operators" : ""
								}
								value={btn}
								onClick={
									btn === "C"
										? resetClickHandler
										: btn === "+-"
											? invertClickHandler
											: btn === "%"
												? percentClickHandler
												: btn === "="
													? equalsClickHandler
													: btn === "/" || btn === "X" || btn === "-" || btn === "+"
														? signClickHandler
														: btn === "."
															? commaClickHandler
															: numClickHandler
								}
							/>
						);
					})
				}
			</Digits>
		</Wrapper>
	);
};

export default App;


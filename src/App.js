import * as React from "react";
import * as ReactDOM from "react-dom";
import './App.css';

const calculateButtonData = [
  { id: "clear", value: "AC" },
  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." },
];

const operators = ["AC", "/", "x", "+", "-", "="];

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const Display = ({ input, output }) => (
  <div className="output">
    <span className="result">{output}</span>
    <span id="display" className="input">{input}</span>
  </div>
);

const CalculatorButton = ({ keyData: { id, value }, handleInput }) => (
  <button id={id} onClick={() => handleInput(value)}>
    {value}
  </button>
);

const Keyboard = ({ handleInput }) => (
  <div className="keys">
    {calculateButtonData.map((key) => (
      <CalculatorButton key={key.id} keyData={key} handleInput={handleInput} />
    ))}
  </div>
);

const App = () => {
const [input, setInput] = React.useState("0");
  const [output, setOutput] = React.useState("");
  const [data, setCalculatorData] = React.useState("");

  const handleSubmit = () => {
    console.log({ calculatorData: data });

    const total = eval(data);
    setInput(total);
    setOutput(`${total} = ${total}`);
    setCalculatorData(`${total}`);
  };

  const handleClear = () => {
    setInput("0");
    setCalculatorData("");
  };

  const handleNumbers = (value) => {
    if (!data.length) {
      setInput(`${value}`);
      setCalculatorData(`${value}`);
    } else {
      if (value === 0 && (data === "0" || input === "0")) {
        setCalculatorData(`${data}`);
      } else {
        const lastChat = data.charAt(data.length - 1);
        const isLastChatOperator =
          lastChat === "*" || operators.includes(lastChat);

        setInput(isLastChatOperator ? `${value}` : `${input}${value}`);
        setCalculatorData(`${data}${value}`);
      }
    }
  };

  const dotOperator = () => {
    const lastChat = data.charAt(data.length - 1);
    if (!data.length) {
      setInput("0.");
      setCalculatorData("0.");
    } else {
      if (lastChat === "*" || operators.includes(lastChat)) {
        setInput("0.");
        setCalculatorData(`${data} 0.`);
      } else {
        setInput(
          lastChat === "." || input.includes(".") ? `${input}` : `${input}.`
        );
        const formattedValue =
          lastChat === "." || input.includes(".")
            ? `${data}`
            : `${data}.`;
        setCalculatorData(formattedValue);
      }
    }
  };


  const handleOperators = (value) => {
    if (data.length) {
      setInput(`${value}`);
      const beforeLastChat = data.charAt(data.length - 2);

      const beforeLastChatIsOperator =
        operators.includes(beforeLastChat) || beforeLastChat === "*";

      const lastChat = data.charAt(data.length - 1);
      
      const lastChatIsOperator = operators.includes(lastChat) || lastChat === "*";
      
      const validOp = value === "x" ? "*" : value;
      if (
        (lastChatIsOperator && value !== "-") ||
        beforeLastChatIsOperator && lastChatIsOperator
      ) {
        if (beforeLastChatIsOperator) {
          const updatedValue = `${data.substring(
            0,
            data.length - 2
          )}${value}`;
          setCalculatorData(updatedValue);
        } else {
          setCalculatorData(`${data.substring(0, data.length - 1)}${validOp}`);
        }
      } else {
        setCalculatorData(`${data}${validOp}`);
      }
    }
  };

  const handleInput = (value) => {
    const number = numbers.find((num) => num === value);
    const operator = operators.find((op) => op === value);

    switch (value) {
      case "=":
        handleSubmit();
        break;
      case "AC":
        handleClear();
        break;
      case number:
        handleNumbers(value);
        break;
      case ".":
        dotOperator(value);
        break;
      case operator:
        handleOperators(value);
        break;
      default:
        break;
    }
  };

  const handleOutput = () => {
    setOutput(data);
  };

  React.useEffect(() => {
    handleOutput();
  }, [data]);

  return (
    <div className="container">
      <div className="calculator">
        <Display input={input} output={output} />
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById("app"))

export default App;

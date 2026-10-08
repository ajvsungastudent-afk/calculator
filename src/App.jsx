import { useState } from 'react';
import './App.css';

function CalcDisplay({ dispValue }) {
  return <div className="Display">{dispValue}</div>;
}

function CalcButton({ buttonLabel, onClick, className }) {
  return (
    <button className={className || 'button'} onClick={() => onClick(buttonLabel)}>
      {buttonLabel}
    </button>
  );
}

function App() {
  const [disp, setDisp] = useState('0');
  const [operand1, setOperand1] = useState(null);
  const [operation, setOperation] = useState(null);
  const [waitingForNext, setWaitingForNext] = useState(false);

  // Number Button Handler
  const numButtonClickHandler = (value) => {
    if (waitingForNext || disp === '0' || disp === 'Alvin Jan Sunga' || disp === 'Error') {
      setDisp(value);
      setWaitingForNext(false);
    } else {
      setDisp((prev) => prev + value);
    }
  };

  // Operation Button Handler (+, -, *, /)
  const operationClickHandler = (op) => {
    setOperand1(parseFloat(disp));
    setOperation(op);
    setDisp(op); // Shows ONLY the operator symbol (+, -, *, /)
    setWaitingForNext(true); // Prepares display to clear when typing next number
  };

  // Clear Button Handler
  const clearButtonClickHandler = () => {
    setDisp('0');
    setOperand1(null);
    setOperation(null);
    setWaitingForNext(false);
  };

  // Equal Button Handler
  const equalButtonClickHandler = () => {
    if (operand1 !== null && operation !== null) {
      const operand2 = parseFloat(disp);

      if (isNaN(operand2)) return;

      let result = 0;

      switch (operation) {
        case '+':
          result = operand1 + operand2;
          break;
        case '-':
          result = operand1 - operand2;
          break;
        case '*':
          result = operand1 * operand2;
          break;
        case '/':
          result = operand2 !== 0 ? operand1 / operand2 : 'Error';
          break;
        default:
          return;
      }

      setDisp(String(result));
      setOperand1(null);
      setOperation(null);
      setWaitingForNext(true);
    }
  };

  // Surname Button Handler
  const nameButtonClickHandler = () => {
    setDisp('Alvin Jan Sunga');
    setOperand1(null);
    setOperation(null);
    setWaitingForNext(true);
  };

  return (
    <div className="App">
      <div className="Header">Calculator of Alvin Jan Sunga - WMB 3A</div>
      <div className="calculator">
        <CalcDisplay dispValue={disp} />

        <div className="Keypad">
          <CalcButton buttonLabel={'7'} onClick={numButtonClickHandler} />
          <CalcButton buttonLabel={'8'} onClick={numButtonClickHandler} />
          <CalcButton buttonLabel={'9'} onClick={numButtonClickHandler} />
          <CalcButton className="operator" buttonLabel={'/'} onClick={operationClickHandler} />

          <CalcButton buttonLabel={'4'} onClick={numButtonClickHandler} />
          <CalcButton buttonLabel={'5'} onClick={numButtonClickHandler} />
          <CalcButton buttonLabel={'6'} onClick={numButtonClickHandler} />
          <CalcButton className="operator" buttonLabel={'*'} onClick={operationClickHandler} />

          <CalcButton buttonLabel={'1'} onClick={numButtonClickHandler} />
          <CalcButton buttonLabel={'2'} onClick={numButtonClickHandler} />
          <CalcButton buttonLabel={'3'} onClick={numButtonClickHandler} />
          <CalcButton className="operator" buttonLabel={'-'} onClick={operationClickHandler} />

          <CalcButton className="dark-button" buttonLabel={'C'} onClick={clearButtonClickHandler} />
          <CalcButton buttonLabel={'0'} onClick={numButtonClickHandler} />
          <CalcButton className="dark-button" buttonLabel={'='} onClick={equalButtonClickHandler} />
          <CalcButton className="operator" buttonLabel={'+'} onClick={operationClickHandler} />

          <CalcButton className="name-button" buttonLabel={'SUNGA'} onClick={nameButtonClickHandler} />
        </div>
      </div>
    </div>
  );
}

export default App;
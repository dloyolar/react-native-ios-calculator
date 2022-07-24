import {useRef, useState} from 'react';

enum Operators {
  sum,
  substract,
  multiply,
  divide,
}

export const useCalculator = () => {
  const [number, setNumber] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('0');

  const lastOperation = useRef<Operators>();

  const clean = () => {
    setNumber('0');
    setPreviousNumber('0');
  };

  const buildNumber = (value: string) => {
    if (number.includes('.') && value === '.') {
      return;
    }
    if (number.startsWith('0') || number.startsWith('-0')) {
      if (value === '.' || number.includes('.')) {
        setNumber(number + value);
      } else {
        setNumber(value);
      }
      return;
    }

    setNumber(number + value);
  };

  const onDelete = () => {
    if (number.length === 1 || (number.length === 2 && number.includes('-'))) {
      return setNumber('0');
    }
    setNumber(number.slice(0, -1));
  };

  const positiveNegative = () => {
    number.includes('-')
      ? setNumber(number.replace('-', ''))
      : setNumber('-' + number);
  };

  const changePreviousNumber = () => {
    number.endsWith('.')
      ? setPreviousNumber(number.slice(0, -1))
      : setPreviousNumber(number);

    setNumber('0');
  };

  const btnDivide = () => {
    changePreviousNumber();
    lastOperation.current = Operators.divide;
  };

  const btnMultiply = () => {
    changePreviousNumber();
    lastOperation.current = Operators.multiply;
  };

  const btnSubstract = () => {
    changePreviousNumber();
    lastOperation.current = Operators.substract;
  };

  const btnSum = () => {
    changePreviousNumber();
    lastOperation.current = Operators.sum;
  };

  const calculate = () => {
    const num1 = Number(number);
    const num2 = Number(previousNumber);
    if (num1 === 0 && num2 === 0) {
      return setNumber('0');
    }
    switch (lastOperation.current) {
      case Operators.sum:
        setNumber(`${num1 + num2}`);
        break;
      case Operators.substract:
        setNumber(`${num2 - num1}`);
        break;
      case Operators.multiply:
        setNumber(`${num1 * num2}`);
        break;
      case Operators.divide:
        const result = num2 / num1;
        !isFinite(result) ? setNumber('Error') : setNumber(`${result}`);

        break;

      default:
        break;
    }
    setPreviousNumber('0');
  };
  return {
    number,
    previousNumber,
    clean,
    buildNumber,
    onDelete,
    positiveNegative,
    btnDivide,
    btnMultiply,
    btnSubstract,
    btnSum,
    calculate,
  };
};

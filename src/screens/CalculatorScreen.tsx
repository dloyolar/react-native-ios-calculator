import React, {useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {ButtonCalc} from '../components/ButtonCalc';
import {styles} from '../theme/appTheme';

enum Operators {
  sum,
  substract,
  multiply,
  divide,
}

export const CalculatorScreen = () => {
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

  return (
    <View style={styles.calculatorContainer}>
      {previousNumber !== '0' && (
        <Text style={styles.smallResult}>{previousNumber}</Text>
      )}

      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {number}
      </Text>

      <View style={styles.row}>
        <ButtonCalc text="C" color="#9B9B9B" action={clean} />
        <ButtonCalc text="+/-" color="#9B9B9B" action={positiveNegative} />
        <ButtonCalc text="del" color="#9B9B9B" action={onDelete} />
        <ButtonCalc text="/" color="#FF9427" action={btnDivide} />
      </View>
      <View style={styles.row}>
        <ButtonCalc text="7" action={buildNumber} />
        <ButtonCalc text="8" action={buildNumber} />
        <ButtonCalc text="9" action={buildNumber} />
        <ButtonCalc text="X" color="#FF9427" action={btnMultiply} />
      </View>
      <View style={styles.row}>
        <ButtonCalc text="4" action={buildNumber} />
        <ButtonCalc text="5" action={buildNumber} />
        <ButtonCalc text="6" action={buildNumber} />
        <ButtonCalc text="-" color="#FF9427" action={btnSubstract} />
      </View>
      <View style={styles.row}>
        <ButtonCalc text="1" action={buildNumber} />
        <ButtonCalc text="2" action={buildNumber} />
        <ButtonCalc text="3" action={buildNumber} />
        <ButtonCalc text="+" color="#FF9427" action={btnSum} />
      </View>
      <View style={styles.row}>
        <ButtonCalc text="0" large action={buildNumber} />
        <ButtonCalc text="." action={buildNumber} />
        <ButtonCalc text="=" color="#FF9427" action={calculate} />
      </View>
    </View>
  );
};

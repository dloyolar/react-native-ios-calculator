import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {ButtonCalc} from '../components/ButtonCalc';
import {styles} from '../theme/appTheme';

export const CalculatorScreen = () => {
  const [number, setNumber] = useState('0');
  const [previousNumber, setPreviousNumber] = useState('0');

  const clean = () => {
    setNumber('0');
  };

  const buildNumber = (textNumber: string) => {
    setNumber(number + textNumber);
  };

  return (
    <View style={styles.calculatorContainer}>
      <Text style={styles.smallResult}>{previousNumber}</Text>
      <Text style={styles.result} numberOfLines={1} adjustsFontSizeToFit>
        {number}
      </Text>

      <View style={styles.row}>
        <ButtonCalc text="C" color="#9B9B9B" action={clean} />
        <ButtonCalc text="+/-" color="#9B9B9B" action={clean} />
        <ButtonCalc text="del" color="#9B9B9B" action={clean} />
        <ButtonCalc text="/" color="#FF9427" action={clean} />
      </View>
      <View style={styles.row}>
        <ButtonCalc text="7" action={buildNumber} />
        <ButtonCalc text="8" action={buildNumber} />
        <ButtonCalc text="9" action={buildNumber} />
        <ButtonCalc text="X" color="#FF9427" action={clean} />
      </View>
      <View style={styles.row}>
        <ButtonCalc text="4" action={buildNumber} />
        <ButtonCalc text="5" action={buildNumber} />
        <ButtonCalc text="6" action={buildNumber} />
        <ButtonCalc text="-" color="#FF9427" action={clean} />
      </View>
      <View style={styles.row}>
        <ButtonCalc text="1" action={buildNumber} />
        <ButtonCalc text="2" action={buildNumber} />
        <ButtonCalc text="3" action={buildNumber} />
        <ButtonCalc text="+" color="#FF9427" action={clean} />
      </View>
      <View style={styles.row}>
        <ButtonCalc text="0" large action={buildNumber} />
        <ButtonCalc text="." action={buildNumber} />
        <ButtonCalc text="=" color="#FF9427" action={clean} />
      </View>
    </View>
  );
};

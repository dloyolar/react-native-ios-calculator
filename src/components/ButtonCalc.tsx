import React from 'react';
import {View, Text} from 'react-native';
import {styles} from '../theme/appTheme';

interface Props {
  text: string;
  color?: string;
}

export const ButtonCalc = ({text, color = '#2D2D2D'}: Props) => {
  const textColor = color === '#9B9B9B' ? 'black' : 'white';
  return (
    <View style={{...styles.button, backgroundColor: color}}>
      <Text
        style={{
          ...styles.buttonText,
          color: textColor,
        }}>
        {text}
      </Text>
    </View>
  );
};

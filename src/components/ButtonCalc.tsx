import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../theme/appTheme';

interface Props {
  text: string;
  color?: string;
  large?: boolean;
  action: (textNumber: string) => void;
}

export const ButtonCalc = ({text, color = '#2D2D2D', large, action}: Props) => {
  const textColor = color === '#9B9B9B' ? 'black' : 'white';
  const btnWidth = large ? 180 : 80;
  return (
    <TouchableOpacity onPress={() => action(text)}>
      <View
        style={{
          ...styles.button,
          backgroundColor: color,
          width: btnWidth,
        }}>
        <Text
          style={{
            ...styles.buttonText,
            color: textColor,
          }}>
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

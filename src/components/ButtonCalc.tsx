import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {styles} from '../theme/appTheme';

interface Props {
  text: string;
  color?: string;
  large?: boolean;
}

export const ButtonCalc = ({text, color = '#2D2D2D', large}: Props) => {
  const textColor = color === '#9B9B9B' ? 'black' : 'white';
  const btnWidth = large ? 180 : 80;
  return (
    <TouchableOpacity>
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

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Icon, useTheme} from '@ui-kitten/components';

interface Props {
    name: string;
    color?: string;
    white?: boolean;
    styles?: any;
}

export const MyIcon = ({ name, color, white = false , styles}: Props) => {

    const theme = useTheme();

    if(white){
        color = theme['color-info-100'];
    }else if (!color){
        color = theme['text-basic-color']
    }else {
        color = theme[color] ?? theme['text-basic-color']
    }
    return (
        <Icon
            style={styles}
            fill={color}
            name={name}
        />
    )
}

const styles = StyleSheet.create({
   
  });


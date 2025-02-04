import React from 'react';
import { View, StyleSheet, Animated, Easing, Image } from 'react-native';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components';


const SpiderSpinner = () => {
    const theme = useTheme();

    return (
        <View style={styles.container}>

  
            <Image
                source={require('../../../assets/spider-man.png')} 

            />
            <Spinner size='giant' />
           
            <Text category='h6' style={[styles.loadingText, {
                color: theme['color-primary-500']
            }]}>
                LANZANDO TELARAÑAS...
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },
  
    loadingText: {
        marginTop: 20,
        fontWeight: 'bold',
        letterSpacing: 1.5,
        fontFamily: 'Bangers-Regular', 
    }
});

export default SpiderSpinner;
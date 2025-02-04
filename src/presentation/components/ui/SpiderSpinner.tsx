import React from 'react';
import { View, StyleSheet, Animated, Easing, Image } from 'react-native';
import { Layout, Spinner, Text } from '@ui-kitten/components';
import { useTheme } from '@ui-kitten/components';


const SpiderSpinner = () => {
    const theme = useTheme();

    return (
        <View style={styles.container}>

            {/* Spider logo central */}
            <Image
                source={require('../../../assets/spider-man.png')} // Asegúrate de tener este asset

            />
            <Spinner size='giant' />
            {/* Texto de carga */}
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
        fontFamily: 'Bangers-Regular', // Usar fuente Bangers si está disponible
    }
});

export default SpiderSpinner;
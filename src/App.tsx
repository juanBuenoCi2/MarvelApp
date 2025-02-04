import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigator } from './presentation/navigation/StackNavigator';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { useColorScheme } from 'react-native';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { AuthProvider } from './presentation/context/AuthContext';


const marvelColors = {
  primaryRed: '#ED1D24',    
  darkRed: '#9F1116',       
  marvelBlack: '#000000',   
  marvelWhite: '#FFFFFF',  
  accentGold: '#FFD700',    
  secondaryGrey: '#2C2C2C' 
};


const customEva = {
  ...eva,
  light: {
    ...eva.light,
    "color-primary-500": marvelColors.primaryRed,
    "color-primary-600": marvelColors.darkRed,
    "color-basic-100": marvelColors.marvelWhite,
    "color-basic-800": marvelColors.marvelBlack,
    "color-basic-1000": marvelColors.marvelBlack,
    "color-basic-500": marvelColors.secondaryGrey,
    "color-accent-500": marvelColors.accentGold,
    "background-basic-color-1": marvelColors.marvelWhite,
    "text-basic-color": marvelColors.marvelBlack,
  },
  dark: {
    ...eva.dark,
    "color-primary-500": marvelColors.primaryRed,
    "color-primary-600": marvelColors.darkRed,
    "color-basic-100": marvelColors.marvelBlack,
    "color-basic-800": marvelColors.marvelWhite,
    "color-basic-1000": marvelColors.marvelWhite,
    "color-basic-500": marvelColors.secondaryGrey,
    "color-accent-500": marvelColors.accentGold,
    "background-basic-color-1": marvelColors.marvelBlack,
    "text-basic-color": marvelColors.marvelWhite,
  }
};

export const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? customEva.dark : customEva.light;

  const navigationTheme = {
    dark: colorScheme === 'dark',
    colors: {
      primary: theme['color-primary-500'],
      background: theme['background-basic-color-1'],
      card: theme['color-primary-500'], 
      text: theme['text-basic-color'],
      border: theme['color-basic-500'],
      notification: theme['color-accent-500']
    }
  };

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={theme}>
        <AuthProvider>
          <NavigationContainer theme={navigationTheme}>
            <StackNavigator />
          </NavigationContainer>
        </AuthProvider>
      </ApplicationProvider>
    </>
  );
};
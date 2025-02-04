import { createStackNavigator, StackCardInterpolatedStyle, StackCardStyleInterpolator } from '@react-navigation/stack';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { HomeScreen } from '../screens/home/HomeScreen';
import { DetailsScreen } from '../screens/details/DetailsScreen';
import { Heroes } from '../../core/modelos/heroes.entity';


export type RootStackParams = {
    LoadingScreen: undefined;
    LoginScreen: undefined;
    HomeScreen: undefined;
    DetailsScreen: {heroe: Heroes};
}

const Stack = createStackNavigator<RootStackParams>();

const fadeAnimation: StackCardStyleInterpolator = ({current}) => {
  return{
    cardStyle:{
      opacity: current.progress,
    }
  }
}

export const StackNavigator = () => {
  return (
    <Stack.Navigator 
      initialRouteName='LoginScreen' 
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}}name="LoadingScreen" component={LoadingScreen} />
      <Stack.Screen options={{cardStyleInterpolator: fadeAnimation}}name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
    </Stack.Navigator>
  );
}
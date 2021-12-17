import React from 'react';
import AppLoading from 'expo-app-loading';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import { AppRoutes } from './src/routes/app.routes';
import { ThemeProvider } from 'styled-components';
import theme from './src/global/styles/theme';
import { NavigationContainer } from '@react-navigation/native';

import { SignIn } from './src/screens/SignIn';

import {
  useFonts, 
  Poppins_400Regular, 
  Poppins_500Medium, 
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import { StatusBar } from 'react-native';

export default function App() {  
  const [fontsLoaded] = useFonts({
    Poppins_400Regular, Poppins_500Medium, Poppins_700Bold
  })

  if(!fontsLoaded) {
    return <AppLoading />
  }
  
  return (
    <ThemeProvider theme={theme}>
      <NavigationContainer>
        <StatusBar barStyle="light-content"/>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}

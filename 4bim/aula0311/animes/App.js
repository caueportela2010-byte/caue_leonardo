import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/login/Login';
import Cadastro from './screens/cadastro/Cadastro';
import Home from './screens/home/Home';
import Perfil from './screens/perfil/Perfil';
import Editar from './screens/editar/Editar';
import Favoritos from './screens/favoritos/Favoritos';
import Sobre from './screens/sobre/Sobre';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: { backgroundColor: '#171329' },
          headerTintColor: '#FFFFFF',
          headerTitleStyle: { fontWeight: 'bold' },
          contentStyle: { backgroundColor: '#100D1C' },
        }}
      >
        <Stack.Screen name="Login" component={Login}
          options={{ headerShown: false }} />

        <Stack.Screen name="Cadastro" component={Cadastro}
          options={{ title: 'Criar conta' }} />

        <Stack.Screen name="Home" component={Home}
          options={{ title: 'AnimeVerse' }} />

        <Stack.Screen name="Perfil" component={Perfil}
          options={{ title: 'Meu perfil' }} />

        <Stack.Screen name="Editar" component={Editar}
          options={{ title: 'Editar perfil' }} />

        <Stack.Screen name="Favoritos" component={Favoritos}
          options={{ title: 'Meus favoritos' }} />

        <Stack.Screen name="Sobre" component={Sobre}
          options={{ title: 'Sobre o AnimeVerse' }} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
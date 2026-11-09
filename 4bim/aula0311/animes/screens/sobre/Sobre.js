
import React from 'react';

import {
  View,
  Text
} from 'react-native';

import Menu from '../../components/Menu';

import estilos from './estilo';

export default function Sobre({ navigation }) {

  return (

    <View style={estilos.container}>

      <Text style={estilos.logo}>
        AnimeVerse
      </Text>

      <Text style={estilos.titulo}>
        Sobre o aplicativo
      </Text>

      <Text style={estilos.texto}>
        O AnimeVerse é um aplicativo feito para fãs de animes.
        Aqui você pode conhecer títulos, consultar informações
        e guardar seus animes favoritos.
      </Text>

      <Text style={estilos.texto}>
        O aplicativo utiliza React Native, Expo,
        React Navigation e Firebase.
      </Text>

      <Menu navigation={navigation} />

    </View>

  );
}

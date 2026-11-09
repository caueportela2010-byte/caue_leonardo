
import React from 'react';

import {
  View,
  TouchableOpacity,
  Text
} from 'react-native';

export default function Menu({ navigation }) {

  const itens = [
    ['Início', 'Home'],
    ['Favoritos', 'Favoritos'],
    ['Perfil', 'Perfil'],
    ['Sobre', 'Sobre']
  ];

  return (
    <View style={{
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      backgroundColor: '#1B1729',
      paddingVertical: 12,
      borderRadius: 12,
      marginTop: 18
    }}>

      {itens.map(([titulo, tela]) => (

        <TouchableOpacity
          key={tela}
          onPress={() => navigation.navigate(tela)}
          style={{ padding: 8 }}
        >
          <Text style={{
            color: '#D2B8FF',
            fontWeight: 'bold'
          }}>
            {titulo}
          </Text>
        </TouchableOpacity>

      ))}

    </View>
  );
}

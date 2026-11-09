
import React from 'react';

import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native';

export default function AnimeCard({ anime, favorito, onFavoritar }) {

  return (
    <View style={{
      backgroundColor: '#241F35',
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: '#403454'
    }}>

      <Image
        source={{ uri: anime.imagem }}
        style={{ width: '100%', height: 175 }}
        resizeMode="cover"
      />

      <View style={{ padding: 13 }}>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>

          <Text style={{
            color: '#FFFFFF',
            fontSize: 18,
            fontWeight: 'bold',
            flex: 1
          }}>
            {anime.nome}
          </Text>

          <TouchableOpacity onPress={() => onFavoritar(anime)}>
            <Text style={{ color: '#D2B8FF', fontSize: 24 }}>
              {favorito ? '♥' : '♡'}
            </Text>
          </TouchableOpacity>

        </View>

        <Text style={{ color: '#B99AFF', marginTop: 4 }}>
          {anime.genero}
        </Text>

        <Text style={{
          color: '#D7D1E5',
          marginTop: 8,
          lineHeight: 20
        }}>
          {anime.descricao}
        </Text>

      </View>
    </View>
  );
}

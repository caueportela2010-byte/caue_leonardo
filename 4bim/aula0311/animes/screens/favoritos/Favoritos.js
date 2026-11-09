
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator
} from 'react-native';

import { onAuthStateChanged } from 'firebase/auth';

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot
} from 'firebase/firestore';

import { auth, db } from '../../firebase/firebase';

import AnimeCard from '../../components/AnimeCard';
import Menu from '../../components/Menu';

import estilos from './estilo';

export default function Favoritos({ navigation }) {

  const [itens, setItens] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {

    let unsubscribeDados = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {

      unsubscribeDados();

      if (!user) {

        setItens([]);
        setCarregando(false);
        navigation.replace('Login');

        return;
      }

      const ref = collection(
        db,
        'usuarios',
        user.uid,
        'favoritos'
      );

      unsubscribeDados = onSnapshot(

        ref,

        (snapshot) => {

          setItens(
            snapshot.docs.map((item) => ({
              id: item.id,
              ...item.data()
            }))
          );

          setCarregando(false);

        },

        () => {

          setCarregando(false);

          Alert.alert(
            'Erro',
            'Não foi possível carregar os favoritos.'
          );

        }

      );

    });

    return () => {
      unsubscribeAuth();
      unsubscribeDados();
    };

  }, [navigation]);

  async function remover(anime) {

    const user = auth.currentUser;

    if (!user) return;

    try {

      await deleteDoc(
        doc(db, 'usuarios', user.uid, 'favoritos', anime.id)
      );

    } catch {

      Alert.alert(
        'Erro',
        'Não foi possível remover o favorito.'
      );

    }

  }

  return (

    <FlatList

      style={estilos.container}

      contentContainerStyle={estilos.conteudo}

      data={itens}

      keyExtractor={(item) => item.id}

      renderItem={({ item }) => (

        <AnimeCard
          anime={item}
          favorito={true}
          onFavoritar={remover}
        />

      )}

      ListHeaderComponent={

        <View>

          <Text style={estilos.titulo}>
            Seus animes favoritos
          </Text>

          <Menu navigation={navigation} />

        </View>

      }

      ListEmptyComponent={

        carregando

          ? <ActivityIndicator
              color="#B99AFF"
              style={{ marginTop: 30 }}
            />

          : <Text style={estilos.vazio}>
              Você ainda não adicionou animes aos favoritos.
            </Text>

      }

    />

  );
}

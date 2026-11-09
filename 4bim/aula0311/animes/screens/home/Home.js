import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  FlatList,
  Alert,
  ActivityIndicator
} from 'react-native';

import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc
} from 'firebase/firestore';

import { onAuthStateChanged } from 'firebase/auth';

import { auth, db } from '../../firebase/firebase';

import AnimeCard from '../../components/AnimeCard';
import Menu from '../../components/Menu';

import estilos from './estilo';

const animes = [

  {
    id: 'naruto',
    nome: 'Naruto',
    genero: 'Ação • Aventura',
    descricao: 'Naruto Uzumaki sonha em se tornar Hokage e conquistar o reconhecimento de sua vila.',
    imagem: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=900'
  },

  {
    id: 'one-piece',
    nome: 'One Piece',
    genero: 'Aventura • Fantasia',
    descricao: 'Luffy e sua tripulação partem em busca do lendário tesouro One Piece.',
    imagem: 'https://images.unsplash.com/photo-1614583225154-5fc32b8ca702?w=900'
  },

  {
    id: 'demon-slayer',
    nome: 'Demon Slayer',
    genero: 'Ação • Sobrenatural',
    descricao: 'Tanjiro enfrenta demônios enquanto procura uma maneira de salvar sua irmã.',
    imagem: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=900'
  },

  {
    id: 'jujutsu-kaisen',
    nome: 'Jujutsu Kaisen',
    genero: 'Ação • Sobrenatural',
    descricao: 'Yuji Itadori entra no mundo das maldições após um encontro perigoso.',
    imagem: 'https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=900'
  }

];

export default function Home({ navigation }) {

  const [uid, setUid] = useState(null);
  const [favoritos, setFavoritos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {

    const unsubscribeAuth = onAuthStateChanged(auth, (usuario) => {

      setUid(usuario ? usuario.uid : null);

      if (!usuario) {
        setFavoritos([]);
        setCarregando(false);
      }

    });

    return unsubscribeAuth;

  }, []);

  useEffect(() => {

    if (!uid) return;

    const ref = collection(db, 'usuarios', uid, 'favoritos');

    const unsubscribe = onSnapshot(ref, (snapshot) => {

      setFavoritos(snapshot.docs.map((item) => item.id));
      setCarregando(false);

    }, () => {

      setCarregando(false);

      Alert.alert('Aviso', 'Não foi possível carregar os favoritos.');

    });

    return unsubscribe;

  }, [uid]);

  async function alternarFavorito(anime) {

    if (!uid) {
      Alert.alert('Entre na conta', 'Faça login para salvar seus favoritos.');
      return;
    }

    const ref = doc(db, 'usuarios', uid, 'favoritos', anime.id);

    try {

      if (favoritos.includes(anime.id)) {

        await deleteDoc(ref);

      } else {

        await setDoc(ref, {
          animeId: anime.id,
          nome: anime.nome,
          genero: anime.genero,
          descricao: anime.descricao,
          imagem: anime.imagem
        });

      }

    } catch {

      Alert.alert('Erro', 'Não foi possível atualizar seus favoritos.');

    }

  }

  return (

    <FlatList

      style={estilos.container}

      contentContainerStyle={estilos.conteudo}

      data={animes}

      keyExtractor={(item) => item.id}

      renderItem={({ item }) => (

        <AnimeCard
          anime={item}
          favorito={favoritos.includes(item.id)}
          onFavoritar={alternarFavorito}
        />

      )}

      ListHeaderComponent={

        <View>

          <Text style={estilos.titulo}>
            Descubra seu próximo anime
          </Text>

          <Text style={estilos.subtitulo}>
            Histórias, aventuras e universos para explorar.
          </Text>

          {carregando ? (
            <ActivityIndicator color="#B99AFF" />
          ) : null}

          <Menu navigation={navigation} />

          <Text style={estilos.secao}>
            Catálogo
          </Text>

        </View>

      }

      ListEmptyComponent={
        <Text style={estilos.subtitulo}>
          Nenhum anime encontrado.
        </Text>
      }

    />

  );
}
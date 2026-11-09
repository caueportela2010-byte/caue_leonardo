
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';

import { onAuthStateChanged } from 'firebase/auth';

import {
  doc,
  getDoc,
  updateDoc
} from 'firebase/firestore';

import { auth, db } from '../../firebase/firebase';

import estilos from './estilo';

export default function Editar({ navigation }) {

  const [nome, setNome] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (user) => {

      if (!user) {
        navigation.replace('Login');
        return;
      }

      try {

        const snap = await getDoc(
          doc(db, 'usuarios', user.uid)
        );

        if (snap.exists()) {
          setNome(snap.data().nome || '');
        }

      } catch {

        Alert.alert('Erro', 'Não foi possível carregar o perfil.');

      } finally {

        setCarregando(false);

      }

    });

    return unsubscribe;

  }, [navigation]);

  async function salvar() {

    const user = auth.currentUser;

    if (!user) {
      return navigation.replace('Login');
    }

    if (!nome.trim()) {
      return Alert.alert('Atenção', 'Digite seu nome.');
    }

    try {

      setSalvando(true);

      await updateDoc(
        doc(db, 'usuarios', user.uid),
        { nome: nome.trim() }
      );

      Alert.alert('Sucesso', 'Perfil atualizado!');

      navigation.goBack();

    } catch {

      Alert.alert('Erro', 'Não foi possível salvar as alterações.');

    } finally {

      setSalvando(false);

    }

  }

  if (carregando) {

    return (
      <View style={estilos.container}>
        <ActivityIndicator color="#B99AFF" />
      </View>
    );

  }

  return (

    <View style={estilos.container}>

      <Text style={estilos.titulo}>
        Editar perfil
      </Text>

      <Text style={estilos.rotulo}>
        Nome
      </Text>

      <TextInput
        style={estilos.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Seu nome"
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={estilos.botao}
        onPress={salvar}
        disabled={salvando}
      >

        {salvando
          ? <ActivityIndicator color="#fff" />
          : <Text style={estilos.textoBotao}>
              Salvar alterações
            </Text>
        }

      </TouchableOpacity>

    </View>

  );
}

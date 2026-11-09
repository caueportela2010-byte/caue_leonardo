
import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';

import { onAuthStateChanged, signOut } from 'firebase/auth';

import { doc, onSnapshot } from 'firebase/firestore';

import { auth, db } from '../../firebase/firebase';

import Menu from '../../components/Menu';

import estilos from './estilo';

export default function Perfil({ navigation }) {

  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {

    let unsubscribeDados = () => {};

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {

      unsubscribeDados();

      if (!user) {

        setUsuario(null);
        setCarregando(false);
        navigation.replace('Login');

        return;
      }

      unsubscribeDados = onSnapshot(
        doc(db, 'usuarios', user.uid),

        (snap) => {

          setUsuario(
            snap.exists()
              ? snap.data()
              : { email: user.email, nome: 'Usuário' }
          );

          setCarregando(false);

        },

        () => setCarregando(false)

      );

    });

    return () => {
      unsubscribeAuth();
      unsubscribeDados();
    };

  }, [navigation]);

  async function sair() {

    try {

      await signOut(auth);

      navigation.replace('Login');

    } catch {

      Alert.alert('Erro', 'Não foi possível sair da conta.');

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

      <Text style={estilos.avatar}>👤</Text>

      <Text style={estilos.titulo}>
        {usuario?.nome || 'Meu perfil'}
      </Text>

      <Text style={estilos.info}>
        {usuario?.email}
      </Text>

      <TouchableOpacity
        style={estilos.botao}
        onPress={() => navigation.navigate('Editar')}
      >
        <Text style={estilos.textoBotao}>
          Editar perfil
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={estilos.botaoSecundario}
        onPress={sair}
      >
        <Text style={estilos.textoBotao}>
          Sair da conta
        </Text>
      </TouchableOpacity>

      <Menu navigation={navigation} />

    </View>

  );
}

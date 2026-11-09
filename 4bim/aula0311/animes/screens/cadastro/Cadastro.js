
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  ScrollView
} from 'react-native';

import { createUserWithEmailAndPassword } from 'firebase/auth';

import { doc, setDoc } from 'firebase/firestore';

import { auth, db } from '../../firebase/firebase';

import estilos from './estilo';

export default function Cadastro({ navigation }) {

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {

    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert('Atenção', 'As senhas não são iguais.');
      return;
    }

    if (senha.length < 6) {
      Alert.alert('Atenção', 'A senha precisa ter pelo menos 6 caracteres.');
      return;
    }

    try {

      setCarregando(true);

      const resultado = await createUserWithEmailAndPassword(
        auth,
        email.trim(),
        senha
      );

      await setDoc(
        doc(db, 'usuarios', resultado.user.uid),
        {
          nome: nome.trim(),
          email: email.trim(),
          criadoEm: new Date().toISOString()
        }
      );

      Alert.alert('Conta criada', 'Cadastro realizado com sucesso!');

      navigation.replace('Home');

    } catch (error) {

      const mensagem =
        error.code === 'auth/email-already-in-use'
          ? 'Este e-mail já está cadastrado.'
          : error.code === 'auth/invalid-email'
            ? 'Digite um e-mail válido.'
            : 'Não foi possível criar a conta.';

      Alert.alert('Erro no cadastro', mensagem);

    } finally {
      setCarregando(false);
    }
  }

  return (
    <ScrollView
      contentContainerStyle={estilos.container}
      keyboardShouldPersistTaps="handled"
    >

      <Text style={estilos.titulo}>
        Entre para o universo anime!
      </Text>

      <Text style={estilos.rotulo}>Nome</Text>

      <TextInput
        style={estilos.input}
        placeholder="Seu nome"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <Text style={estilos.rotulo}>E-mail</Text>

      <TextInput
        style={estilos.input}
        placeholder="seuemail@email.com"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <Text style={estilos.rotulo}>Senha</Text>

      <TextInput
        style={estilos.input}
        placeholder="Mínimo de 6 caracteres"
        placeholderTextColor="#999"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <Text style={estilos.rotulo}>Confirmar senha</Text>

      <TextInput
        style={estilos.input}
        placeholder="Digite a senha novamente"
        placeholderTextColor="#999"
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={estilos.botao}
        onPress={cadastrar}
        disabled={carregando}
      >
        {carregando
          ? <ActivityIndicator color="#fff" />
          : <Text style={estilos.textoBotao}>Criar conta</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate('Login')}
      >
        <Text style={estilos.link}>
          Já tem uma conta? Entrar
        </Text>
      </TouchableOpacity>

    </ScrollView>
  );
}

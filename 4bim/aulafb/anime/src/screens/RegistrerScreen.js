
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import { registerUser } from "../services/authService";

export default function RegistrerScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function cadastrar() {
    if (!nome.trim() || !email.trim() || !senha) {
      Alert.alert("Atenção", "Preencha todos os campos.");
      return;
    }

    if (senha.length < 6) {
      Alert.alert("Atenção", "A senha precisa ter pelo menos 6 caracteres.");
      return;
    }

    try {
      setCarregando(true);

      await registerUser(nome, email, senha);

      Alert.alert("Sucesso", "Conta criada com sucesso!");
    } catch (error) {
      Alert.alert("Erro no cadastro", error.message);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Criar conta</Text>
      <Text style={styles.subtitulo}>Entre para o mundo dos animes!</Text>

      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        placeholderTextColor="#999"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Seu e-mail"
        placeholderTextColor="#999"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Sua senha"
        placeholderTextColor="#999"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={cadastrar}
        disabled={carregando}
      >
        <Text style={styles.textoBotao}>
          {carregando ? "Cadastrando..." : "Cadastrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.link}>
          Já tem uma conta? Faça login
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101018",
    justifyContent: "center",
    padding: 25
  },
  titulo: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center"
  },
  subtitulo: {
    color: "#aaa",
    textAlign: "center",
    marginBottom: 30,
    marginTop: 8
  },
  input: {
    backgroundColor: "#242432",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15
  },
  botao: {
    backgroundColor: "#7545db",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  link: {
    color: "#b99aff",
    textAlign: "center",
    marginTop: 22
  }
});


import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import {
  loginUser,
  resetPassword
} from "../services/authService";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [carregando, setCarregando] = useState(false);

  async function entrar() {
    if (!email.trim() || !senha) {
      Alert.alert("Atenção", "Preencha seu e-mail e sua senha.");
      return;
    }

    try {
      setCarregando(true);
      await loginUser(email, senha);
      Alert.alert("Sucesso", "Login realizado!");
    } catch (error) {
      Alert.alert("Erro no login", "Verifique seu e-mail e sua senha.");
    } finally {
      setCarregando(false);
    }
  }

  async function recuperarSenha() {
    if (!email.trim()) {
      Alert.alert("Atenção", "Digite seu e-mail primeiro.");
      return;
    }

    try {
      await resetPassword(email);
      Alert.alert("Sucesso", "E-mail de recuperação enviado!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível enviar o e-mail.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Bem-vindo!</Text>
      <Text style={styles.subtitulo}>Entre na sua conta</Text>

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
        onPress={recuperarSenha}
      >
        <Text style={styles.link}>Esqueci minha senha</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.botao}
        onPress={entrar}
        disabled={carregando}
      >
        <Text style={styles.textoBotao}>
          {carregando ? "Entrando..." : "Entrar"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.link}>
          Não tem uma conta? Cadastre-se
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
    marginTop: 15
  },
  textoBotao: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16
  },
  link: {
    color: "#b99aff",
    textAlign: "center",
    marginTop: 18
  }
});

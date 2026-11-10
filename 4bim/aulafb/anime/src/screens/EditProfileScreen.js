
import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import { auth, db } from "../firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { updateUserName } from "../services/authService";

export default function EditProfileScreen({ navigation }) {
  const [nome, setNome] = useState("");
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    async function carregarDados() {
      const user = auth.currentUser;

      if (user) {
        const referencia = doc(db, "usuarios", user.uid);
        const resultado = await getDoc(referencia);

        if (resultado.exists()) {
          setNome(resultado.data().nome || "");
        } else {
          setNome(user.displayName || "");
        }
      }
    }

    carregarDados().catch((error) => {
      console.log("Erro ao carregar perfil:", error);
    });
  }, []);

  async function salvar() {
    if (!nome.trim()) {
      Alert.alert("Atenção", "Digite seu nome.");
      return;
    }

    try {
      setCarregando(true);

      await updateUserName(nome.trim());

      Alert.alert("Sucesso", "Seu perfil foi atualizado!", [
        {
          text: "OK",
          onPress: () => navigation.goBack()
        }
      ]);
    } catch (error) {
      Alert.alert("Erro", "Não foi possível atualizar seu perfil.");
      console.log(error);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Editar perfil</Text>
      <Text style={styles.subtitulo}>
        Atualize suas informações.
      </Text>

      <Text style={styles.label}>Nome</Text>

      <TextInput
        style={styles.input}
        value={nome}
        onChangeText={setNome}
        placeholder="Digite seu nome"
        placeholderTextColor="#999"
      />

      <TouchableOpacity
        style={styles.botao}
        onPress={salvar}
        disabled={carregando}
      >
        <Text style={styles.botaoTexto}>
          {carregando ? "Salvando..." : "Salvar alterações"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={styles.voltar}>Voltar</Text>
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
    fontSize: 30,
    fontWeight: "bold"
  },
  subtitulo: {
    color: "#aaa",
    marginTop: 8,
    marginBottom: 35
  },
  label: {
    color: "#fff",
    marginBottom: 8
  },
  input: {
    backgroundColor: "#242432",
    color: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 20
  },
  botao: {
    backgroundColor: "#7545db",
    padding: 16,
    borderRadius: 10,
    alignItems: "center"
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold"
  },
  voltar: {
    color: "#b99aff",
    textAlign: "center",
    marginTop: 22
  }
});


import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator
} from "react-native";

import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/config";
import { logoutUser } from "../services/authService";

const animes = [
  {
    id: "1",
    nome: "Naruto",
    categoria: "Ação e aventura",
    descricao: "A jornada de um jovem ninja."
  },
  {
    id: "2",
    nome: "One Piece",
    categoria: "Aventura",
    descricao: "A busca pelo lendário tesouro."
  },
  {
    id: "3",
    nome: "Attack on Titan",
    categoria: "Ação e fantasia",
    descricao: "A humanidade luta pela sobrevivência."
  },
  {
    id: "4",
    nome: "Death Note",
    categoria: "Suspense",
    descricao: "Um caderno com um poder misterioso."
  },
  {
    id: "5",
    nome: "Demon Slayer",
    categoria: "Ação e fantasia",
    descricao: "Um jovem enfrenta demônios."
  }
];

export default function HomeScreen({ navigation }) {
  const [nome, setNome] = useState("Usuário");
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    async function carregarPerfil() {
      try {
        const user = auth.currentUser;

        if (user) {
          const referencia = doc(db, "usuarios", user.uid);
          const resultado = await getDoc(referencia);

          if (resultado.exists()) {
            setNome(resultado.data().nome || "Usuário");
          } else {
            setNome(user.displayName || "Usuário");
          }
        }
      } catch (error) {
        console.log("Erro ao carregar perfil:", error);
      } finally {
        setCarregando(false);
      }
    }

    carregarPerfil();
  }, []);

  async function sair() {
    try {
      await logoutUser();
    } catch (error) {
      console.log("Erro ao sair:", error);
    }
  }

  function renderAnime({ item }) {
    return (
      <View style={styles.card}>
        <Text style={styles.animeNome}>{item.nome}</Text>
        <Text style={styles.categoria}>{item.categoria}</Text>
        <Text style={styles.descricao}>{item.descricao}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.topo}>
        <View>
          <Text style={styles.logo}>ANIME HUB</Text>
          {carregando ? (
            <ActivityIndicator color="#a78bfa" />
          ) : (
            <Text style={styles.boasVindas}>Olá, {nome}!</Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.perfilBotao}
          onPress={() => navigation.navigate("EditProfile")}
        >
          <Text style={styles.perfilTexto}>Meu perfil</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.titulo}>Catálogo de animes</Text>
      <Text style={styles.subtitulo}>
        Encontre seu próximo anime favorito.
      </Text>

      <FlatList
        data={animes}
        renderItem={renderAnime}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity style={styles.sairBotao} onPress={sair}>
        <Text style={styles.sairTexto}>Sair da conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#101018",
    padding: 22,
    paddingTop: 45
  },
  topo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 35
  },
  logo: {
    color: "#a78bfa",
    fontSize: 25,
    fontWeight: "bold"
  },
  boasVindas: {
    color: "#fff",
    marginTop: 6
  },
  perfilBotao: {
    backgroundColor: "#7545db",
    padding: 12,
    borderRadius: 9
  },
  perfilTexto: {
    color: "#fff",
    fontWeight: "bold"
  },
  titulo: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold"
  },
  subtitulo: {
    color: "#aaa",
    marginTop: 7,
    marginBottom: 20
  },
  lista: {
    paddingBottom: 15
  },
  card: {
    backgroundColor: "#242432",
    padding: 20,
    borderRadius: 12,
    marginBottom: 14
  },
  animeNome: {
    color: "#fff",
    fontSize: 19,
    fontWeight: "bold"
  },
  categoria: {
    color: "#a78bfa",
    marginTop: 5
  },
  descricao: {
    color: "#ccc",
    marginTop: 10
  },
  sairBotao: {
    padding: 14,
    alignItems: "center"
  },
  sairTexto: {
    color: "#ff7777",
    fontWeight: "bold"
  }
});

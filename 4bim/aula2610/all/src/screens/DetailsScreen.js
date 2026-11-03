import React, { useState } from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet
} from "react-native";

import theme from "../styles/theme";

export default function DetailsScreen({ route, navigation }) {

  const { driver } = route.params;

  const [favorite, setFavorite] = useState(false);

  return (

    <View style={styles.container}>

      <Text style={styles.number}>
        #{driver.number}
      </Text>

      <Text style={styles.name}>
        {driver.name}
      </Text>

      <View style={styles.card}>

        <Text style={styles.info}>
          Nacionalidade: {driver.country}
        </Text>

        <Text style={styles.info}>
          Equipe: {driver.team}
        </Text>

        <Text style={styles.info}>
          Títulos mundiais: {driver.championships}
        </Text>

        <Text style={styles.description}>
          {driver.description}
        </Text>

      </View>

      <Pressable
        style={styles.button}
        onPress={() => setFavorite(!favorite)}
      >

        <Text style={styles.buttonText}>
          {favorite ? "★ FAVORITADO" : "☆ FAVORITAR"}
        </Text>

      </Pressable>

      <Pressable
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >

        <Text style={styles.backText}>
          VOLTAR
        </Text>

      </Pressable>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    padding: 25
  },

  number: {
    color: theme.colors.primary,
    fontSize: 35,
    fontWeight: "bold"
  },

  name: {
    color: theme.colors.white,
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 25
  },

  card: {
    backgroundColor: theme.colors.card,
    padding: 22,
    borderRadius: 12,
    marginBottom: 25
  },

  info: {
    color: theme.colors.white,
    fontSize: 16,
    marginBottom: 15
  },

  description: {
    color: theme.colors.gray,
    lineHeight: 23,
    marginTop: 10
  },

  button: {
    backgroundColor: theme.colors.primary,
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12
  },

  buttonText: {
    color: theme.colors.white,
    fontWeight: "bold"
  },

  backButton: {
    backgroundColor: theme.colors.darkGray,
    padding: 16,
    borderRadius: 8,
    alignItems: "center"
  },

  backText: {
    color: theme.colors.white,
    fontWeight: "bold"
  }

});
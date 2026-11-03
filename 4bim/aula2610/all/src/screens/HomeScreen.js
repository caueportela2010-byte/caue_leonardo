import React from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet
} from "react-native";

import theme from "../styles/theme";

export default function HomeScreen({ navigation }) {

  return (

    <View style={styles.container}>

      <Text style={styles.logo}>
        F1 HUB
      </Text>

      <Text style={styles.subtitle}>
        O mundo da Fórmula 1 começa aqui.
      </Text>

      <View style={styles.banner}>

        <Text style={styles.bannerTitle}>
          RACE WEEK
        </Text>

        <Text style={styles.bannerText}>
          Velocidade, estratégia e emoção.
        </Text>

      </View>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Pilotos")}
      >

        <Text style={styles.buttonText}>
          VER PILOTOS
        </Text>

      </Pressable>

      <Text style={styles.footer}>
        F1 HUB • MOTORSPORT
      </Text>

    </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: "center",
    alignItems: "center",
    padding: 25
  },

  logo: {
    color: theme.colors.primary,
    fontSize: 48,
    fontWeight: "900",
    fontStyle: "italic"
  },

  subtitle: {
    color: theme.colors.gray,
    marginTop: 10,
    textAlign: "center"
  },

  banner: {
    backgroundColor: theme.colors.card,
    width: "100%",
    padding: 30,
    borderRadius: 12,
    marginVertical: 40,
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.primary
  },

  bannerTitle: {
    color: theme.colors.white,
    fontSize: 30,
    fontWeight: "bold"
  },

  bannerText: {
    color: theme.colors.gray,
    marginTop: 10
  },

  button: {
    backgroundColor: theme.colors.primary,
    padding: 18,
    borderRadius: 8,
    width: "100%",
    alignItems: "center"
  },

  buttonText: {
    color: theme.colors.white,
    fontWeight: "bold",
    fontSize: 16
  },

  footer: {
    color: theme.colors.gray,
    position: "absolute",
    bottom: 25,
    fontSize: 11
  }

});
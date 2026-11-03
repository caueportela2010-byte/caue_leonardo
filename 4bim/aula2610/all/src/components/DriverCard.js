import React from "react";

import {
  View,
  Text,
  Pressable,
  StyleSheet
} from "react-native";

import theme from "../styles/theme";

export default function DriverCard({
  driver,
  onPress,
  isFavorite,
  onFavorite
}) {

  return (
    <Pressable
      style={styles.card}
      onPress={onPress}
    >

      <View style={styles.info}>

        <Text style={styles.number}>
          #{driver.number}
        </Text>

        <Text style={styles.name}>
          {driver.name}
        </Text>

        <Text style={styles.team}>
          {driver.team} • {driver.country}
        </Text>

      </View>

      <Pressable
        style={styles.favorite}
        onPress={(event) => {
          event.stopPropagation();
          onFavorite();
        }}
      >

        <Text style={styles.favoriteText}>
          {isFavorite ? "★" : "☆"}
        </Text>

      </Pressable>

    </Pressable>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: theme.colors.card,
    padding: 18,
    marginVertical: 7,
    marginHorizontal: 16,
    borderRadius: 10,
    borderLeftWidth: 5,
    borderLeftColor: theme.colors.primary,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  info: {
    flex: 1
  },

  number: {
    color: theme.colors.primary,
    fontSize: 13,
    fontWeight: "bold"
  },

  name: {
    color: theme.colors.white,
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 5
  },

  team: {
    color: theme.colors.gray,
    marginTop: 5
  },

  favorite: {
    padding: 10
  },

  favoriteText: {
    color: "#FFD700",
    fontSize: 27
  }

});
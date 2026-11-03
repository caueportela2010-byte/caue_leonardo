import React, { useState } from "react";

import {
  View,
  Text,
  FlatList,
  TextInput,
  Pressable,
  StyleSheet
} from "react-native";

import drivers from "../data/drivers";
import DriverCard from "../components/DriverCard";
import theme from "../styles/theme";

export default function DriversScreen({ navigation }) {

  const [search, setSearch] = useState("");

  const [favorites, setFavorites] = useState([]);

  const [showFavorites, setShowFavorites] = useState(false);

  function toggleFavorite(id) {

    if (favorites.includes(id)) {

      setFavorites(
        favorites.filter(item => item !== id)
      );

    } else {

      setFavorites([...favorites, id]);

    }

  }

  const filteredDrivers = drivers.filter(driver => {

    const matchesSearch = driver.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFavorite =
      !showFavorites || favorites.includes(driver.id);

    return matchesSearch && matchesFavorite;

  });

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        PILOTOS
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar piloto..."
        placeholderTextColor="#AAAAAA"
        value={search}
        onChangeText={setSearch}
      />

      <Pressable
        style={styles.filterButton}
        onPress={() => setShowFavorites(!showFavorites)}
      >

        <Text style={styles.filterText}>
          {showFavorites ? "MOSTRAR TODOS" : "VER FAVORITOS"}
        </Text>

      </Pressable>

      <FlatList

        data={filteredDrivers}

        keyExtractor={item => item.id}

        renderItem={({ item }) => (

          <DriverCard
            driver={item}
            isFavorite={favorites.includes(item.id)}
            onFavorite={() => toggleFavorite(item.id)}
            onPress={() =>
              navigation.navigate("Detalhes", {
                driver: item
              })
            }
          />

        )}

        ListEmptyComponent={
          <Text style={styles.empty}>
            Nenhum piloto encontrado.
          </Text>
        }

        contentContainerStyle={{
          paddingBottom: 20
        }}

      />

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: theme.colors.background
  },

  title: {
    color: theme.colors.white,
    fontSize: 30,
    fontWeight: "bold",
    margin: 20
  },

  input: {
    backgroundColor: theme.colors.card,
    color: theme.colors.white,
    padding: 15,
    marginHorizontal: 16,
    borderRadius: 8,
    marginBottom: 12
  },

  filterButton: {
    backgroundColor: theme.colors.primary,
    padding: 13,
    marginHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10
  },

  filterText: {
    color: theme.colors.white,
    fontWeight: "bold"
  },

  empty: {
    color: theme.colors.gray,
    textAlign: "center",
    marginTop: 30
  }

});
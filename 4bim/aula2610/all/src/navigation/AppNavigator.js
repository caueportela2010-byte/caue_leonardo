import React from "react";

import {
  NavigationContainer
} from "@react-navigation/native";

import {
  createNativeStackNavigator
} from "@react-navigation/native-stack";

import HomeScreen from "../screens/HomeScreen";
import DriversScreen from "../screens/DriversScreen";
import DetailsScreen from "../screens/DetailsScreen";

import theme from "../styles/theme";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {

  return (

    <NavigationContainer>

      <Stack.Navigator

        initialRouteName="Home"

        screenOptions={{

          headerStyle: {
            backgroundColor: "#202020"
          },

          headerTintColor: "#FFFFFF",

          headerTitleStyle: {
            fontWeight: "bold"
          },

          contentStyle: {
            backgroundColor: theme.colors.background
          }

        }}

      >

        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: "F1 HUB",
            headerShown: false
          }}
        />

        <Stack.Screen
          name="Pilotos"
          component={DriversScreen}
          options={{
            title: "F1 HUB"
          }}
        />

        <Stack.Screen
          name="Detalhes"
          component={DetailsScreen}
          options={{
            title: "DETALHES DO PILOTO"
          }}
        />

      </Stack.Navigator>

    </NavigationContainer>

  );

}
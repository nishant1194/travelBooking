import React, { useState, useEffect } from "react";
import { Text, View } from "react-native";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LinkingConfiguration from "./LinkingConfiguration.js";
import NotFoundScreen from "../screens/NotFoundScreen";
import BottomTabNavigator from "./BottomTabNavigator";
import TestScreen from "../screens/Home.js";
import BookRide from "../screens/BookRide.js";
import CreateRide from "../screens/CreateRide.js";
import AboutUser from "../screens/AboutUser.js";
import DriverInput from "../screens/DriverInput.js";
import Login from "../screens/Login.js";
import SignUpPage from "../screens/SignUp.js";
import RideRequests from "../screens/RideRequests.js";
import MyRides from "../screens/MyRides.js";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Navigation({ colorScheme }) {
  const [initialRoute, setInitialRoute] = useState(null); // null indicates loading state
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initialize = async () => {
      try {
        const user = await AsyncStorage.getItem("userId");
        if (user) {
          setInitialRoute("Root");
        } else {
          setInitialRoute("Login");
        }
      } catch (error) {
        console.log("Error reading user data:", error);
        setInitialRoute("Login"); // Default to login on error
      } finally {
        setIsLoading(false);
      }
    };

    initialize();
  }, []);

  const Stack = createStackNavigator();

  if (isLoading) {
    // Optionally, you can return a splash screen or loader here
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  function RootNavigator() {
    return (
      <Stack.Navigator
        initialRouteName={initialRoute}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Root" component={BottomTabNavigator} />
        <Stack.Screen
          name="NotFound"
          component={NotFoundScreen}
          options={{ title: "Oops!" }}
        />
        <Stack.Screen name="Ttest" component={TestScreen} />
        <Stack.Screen name="BookRide" component={BookRide} />
        <Stack.Screen name="RideRequest" component={RideRequests} />
        <Stack.Screen name="DriverInput" component={DriverInput} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="SignUp" component={SignUpPage} />
        <Stack.Screen name="MyRides" component={MyRides} />
      </Stack.Navigator>
    );
  }

  return (
       <NavigationContainer
        linking={LinkingConfiguration}
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <RootNavigator />
      </NavigationContainer>
   );
}

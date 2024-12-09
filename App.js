import "react-native-gesture-handler";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from '@react-navigation/native';
import { useState, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Navigation from "./navigation"; // For logged-in users
// import AuthNav from "./navigation/AuthNav"; // For logged-out users
import { useLoadedAssets } from "./hooks/useLoadedAssets"; // If needed for assets

export default function App() {
  const isLoadingComplete = useLoadedAssets();
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Check the login status from AsyncStorage
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const loginValue = await AsyncStorage.getItem('LoginValue');
        setLoggedIn(loginValue === 'true'); // Update state based on AsyncStorage value
      } catch (err) {
        console.error(err);
      }
    };

    checkLoginStatus(); // Check login status when the app first loads
  }, []); // Runs once when the app mounts

  // Return null if assets are still loading
  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider style={{marginTop:30}}>
           <Navigation />  
       </SafeAreaProvider>
    );
  }
}

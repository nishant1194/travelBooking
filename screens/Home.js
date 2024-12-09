import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  RefreshControl
} from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import Cards from "../comps/Cards"; // Assuming Cards is a separate component
import axios from "axios";
import Linkk from "../hooks/Linkk";

export default function Home({ navigation }) {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const [avaiRides, setAvaiRides] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
     getRides();
     
     setRefreshing(false);
    }, 2000);
  };

  // Fetch rides data
  const getRides = async () => {
    try {
      const reps = await axios.get(Linkk + "/api/v1/ride");
      setAvaiRides(reps.data);  
      console.log(reps.data)
    } catch (err) {
      console.log("Error fetching rides:", err);
    }
  };

  useEffect(() => {
    getRides(); // Fetch rides when the component mounts
  }, []); // Empty dependency array ensures it runs once on mount

  const renderRide = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("BookRide", {
            id: item._id,
            from: item.from,
            to: item.to,
            startTime: item.startTime,
            endTime: item.endTime,
            fare: item.fare,
            driverId: item.driverId,
          });
        }}
      >
        <View style={styles.card}>
          <Cards
            startTime={item.startTime}
            endTime={item.endTime}
            fare={item.fare}
            from={item.from}
            to={item.to}
            driver={item?.driverId}
          />
         </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => (
    <TouchableOpacity
      style={styles.createButton}
      onPress={() => navigation.navigate("MyRides")}
    >
      <Text style={styles.createButtonText}>My Rides</Text>
    </TouchableOpacity>
  );

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <Text style={styles.today}>All Listed Rides</Text>
      <Text style={styles.title}>{avaiRides.length} Rides Available</Text>

      {/* Ride Cards Section */}
      {
        
          avaiRides? <FlatList
            data={avaiRides} // Array of rides received from backend
            renderItem={renderRide}
            keyExtractor={(item) => item._id} // Assuming each ride has a unique id
            showsVerticalScrollIndicator={false} // Hide vertical scroll bar
            ListFooterComponent={renderFooter} // Footer for "My Rides" button
            contentContainerStyle={styles.listContent}
             // Optional styling for FlatList
             refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />:<Text style={styles.noride}>No rides listed at the moment </Text>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f9f9f9", // Light gray background for a soft, clean feel
    paddingHorizontal: 20,
    paddingVertical: 10,
    flex: 1, // Ensure the container takes full available height
    marginTop:20
  },
  noride:{
    fontFamily: "Roboto_400Regular", // Regular font for subtitle
    fontSize: 20,
    color: "#5A737D", // Soft grayish-blue for the subtitle
    marginBottom: 20,
    textAlign:"center",
    marginVertical:30
  },
  today: {
    fontFamily: "Roboto_700Bold", // Bold font for title
    fontSize: 30,
    color: "#2E4C5C", // Darker shade of blue for the header
    marginBottom: 5,
  },
  title: {
    fontFamily: "Roboto_400Regular", // Regular font for subtitle
    fontSize: 18,
    color: "#5A737D", // Soft grayish-blue for the subtitle
    marginBottom: 20,
  },
  card: {
    marginBottom: 0, // Add some margin between cards
  },
  listContent: {
    paddingBottom: 20, // Add space at the bottom of the list
  },
  createButton: {
    backgroundColor: "#00B4D8", // Bright blue for action button
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30, // Rounded corners for a modern look
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    marginBottom: 20,
  },
  createButtonText: {
    fontFamily: "Roboto_700Bold", // Bold font for the button text
    color: "#ffffff",
    fontSize: 18,
  },
});

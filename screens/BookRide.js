import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Ionicons } from "@expo/vector-icons"; 
import Toast from "react-native-simple-toast";
import axios from "axios";
import Linkk from "../hooks/Linkk";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BookRide({ navigation, route }) {
  const { id, from, to, startTime, endTime, fare, driverId } = route.params; // Extract the id from the route parameters
  const getTime = (time) => {
    const date = new Date(time);

    const timme = date.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
    });
    // Slice the time portion from the string
    console.log(timme.length);
    if (timme.length == 22) {
      return timme.slice(11, 16) + timme.slice(timme.length - 3, timme.length);
    }
    return timme.slice(10, 15) + timme.slice(timme.length - 3, timme.length);
  };
  const getTimeDifference = (startTimee, endTimee) => {
    const startTime = new Date(startTimee);
    const endTime = new Date(endTimee);

    const differenceInMilliseconds = Math.abs(startTime - endTime); // Absolute difference
    const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000); // Convert ms to minutes
    return differenceInMinutes ? differenceInMinutes : "10-20";
  };

  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  const currentDate = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const day = currentDate.getDate();
  const dayIndex = currentDate.getDay();
  const month = currentDate.getMonth();

  const handleRequest = async () => {
    try{
      const userId = await AsyncStorage.getItem('userId');
      const resp = await axios.post(Linkk+"/api/v1/review",{
        rideId:id,
        userId:userId,
        driverId:driverId?._id,
        })
       console.log(driverId)
       console.log(resp.data) ;
       Toast.show("Request created sucessfully!", Toast.SHORT);
       navigation.navigate("MyRides");
      }
    catch(err){
      console.log(err);
      Toast.show("Something went wrong!", Toast.SHORT);
 
    }
  };

 
  return (
    <ScrollView style={styles.container}>
      {/* Today's Date */}
      <Text
        style={styles.today}
      >{`${daysOfWeek[dayIndex]}, ${day} ${monthsOfYear[month]}`}</Text>

      {/* Ride Info Section */}
      <View style={styles.card1}>
        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>{getTime(startTime)}</Text>
          <Text style={styles.timeSubText}>
            {getTimeDifference(startTime, endTime)} mins
          </Text>
          <Text style={styles.timeText}>{getTime(endTime)}</Text>
        </View>

        <View style={styles.locationInfo}>
          <Text style={styles.locationSubText}>
            From: <Text style={styles.locationText}> {from}</Text>
          </Text>
          <Text style={styles.locationSubText}>
            To: <Text style={styles.locationText}> {to}</Text>
          </Text>
        </View>
      </View>

      {/* Fare Information */}
      <View style={styles.fareContainer}>
        <Text style={styles.fareText}>Fare per person</Text>
        <Text style={styles.fareAmount}>₹{fare}</Text>
      </View>

      {/* Driver Information */}
      <View style={styles.card}>
        <View style={styles.driverContainer}>
          <Text style={styles.driverAvatar}>🧒🏻</Text>
          <View>
            <Text style={styles.driverName}>{driverId?.name}</Text>
            <Text style={styles.driverRating}>4.4/5 - 7 ratings</Text>
          </View>
          <Ionicons name="ios-arrow-forward" size={40} color="#00aff5" />
        </View>

        {/* Vehicle Details */}
        <View style={styles.vehicleDetailsContainer}>
          <Text style={styles.vehicleText}>☑️ Verified Profile</Text>
          <Text style={styles.vehicleText}>🚕 Auto</Text>
        </View>
      </View>

      {/* Report Ride Section */}
      <View style={styles.card}>
        <TouchableOpacity onPress={() => navigation.navigate("ReportRide")}>
          <Text style={styles.reportText}>⏃ Report Ride</Text>
        </TouchableOpacity>
      </View>

      {/* Booking Button */}
      <TouchableOpacity onPress={handleRequest}>
        <View style={styles.bookButton}>
          <Text style={styles.bookButtonText}>Request to Book</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  today: {
    fontFamily: "Roboto_400Regular",
    fontSize: 28,
    fontWeight: "500",
    color: "#333",
    marginBottom: 15,
  },
  card1: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  timeInfo: {
    alignItems: "center",
    marginBottom: 10,
  },
  timeText: {
    fontFamily: "Roboto_700Bold",
    fontSize: 22,
    color: "#333",
  },
  timeSubText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#888",
    marginVertical: 8,
  },

  locationInfo: {
    alignItems: "space-between",
    justifyContent: "space-around",
  },
  locationText: {
    fontFamily: "Roboto_700Bold",
    fontSize: 18,
    color: "#333",
  },
  locationSubText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#888",
  },
  fareContainer: {
    marginVertical: 20,
    alignItems: "center",
  },
  fareText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    color: "#555",
  },
  fareAmount: {
    fontFamily: "Roboto_700Bold",
    fontSize: 24,
    color: "#333",
    marginVertical: 8,
  },
  driverContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  driverAvatar: {
    fontSize: 50,
    marginRight: 15,
  },
  driverName: {
    fontFamily: "Roboto_700Bold",
    fontSize: 20,
    color: "#333",
  },
  driverRating: {
    fontFamily: "Roboto_400Regular",
    fontSize: 14,
    color: "#888",
  },
  vehicleDetailsContainer: {
    marginVertical: 15,
    paddingHorizontal: 15,
  },
  vehicleText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 16,
    color: "#555",
    marginVertical: 8,
  },
  reportText: {
    fontFamily: "Roboto_400Regular",
    fontSize: 18,
    color: "#00aff5",
  },
  bookButton: {
    backgroundColor: "#00aff5",
    paddingVertical: 16,
    borderRadius: 20,
    marginVertical: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },
  bookButtonText: {
    fontFamily: "Roboto_700Bold",
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
  },
});

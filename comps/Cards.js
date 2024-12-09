import { View, Text } from "react-native";
import React from "react";
import { StyleSheet } from "react-native";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";

export default function Card(props) {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  
  const getDate = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString("en-IN", { weekday: 'short', day: 'numeric', month: 'short' });
  };
  const getTime = (time) => {
    const date = new Date(time);

    const timme = date.toLocaleString("en-IN", { 
      timeZone: "Asia/Kolkata", 
      hour12: true
    });
    // Slice the time portion from the string
    console.log(timme.length);
    if(timme.length==22){
      return timme.slice(11, 16)+timme.slice(timme.length-3, timme.length);
    }
     return timme.slice(10, 15)+timme.slice(timme.length-3, timme.length);
  };
  const getTimeDifference = (startTimee, endTimee) => {
    const startTime = new Date(startTimee);
    const endTime = new Date(endTimee);

    const differenceInMilliseconds = Math.abs(startTime - endTime); // Absolute difference
    const differenceInMinutes = Math.floor(differenceInMilliseconds / 60000); // Convert ms to minutes
    return differenceInMinutes? differenceInMinutes:"10-20";
  };
  
  
  return (
    <View style={styles.container}>
      <Text style={styles.date}>{getDate(props.startTime)}</Text>
      <View style={styles.upper}>
        <View style={styles.upperLeft}>
          <Text style={styles.time}>{getTime(props.startTime)}</Text>
          <Text style={styles.timeSub}>{getTimeDifference(props.startTime,props.endTime)} mins</Text>
          <Text style={styles.time}>{getTime(props.endTime)} </Text>
        </View>
        
        <View style={styles.location}>
          <Text style={styles.locationText}>{props.from}</Text>
          <Text style={styles.locationText}>{props.to}</Text>
        </View>
      <Text style={styles.price}>₹ {props.fare}</Text>
      </View>

      <View style={styles.divider}></View>
       <View style={styles.lower}>
        <Text style={styles.carIcon}>🚕</Text>
        <View style={styles.driverInfo}>
          <Text style={styles.driverName}>🧒🏻 {props.driver?.name}</Text>
        </View>
        <Text style={styles.rating}>*4.4</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 15,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  date: {
    fontSize: 16,
    fontFamily: "Roboto_400Regular",
    color: "#7B7B7B",
    marginBottom: 4,
  },
  upper: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeft: {
    alignItems: "center",
    },
  time: {
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
    color: "#4A4A4A",
    marginVertical:10
  },
  lineWrapper: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 10,
  },
  line: {
    height: 50,
    width: 3,
    backgroundColor: "#2E4C5C",
  },
  circle: {
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
    color: "#2E4C5C",
  },
  location: {
    marginVertical: 5,
  },
  locationText: {
    fontSize: 20,
    fontFamily: "Roboto_400Regular",
    color: "black",
    marginVertical:10

  },
  price: {
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
    color: "#00B4D8",
    marginVertical: 8,
  },
  divider: {
    height: 2,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },
  lower: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  carIcon: {
    fontSize: 30,
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  driverName: {
    fontSize: 22,
    fontFamily: "Roboto_400Regular",
    color: "#4A4A4A",
  },
  rating: {
    fontSize: 20,
    color: "#FFD700",
  },
});

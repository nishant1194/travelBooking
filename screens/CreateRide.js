import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  Alert,
} from "react-native";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";
import { Dropdown } from "react-native-element-dropdown";
import { AntDesign } from "@expo/vector-icons"; // Icon for dropdown checkmarks
import DateTimePickerModal from "react-native-modal-datetime-picker"; // Import the date-time picker
import axios from "axios";
import Linkk from "../hooks/Linkk";
import Toast from 'react-native-simple-toast';
import AsyncStorage from "@react-native-async-storage/async-storage";
 

export default function CreateRide() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold,
  });
  const [driver, setDriver] = useState([]);
  const [valuePick, setValuePick] = useState(null);
  const [valueDrop, setValueDrop] = useState(null);
  const [value, setValue] = useState(2);
  const [fare, setFare] = useState(2);
  const [pickupDate, setPickupDate] = useState(null);
  const [dropoffDate, setDropoffDate] = useState(null);
  const [isPickupDatePickerVisible, setPickupDatePickerVisibility] =
    useState(false);
  const [isDropoffDatePickerVisible, setDropoffDatePickerVisibility] =
    useState(false);

  const increment = () => setValue((prevValue) => prevValue + 1);
  const decrement = () =>
    setValue((prevValue) => (prevValue > 0 ? prevValue - 1 : 0));

  const handleChange = (text) => {
    const numericValue = parseInt(text, 10);
    if (!isNaN(numericValue)) {
      setValue(numericValue);
    }
  };

  const handleConfirmPickupDate = (date) => {
    setPickupDate(date);
    setPickupDatePickerVisibility(false);
  };

  const handleConfirmDropoffDate = (date) => {
    setDropoffDate(date);
    setDropoffDatePickerVisibility(false);
  };

//   useEffect(()=>{
//     const getDriver = async() =>{
// try {
//   const resp = await axios.get()
// } catch (error) {
//   console.log(error)
// }
//     }
//     getDriver()
//   },[])
  const handlePublish = async () => {
    
    if (valuePick && valueDrop && value && pickupDate && dropoffDate) {
      try { 
        const id = await AsyncStorage.getItem('userId')
        const response = await axios.post( Linkk+'/api/v1/ride', {
          driverId: id ,
          from: valuePick,
          to: valueDrop,
          startTime: pickupDate,
          endTime: dropoffDate,
          fare: fare,
          seatsBooked: value,
        })
        console.log(response);
        Toast.show("Ride published sucessfully!", Toast.SHORT);
      }
catch(err){
  console.log(err);
  Toast.show("You are not driver. Become driver to publish ride!", Toast.SHORT);

}
    }else{
      Alert.alert('Google Sign-In', 'Fill all the details');
    }
    console.log(valuePick);
    console.log(valueDrop);
    console.log(value);
    console.log(pickupDate);
    console.log(dropoffDate.toLocaleString());
  };

  const renderItem = (item) => (
    <View style={styles.item}>
      <Text style={styles.textItem}>{item.label}</Text>
      {item.value === value && (
        <AntDesign name="check" size={20} color="green" />
      )}
    </View>
  );

  const data = [
    { label: "Main Campus", value: "Main Campus" },
    { label: "Old Bus Stand", value: "Old Bus Stand" },
    { label: "Railway Station", value: "Railway Station" },
    { label: "Ropar", value: "Ropar" },
    { label: "Police Line", value: "Police Line" },
    { label: "Belachawk", value: "Belachawk" },
    { label: "Anywhere", value: "Anywhere" },
  ];

  if (!fontsLoaded) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.createRide}>Create Your Ride</Text>

      {/* Pickup Point */}
      <View style={styles.dropdownContainer}>
        <Text style={styles.places}>Select Pickup Point</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select the pickup point"
          value={valuePick}
          onChange={(item) => setValuePick(item.value)}
          renderItem={renderItem}
        />
        <View style={styles.line}></View>
        <Text style={styles.places}>Select Drop-off Point</Text>
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          data={data}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select the drop-off place"
          value={valueDrop}
          onChange={(item) => setValueDrop(item.value)}
          renderItem={renderItem}
        />
        <View style={styles.line}></View>
        <Text style={styles.places}>Select Pickup Date and Time</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setPickupDatePickerVisibility(true)}
        >
          <Text style={styles.dateButtonText}>
            {pickupDate ? pickupDate.toLocaleString() : "Pick Date and Time"}
          </Text>
        </TouchableOpacity>
        <View style={styles.line}></View>

        <Text style={styles.places}>Select Drop-off Date and Time</Text>
        <TouchableOpacity
          style={styles.dateButton}
          onPress={() => setDropoffDatePickerVisibility(true)}
        >
          <Text style={styles.dateButtonText}>
            {dropoffDate ? dropoffDate.toLocaleString() : "Pick Date and Time"}
          </Text>
        </TouchableOpacity>

        <View style={styles.line}></View>
        <Text style={styles.places}>Select Fare</Text>
        <TextInput
          style={styles.fareInput}
          placeholder="Enter Fare (₹)"
          keyboardType="numeric"
          value={fare}
          onChangeText={(text) => setFare(text)}
        />
        <View style={styles.line}></View>

        {/* Seats Available */}
        <Text style={styles.places}>Seats Available</Text>
        <View style={styles.seatInputContainer}>
          <TouchableOpacity style={styles.button} onPress={decrement}>
            <Text style={styles.buttonText}>-</Text>
          </TouchableOpacity>

          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(value)}
            onChangeText={handleChange}
          />

          <TouchableOpacity style={styles.button} onPress={increment}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Publish Ride Button */}
      <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
        <Text style={styles.publishText}>Publish Ride</Text>
      </TouchableOpacity>

      {/* DateTime Pickers */}
      <DateTimePickerModal
        isVisible={isPickupDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmPickupDate}
        onCancel={() => setPickupDatePickerVisibility(false)}
      />

      <DateTimePickerModal
        isVisible={isDropoffDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirmDropoffDate}
        onCancel={() => setDropoffDatePickerVisibility(false)}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flex: 1,
  },
  createRide: {
    fontFamily: "Roboto_700Bold",
    fontSize: 28,
    color: "#333",
    marginBottom: 20,
  },
  dropdownContainer: {
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 20,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  places: {
    fontSize: 18,
    fontFamily: "Roboto_400Regular",
    marginBottom: 10,
    color: "#555",
  },
  dropdown: {
    height: 50,
    borderRadius: 10,
    backgroundColor: "#f1f1f1",
    paddingLeft: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#888",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#333",
  },
  item: {
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textItem: {
    fontSize: 16,
    color: "#333",
  },
  line: {
    height: 2,
    backgroundColor: "#ddd",
    marginVertical: 15,
  },
  seatInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#007bff",
    borderRadius: 25,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  input: {
    width: 120,
    height: 50,
    textAlign: "center",
    fontSize: 20,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  publishButton: {
    backgroundColor: "#00aff5",
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 30,
    alignItems: "center",
    marginBottom: 50,
  },
  publishText: {
    fontSize: 20,
    fontFamily: "Roboto_700Bold",
    color: "#fff",
  },
  dateContainer: {
    marginBottom: 20,
  },
  dateButton: {
    backgroundColor: "#f1f1f1",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  dateButtonText: {
    fontSize: 16,
    color: "#333",
  },
  fareSection: {
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 15,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  fareLabel: {
    fontSize: 18,
    fontFamily: "Roboto_700Bold",
    color: "#2E4C5C",
    marginBottom: 10,
  },
  fareInput: {
    backgroundColor: "#f1f1f1",
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 18,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#cccccc",
    color: "#333333",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Linkk from "../hooks/Linkk";
import Toast from 'react-native-simple-toast';

export default DriverInput = () => {
  const [licenseNumber, setLicenseNumber] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [model, setModel] = useState("");
  const [licensePlate, setLicensePlate] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [capacity, setCapacity] = useState();
  const [image, setImage] = useState("");
  const [govtId, setGovtId] = useState("");
 
  const handleSubmit = async () => {
  
      try {
        const id = await AsyncStorage.getItem("userId");
        const name =  await AsyncStorage.getItem("name");
        const resp = await axios.post(Linkk + "/api/v1/driver", {
          userId: id,
          licenseNumber,
          vehicleType,
          name:name,
        });
        const updateuser = await axios.put(Linkk + "/api/v1/auth/update-user", {
          id: id,
         });
         console.log(resp.data)
         console.log(updateuser.data)
         Toast.show("Congrats you are Driver now!", Toast.SHORT);        
      } catch (error) {
        console.log(error);
        Toast.show("Try again! Something went wrong", Toast.SHORT);        

       }
 
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <Text style={styles.headerText}>Driver Details</Text>

      {/* License Number */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>License Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter License Number"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
        />
      </View>
      {/* Government ID */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Government ID</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Government ID"
          value={govtId}
          onChangeText={setGovtId}
        />
      </View>

      {/* Vehicle Number */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle Number</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Vehicle Number"
          value={vehicleNumber}
          onChangeText={setVehicleNumber}
        />
      </View>

      {/* Vehicle Type */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle Type</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Vehicle Type eg. Ato , car etc."
          value={vehicleType}
          onChangeText={setVehicleType}
        />
      </View>

      
      {/* Vehicle licensePlate */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle LicensePlate</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Vehicle licensePlate"
          value={licensePlate}
          onChangeText={setLicensePlate}
        />
      </View>
      {/* Vehicle capacity */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Vehicle capacity</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Enter Vehicle capacity"
          value={capacity}
          onChangeText={setCapacity}
        />
      </View>

      {/* Submit Button */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 30,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

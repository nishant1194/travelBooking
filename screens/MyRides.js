import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
  RefreshControl,
  Button,
} from "react-native";
import Linkk from "../hooks/Linkk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNUpiPayment from 'react-native-upi-payment';

export default function RideRequests() {
  const [rideReq, setRideReq] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      getRideRequest();
      setRefreshing(false);
    }, 2000);
  };

  const handlePayment =  () => {
    alert("developing")
    // RNUpiPayment.initializePayment(
    //   {
    //     vpa: '7876783042@upi', // Receiver's UPI ID
    //     payeeName: 'Nishant Choudhary',
    //     amount: '1', // Payment amount
    //     transactionRef: 'aasf-332-aoei-fn', // Unique transaction reference
    //   },
    //   successCallback,
    //   failureCallback
    // );

  };
  function successCallback(data) {
console.log(data) 
 }
  
  function failureCallback(data) {
console.log(data)  
}
  

  //useEffect for Rides by driverId
  //getRides by driverid
  const getRideRequest = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      console.log(id);
      const resp = await axios.get(Linkk + `/api/v1/review/ride-user/${id}`);
      setRideReq(resp.data);
      console.log(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRideRequest();
  }, []);

  // Render each ride request
  const renderRequest = ({ item }) => (
    <View>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.riderName}>{item.driverId?.name}</Text>
          <View style={[styles.statusBadge, getStatusStyle(item.status1)]}>
            <Text style={styles.statusText}>{item.status1}</Text>
          </View>
        </View>
        <Text style={styles.detailText}>From: {item.rideId.from}</Text>
        <Text style={styles.detailText}>To: {item.rideId.to}</Text>
        <Text style={styles.detailText}>Fare: {item.rideId.fare}</Text>
        <View>
          <Button title="Pay with UPI" onPress={handlePayment} />
        </View>
      </View>
    </View>
  );

  const getStatusStyle = (status) => {
    switch (status) {
      case "Cancelled":
        return styles.cancelled;
      case "Confirmed":
        return styles.confirmed;
      case "Requested":
        return styles.coming;

      case "Completed":
        return styles.completed;
      default:
        return styles.coming;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>My Rides</Text>
      <FlatList
        data={rideReq}
        keyExtractor={(item) => item._id}
        renderItem={renderRequest}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No ride requests available.</Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7f7f7",
    padding: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  riderName: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
  },
  statusBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  statusText: {
    color: "#fff",
    fontWeight: "600",
  },
  cancelled: {
    backgroundColor: "red", // Orange
  },
  confirmed: {
    backgroundColor: "#6a5acd", // Slate blue
  },
  coming: {
    backgroundColor: "#ff6347", // Tomato
  },
  ongoing: {
    backgroundColor: "#00aff5", // Blue
  },
  completed: {
    backgroundColor: "#28a745", // Green
  },
  detailText: {
    fontSize: 16,
    marginTop: 5,
    color: "#555",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 15,
    justifyContent: "flex-end",
  },
  actionButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: "#6a5acd",
  },
  activateButton: {
    backgroundColor: "#00aff5",
  },
  completeButton: {
    backgroundColor: "#28a745",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 18,
    color: "#777",
  },
});

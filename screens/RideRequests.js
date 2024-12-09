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
  Linking,
  Button,
} from "react-native";
import Linkk from "../hooks/Linkk";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  const getRideRequest = async () => {
    try {
      const id = await AsyncStorage.getItem("userId");
      const resp = await axios.get(Linkk + `/api/v1/review/driver/${id}`);
      console.log(resp.data);
      setRideReq(resp.data);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getRideRequest();
  }, []);

  // Function to handle confirmation of a ride
  const confirmRide = async (id) => {
    try {
      const resp = await axios.put(Linkk + `/api/v1/review/${id}`, {
        status1: "Confirmed",
      });
      getRideRequest();
    } catch (err) {
      console.log(err);
    }
  };

  // Function to update the status of a ride
  const updateStatus = async (id, newStatus) => {
    try {
      const resp = await axios.put(Linkk + `/api/v1/review/${id}`, {
        status1: newStatus,
      });
      getRideRequest();
    } catch (err) {
      console.log(err);
    }
  };
  const makeCall = (phoneNumber) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  // Render each ride request
  const renderRequest = ({ item }) => (
    <View>
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.riderName}>{item.userId.name}</Text>
          <View style={[styles.statusBadge, getStatusStyle(item.status1)]}>
            <Text style={styles.statusText}>{item.status1}</Text>
          </View>
        </View>
        <Text style={styles.detailText}>From: {item.rideId.from}</Text>
        <Text style={styles.detailText}>To: {item.rideId.to}</Text>
        <Text style={styles.detailText}>Fare: {item.rideId.fare}</Text>
        <TouchableOpacity
            style={[styles.actionButton, styles.callButton]}
            onPress={() => makeCall(item.userId.phoneNumber)}
          >
            <Text style={styles.buttonText}>Call Rider</Text>
          </TouchableOpacity>

        {/* Action Buttons */}
        <View style={styles.buttonContainer}>
          {item.status1 == "Requested" && (
            <TouchableOpacity
              style={[styles.actionButton, styles.confirmButton]}
              onPress={() => confirmRide(item._id)}
            >
              <Text style={styles.buttonText}>Confirm</Text>
            </TouchableOpacity>
          )}

          {item.status1 === "Confirmed" && (
            <>
              <TouchableOpacity
                style={[styles.actionButton, styles.activateButton]}
                onPress={() => updateStatus(item._id, "Completed")}
              >
                <Text style={styles.buttonText}>Completed</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, styles.activateButton]}
                onPress={() => updateStatus(item._id, "Cancelled")}
              >
                <Text style={styles.buttonText}>Cancelled</Text>
              </TouchableOpacity>
            </>
          )}
          {/* New Call Button */}
        
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
      <Text style={styles.heading}>Ride Requests</Text>
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
    color: "#777",
  },
  callButton: {
    backgroundColor: "#28a745", // Green color for call button
    padding: 15,
    borderRadius: 5,
   marginTop:15,
  },
  buttonText:{
    textAlign:"center",
    color: "#fff",
    fontWeight: "600",

  }
});

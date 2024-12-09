import React from "react";
import { FlatList, Text, StyleSheet } from "react-native";
import AnimatedSlider from "../components/AnimatedSlider"; // Import the component

const rides = [
  { id: "1", from: "New York", to: "Boston", date: "2024-12-01", status: "Completed" },
  { id: "2", from: "San Francisco", to: "Los Angeles", date: "2024-12-03", status: "Pending" },
  { id: "3", from: "Chicago", to: "Detroit", date: "2024-12-05", status: "Completed" },
];

const RidesComponent = () => {
  return (
    <AnimatedSlider title="My Rides" expandedHeight={300}>
      <FlatList
        data={rides}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={styles.rideItem}>
            {item.from} ➡ {item.to} ({item.date}) [{item.status}]
          </Text>
        )}
      />
    </AnimatedSlider>
  );
};

const styles = StyleSheet.create({
  rideItem: {
    fontSize: 14,
    color: "#333",
    paddingVertical: 5,
  },
});

export default RidesComponent;

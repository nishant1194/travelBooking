import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // For arrow icons

const AnimatedSlider = ({ title, children, expandedHeight = 200 }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [height] = useState(new Animated.Value(0)); // Animated height for the slider

  const toggleSlider = () => {
    if (isExpanded) {
      Animated.timing(height, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start(() => setIsExpanded(false));
    } else {
      setIsExpanded(true);
      Animated.timing(height, {
        toValue: expandedHeight,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleSlider}>
        <Text style={styles.toggleText}>{title}</Text>
        <AntDesign name={isExpanded ? "up" : "down"} size={24} color="black" />
      </TouchableOpacity>

      <Animated.View style={[styles.sliderContent, { height }]}>
        {isExpanded && <View style={styles.content}>{children}</View>}
      </Animated.View>
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  toggleText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  sliderContent: {
    overflow: "hidden",
    backgroundColor: "#fff",
    borderRadius: 8,
    marginTop: 5,
    elevation: 2,
  },
  content: {
    padding: 15,
  },
});

export default AnimatedSlider;

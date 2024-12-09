import { StyleSheet, Text, View,ScrollView } from 'react-native';
 
import Test from "./Home";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateRide from './CreateRide';
import { TouchableOpacity } from 'react-native';
import BookRide from './BookRide';

export default function TabTwoScreen() {
  return (
    <ScrollView>
      <BookRide />
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

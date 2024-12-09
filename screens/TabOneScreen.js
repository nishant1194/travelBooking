import { StyleSheet } from "react-native";

import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
import Cards from '../comps/Cards.js'
import AboutUser from "./AboutUser.js";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
     
       {/* <Cards /> */}
       <AboutUser />
    </View>
  );
}

const styles = StyleSheet.create({
  
});

import Ionicons from "@expo/vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { useColorScheme } from "react-native";

import Colors from "../constants/Colors";
import Test from "../screens/Home";
 import CreateRide from "../screens/CreateRide";
import AboutUser from "../screens/AboutUser";

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme]?.tint || "#007bff",
        tabBarStyle: { backgroundColor: "#fff" },
        headerShown: false,
      }}
    >
      <BottomTab.Screen
        name="HomeTab"
        component={TestNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="CreateRideTab"
        component={CreateRideNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="add" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="AboutUserTab"
        component={AboutUserNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="person-sharp" color={color} />,
        }}
      />
      {/* <BottomTab.Screen
        name="TabItem"
        component={ItemNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="ios-code" color={color} />
          ),
        }}
      /> */}
    </BottomTab.Navigator>
  );
}

function TabBarIcon(props) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

const TestStack = createStackNavigator();
function TestNavigator() {
  return (
    <TestStack.Navigator>
      <TestStack.Screen
        name="TestHome"
        component={Test}
        options={{ headerShown:false }}
      />
    </TestStack.Navigator>
  );
}

const CreateRideStack = createStackNavigator();
function CreateRideNavigator() {
  return (
    <CreateRideStack.Navigator>
      <CreateRideStack.Screen
        name="CreateRideScreen"
        component={CreateRide}
        options={{ headerShown:false }}
      />
    </CreateRideStack.Navigator>
  );
}
const AboutUserStack = createStackNavigator();
function AboutUserNavigator() {
  return (
    <AboutUserStack.Navigator>
      <AboutUserStack.Screen
        name="AboutUserScreen"
        component={AboutUser}
        options={{ headerShown:false }}
      />
    </AboutUserStack.Navigator>
  );
}
// const ItemStack = createStackNavigator();
// function ItemNavigator() {
//   return (
//     <ItemStack.Navigator>
//       <ItemStack.Screen
//         name="ItemScreen"
//         component={ItemScreen}
//         options={{ headerTitle: "Item Screen" }}
//       />
//     </ItemStack.Navigator>
//   );
// }

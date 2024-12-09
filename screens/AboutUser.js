import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  Animated,
  Alert,
  ScrollView
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // For arrow icons
import AnimatedSlider from "../components/AnimatedSlider"; // Import the component
import Card from "../comps/Cards";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import AsyncStorage from "@react-native-async-storage/async-storage";
import Linkk from "../hooks/Linkk";
import axios from "axios";

const AboutUser = ({navigation}) => {
    const [fontsLoaded] = useFonts({
        Roboto_400Regular,
        Roboto_700Bold,
      });

      // If fonts are not loaded, show a loading message
      const [isExpanded, setIsExpanded] = useState(false);
      const [height] = useState(new Animated.Value(0)); // Animated height for the slider
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [phone, setPhone] = useState('');
      const [password, setPassword] = useState("********");
      const [isEditing, setIsEditing] = useState(false);

      const getUser= async()=>{
        try {
             const id = await AsyncStorage.getItem('userId')
              const resp = await axios.get(Linkk+`/api/v1/auth/getUser/${id}`);
             setName(resp.data.user[0].name);
             setEmail(resp.data.user[0].email)
            //  console.log(resp.data.user[0].phone)
             setPhone(resp.data.user[0].phone);
            //  console.log(phone);
              
        } catch (error) {
          console.log(error)
        }
      }
     useEffect(()=>{
      getUser()
     },
     [])
        if (!fontsLoaded) {
          return <Text>Loading...</Text>;
        }
  const handleEdit = () => setIsEditing(true);
  const handleSave = () => {
    setIsEditing(false);
    Alert.alert("Profile Updated", "Your changes have been saved.");
  };

  return (
     <ScrollView style={styles.container}>
        <Text style={styles.titlle}>Your Profile</Text>
      {/* Profile Header */}
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://portfolio-sigma-one-53.vercel.app/static/media/Nishant.9dcb755d866c80b0ca86.JPG",
          }}
          style={styles.avatar}
        />
        <Text style={styles.userName}>{name}</Text>
        <TouchableOpacity style={styles.editPhotoButton}>
          <Text style={styles.editPhotoText}>Change Photo</Text>
        </TouchableOpacity>
      </View>

      {/* User Details */}
         <View style={styles.detailsCard}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={name}
            editable={isEditing}
            onChangeText={setName}
          />
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={[styles.input, !isEditing && styles.disabledInput]}
            value={email}
            editable={isEditing}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.disabledInput}>+91 {phone}</Text>
         
           <View style={styles.buttonsContainer}>
            {isEditing ? (
              <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity style={styles.editButton} onPress={handleEdit}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
       {/* Buttons */}

      {/* Sliding Menu */}
      <TouchableOpacity onPress={()=>{
        navigation.navigate('MyRides')
      }}>
     <View style={styles.myRidesButton}>
      <Text style={styles.myRidesText}>My Rides</Text>
      <AntDesign name={ "right"} size={24} color="black" />

     </View>
     </TouchableOpacity>
     <TouchableOpacity onPress={()=>{
        navigation.navigate('RideRequest')
      }}>
     <View style={styles.myRidesButton}>
      <Text style={styles.myRidesText}>Ride req as a driver</Text>
      <AntDesign name={ "right"} size={24} color="black" />

     </View>
     </TouchableOpacity>
      <TouchableOpacity
      onPress={()=>{
        navigation.navigate("DriverInput")
      }}><Text style={styles.becomeDriver}>Become a Driver</Text></TouchableOpacity>

<TouchableOpacity
      onPress={ async() =>{
      try { await AsyncStorage.clear();
        navigation.reset({
          index: 0,
          routes: [{ name: 'Login' }],
        });
        }
        catch(err){
          console.log(err);
        }
      }}><Text style={styles.logout}>Logout</Text></TouchableOpacity>

    </ScrollView>
   );
};

const styles = StyleSheet.create({
  myRidesButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginVertical:10
  },
  myRidesText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
    titlle:{
        fontFamily:"Roboto_400Regular",
        fontSize:30,
        textAlign:"center",
        marginVertical:2
    },
  container: { flex: 1, backgroundColor: "#f5f5f5", padding: 20 },
  header: { alignItems: "center", marginBottom: 20 },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  userName: { fontSize: 22, fontWeight: "bold", color: "#333", marginTop: 10 },
  editPhotoButton: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: "#007bff",
    borderRadius: 20,
  },
  editPhotoText: { color: "#fff", fontSize: 14, fontWeight: "bold" },
  detailsCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  label: { fontSize: 14, color: "#666", marginBottom: 5 },
  input: {
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  disabledInput: { backgroundColor: "#f0f0f0", color: "#999",padding:3 },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  editButton: {
    backgroundColor: "#007bff",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  editButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  saveButton: {
    backgroundColor: "#28a745",
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 8,
  },
  saveButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  toggleButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#007bff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  toggleText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  menuContainer: {
    overflow: "hidden",
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  rideItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#eee" },
  rideText: { fontSize: 14, color: "#333", marginBottom: 5 },
  rideLabel: { fontWeight: "bold", color: "#666" },
  completedStatus: { color: "#28a745" },
  pendingStatus: { color: "#ffc107" },
  becomeDriver:{
    paddingVertical:10,
   textAlign:"center",
   backgroundColor:'#00aff5',
   color:"white",
   borderRadius:20,
    fontFamily:"Roboto_400Regular",
   fontSize:22,
   marginTop:20,
   marginBottom:10
 },
 logout:{
  paddingVertical:10,
   textAlign:"center",
   backgroundColor:'#00aff5',
   color:"white",
   borderRadius:20,
    fontFamily:"Roboto_400Regular",
   fontSize:22,
   marginTop:0,
   marginBottom:50
 }
});

export default AboutUser;


// import axios from 'axios';
// import React, { useEffect, useState } from 'react';
// import { 
//   View, 
//   Text, 
//   FlatList, 
//   TouchableOpacity, 
//   StyleSheet, 
//   Alert 
// } from 'react-native';
// import Linkk from '../hooks/Linkk';

// export default function RideRequests() {
 
//   const [rideReq, setRideReq] = useState([]);

//   //useEffect for Rides by driverId
// //getRides by driverid
// const getRideRequest= async()=>{
// try{
//   const resp = await axios.get(Linkk+"/api/v1/review");
//   console.log(resp.data);
//   setRideReq(resp.data) ;
// }
// catch(err){
//   console.log(err);
// }
// }
//   useEffect(()=>{
//     getRideRequest()
//   }
//     ,[])

//   // Function to handle confirmation of a ride
//   const DeleteRide = async(id) => {
//     try{
//       const resp = await axios.delete(Linkk+`/api/v1/review/${id}`)
//       console.log(resp.data)
//     }
//      catch(err){
//       console.log(err)
//      }
//   };

//   // Function to update the status of a ride
//   const updateStatus = (id, newStatus) => { 
//   };

//   // Render each ride request
//   const renderRequest = ({ item }) => (
//     <View style={styles.card}>
//       <View style={styles.cardHeader}>
//         <Text style={styles.riderName}>John doe</Text>
//         <View style={[styles.statusBadge, getStatusStyle(item.status)]}>
//           <Text style={styles.statusText}>{item.status1}</Text>
//         </View>
//       </View>
//       <Text style={styles.detailText}>From: {item.rideId.from}</Text>
//       <Text style={styles.detailText}>To: {item.rideId.to}</Text>
//       <Text style={styles.detailText}>Fare: {item.rideId.fare}</Text>
      
//       {/* Action Buttons */}
//       <View style={styles.buttonContainer}>
//         {!item.confirmed && (
//           <TouchableOpacity
//             style={[styles.actionButton, styles.confirmButton]}
//             onPress={() => DeleteRide(item._id)}
//           >
//             <Text style={styles.buttonText}>DeleteRide</Text>
//           </TouchableOpacity>
//         )}
        
//         {item.confirmed && item.status !== 'Completed' && (
//           <>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.activateButton]}
//               onPress={() => updateStatus(item._id, 'Coming')}
//             >
//               <Text style={styles.buttonText}>Coming</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.activateButton]}
//               onPress={() => updateStatus(item._id, 'Ongoing')}
//             >
//               <Text style={styles.buttonText}>Ongoing</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.actionButton, styles.completeButton]}
//               onPress={() => updateStatus(item._id, 'Completed')}
//             >
//               <Text style={styles.buttonText}>Complete</Text>
//             </TouchableOpacity>
//           </>
//         )}
//       </View>
//     </View>
//   );

//   const getStatusStyle = (status) => {
//     switch (status) {
//       case 'Pending':
//         return styles.pending;
//       case 'Confirmed':
//         return styles.confirmed;
//       case 'Coming':
//         return styles.coming;
//       case 'Ongoing':
//         return styles.ongoing;
//       case 'Completed':
//         return styles.completed;
//       default:
//         return styles.pending;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.heading}>Ride Requests</Text>
//       <FlatList
//         data={rideReq}
//         keyExtractor={(item) => item._id}
//         renderItem={renderRequest}
//         ListEmptyComponent={<Text style={styles.emptyText}>No ride requests available.</Text>}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f7f7f7',
//     padding: 15,
//   },
//   heading: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 15,
//     textAlign: 'center',
//     color: '#333',
//   },
//   card: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//     marginVertical: 8,
//     borderRadius: 10,
//     elevation: 3,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 4,
//   },
//   cardHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   riderName: {
//     fontSize: 20,
//     fontWeight: '600',
//     color: '#000',
//   },
//   statusBadge: {
//     paddingVertical: 4,
//     paddingHorizontal: 8,
//     borderRadius: 12,
//   },
//   statusText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   pending: {
//     backgroundColor: '#FFA500', // Orange
//   },
//   confirmed: {
//     backgroundColor: '#6a5acd', // Slate blue
//   },
//   coming: {
//     backgroundColor: '#ff6347', // Tomato
//   },
//   ongoing: {
//     backgroundColor: '#00aff5', // Blue
//   },
//   completed: {
//     backgroundColor: '#28a745', // Green
//   },
//   detailText: {
//     fontSize: 16,
//     marginTop: 5,
//     color: '#555',
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     marginTop: 15,
//     justifyContent: 'flex-end',
//   },
//   actionButton: {
//     paddingVertical: 8,
//     paddingHorizontal: 15,
//     borderRadius: 5,
//     marginLeft: 10,
//   },
//   confirmButton: {
//     backgroundColor: '#6a5acd',
//   },
//   activateButton: {
//     backgroundColor: '#00aff5',
//   },
//   completeButton: {
//     backgroundColor: '#28a745',
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: '600',
//   },
//   emptyText: {
//     textAlign: 'center',
//     marginTop: 50,
//     fontSize: 18,
//     color: '#777',
//   },
// });

// import { useEffect, useState } from "react";
// import {
//   Text,
//   View,
//   StyleSheet,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   ScrollView,
//   Dimensions,
// } from "react-native";
// import axios from "axios";
// import { LinearGradient } from "expo-linear-gradient";
// import { getToken, getUserId } from "../utils/secureStore";

// const { width } = Dimensions.get("window");

// const SessionScreen = () => {
//   const [sessions, setSessions] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeTab, setActiveTab] = useState("upcoming");

//   const [dates, setDates] = useState([]);
//   const [selectedDateIndex, setSelectedDateIndex] = useState(0);

//   useEffect(() => {
//     fetchSession();
//     setDates(generateDates());
//   }, []);

//   // 🔥 Generate dynamic dates
//   const generateDates = () => {
//     const datesArr = [];
//     const today = new Date();

//     for (let i = 0; i < 7; i++) {
//       const nextDate = new Date();
//       nextDate.setDate(today.getDate() + i);

//       if (i === 0) {
//         datesArr.push({
//           label: "Today",
//           fullDate: nextDate,
//         });
//       } else {
//         const dayName = nextDate.toLocaleDateString("en-US", {
//           weekday: "short",
//         });

//         const dayNumber = nextDate.getDate();

//         datesArr.push({
//           label: `${dayNumber} ${dayName}`,
//           fullDate: nextDate,
//         });
//       }
//     }

//     return datesArr;
//   };

//   const fetchSession = async () => {
//     try {
//       const token = await getToken();
      
//       const res = await axios.get(
//         `https://ai-powered-mentor-mentee-project-4.onrender.com/api/v1/session/getallsession`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );

//       setSessions(res.data.response || []);
//     } catch (err) {
//       console.log(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatTime = (date) => {
//     return new Date(date).toLocaleTimeString([], {
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   const renderItem = ({ item }) => {
//     return (
//       <View style={styles.card}>
//         <Image
//           source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
//           style={styles.avatar}
//         />

//         <View style={{ flex: 1 }}>
//           <Text style={styles.title}>{item.topic}</Text>

//           <Text style={styles.time}>
//             Today • {formatTime(item.date)}
//           </Text>

//           <Text style={styles.mentor}>
//             Mentor {item.mentor?.name}
//           </Text>

//           <View style={styles.buttonRow}>
//             <TouchableOpacity style={styles.primarySmallBtn}>
//               <Text style={styles.btnText}>Join Call</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.smallBtn}>
//               <Text style={styles.btnText}>Chat</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.smallBtn}>
//               <Text style={styles.btnText}>Tasks</Text>
//             </TouchableOpacity>

//             <TouchableOpacity style={styles.cancelBtn}>
//               <Text style={styles.btnText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         <TouchableOpacity style={styles.joinBtn}>
//           <Text style={styles.joinText}>Join</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   if (loading) {
//     return (
//       <View style={styles.center}>
//         <Text style={{ color: "white" }}>Loading...</Text>
//       </View>
//     );
//   }

//   return (
//     <LinearGradient
//       colors={["#000000", "#140000", "#000000"]}
//       style={styles.container}
//     >
//       {/* Header */}
//       <Text style={styles.header}>Sessions</Text>

//       {/* Tabs */}
//       <View style={styles.tabs}>
//         <TouchableOpacity
//           style={[
//             styles.tab,
//             activeTab === "upcoming" && styles.activeTab,
//           ]}
//           onPress={() => setActiveTab("upcoming")}
//         >
//           <Text style={styles.tabText}>
//             Upcoming {sessions.length}
//           </Text>
//         </TouchableOpacity>

//         <TouchableOpacity
//           style={[
//             styles.tab,
//             activeTab === "past" && styles.activeTab,
//           ]}
//           onPress={() => setActiveTab("past")}
//         >
//           <Text style={styles.tabText}>Past</Text>
//         </TouchableOpacity>
//       </View>

//       {/* 🔥 Dynamic Date Scroll */}
//       <ScrollView 
//       horizontal 
//       showsHorizontalScrollIndicator={false}
//       style={{marginBottom:10}}>
//         {dates.map((item, index) => (
//           <TouchableOpacity
//             key={index}
//             onPress={() => setSelectedDateIndex(index)}
//             style={
//               selectedDateIndex === index
//                 ? styles.activeDate
//                 : styles.date
//             }
//           >
//             <Text  numberOfLines={1} style={{ color: "white" }}>{item.label}</Text>
//           </TouchableOpacity>
//         ))}
//       </ScrollView>

//       {/* List */}
//       <FlatList
//         data={sessions}
//         keyExtractor={(item) => item._id}
//         renderItem={renderItem}
//         showsVerticalScrollIndicator={false}
//       />
//     </LinearGradient>
//   );
// };

// export default SessionScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },

//   header: {
//     color: "#ff2e2e",
//     marginTop:20,
//     fontSize: 28,
//     fontWeight: "bold",
//     textAlign: "center",
//     // marginBottom: 20,
//   },

//   tabs: {
//     flexDirection: "row",
//     backgroundColor: "#1a1a1a",
//     borderRadius: 30,
//     padding: 4,
//     marginBottom: 15,
//   },

//   tab: {
//     flex: 1,
//     paddingVertical: 10,
//     alignItems: "center",
//   },

//   activeTab: {
//     backgroundColor: "#801c1c",
//     borderRadius: 25,
//   },

//   tabText: {
//     color: "white",
//     fontWeight: "600",
//   },

//  date: {
//   backgroundColor: "#1a1a1a",
//   height: 40,              // ✅ fixed height
//   paddingHorizontal: 16,
//   borderRadius: 10,
//   marginRight: 10,
//   minWidth: 80,
//   alignItems: "center",
//   justifyContent: "center",
// },

// activeDate: {
//   backgroundColor: "#801c1c",
//   height: 40,              // ✅ same height
//   paddingHorizontal: 16,
//   borderRadius: 10,
//   marginRight: 10,
//   minWidth: 80,
//   alignItems: "center",
//   justifyContent: "center",
// },

//   sectionTitle: {
//     color: "#bbb",
//     marginVertical: 10, // alignItems: "center",
//     fontSize: 14,
//   },

//   card: {
//     flexDirection: "row",
//     backgroundColor: "#111",
//     borderRadius: 20,
//     padding: 12,
//     marginBottom: 15,
//     borderWidth: 1,
//     borderColor: "#ff2e2e60",
//     shadowColor: "#ff2e2e",
//     shadowOpacity: 0.4,
//     shadowRadius: 10,
//     elevation: 8,
//   },
//   avatar: {
//     width: 60,
//     height: 60,
//     borderRadius: 15,
//     marginRight: 10,
//   },
//   title: {
//     color: "white",
//     fontSize: 16,
//     fontWeight: "bold",
//   },

//   time: {
//     color: "#ff2e2e",
//     marginTop: 2,
//   },

//   mentor: {
//     color: "#aaa",
//     marginBottom: 8,
//   },

//   joinBtn: {
//     backgroundColor: "#801c1c",
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     borderRadius: 10,
//     justifyContent: "center",
//     alignItems: "center",
//     alignSelf: "center", // ✅ this centers vertically in row
//   },
//   joinText: {
//     color: "white",
//     fontWeight: "bold",
//     // justifyContent:"center",
//     // alignItems:"center",
//   },
//   buttonRow: {
//     flexDirection: "row",
//     marginTop: 10
//   },
//   primarySmallBtn: {
//     backgroundColor: "#801c1c",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 8,
//     marginRight: 5,
//     marginBottom: 5,
//   },

//   smallBtn: {
//     borderWidth: 1,
//     borderColor: "#801c1c",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 8,
//     marginRight: 5,
//     marginBottom: 5,
//   },

//   cancelBtn: {
//     borderWidth: 1,
//     borderColor: "#555",
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     borderRadius: 8,
//   },

//   btnText: {
//     color: "white",
//     fontSize: 12,
//   },

//   center: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
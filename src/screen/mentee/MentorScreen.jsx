import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";

const MentorScreen = ({ navigation }) => {
  const [mentor, setMentor] = useState([]);

  const fetchmentor = async () => {
    try {
      const response = await axios.get(
        "https://ai-powered-mentor-mentee-project-4.onrender.com/api/v1/mentor/allmentor"
      );
      setMentor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchmentor();
  }, []);

  const renderMentor = ({ item }) => {
    if (item.role !== "mentor") return null;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("MentorDetails", { mentor: item })
        }
      >
        {/* IMAGE */}
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {item.name.charAt(0)}
          </Text>
        </View>

        {/* NAME */}
        <Text style={styles.name}>{item.name}</Text>

        {/* ROLE */}
        <Text style={styles.role}>
          {item.skills?.[0] || "Mentor"}
        </Text>

        {/* STARS */}
        <View style={styles.stars}>
          {[1, 2, 3, 4, 5].map((i) => (
            <Ionicons key={i} name="star" size={12} color="#E53935" />
          ))}
        </View>

        {/* BUTTON */}
        <Text style={styles.button}>Book</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#C62828" />

      {/* 🔥 HEADER */}
      <View style={styles.header}>
        <Text style={styles.hello}> Hello, {mentor[0]?.mentees?.[0]?.name?.split(" ")[0] || "User"}</Text>
        <Text style={styles.title}>Find your mentor</Text>

        {/* SEARCH */}
        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={18} color="#999" />
            <TextInput
              placeholder="Search for mentors"
              placeholderTextColor="#999"
              style={styles.input}
            />
          </View>

          <TouchableOpacity style={styles.filter}>
            <Ionicons name="options" size={20} color="#C62828" />
          </TouchableOpacity>
        </View>
      </View>

      {/* 🔥 WHITE CONTAINER */}
      <View style={styles.content}>
        <Text style={styles.section}>Top Mentors</Text>

        <FlatList
          data={mentor}
          keyExtractor={(item) => item._id}
          renderItem={renderMentor}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default MentorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C62828",
  },

  /* HEADER */
  header: {
    marginTop:30,
    padding: 20,
    paddingBottom: 30,
  },

  hello: {
    color: "#fff",
    fontSize: 14,
  },

  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 5,
  },

  searchRow: {
    flexDirection: "row",
    marginTop: 15,
  },

  searchBox: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 10,
  },

  input: {
    flex: 1,
    paddingLeft: 8,
    height: 40,
  },

  filter: {
    backgroundColor: "#fff",
    marginLeft: 10,
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },

  /* CONTENT */
  content: {
    flex: 1,
    backgroundColor: "#0D0D0D",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 15,
  },

  section: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  /* CARD */
  card: {
    backgroundColor: "#1A1A1A",
    width: "48%",
    borderRadius: 15,
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#eee",
    justifyContent: "center",
    alignItems: "center",
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "bold",
  },

  name: {
    color: "#fff",
    marginTop: 8,
    fontSize: 13,
    fontWeight: "600",
  },

  role: {
    fontSize: 11,
    color: "#777",
    marginTop: 2,
  },

  stars: {
    flexDirection: "row",
    marginTop: 5,
  },

  button: {
    marginTop: 8,
    fontSize: 12,
    color: "#C62828",
    fontWeight: "bold",
  },
});
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // For Expo


const SignupScreen = ({ navigation }) => {
  const [role, setRole] = useState("Mentor");


  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["transparent", "#2b0000", "#8B0000"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomGlow}
      />
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Create Account</Text>

        <Text style={styles.label}>Full Name</Text>
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={18} color="#aaa" />
          <TextInput
            placeholder="Enter your name"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Email</Text>
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={18} color="#aaa" />
          <TextInput
            placeholder="Enter your email"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Password</Text>
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={18} color="#aaa" />
          <TextInput
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            secureTextEntry
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Bio</Text>
        <View style={styles.inputBox}>
          <Ionicons name="document-text-outline" size={18} color="#aaa" />
          <TextInput
            placeholder="Write bio"
            placeholderTextColor="#aaa"
            style={styles.input}
          />
        </View>

        <Text style={styles.label}>Select Role</Text>
        <View style={styles.roleContainer}>
          <TouchableOpacity
            style={[
              styles.roleButton,
              role === "Mentor" && styles.activeRole,
            ]}
            onPress={() => setRole("Mentor")}
          >
            <Text style={styles.roleText}>Mentor</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.roleButton,
              role === "Mentee" && styles.activeRole,
            ]}
            onPress={() => setRole("Mentee")}
          >
            <Text style={styles.roleText}>Mentee</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={styles.link}>
            Already have an account?{" "}
            <Text style={{ color: "red" }}>Login</Text>
          </Text>
        </TouchableOpacity>


      </View>
    </SafeAreaView>
  );
};
export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0f0f0f",
  },
  bottomGlow: {
    position: "absolute",
    bottom: -80,
    left: -50,
    right: -50,
    height: 300,
    borderRadius: 300,
    opacity: 0.9,
  },

  innerContainer: {
    padding: 25,
    marginTop: 50,
  },
  logoImage: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 15,
    borderRadius: 20,
  },
  logo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  tagline: {
    color: "red",
    textAlign: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    color: "white",
    marginBottom: 5,
    marginTop: 10,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#1c1c1c",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: "white",
    padding: 10,
  },
  button: {
    backgroundColor: "red",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontWeight: "bold",
  },
  or: {
    color: "#aaa",
    textAlign: "center",
    marginVertical: 20,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  link: {
    color: "#aaa",
    textAlign: "center",
    marginTop: 10,
  },
  roleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  roleButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "red",
    marginHorizontal: 5,
    alignItems: "center",
  },
  activeRole: {
    backgroundColor: "red",
  },
  roleText: {
    color: "white",
    fontWeight: "bold",
  },
});
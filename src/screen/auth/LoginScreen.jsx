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
    Alert,
    ToastAndroid,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient"; // For Expo
import axios from "axios";
import { saveToken, saveUser, saveUserId } from "../../utils/secureStore";

const LoginScreen = ({ navigation }) => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        try {
            const response = await axios.post(
                `https://ai-powered-mentor-mentee-project-4.onrender.com/api/v1/auth/login`,
                { email, password }
            );
            ToastAndroid.show("Login Successful", ToastAndroid.SHORT)
            // Alert.alert("Success", "Login Successful");
            const user = response.data.user;   // 👈 full user
            const token = response.data.token;
            const role = user.role;

            console.log("UserId", user._id);
            console.log("Token", token);
            console.log("Role", role);

            // ✅ SAVE EVERYTHING
            await saveUserId(user._id);
            await saveToken(token);
            await saveUser(user);
            if (role === "mentor") {
                navigation.navigate("MentorTabScreen");

            } else {
                navigation.navigate("MenteeTabScreen");
            }

        } catch (error) {
            console.log(error);
            Alert.alert("Error", "Invalid Email or Password");
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#0f0f0f" />

            {/* 🔥 Red Bottom Glow Effect */}
            <LinearGradient
                colors={["transparent", "#2b0000", "#8B0000"]}
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 1 }}
                style={styles.bottomGlow}
            />

            <View style={styles.innerContainer}>
                <Image
                    source={require("../../../assets/logo.png")}
                    style={styles.logoImage}
                    resizeMode="contain"
                />

                <Text style={styles.logo}>MentorConnect</Text>
                <Text style={styles.tagline}>Learn. Grow. Succeed.</Text>

                <Text style={styles.label}>Email</Text>
                <View style={styles.inputBox}>
                    <Ionicons name="mail-outline" size={18} color="#aaa" />
                    <TextInput
                        placeholder="Enter your email"
                        placeholderTextColor="#aaa"
                        value={email}
                        onChangeText={setEmail}
                        style={styles.input}
                    />
                </View>

                <Text style={styles.label}>Password</Text>
                <View style={styles.inputBox}>
                    <Ionicons name="lock-closed-outline" size={18} color="#aaa" />
                    <TextInput
                        placeholder="Enter your password"
                        placeholderTextColor="#aaa"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        style={styles.input}
                    />
                </View>

                <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

                <Text style={styles.or}>──────── OR ────────</Text>

                {/* 🔥 Social Buttons */}
                <View style={styles.socialRow}>
                    <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="google" size={22} color="#801c1c" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="facebook" size={22} color="#1877F2" />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.socialButton}>
                        <FontAwesome name="apple" size={22} color="#fff" />
                    </TouchableOpacity>
                </View>

                <TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
                    <Text style={styles.link}>
                        Don’t have an account?{" "}
                        <Text style={{ color: "red" }}>Sign Up</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

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
        marginTop: 30,
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
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 20,
    },

    socialButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: "#1c1c1c",
        justifyContent: "center",
        alignItems: "center",
        marginHorizontal: 15,

        elevation: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 6,

        borderWidth: 1,
        borderColor: "#2c2c2c",
    },

    link: {
        color: "#aaa",
        textAlign: "center",
        marginTop: 10,
    },
});
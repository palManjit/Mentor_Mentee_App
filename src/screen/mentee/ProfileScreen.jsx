import axios from "axios";
import { useEffect, useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { getToken, getUserId } from "../../utils/secureStore";

const { width } = Dimensions.get("window");

const ProfileScreen = () => {
    const [profile, setProfile] = useState(null);

    const fetchProfile = async () => {
        try {
            const token = await getToken();
            const id = await getUserId();

            const response = await axios.get(
                `https://ai-powered-mentor-mentee-project-4.onrender.com/api/v1/mentee/getamentee/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setProfile(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, []);

    if (!profile) {
        return (
            <View style={styles.center}>
                <Text style={{ color: "white" }}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: "#000" }}>
            <ScrollView showsVerticalScrollIndicator={false}>

                {/* 🔥 HEADER / HERO */}
                <LinearGradient
                    colors={["#751a03", "#990000"]}
                    style={styles.hero}
                >
                    <Image
                        source={{ uri: "https://i.pravatar.cc/300" }}
                        style={styles.profileImg}
                    />

                    <Text style={styles.name}>{profile.name}</Text>
                    <Text style={styles.subtitle}>Aspiring Mobile Developer</Text>
                </LinearGradient>

                {/* 📊 STATS */}
                <View style={styles.statsContainer}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>
                            {profile.sessions?.length || 0}
                        </Text>
                        <Text style={styles.statLabel}>Sessions</Text>
                    </View>

                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{profile.task?.length || 0}</Text>
                        <Text style={styles.statLabel}>Tasks Done</Text>
                    </View>

                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{profile.rating || 0.0}</Text>
                        <Text style={styles.statLabel}>Rating</Text>
                    </View>
                </View>

                {/* 🎯 BUTTONS */}
                <View style={styles.buttonRow}>
                    <TouchableOpacity style={styles.editBtn}>
                        <Ionicons name="create-outline" size={18} color="#fff" />
                        <Text style={styles.btnText}> Edit Profile</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.messageBtn}>
                        <Ionicons name="chatbubble-outline" size={18} color="#fff" />
                        <Text style={styles.btnText}> Message</Text>
                    </TouchableOpacity>
                </View>

                {/* 📄 BIO */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>About Me</Text>
                    <Text style={styles.cardText}>
                        {profile.bio || "No bio added yet"}
                    </Text>
                </View>

                {/* 🧠 SKILLS */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Skills</Text>

                    <View style={styles.skills}>
                        {profile.skills?.map((skill, index) => (
                            <View key={index} style={styles.skill}>
                                <Text style={styles.skillText}>{skill}</Text>
                            </View>
                        ))}
                    </View>
                </View>

                {/* 🎯 GOALS */}
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Goals</Text>

                    <Text style={styles.cardText}>• Build my first mobile app</Text>
                    <Text style={styles.cardText}>• Improve coding skills</Text>
                    <Text style={styles.cardText}>• Get internship</Text>
                </View>


                <TouchableOpacity style={styles.logoutBtn}>
                    <Ionicons name="log-out-outline" size={18} color="#fff" />
                    <Text style={styles.btnText}> Logout</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    hero: {
        height: 260,
        justifyContent: "center",
        alignItems: "center",
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },

    profileImg: {
        width: 110,
        height: 110,
        borderRadius: 55,
        borderWidth: 3,
        borderColor: "#fff",
    },

    name: {
        color: "#fff",
        fontSize: 22,
        fontWeight: "bold",
        marginTop: 10,
    },

    subtitle: {
        color: "#ddd",
        marginTop: 5,
    },

    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: -30,
        marginHorizontal: 15,
    },

    statBox: {
        backgroundColor: "#111",
        padding: 15,
        borderRadius: 15,
        alignItems: "center",
        width: "30%",
        elevation: 5,
    },

    statNumber: {
        color: "#fff",
        fontSize: 18,
        fontWeight: "bold",
    },

    statLabel: {
        color: "#aaa",
        fontSize: 12,
    },

    buttonRow: {
        flexDirection: "row",
        margin: 15,
    },

    editBtn: {
        flex: 1,
        backgroundColor: "#333",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        marginRight: 10,
        flexDirection: "row",
        justifyContent: "center",
    },

    messageBtn: {
        flex: 1,
        backgroundColor: "#751a03",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
    },

    btnText: {
        color: "#fff",
        fontWeight: "bold",
        marginLeft: 5,
    },

    card: {
        backgroundColor: "#111",
        marginHorizontal: 15,
        marginBottom: 15,
        padding: 15,
        borderRadius: 15,
    },

    sectionTitle: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 10,
    },

    cardText: {
        color: "#ccc",
        lineHeight: 20,
    },

    skills: {
        flexDirection: "row",
        flexWrap: "wrap",
    },

    skill: {
        backgroundColor: "#751a03",
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginRight: 8,
        marginBottom: 8,
    },

    skillText: {
        color: "#fff",
        fontSize: 12,
    },

    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    logoutBtn: {
        flex: 1,
        backgroundColor: "#751a03",
        padding: 20,
        borderRadius: 25,
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "center",
        marginBottom:20
    },
});
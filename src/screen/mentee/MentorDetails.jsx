import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const MentorDetails = ({ route, navigation }) => {
  const { mentor } = route.params || {};
  const [modelVisible, setmodelVisible] = useState(false)

  const [form, setForm] = useState({
    date: "",
    topic: "",
    description: ""
  })


  const bookSession = async () => {
    try {
      const res = await axios.post(``)
    } catch (error) {

    }
  }

  if (!mentor) return null;

  const profileImage = "https://i.pravatar.cc/500?img=12";

  const mentees = mentor.mentees || [];

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* 🔥 HERO SECTION */}
        <View style={styles.heroContainer}>
          <Image
            source={{ uri: profileImage }}
            style={styles.heroImage}
            resizeMode="cover"
          />

          {/* DARK GRADIENT */}
          <LinearGradient
            colors={[
              "rgba(0,0,0,0.2)",
              "rgba(0,0,0,0.6)",
              "rgba(0,0,0,0.95)",
            ]}
            style={styles.overlay}
          />

          {/* RED GLOW */}
          <LinearGradient
            colors={["rgba(255,0,0,0.4)", "transparent"]}
            style={styles.redGlow}
          />

          {/* BACK BUTTON */}
          <TouchableOpacity
            style={styles.backBtn}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="#fff" />
          </TouchableOpacity>

          {/* PROFILE INFO */}
          <View style={styles.heroContent}>
            <Text style={styles.name}>
              {mentor.name} <Text style={styles.verify}>✔</Text>
            </Text>

            <Text style={styles.subtitle}>
              {mentor.role} ⭐ {mentor.reviews?.length ? "4.5" : "New"}
            </Text>

            {/* BADGES */}
            <View style={styles.badges}>
              <Text style={styles.badge}>Top Mentor</Text>
              <Text style={styles.badge}>👥 {mentees.length}</Text>
              <Text style={styles.badge}>{mentor.experience} +Years</Text>
            </View>
          </View>
        </View>

        {/* ACTION BUTTONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.messageBtn}>
            <Text style={styles.btnText}>Message</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.bookBtn} onPress={() => setmodelVisible(true)}>
            <Text style={{ color: "#000", fontWeight: "600" }}>
              Book Session
            </Text>
          </TouchableOpacity>
        </View>

        <Modal
          transparent
          animationType="slide"
          visible={modelVisible}
          onRequestClose={() => setmodelVisible(false)}
        >
          <View style={styles.bottomOverlay}>
            <View style={styles.bottomSheet}>

              {/* HEADER */}
              <View style={styles.modalHeader}>
                <Text style={styles.sheetTitle}>Book with {mentor.name}</Text>
                <TouchableOpacity onPress={() => setmodelVisible(false)}>
                  <Ionicons name="close" size={22} color="#333" />
                </TouchableOpacity>
              </View>

              {/* DATE */}
              <Text style={styles.label}>Date</Text>
              <TextInput
                placeholder="e.g. 2025-04-20"
                style={styles.sheetInput}
                value={form.date}
                onChangeText={(text) => setForm({ ...form, date: text })}
              />

              {/* TIME */}
              <Text style={styles.label}>Time</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {["09:00", "10:00", "11:00", "12:00", "01:00"].map((t, i) => (
                  <TouchableOpacity key={i} style={styles.timeBtn}>
                    <Text>{t}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>

              {/* DURATION */}
              <Text style={styles.label}>Duration (hours)</Text>
              <View style={styles.row}>
                {["1h", "1.5h", "2h"].map((d, i) => (
                  <TouchableOpacity key={i} style={styles.durationBtn}>
                    <Text>{d}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              {/* TOPIC */}
              <Text style={styles.label}>Topic / Goals *</Text>
              <TextInput
                placeholder="What do you want to learn or discuss?"
                style={[styles.sheetInput, { height: 80 }]}
                multiline
                value={form.topic}
                onChangeText={(text) => setForm({ ...form, topic: text })}
              />

              {/* BUTTON */}
              <TouchableOpacity
                style={styles.confirmBtn}
                onPress={() => {
                  navigation.navigate("SessionBook", {
                    mentorId: mentor._id,
                    formData: form,
                  });
                  setmodelVisible(false);
                }}
              >
                <Text style={styles.confirmText}>Confirm Booking</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Modal>

        {/* ABOUT */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <Text style={styles.desc}>{mentor.bio}</Text>
        </View>

        {/* SKILLS */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>

          <View style={styles.skillRow}>
            {mentor.skills?.map((skill, index) => (
              <View key={index} style={styles.skillChip}>
                <Text style={styles.skillText}>{skill}</Text>
              </View>
            ))}
          </View>

          {/* STATS */}
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {mentor.mentees?.length || 0}
              </Text>
              <Text style={styles.statLabel}>Total Mentees</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {mentor.reviews?.length ? "4.5" : "0.0"}
              </Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {mentor.sessions?.length || 0}
              </Text>
              <Text style={styles.statLabel}>Sessions</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>₹{mentor.price}</Text>
              <Text style={styles.statLabel}>Per Session</Text>
            </View>
          </View>
        </View>

        {/* MENTEES */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Current Mentees</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {mentees.map((item, i) => (
              <Image
                key={i}
                source={{ uri: `https://i.pravatar.cc/150?img=${i + 10}` }}
                style={styles.avatar}
              />
            ))}
          </ScrollView>
        </View>

        {/* SCHEDULE */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Schedule</Text>

          <View style={styles.scheduleRow}>
            <View style={styles.scheduleBox}>
              <Text style={styles.scheduleText}>Today</Text>
              <Text style={styles.time}>11:00 AM</Text>
            </View>

            <View style={styles.scheduleBox}>
              <Text style={styles.scheduleText}>Tomorrow</Text>
              <Text style={styles.time}>2:00 PM</Text>
            </View>

            <View style={styles.scheduleBox}>
              <Text style={styles.scheduleText}>Upcoming</Text>
              <Text style={styles.time}>7:00 PM</Text>
            </View>
          </View>
        </View>

      </ScrollView>
    </View>
  );
};

export default MentorDetails;

const styles = StyleSheet.create({
  heroContainer: {
    height: 350,
    overflow: "hidden",
  },

  heroImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    transform: [{ scale: 1.2 }],
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
  },

  redGlow: {
    position: "absolute",
    width: "100%",
    height: "100%",
    opacity: 0.6,
  },

  backBtn: {
    position: "absolute",
    top: 50,
    left: 20,
    zIndex: 10,
  },

  heroContent: {
    position: "absolute",
    bottom: 20,
    left: 20,
  },

  name: {
    fontSize: 22,
    color: "#fff",
    fontWeight: "bold",
  },

  verify: {
    color: "#00FF9D",
  },

  subtitle: {
    color: "#fff",
    marginTop: 5,
  },

  badges: {
    flexDirection: "row",
    marginTop: 10,
    gap: 10,
  },

  badge: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    color: "#fff",
    fontSize: 12,
  },

  actionRow: {
    flexDirection: "row",
    margin: 15,
  },

  messageBtn: {
    flex: 1,
    backgroundColor: "#751a03",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginRight: 10,
  },

  bookBtn: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
  },

  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  bottomOverlay: {
  flex: 1,
  justifyContent: "flex-end",
  backgroundColor: "rgba(0,0,0,0.4)",
},

bottomSheet: {
  backgroundColor: "#fff",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: 20,
},

modalHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 15,
},

sheetTitle: {
  fontSize: 18,
  fontWeight: "bold",
},

label: {
  marginTop: 10,
  marginBottom: 5,
  color: "#333",
  fontWeight: "500",
},

sheetInput: {
  backgroundColor: "#f1f1f1",
  borderRadius: 10,
  padding: 12,
},

timeBtn: {
  backgroundColor: "#eee",
  padding: 10,
  borderRadius: 10,
  marginRight: 10,
},

row: {
  flexDirection: "row",
  gap: 10,
},

durationBtn: {
  backgroundColor: "#eee",
  padding: 10,
  borderRadius: 10,
},

confirmBtn: {
  marginTop: 20,
  backgroundColor: "#751a03",
  padding: 15,
  borderRadius: 12,
  alignItems: "center",
},

confirmText: {
  color: "#fff",
  fontWeight: "bold",
},
  card: {
    backgroundColor: "#111",
    margin: 15,
    padding: 15,
    borderRadius: 15,
  },

  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "bold",
  },

  desc: {
    color: "#ccc",
    lineHeight: 20,
  },

  skillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },

  skillChip: {
    backgroundColor: "#751a03",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  skillText: {
    color: "#fff",
    fontSize: 12,
  },

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 15,
    gap: 10,
  },

  statBox: {
    width: "48%",
    backgroundColor: "#1A1A1A",
    padding: 12,
    borderRadius: 10,
  },

  statNumber: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },

  statLabel: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
  },

  scheduleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  scheduleBox: {
    backgroundColor: "#1A1A1A",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "30%",
  },

  scheduleText: {
    color: "#fff",
    fontSize: 12,
  },

  time: {
    color: "#00FF9D",
    marginTop: 5,
    fontWeight: "bold",
  },
});
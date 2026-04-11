import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Dashboard</Text>

        <TouchableOpacity>
          <Ionicons name="notifications-outline" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* USER SECTION */}
        <View style={styles.userBox}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>R</Text>
          </View>

          <View>
            <Text style={styles.welcome}>Welcome back,</Text>
            <Text style={styles.name}>Raj</Text>
          </View>
        </View>

        {/* STATS CARDS */}
        <View style={styles.cardContainer}>
          <View style={styles.card}>
            <Ionicons name="calendar-outline" size={24} color="#FF3B3B" />
            <Text style={styles.cardNumber}>1</Text>
            <Text style={styles.cardText}>Sessions</Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="time-outline" size={24} color="#FF3B3B" />
            <Text style={styles.cardNumber}>0</Text>
            <Text style={styles.cardText}>Pending</Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="checkmark-done-outline" size={24} color="#FF3B3B" />
            <Text style={styles.cardNumber}>1</Text>
            <Text style={styles.cardText}>Tasks Out</Text>
          </View>

          <View style={styles.card}>
            <Ionicons name="star-outline" size={24} color="#FF3B3B" />
            <Text style={styles.cardNumber}>--</Text>
            <Text style={styles.cardText}>Rating</Text>
          </View>
        </View>

        {/* TASK SECTION */}
        <Text style={styles.sectionTitle}>Tasks Awaiting Review</Text>

        <View style={styles.taskCard}>
          <View style={styles.taskAvatar}>
            <Text style={{ color: "#fff", fontWeight: "700" }}>MP</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.taskTitle}>React Native</Text>
            <Text style={styles.taskSub}>by Manjit Pal</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>SUBMITTED</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0D0D",
  },

  /* HEADER */
  header: {
    height: 90,
    backgroundColor: "#8B0000",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 12,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  /* USER */
  userBox: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FF3B3B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  avatarText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  welcome: {
    color: "#aaa",
  },

  name: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
  },

  /* CARDS */
  cardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
  },

  card: {
    width: "48%",
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    alignItems: "center",
  },

  cardNumber: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
    marginTop: 10,
  },

  cardText: {
    color: "#aaa",
    marginTop: 4,
  },

  /* SECTION */
  sectionTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    marginTop: 20,
    paddingHorizontal: 16,
  },

  /* TASK CARD */
  taskCard: {
    backgroundColor: "#1A1A1A",
    margin: 16,
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
  },

  taskAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FF3B3B",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  taskTitle: {
    color: "#fff",
    fontWeight: "700",
  },

  taskSub: {
    color: "#aaa",
    fontSize: 12,
  },

  badge: {
    backgroundColor: "#8B0000",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
  },

  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "700",
  },
});
import { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { getToken } from "../../utils/secureStore";
import { Ionicons } from "@expo/vector-icons";

const SessionScreen = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  const tabs = ["Pending", "Accepted", "Cancelled", "Completed"];

  useEffect(() => {
    fetchSession();
  }, []);

  const fetchSession = async () => {
    try {
      const token = await getToken();

      const res = await axios.get(
        "https://ai-powered-mentor-mentee-project-4.onrender.com/api/v1/session/getallsession",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSessions(res.data.response || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

  const filteredSessions = sessions.filter(
    (s) => s.status?.toLowerCase() === activeTab
  );

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      {/* TOP ROW */}
      <View style={styles.topRow}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {item.mentor?.name?.charAt(0) || "R"}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{item.mentor?.name}</Text>
          <Text style={styles.date}>
            {item.date?.split("T")[0]} • {formatTime(item.date)} •{" "}
            {item.duration || "1h"}
          </Text>
        </View>

        {/* STATUS BADGE */}
        <View style={styles.statusBadge(item.status)}>
          <Text style={styles.statusText(item.status)}>
            {item.status?.toUpperCase()}
          </Text>
        </View>
      </View>

      {/* TOPIC */}
      <View style={styles.topicBox}>
        <Text style={styles.topicLabel}>TOPIC</Text>
        <Text style={styles.topicText}>{item.topic}</Text>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#2D3748" marginTop={30} />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Product Details</Text>
        <TouchableOpacity onPress={() => navigation.navigate("")}>
          <Ionicons name="heart-outline" size={24} color="#2D3748" marginTop={30} />
        </TouchableOpacity>
      </View>

      {/* TABS */}
      <View style={styles.tabs}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab.toLowerCase())}
            style={styles.tabItem}
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab.toLowerCase() && styles.activeTabText,
              ]}
            >
              {tab}
            </Text>

            {activeTab === tab.toLowerCase() && (
              <View style={styles.activeUnderline} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      {/* LIST */}
      <FlatList
        data={filteredSessions}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No sessions</Text>
          </View>
        }
      />
    </View>
  );
};

export default SessionScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    
  },

  header: {
        height: "11%",
        backgroundColor: "#751a03",
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        elevation: 4,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 6,
        shadowOffset: { width: 0, height: 3 },
    },

    headerTitle: {
        flex: 1,
        marginTop: 20,
        textAlign: "center",
        fontSize: 17,
        fontWeight: "700",
        color: "#111827",
    },
  /* TABS */
  tabs: {
    flexDirection: "row",
    justifyContent: "space-between",
    addingVertical: 10,
    marginBottom: 10,
  },

  tabItem: {
    alignItems: "center",
  },

  tabText: {
    color: "#888",
    fontWeight: "600",
  },

  activeTabText: {
    color: "#751a03",
  },

  activeUnderline: {
    marginTop: 5,
    height: 2,
    width: "100%",
    backgroundColor: "#751a03",
  },

  /* CARD */
  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatarCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#751a03",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  avatarText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },

  name: {
    fontSize: 16,
    fontWeight: "bold",
  },

  date: {
    color: "#888",
    fontSize: 12,
    marginTop: 2,
  },

  /* STATUS COLORS */
  statusBadge: (status) => ({
    backgroundColor:
      status === "accepted"
        ? "#D4F8E8"
        : status === "cancelled"
          ? "#FFD6D6"
          : status === "completed"
            ? "#E0E7FF"
            : "#FFE8B3",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  }),

  statusText: (status) => ({
    color:
      status === "accepted"
        ? "#1B8A5A"
        : status === "cancelled"
          ? "#D11A2A"
          : status === "completed"
            ? "#3B5BDB"
            : "#C58B00",
    fontWeight: "600",
    fontSize: 12,
  }),

  /* TOPIC */
  topicBox: {
    marginTop: 15,
    backgroundColor: "#F0F1F6",
    borderRadius: 15,
    padding: 12,
  },

  topicLabel: {
    fontSize: 12,
    color: "#888",
    marginBottom: 5,
  },

  topicText: {
    fontSize: 16,
    fontWeight: "500",
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 50,
  },

  emptyText: {
    color: "#888",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
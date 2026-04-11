import { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { getToken } from "../../utils/secureStore";
import { Ionicons } from "@expo/vector-icons";

const TaskScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("assigned");

  // 🔥 FETCH TASKS
  const fetchTasks = async () => {
    try {
      const token = await getToken();

      const res = await axios.get(
        "https://ai-powered-mentor-mentee-project-4.onrender.com/api/v1/task/gettask",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Tasks: "checklist",
          },
        }
      );

      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.log("Task Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // 🔥 FILTER TASKS
  const { assignedTasks, completedTasks } = useMemo(() => {
    const assigned = [];
    const completed = [];

    tasks.forEach((task) => {
      if (task.status === "completed") {
        completed.push(task);
      } else {
        assigned.push(task);
      }
    });

    return { assignedTasks: assigned, completedTasks: completed };
  }, [tasks]);

  // 🔥 CURRENT DATA
  const currentData =
    activeTab === "assigned" ? assignedTasks : completedTasks;

  // 🔥 TASK CARD
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.desc}>
          {item.Description || "No description"}
        </Text>

        <Text style={styles.date}>
          Due:{" "}
          {item.Duedate
            ? new Date(item.Duedate).toDateString()
            : "N/A"}
        </Text>

        <Text style={styles.mentor}>
          Mentor: {item.CreatedBy?.name || "Unknown"}
        </Text>

        <View
          style={[
            styles.status,
            item.status === "completed"
              ? styles.completed
              : styles.pending,
          ]}
        >
          <Text style={styles.statusText}>
            {item.status === "completed" ? "Completed" : "Pending"}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.actionBtn}>
        <Text style={styles.actionText}>
          {item.status === "completed" ? "View" : "Submit"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  // 🔥 LOADING
  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>Loading Tasks...</Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={["#000", "#140000", "#000"]}
      style={styles.container}
    >
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

      {/* 🔥 TOP TAB BAR */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("assigned")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "assigned" && styles.activeText,
            ]}
          >
            Assigned
          </Text>

          {activeTab === "assigned" && (
            <View style={styles.activeLine} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tab}
          onPress={() => setActiveTab("completed")}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === "completed" && styles.activeText,
            ]}
          >
            Completed
          </Text>

          {activeTab === "completed" && (
            <View style={styles.activeLine} />
          )}
        </TouchableOpacity>
      </View>

      {/* 🔥 TASK LIST */}
      <FlatList
        data={currentData}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={{ color: "#aaa" }}>
              No {activeTab} tasks
            </Text>
          </View>
        }
      />
    </LinearGradient>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#000"
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

  // 🔥 TAB STYLES
  tabContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },

  tabText: {
    color: "#aaa",
    fontWeight: "bold",
    fontSize: 14,
  },

  activeText: {
    color: "#fff",
  },

  activeLine: {
    marginTop: 5,
    height: 2,
    width: "100%",
    backgroundColor: "#751a03"
  },

  // 🔥 CARD
  card: {
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#ff2e2e40",
    flexDirection: "row",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  desc: {
    color: "#ccc",
    fontSize: 13,
    marginTop: 4,
  },

  date: {
    color: "#751a03",
    fontSize: 12,
    marginTop: 5,
  },

  mentor: {
    color: "#aaa",
    fontSize: 12,
    marginTop: 2,
  },

  status: {
    marginTop: 8,
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 10,
    alignSelf: "flex-start",
  },

  completed: {
    backgroundColor: "#00C853",
  },

  pending: {
    backgroundColor: "#751a03",
  },

  statusText: {
    color: "#fff",
    fontSize: 12,
  },

  actionBtn: {
    backgroundColor: "#751a03",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },

  actionText: {
    color: "#fff",
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
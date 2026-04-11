import { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
} from "react-native";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { getToken } from "../../utils/secureStore";
import { Ionicons } from "@expo/vector-icons";

const TaskScreen = ({ navigation }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("assigned");

  // 🔥 MODAL STATE
  const [showModal, setShowModal] = useState(false);

  // 🔥 FORM STATE
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [question, setQuestion] = useState("");

  // 🔥 FETCH TASKS
  const fetchTasks = async () => {
    try {
      const token = await getToken();

      const res = await axios.get(
        "https://ai-powered-mentor-mentee-project-4.onrender.com/api/v1/task/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const currentData =
    activeTab === "assigned" ? assignedTasks : completedTasks;

  // 🔥 CREATE TASK
  const handleAssignTask = async () => {
    try {
      const token = await getToken();

      const payload = {
        Title: title,
        Description: description,
        Duedate: dueDate,
        Questions: [question],
        Mentees: ["68a20894629362c76bdb7711"], // static for now
      };

      const res = await axios.post(
        "https://ai-powered-mentor-mentee-project-4.onrender.com/api/v1/task/create",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Task Created:", res.data);

      fetchTasks();

      // reset form
      setTitle("");
      setDescription("");
      setDueDate("");
      setQuestion("");

      setShowModal(false);
    } catch (err) {
      console.log("Assign Error:", err.message);
    }
  };

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

  if (loading) {
    return (
      <View style={styles.center}>
        <Text style={{ color: "#fff" }}>Loading Tasks...</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#000", "#140000", "#000"]} style={styles.container}>
      
      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Tasks</Text>

        <View style={{ width: 24 }} />
      </View>

      {/* TABS */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setActiveTab("assigned")} style={styles.tab}>
          <Text style={[styles.tabText, activeTab === "assigned" && styles.activeText]}>
            Assigned
          </Text>
          {activeTab === "assigned" && <View style={styles.activeLine} />}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setActiveTab("completed")} style={styles.tab}>
          <Text style={[styles.tabText, activeTab === "completed" && styles.activeText]}>
            Completed
          </Text>
          {activeTab === "completed" && <View style={styles.activeLine} />}
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={currentData}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={{ color: "#aaa" }}>No tasks</Text>
          </View>
        }
      />

      {/* ➕ FAB BUTTON */}
      <TouchableOpacity style={styles.fab} onPress={() => setShowModal(true)}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>

      {/* 🔥 MODAL */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Assign Task</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
            </View>

            <Text style={styles.label}>Task Title *</Text>
            <TextInput
              value={title}
              onChangeText={setTitle}
              style={styles.input}
              placeholder="JavaScript"
            />

            <Text style={styles.label}>Description</Text>
            <TextInput
              value={description}
              onChangeText={setDescription}
              style={[styles.input, { height: 80 }]}
              multiline
            />

            <Text style={styles.label}>Due Date *</Text>
            <TextInput
              value={dueDate}
              onChangeText={setDueDate}
              style={styles.input}
              placeholder="2026-04-12"
            />

            <Text style={styles.label}>Question *</Text>
            <TextInput
              value={question}
              onChangeText={setQuestion}
              style={styles.input}
              placeholder="About JS"
            />

            <TouchableOpacity style={styles.assignBtn} onPress={handleAssignTask}>
              <Text style={styles.assignText}>Assign Task</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </LinearGradient>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },

  header: {
    height: 80,
    backgroundColor: "#751a03",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    justifyContent: "space-between",
  },

  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },

  tabContainer: {
    flexDirection: "row",
  },

  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
  },

  tabText: {
    color: "#aaa",
    fontWeight: "bold",
  },

  activeText: {
    color: "#fff",
  },

  activeLine: {
    height: 2,
    width: "100%",
    backgroundColor: "#751a03",
    marginTop: 5,
  },

  card: {
    backgroundColor: "#111",
    borderRadius: 15,
    padding: 15,
    margin: 10,
    flexDirection: "row",
  },

  title: { color: "#fff", fontWeight: "bold" },
  desc: { color: "#ccc", marginTop: 5 },
  date: { color: "#751a03", marginTop: 5 },
  mentor: { color: "#aaa", marginTop: 5 },

  status: {
    marginTop: 10,
    padding: 5,
    borderRadius: 10,
  },

  completed: { backgroundColor: "green" },
  pending: { backgroundColor: "#751a03" },

  statusText: { color: "#fff" },

  actionBtn: {
    backgroundColor: "#751a03",
    padding: 10,
    borderRadius: 10,
    justifyContent: "center",
  },

  actionText: { color: "#fff" },

  fab: {
    position: "absolute",
    bottom: 25,
    right: 20,
    backgroundColor: "#751a03",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },

  label: {
    marginTop: 10,
    fontWeight: "600",
  },

  input: {
    backgroundColor: "#eee",
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
  },

  assignBtn: {
    marginTop: 20,
    backgroundColor: "#751a03",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },

  assignText: {
    color: "#fff",
    fontWeight: "bold",
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
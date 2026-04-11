import { Ionicons } from "@expo/vector-icons"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const MenteeScreen = () => {

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
        </View>
    )
}
export default MenteeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#0D0D0D"
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
})
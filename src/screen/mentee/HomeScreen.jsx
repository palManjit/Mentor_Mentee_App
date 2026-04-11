import { Ionicons } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import { FlatList, Image, StyleSheet, View, Dimensions, Text, TouchableOpacity } from "react-native";

const { width } = Dimensions.get("window");

const banner = [
  { id: "1", image: require("../../../assets/photo1.jpg") },
  { id: "2", image: require("../../../assets/photo2.jpg") },
  { id: "3", image: require("../../../assets/photo3.jpg") },
  { id: "4", image: require("../../../assets/photo4.jpg") },
];

const HomeScreen = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        currentIndex === banner.length - 1 ? 0 : currentIndex + 1;

      setCurrentIndex(nextIndex);

      flatListRef.current?.scrollToOffset({
        offset: nextIndex * width,
        animated: true,
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.bannerContainer}>
        <Image source={item.image} style={styles.sliderImage} />
      </View>
    );
  };

  return (
    <View style={styles.container}>

     <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={24} color="#2D3748" marginTop={30} />
                </TouchableOpacity>

                <Text style={styles.headerTitle}>Product Details</Text>
                <TouchableOpacity onPress={() => navigation.navigate("")}>
                    <Ionicons name="notifications-outline" size={24} color="#2D3748" marginTop={30} />
                </TouchableOpacity>
            </View>

      <FlatList
        ref={flatListRef}
        data={banner}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScrollToIndexFailed={() => { }}
      />
    </View>
  );
};

export default HomeScreen;

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
  bannerContainer: {
    width: width,
    // justifyContent: "center",
    alignItems: "center",
  },
  sliderImage: {
    width: "95%",
    height: 180,
    borderRadius: 12,
  },
});
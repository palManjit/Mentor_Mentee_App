import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screen/mentor/HomeScreen";
import MenteeScreen from "../screen/mentor/MenteeScreen";
import SessionScreen from "../screen/mentor/SessionScreen";
import ProfileScreen from "../screen/mentor/ProfileScreen";
import { MaterialIcons } from "@expo/vector-icons";
import TaskScreen from "../screen/mentor/TaskScreen";

const Tab = createBottomTabNavigator()
const TAB_ICON = {
    Home: "home",
    Mentee: "group",
    Session: "event",
    Tasks: "checklist",
    Profile: "person"
}
const MentorBottomNav = () => {

    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            headerShown: false,
            tabBarActiveTintColor: "red",
            tabBarInactiveTintColor: "gray",

            tabBarIcon: ({ size, color }) => (
                <MaterialIcons
                    name={TAB_ICON[route.name]}
                    size={size || 36}
                    color={color}
                />
            )
        })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Mentee" component={MenteeScreen} />
            <Tab.Screen name="Session" component={SessionScreen} />
            <Tab.Screen name="Tasks" component={TaskScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
    )
}
export default MentorBottomNav;
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MentorScreen from "../screen/mentee/MentorScreen";
import HomeScreen from "../screen/mentee/HomeScreen";
import SessionScreen from "../screen/mentee/SessionScreen";
import TaskScreen from "../screen/mentee/TaskScreen";
import ProfileScreen from "../screen/mentee/ProfileScreen";
import { MaterialIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

const TAB_ICON = {
  Home: "home",
  Mentors: "groups",
  Sessions: "event",
  Tasks: "checklist",
  Profile: "person",
};

const BottomNavigator = () => {
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
      <Tab.Screen name="Mentors" component={MentorScreen} />
      <Tab.Screen name="Sessions" component={SessionScreen} />
      <Tab.Screen name="Tasks" component={TaskScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomNavigator;

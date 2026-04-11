import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import SignupScreen from "../screen/auth/SignUpScreen";
import LoginScreen from "../screen/auth/LoginScreen";
import MentorScreen from "../screen/mentee/MentorScreen";
import BottomNavigator from "./BottomNavagator";
import MentorDetails from "../screen/mentee/MentorDetails";
import SessionBook from "../screen/mentee/SessionBook";
import MentorBottomNav from "./MentorBottomNav";


const Stack =createStackNavigator();
const AppNavigator=()=>{

    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown:false}}>
                <Stack.Screen name="LoginScreen" component={LoginScreen}/>
                <Stack.Screen name="SignUpScreen" component={SignupScreen}/>
                <Stack.Screen name="MenteeTabScreen" component={BottomNavigator}/>
                <Stack.Screen name="MentorTabScreen" component={MentorBottomNav}/>
                <Stack.Screen name="MentorDetails" component={MentorDetails}/>
                <Stack.Screen name="SessionBook" component={SessionBook}/>
            </Stack.Navigator>
        </NavigationContainer>
    )

}
export default AppNavigator;
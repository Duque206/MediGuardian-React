import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Profile from "./User/Profile";
import ListPrescription from "./Prescriptions/ListPrescription";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function Home() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name={"Prescriptions"} component={ListPrescription} options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialCommunityIcons name="pill" size={size} color={color} />
                )
            }}/>
            <Tab.Screen name={"Profile"} component={Profile} options={{
                tabBarIcon: ({ color, size }) => (
                    <AntDesign name="user" size={size} color={color} />
                )
            }}/>
        </Tab.Navigator>
    )
}
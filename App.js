import {NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import Login from "./src/screens/Login";
import Home from "./src/screens/Home";
import SplashScreen from "./src/screens/SplashScreen";
import CreatePrescription from "./src/screens/Prescriptions/CreatePrescription";
import useUserStore from "./src/stores/UserStore";
import {useRef} from "react";

const Stack = createStackNavigator();

export default function App() {
    const navigationRef = useRef();

    useUserStore.subscribe((token) => {
        if (token.token) {
            navigationRef.current?.navigate('Home');
        } else {
            navigationRef.current?.navigate('Login');
        }
    });

    return (
        <NavigationContainer ref={navigationRef}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name={'Splash'} component={SplashScreen}/>
                <Stack.Screen name={'Login'} component={Login}/>
                <Stack.Screen name={'Home'} component={Home}/>

                <Stack.Screen name={'Create Prescription'} component={CreatePrescription}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

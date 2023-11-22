import useUserStore from "../stores/UserStore";
import useZiggyStore from "../stores/ZiggyStore";
import {useEffect} from "react";
import {ActivityIndicator, View, Text, Image} from "react-native";
import {useNavigation} from "@react-navigation/native";


export default function SplashScreen() {
    const initializeRoutes = useZiggyStore(state => state.initializeRoutes);
    const initializeToken = useUserStore(state => state.initializeToken);
    const navigation = useNavigation();

    useEffect(() => {
        const init = async () => {
            await initializeRoutes();
            await initializeToken();
            navigation.navigate('Login');
        };

        init();
    }, [initializeRoutes, initializeToken]);

    return (
        <View className="flex h-screen w-screen items-center justify-center">
            <View className="mt-20">
                <Image source={require('../../assets/logo.png')} className="w-96"/>
            </View>
            <ActivityIndicator size="large" color="#0000ff" className="mt-10 h-10"/>
        </View>
    );
}
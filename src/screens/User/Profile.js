import {View, Text, Pressable} from "react-native";
import {MaterialCommunityIcons} from "@expo/vector-icons";
import axiggy from "../../utils/axiggy";
import useUserStore from "../../stores/UserStore";

export default function Profile() {
    async function logout() {
        const response = await axiggy.post('logout');
        await useUserStore.getState().removeToken();
    }

    return (
        <View className="flex h-screen w-full items-center justify-center">
            <Text className="mb-5">Are you sure you want to log out?</Text>
            <Pressable onPress={logout}>
            <MaterialCommunityIcons name={'logout'} size={32} color={'red'}/>
            </Pressable>
        </View>
    )
}
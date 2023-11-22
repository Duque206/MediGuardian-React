import {Pressable, Text} from "react-native";

export default function PrimaryButton({text, onPress}) {
    return (
        <Pressable className="bg-blue-500 text-white font-bold py-2 px-4 rounded" onPress={onPress}>
            <Text className="text-white">{text}</Text>
        </Pressable>
    )
}
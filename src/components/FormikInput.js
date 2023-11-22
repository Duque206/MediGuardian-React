import {TextInput, Text, View} from "react-native";

export default function FormikInput({placeholder, passEntry, formik, valueName}) {
    return (
        <View className="mt-2 w-full">
            <TextInput className="border border-gray-300 rounded-md h-10 px-2 w-full"
                         placeholder={placeholder}
                         secureTextEntry={passEntry}
                         onChangeText={formik.handleChange(valueName)}
                         value={formik.values[valueName]}
            />
            <Text className="text-red-500">
                { formik.touched?.[valueName] && formik.errors?.[valueName] }
            </Text>
        </View>
    )
}
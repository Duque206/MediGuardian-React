import {ScrollView, Text, View} from "react-native";
import usePrescriptionStore from "../../stores/PrescriptionStore";
import {useEffect} from "react";
import {Fontisto} from "@expo/vector-icons";
import {formatRelative} from "date-fns";
import PrimaryButton from "../../components/PrimaryButton";
import {useNavigation} from "@react-navigation/native";

export default function ListPrescription() {
    const prescriptions = usePrescriptionStore(state => state.prescriptions);
    const navigation = useNavigation();

    useEffect(() => {
        usePrescriptionStore.getState().fetch();
    }, []);

    return (<ScrollView className="flex h-screen w-full mt-5 pt-5" contentContainerStyle={{alignItems: 'center'}}>
        <PrimaryButton text="Create Prescription +" onPress={() => navigation.navigate('Create Prescription')}/>

        {prescriptions && prescriptions.map((prescription, index) => (
            <View key={prescription.id} className="w-11/12 bg-neutral-300 my-2 p-4 rounded-xl">
                <View className={`flex ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} justify-between items-center`}>
                    <Fontisto name="pills" size={32} color="black"/>
                    <View>
                        <Text className="text-lg font-black">{prescription.medicine.name}</Text>
                        <Text className={index % 2 === 0 ? 'text-right' : 'text-left'}>{prescription.dosage}</Text>
                    </View>
                </View>
                <Text className="text-center underline mt-2 font-bold">
                    {formatRelative(prescription.date, new Date())}
                </Text>
            </View>
        ))}
    </ScrollView>)
}
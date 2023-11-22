import {View, Text, Pressable, ScrollView} from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {useNavigation} from "@react-navigation/native";
import {useEffect} from "react";
import useMedicineStore from "../../stores/MedicineStore";
import {useFormik} from "formik";
import {Picker} from "@react-native-picker/picker";
import FormikInput from "../../components/FormikInput";
import {RadioButton} from "react-native-paper";
import {DateTimePickerAndroid} from "@react-native-community/datetimepicker";
import PrimaryButton from "../../components/PrimaryButton";
import {parse, format as formatFNS} from "date-fns";
import FormikError from "../../components/FormikError";
import axiggy from "../../utils/axiggy";
import usePrescriptionStore from "../../stores/PrescriptionStore";

export default function CreatePrescription() {
    const navigation = useNavigation();
    const medicines = useMedicineStore(state => state.medicines);
    const prescriptionStore = usePrescriptionStore();

    const formik = useFormik({
        initialValues: {
            medicine_id: '',
            schedule_type: 'HoursSchedule',
            dosage: '',
            start_date: '',
            end_date: '',
            schedule: {
                start_time: '',
                hours_span: '',
            }
        },
        onSubmit: values => {
            axiggy.post('prescriptions.store', values).then((response) => {
                prescriptionStore.add(response.data.data).then(() => {
                    navigation.navigate('Prescriptions');
                });
            }).catch((error) => {
                console.log(error.response.data.errors);
                if (error.response.status === 422)
                    formik.setErrors(error.response.data.errors);
            });
        }
    });

    useEffect(() => {
        useMedicineStore.getState().fetch();
    }, []);

    useEffect(() => {
        formik.setValues({
            ...formik.values,
            schedule: {
                start_time: '',
                hours_span: '',
            }
        });
    }, [formik.values.schedule_type]);

    const showMode = (currentMode, value, onDateChange, isTime = false) => {
        DateTimePickerAndroid.open({
            value: value ? parse(value, !isTime ? 'M/d/y' : 'HH:mm', new Date()) : new Date(),
            onChange: (e, date) => onDateChange(date),
            mode: currentMode,
            is24Hour: true,
        });
    }

    return (<>
        <View className="flex flex-row w-full justify-between px-4 mt-10">
            <Pressable onPress={() => navigation.navigate('Prescriptions')}>
                <Ionicons name="arrow-back" size={24} color="black" />
            </Pressable>
            <Text className="text-lg font-bold">Create Prescription</Text>
        </View>

        <ScrollView className="flex h-screen w-full">
            <View className="w-80 mx-auto">
                <Text className="text-lg mt-2 ml-2">Select the medicine you are taking</Text>
                <Picker selectedValue={formik.values.medicine_id} onValueChange={(itemValue) => formik.setFieldValue('medicine_id', itemValue)} className="w-full h-12">
                    <Picker.Item label="Select a medicine" value="" />
                    {medicines && medicines.map(medicine => (
                        <Picker.Item key={medicine.id} label={medicine.name} value={medicine.id} />
                    ))}
                </Picker>
                <FormikError formik={formik} valueName="medicine_id"/>
            </View>

            <View className="w-80 mx-auto">
                <Text className="text-lg mt-2 ml-2">Enter the dosage:</Text>
                <FormikInput formik={formik} valueName="dosage" placeholder="example: 2 pills"/>
            </View>

            <View className="w-80 mx-auto">
                <PrimaryButton text={`Start Date: ${formik.values.start_date || 'Non selected'}`}
                   onPress={() => showMode('date', formik.values.start_date, (date) => formik.setFieldValue('start_date', date.toLocaleDateString('en-US')))}/>
                <FormikError formik={formik} valueName="start_date"/>
            </View>
            <View className="w-80 mx-auto my-4">
                <PrimaryButton text={`End Date: ${formik.values.end_date || 'Non selected'}`}
                   onPress={() => showMode('date', formik.values.end_date, (date) => formik.setFieldValue('end_date', date.toLocaleDateString('en-US')))}/>
                <FormikError formik={formik} valueName="end_date"/>
            </View>

            {/*<View className="my-4">
                <RadioButton.Group onValueChange={formik.handleChange('schedule_type')} value={formik.values.schedule_type}>
                    <View className="flex flex-row justify-around">
                        <View className="flex flex-row items-center">
                            <Text>By Hours</Text>
                            <RadioButton value="HoursSchedule"/>
                        </View>
                        <View className="flex flex-row items-center">
                            <Text>By Schedule</Text>
                            <RadioButton value="DaysSchedule"/>
                        </View>
                    </View>
                </RadioButton.Group>
            </View>*/}

            <View className="w-80 mx-auto">
                <Text className="text-lg">By hours:</Text>
            </View>

            <View className="w-80 mx-auto my-2">
                <PrimaryButton text={`Start Time: ${formik.values.schedule.start_time || 'Non selected'}`}
                               onPress={() => showMode('time', formik.values.schedule.start_time, (date) => formik.setFieldValue('schedule.start_time', formatFNS(date, 'HH:mm')), true)}/>
            </View>
            <View className="w-80 mx-auto my-2">
                <FormikInput formik={formik} valueName="schedule.hours_span" placeholder="Hours span"/>
            </View>

            <View className="mx-auto my-6">
                <PrimaryButton text="Create Prescription +" onPress={formik.handleSubmit}/>
            </View>
        </ScrollView>
    </>)
}
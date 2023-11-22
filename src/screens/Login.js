import {View, Text, Image} from "react-native";
import {useFormik} from "formik";
import useUserStore from "../stores/UserStore";
import FormikInput from "../components/FormikInput";
import PrimaryButton from "../components/PrimaryButton";
import axiggy from "../utils/axiggy";

export default function Login() {
    const userStore = useUserStore();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        onSubmit: values => {
            axiggy.post('login', values).then((response) => {
                userStore.setToken(response.data.token);
            }).catch((error) => {
                if (error.response.status === 422)
                    formik.setErrors(error.response.data.errors);
            });
        }
    });

    return (
        <View className="flex h-screen w-full items-center justify-center">
            <View>
                <Image source={require('../../assets/logo.png')} className="w-40 h-32"/>
            </View>
            <View className="w-80 my-10">
                <FormikInput placeholder="Email" formik={formik} valueName="email"/>
                <FormikInput placeholder="Password" formik={formik} valueName="password" passEntry={true}/>
            </View>
            <PrimaryButton text="Login" onPress={formik.handleSubmit}/>
        </View>
    );
}
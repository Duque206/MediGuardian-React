import {Text} from "react-native";

export default function FormikError({formik, valueName}) {
    const errorText = formik.touched?.[valueName] && formik.errors?.[valueName];

    return errorText ? (
        <Text style={{ color: 'red' }}>
            {errorText}
        </Text>
    ) : null;
}
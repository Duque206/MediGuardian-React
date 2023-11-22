import {create} from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useUserStore = create((set) => ({
    token: '',
    setToken: async (token) => {
        set({token: token});
        try {
            await AsyncStorage.setItem('@token', token);
        } catch (e) {
            console.log(e);
        }
    },
    removeToken: async () => {
        set({token: null});
        try {
            await AsyncStorage.removeItem('@token');
        } catch (e) {
            console.log(e);
        }
    },
    initializeToken: async () => {
        try {
            const token = await AsyncStorage.getItem('@token');
            if (token) {
                set({token: token});
            }
        } catch (e) {
            console.log(e);
        }
    }
}));

export default useUserStore;
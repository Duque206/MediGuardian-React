import {create} from "zustand";
import axios from "axios";

const useZiggyStore = create((set) => ({
    routes: null,
    initializeRoutes: async () => {
        const response = await axios.get(`http://192.168.31.15:8000/api/ziggy`);
        set({routes: await response.data});
        console.log('Ziggy Routes obtained');
    }
}));

export default useZiggyStore;
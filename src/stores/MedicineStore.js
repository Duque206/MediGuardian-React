import axiggy from "../utils/axiggy";
import {create} from "zustand";

const useMedicineStore = create((set) => ({
    medicines: [],
    fetch: async () => {
        const response = await axiggy.get('medicines.index');
        set({medicines: await response.data.data});
    },
    add: async (data) => {
        set({medicines: [...useMedicineStore.getState().medicines, data]});
    }
}));

export default useMedicineStore;
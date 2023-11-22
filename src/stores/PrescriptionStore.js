import {create} from "zustand";
import axiggy from "../utils/axiggy";
import {add, getDay} from "date-fns";

function findClosestDay(targetDays) {
    const today = new Date();
    const todayIndex = getDay(today);

    const differences = targetDays.map((targetDay) => {
        const adjustedTargetDay = (targetDay + 6) % 7;
        return todayIndex - adjustedTargetDay;
    });
    const closestIndex = differences.indexOf(Math.min(...differences));

    const closestDay = targetDays[closestIndex];

    const differenceToClosestDay = (closestDay - todayIndex + 7) % 7;
    return add(today, {days: differenceToClosestDay});
}

function findClosestHour(targetHours, referenceDate) {
    const today = new Date();

    const differences = targetHours.map((targetHour) => {
        const [hours, minutes] = targetHour.split(':');
        referenceDate.setHours(hours);
        referenceDate.setMinutes(minutes);
        return referenceDate.getTime() - today.getTime();
    });
    const closestIndex = differences.indexOf(Math.min(...differences));

    const [hours, minutes] = targetHours[closestIndex].split(':');
    referenceDate.setHours(hours);
    referenceDate.setMinutes(minutes);
    return referenceDate;
}

function addDateObject(prescription) {
    const date = new Date(prescription.start_date);

    if (prescription.schedule_type === 'HoursSchedule') {
        const now = new Date();
        const [hours, minutes] = prescription.schedule.start_time.split(':');
        date.setHours(hours);
        date.setMinutes(minutes);

        while (date < now) {
            date.setHours(date.getHours() + prescription.schedule.hours_span);
        }
    } else if (prescription.schedule_type === 'DaysSchedule') {
        const tempDate = findClosestDay(prescription.schedule.days);
        date.setTime(findClosestHour(prescription.schedule.hours, tempDate).getTime());
    }

    return {
        ...prescription, date: date
    };
}

const usePrescriptionStore = create((set) => ({
    prescriptions: [],
    fetch: async () => {
        const response = await axiggy.get('prescriptions.index');

        const tempPrescriptions = await response.data.data.map(p => addDateObject(p))
            .sort((a, b) => a.date.getTime() - b.date.getTime());

        set({prescriptions: tempPrescriptions});
    },
    add: async (prescription) => {
        set({
            prescriptions: [...usePrescriptionStore.getState().prescriptions, addDateObject(prescription)]
                .sort((a, b) => a.date.getTime() - b.date.getTime())
        });
    }
}));

export default usePrescriptionStore;
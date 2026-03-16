import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface DayPillsProps {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
}

const LV_WEEKDAYS_SHORT = ["Sv", "P", "O", "T", "C", "P", "S"];

function isSameDay(d1: Date, d2: Date) {
    return d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();
}

export default function DayPills({ selectedDate, onSelectDate }: DayPillsProps) {
    const days = useMemo(() => {
        const today = new Date();
        return Array.from({ length: 7 }).map((_, i) => {
            const date = new Date(today);
            date.setDate(today.getDate() + i);
            return {
                date,
                dayNum: date.getDate(),
                dayStr: LV_WEEKDAYS_SHORT[date.getDay()],
            };
        });
    }, []);

    return (
        <View className="flex-row items-center justify-between w-full px-2 mb-4">
            {days.map((item, index) => {
                const isActive = isSameDay(item.date, selectedDate);

                return (
                    <TouchableOpacity
                        key={index}
                        onPress={() => onSelectDate(item.date)}
                        className={`items-center justify-center rounded-t-full rounded-b-full w-10 py-3 ${isActive ? "bg-[#dce9d7]" : "bg-white"
                            }`}
                    >
                        <Text className={`text-lg font-semibold ${isActive ? "text-neutral-900" : "text-neutral-600"}`}>
                            {item.dayNum}
                        </Text>
                        <Text className={`text-xs mt-1 font-medium ${isActive ? "text-neutral-600" : "text-neutral-400"}`}>
                            {item.dayStr}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

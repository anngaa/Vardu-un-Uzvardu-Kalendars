import React, { useMemo, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MonthCalendar from "../../components/MonthCalendar";
import NameCard from "../../components/NameCard";
import namedays from "../../data/namedays.json";

const LV_MONTHS = [
    "Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs",
    "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris",
];

const LV_WEEKDAYS = [
    "Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena",
    "Ceturtdiena", "Piektdiena", "Sestdiena",
];

function getDateKey(date: Date): string {
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    return `${mm}-${dd}`;
}

export default function CalendarScreen() {
    const today = useMemo(() => new Date(), []);
    const [selectedDate, setSelectedDate] = useState(today);
    const [calMonth, setCalMonth] = useState(today.getMonth());
    const [calYear, setCalYear] = useState(today.getFullYear());

    const dateKey = getDateKey(selectedDate);
    const dayData = (namedays as Record<string, { names: string[]; extended: string[] }>)[dateKey] || {
        names: [],
        extended: [],
    };

    const handleChangeMonth = (delta: number) => {
        let newMonth = calMonth + delta;
        let newYear = calYear;
        if (newMonth < 0) { newMonth = 11; newYear--; }
        else if (newMonth > 11) { newMonth = 0; newYear++; }
        setCalMonth(newMonth);
        setCalYear(newYear);
    };

    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
    };

    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-[#efefef]">
            <StatusBar style="dark" backgroundColor="#f6f3ea" translucent={true} />
            <View style={{ height: insets.top, backgroundColor: '#f6f3ea' }} />

            <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 40 }}>
                <View className="bg-[#f6f3ea] px-4 pb-10 rounded-b-[40px]">
                    <Text className="text-xl font-semibold text-neutral-800 pt-4 pb-2 px-2">Kalendārs</Text>
                    <MonthCalendar
                        selectedDate={selectedDate}
                        onSelectDate={handleSelectDate}
                        month={calMonth}
                        year={calYear}
                        onChangeMonth={handleChangeMonth}
                    />
                </View>

                <View className="px-4 pt-6">
                    <NameCard
                        dayOfWeek={LV_WEEKDAYS[selectedDate.getDay()]}
                        monthName={LV_MONTHS[selectedDate.getMonth()]}
                        dayNumber={selectedDate.getDate()}
                        names={dayData.names}
                        extended={dayData.extended}
                    />
                </View>
            </ScrollView>
        </View>
    );
}

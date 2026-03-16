import SolarIcon from "./SolarIcon";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const LV_MONTHS = [
    "Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs",
    "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris",
];

const LV_WEEKDAYS_SHORT = ["P", "O", "T", "C", "Pk", "S", "Sv"];

interface MonthCalendarProps {
    selectedDate: Date;
    onSelectDate: (date: Date) => void;
    month: number; // 0-indexed
    year: number;
    onChangeMonth: (delta: number) => void;
}

function getDaysInMonth(year: number, month: number): number {
    return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
    const day = new Date(year, month, 1).getDay();
    return day === 0 ? 6 : day - 1;
}

export default function MonthCalendar({
    selectedDate,
    onSelectDate,
    month,
    year,
    onChangeMonth,
}: MonthCalendarProps) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDay = getFirstDayOfWeek(year, month);

    const today = new Date();
    const isToday = (day: number) =>
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year;

    const isSelected = (day: number) =>
        selectedDate.getDate() === day &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year;

    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }

    return (
        <View className="my-2">
            {/* Month nav */}
            <View className="flex-row items-center justify-between mb-5">
                <TouchableOpacity onPress={() => onChangeMonth(-1)} className="p-2">
                    <SolarIcon name="alt-arrow-left-linear" size={20} color="#4b5563" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-neutral-800">
                    {LV_MONTHS[month]} {year}
                </Text>
                <TouchableOpacity onPress={() => onChangeMonth(1)} className="p-2">
                    <SolarIcon name="alt-arrow-right-linear" size={20} color="#4b5563" />
                </TouchableOpacity>
            </View>

            {/* Weekday headers */}
            <View className="flex-row mb-2">
                {LV_WEEKDAYS_SHORT.map((wd, i) => (
                    <View key={i} className="flex-1 items-center">
                        <Text className="text-xs font-semibold text-neutral-400">{wd}</Text>
                    </View>
                ))}
            </View>

            {/* Day grid */}
            {weeks.map((week, wi) => (
                <View key={wi} className="flex-row">
                    {week.map((day, di) => (
                        <View key={di} className="flex-1 items-center py-1.5">
                            {day ? (
                                <TouchableOpacity
                                    onPress={() => onSelectDate(new Date(year, month, day))}
                                    className={`w-10 h-10 rounded-full items-center justify-center ${isSelected(day)
                                        ? "bg-neutral-800 shadow-sm"
                                        : isToday(day)
                                            ? "bg-[#dcfce7]"
                                            : ""
                                        }`}
                                >
                                    <Text
                                        className={`text-[15px] ${isSelected(day)
                                            ? "text-white font-bold"
                                            : isToday(day)
                                                ? "text-neutral-900 font-bold"
                                                : "text-neutral-700"
                                            }`}
                                    >
                                        {day}
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <View className="w-10 h-10" />
                            )}
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
}

import SolarIcon from "./SolarIcon";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

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
        selectedDate?.getDate?.() === day &&
        selectedDate?.getMonth?.() === month &&
        selectedDate?.getFullYear?.() === year;

    const cells: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(d);
    while (cells.length % 7 !== 0) cells.push(null);

    const weeks: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }

    return (
        <View style={styles.container}>
            {/* Month nav */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => onChangeMonth(-1)} style={styles.navButton}>
                    <SolarIcon name="alt-arrow-left-linear" size={20} color="#4b5563" />
                </TouchableOpacity>
                <Text style={styles.monthText}>
                    {LV_MONTHS[month]} {year}
                </Text>
                <TouchableOpacity onPress={() => onChangeMonth(1)} style={styles.navButton}>
                    <SolarIcon name="alt-arrow-right-linear" size={20} color="#4b5563" />
                </TouchableOpacity>
            </View>

            {/* Weekday headers */}
            <View style={styles.weekdayRow}>
                {LV_WEEKDAYS_SHORT.map((wd, i) => (
                    <View key={`wd-${i}`} style={styles.weekdayCell}>
                        <Text style={styles.weekdayText}>{wd}</Text>
                    </View>
                ))}
            </View>

            {/* Day grid */}
            {(weeks || []).map((week, wi) => (
                <View key={`week-${wi}`} style={styles.row}>
                    {(week || []).map((day, di) => (
                        <View key={`day-${wi}-${di}`} style={styles.dayContainer}>
                            {day !== null ? (
                                <TouchableOpacity
                                    onPress={() => onSelectDate?.(new Date(year, month, day))}
                                    activeOpacity={0.7}
                                    style={[
                                        styles.dayButton,
                                        isSelected(day) && styles.selectedDay,
                                        isToday(day) && !isSelected(day) && styles.todayDay
                                    ]}
                                >
                                    <Text
                                        style={[
                                            styles.dayText,
                                            isSelected(day) && styles.selectedDayText,
                                            isToday(day) && styles.todayDayText
                                        ]}
                                    >
                                        {day}
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.daySpacer} />
                            )}
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: 8,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    navButton: {
        padding: 8,
    },
    monthText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#262626',
        flex: 1,
        textAlign: 'center',
    },
    weekdayRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    weekdayCell: {
        flex: 1,
        alignItems: 'center',
    },
    weekdayText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#a3a3a3',
    },
    row: {
        flexDirection: 'row',
    },
    dayContainer: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 6,
    },
    dayButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDay: {
        backgroundColor: '#262626',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
    },
    todayDay: {
        backgroundColor: '#dcfce7',
    },
    dayText: {
        fontSize: 15,
        color: '#404040',
    },
    selectedDayText: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
    todayDayText: {
        color: '#171717',
        fontWeight: 'bold',
    },
    daySpacer: {
        width: 40,
        height: 40,
    }
});

import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import SolarIcon from "./SolarIcon";

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

interface DayObject {
    day: number;
    month: number;
    year: number;
    isCurrentMonth: boolean;
}

export default function MonthCalendar({
    selectedDate,
    onSelectDate,
    month,
    year,
    onChangeMonth,
}: MonthCalendarProps) {
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayIdx = getFirstDayOfWeek(year, month);

    const today = new Date();
    const isToday = (d: number, m: number, y: number) =>
        today.getDate() === d &&
        today.getMonth() === m &&
        today.getFullYear() === y;

    const isSelected = (d: number, m: number, y: number) =>
        selectedDate?.getDate?.() === d &&
        selectedDate?.getMonth?.() === m &&
        selectedDate?.getFullYear?.() === y;

    const cells: DayObject[] = [];

    // Previous month days
    const prevMonth = month === 0 ? 11 : month - 1;
    const prevYear = month === 0 ? year - 1 : year;
    const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);
    for (let i = firstDayIdx - 1; i >= 0; i--) {
        cells.push({
            day: daysInPrevMonth - i,
            month: prevMonth,
            year: prevYear,
            isCurrentMonth: false,
        });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
        cells.push({
            day: d,
            month: month,
            year: year,
            isCurrentMonth: true,
        });
    }

    // Next month days
    const nextMonth = month === 11 ? 0 : month + 1;
    const nextYear = month === 11 ? year + 1 : year;
    let nextDay = 1;
    while (cells.length % 7 !== 0) {
        cells.push({
            day: nextDay++,
            month: nextMonth,
            year: nextYear,
            isCurrentMonth: false,
        });
    }

    const weeks: DayObject[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
        weeks.push(cells.slice(i, i + 7));
    }

    const handlePressDay = (item: DayObject) => {
        const newDate = new Date(item.year, item.month, item.day);
        onSelectDate?.(newDate);

        // If clicked on a day from another month, navigate to that month
        if (item.month !== month) {
            if (item.year > year || (item.year === year && item.month > month)) {
                onChangeMonth(1);
            } else {
                onChangeMonth(-1);
            }
        }
    };

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
            {weeks.map((week, wi) => (
                <View key={`week-${wi}`} style={styles.row}>
                    {week.map((item, di) => (
                        <View key={`day-${wi}-${di}`} style={styles.dayContainer}>
                            <TouchableOpacity
                                onPress={() => handlePressDay(item)}
                                activeOpacity={0.7}
                                style={[
                                    styles.dayButton,
                                    item.isCurrentMonth && isSelected(item.day, item.month, item.year) && styles.selectedDay,
                                    item.isCurrentMonth && isToday(item.day, item.month, item.year) && !isSelected(item.day, item.month, item.year) && styles.todayDay,
                                    !item.isCurrentMonth && styles.otherMonthDay
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.dayText,
                                        !item.isCurrentMonth && styles.otherMonthDayText,
                                        item.isCurrentMonth && isToday(item.day, item.month, item.year) && styles.todayDayText,
                                        item.isCurrentMonth && isSelected(item.day, item.month, item.year) && styles.selectedDayText
                                    ]}
                                >
                                    {item.day}
                                </Text>
                            </TouchableOpacity>
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
        backgroundColor: '#2626261A',
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
    otherMonthDay: {
        opacity: 0.5,
    },
    otherMonthDayText: {
        color: '#737373',
    },
    daySpacer: {
        width: 40,
        height: 40,
    }
});

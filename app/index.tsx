import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BottomTabBar, { BottomTab } from "../components/BottomTabBar";
import DayPills from "../components/DayPills";
import MonthCalendar from "../components/MonthCalendar";
import NameCard from "../components/NameCard";
import SearchView from "../components/SearchView";
import SolarIcon from "../components/SolarIcon";
import namedays from "../data/namedays.json";

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

export default function HomeScreen() {
    const today = useMemo(() => new Date(), []);

    // View state
    const [activeTab, setActiveTab] = useState<BottomTab>("home");
    const [isSearching, setIsSearching] = useState(false);

    // Date state
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

    const handleTabChange = (tab: BottomTab) => {
        setIsSearching(false);
        setActiveTab(tab);
    };

    const toggleSearch = () => {
        setIsSearching(!isSearching);
        // If we were on contacts/settings, switch back to home so results can show below search view
        if (!isSearching && (activeTab === "contacts" || activeTab === "settings")) {
            setActiveTab("home");
        }
    };

    const showCalendar = activeTab === "calendar";
    const showSearch = isSearching;

    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-[#efefef]">
            <StatusBar
                style="dark"
                backgroundColor="#f6f3ea"
                translucent={true}
            />

            {/* Top inset background to keep status bar area cream */}
            <View style={{ height: insets.top, backgroundColor: '#f6f3ea' }} />

            <ScrollView
                className="flex-1 bg-white"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                {/* Header Section Container with Arched Bottom */}
                <View className="bg-[#f6f3ea]">
                    {/* The Background Arc */}
                    <View
                        className="absolute bg-[#f6f3ea]"
                        style={{
                            width: '100%',
                            height: 10,
                            bottom: -10,
                            borderBottomLeftRadius: '50%',
                            borderBottomRightRadius: '50%',
                        }}
                    />

                    {/* Header Content */}
                    <View>
                        {/* Top Bar */}
                        <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
                            <Text className="text-xl font-semibold text-neutral-800 tracking-tight">
                                {LV_MONTHS[today.getMonth()]} {today.getDate()}
                            </Text>
                            <TouchableOpacity onPress={toggleSearch} className="p-2 -mr-2">
                                <SolarIcon name="magnifer-linear" size={24} color={isSearching ? "#737373" : "#262626"} />
                            </TouchableOpacity>
                        </View>

                        <View className="px-4 mt-2">
                            {/* Conditional Top Element (Search, Calendar, or DayPills) */}
                            {showSearch ? (
                                <SearchView />
                            ) : showCalendar ? (
                                <MonthCalendar
                                    selectedDate={selectedDate}
                                    onSelectDate={handleSelectDate}
                                    month={calMonth}
                                    year={calYear}
                                    onChangeMonth={handleChangeMonth}
                                />
                            ) : (
                                <DayPills
                                    selectedDate={selectedDate}
                                    onSelectDate={handleSelectDate}
                                />
                            )}
                        </View>
                    </View>
                </View>

                {/* Main Content Area */}
                <View className="px-4 pt-6">
                    {(activeTab === "home" || activeTab === "calendar" || showSearch) && (
                        <NameCard
                            dayOfWeek={LV_WEEKDAYS[selectedDate.getDay()]}
                            monthName={LV_MONTHS[selectedDate.getMonth()]}
                            dayNumber={selectedDate.getDate()}
                            names={dayData.names}
                            extended={dayData.extended}
                        />
                    )}
                    {activeTab === "contacts" && !showSearch && (
                        <View className="items-center justify-center py-20">
                            <Text className="text-neutral-400">Kontakti - vēl top</Text>
                        </View>
                    )}
                    {activeTab === "settings" && !showSearch && (
                        <View className="items-center justify-center py-20">
                            <Text className="text-neutral-400">Iestatījumi - vēl top</Text>
                        </View>
                    )}
                </View>
            </ScrollView>

            <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
        </View>
    );
}

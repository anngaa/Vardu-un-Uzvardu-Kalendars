import { StatusBar } from "expo-status-bar";
import React, { useMemo, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DayPills from "../../components/DayPills";
import NameCard from "../../components/NameCard";
import SearchView from "../../components/SearchView";
import SolarIcon from "../../components/SolarIcon";
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

export default function HomeScreen() {
    const today = useMemo(() => new Date(), []);
    const [isSearching, setIsSearching] = useState(false);
    const [selectedDate, setSelectedDate] = useState(today);

    const dateKey = getDateKey(selectedDate);
    const dayData = (namedays as Record<string, { names: string[]; extended: string[] }>)[dateKey] || {
        names: [],
        extended: [],
    };

    const handleSelectDate = (date: Date) => {
        setSelectedDate(date);
    };

    const toggleSearch = () => {
        setIsSearching(!isSearching);
    };

    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-[#efefef]">
            <StatusBar
                style="dark"
                backgroundColor="#f6f3ea"
                translucent={true}
            />

            <View style={{ height: insets.top, backgroundColor: '#f6f3ea' }} />

            <ScrollView
                className="flex-1 bg-white"
                contentContainerStyle={{ paddingBottom: 40 }}
                showsVerticalScrollIndicator={false}
            >
                <View className="bg-[#f6f3ea]">
                    {/* headera apakšējās malas arka */}
                    <View style={{
                        position: 'absolute',
                        bottom: -10,
                        left: 0,
                        right: 0,
                        height: 10,
                        backgroundColor: '#f6f3ea',
                        borderBottomLeftRadius: '100%',
                        borderBottomRightRadius: '100%',
                    }} />

                    <View>
                    <View>
                        <View className="flex-row items-center justify-between px-6 pt-4 pb-2">
                            <View className="flex-row items-center flex-1">
                                {isSearching && (
                                    <TouchableOpacity onPress={toggleSearch} className="mr-2 p-1 -ml-1">
                                        <SolarIcon name="alt-arrow-left-linear" size={24} color="#262626" />
                                    </TouchableOpacity>
                                )}
                                <Text className="text-lg font-semibold text-neutral-800 tracking-tight leading-tight flex-1">
                                    {isSearching ? "Meklēt" : "Vārdu un Uzvārdu Kalendārs"}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={toggleSearch} className="p-2 -mr-2 items-center justify-center">
                                <SolarIcon name="magnifer-linear" size={24} color={isSearching ? "#737373" : "#262626"} />
                            </TouchableOpacity>
                        </View>

                        <View className="px-4 mt-2">
                            {isSearching ? (
                                <SearchView />
                            ) : (
                                <DayPills
                                    selectedDate={selectedDate}
                                    onSelectDate={handleSelectDate}
                                />
                            )}
                        </View>
                    </View>
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

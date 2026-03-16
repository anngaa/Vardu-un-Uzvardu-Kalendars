import React, { useState } from "react";
import { Platform, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SolarIcon from "../../components/SolarIcon";
import SearchView from "../../components/SearchView";

export default function SettingsScreen() {
    const [isSearching, setIsSearching] = useState(false);
    const insets = useSafeAreaInsets();
    
    const toggleSearch = () => {
        setIsSearching(!isSearching);
    };

    return (
        <View className="flex-1 bg-[#f6f3ea]">
            <StatusBar style="dark" backgroundColor="#f6f3ea" translucent={true} />
            <View style={{ height: insets.top, backgroundColor: '#f6f3ea' }} />
            
            <ScrollView className="flex-1 bg-white" contentContainerStyle={{ paddingBottom: 40 }}>
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
                    <View className="px-4 pb-4">
                        <View className="flex-row items-center justify-between px-2 pt-4 pb-2">
                            <Text className="text-xl font-semibold text-neutral-800">Iestatījumi</Text>
                            <TouchableOpacity onPress={toggleSearch} className="p-2 -mr-2 items-center justify-center">
                                <SolarIcon name="magnifer-linear" size={24} color={isSearching ? "#737373" : "#262626"} />
                            </TouchableOpacity>
                        </View>
                        {isSearching && (
                            <View className="mt-2">
                                <SearchView />
                            </View>
                        )}
                        {!isSearching && <View className="h-4" />}
                    </View>
                </View>

                {!isSearching && (
                    <View className="flex-1 items-center justify-center pt-6">
                        <Text className="text-neutral-400">Vēl top...</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

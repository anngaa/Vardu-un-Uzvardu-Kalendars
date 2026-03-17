import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SearchView from "../../components/SearchView";
import SolarIcon from "../../components/SolarIcon";

export default function ContactsScreen() {
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
                    <View className="px-6">
                        <View className="flex-row items-center justify-between pt-4 pb-2">
                            <View className="flex-row items-center flex-1">
                                {isSearching && (
                                    <TouchableOpacity onPress={toggleSearch} className="mr-2 p-1 -ml-1">
                                        <SolarIcon name="alt-arrow-left-linear" size={24} color="#262626" />
                                    </TouchableOpacity>
                                )}
                                <Text className="text-lg font-semibold text-neutral-800">
                                    {isSearching ? "Meklēt" : "Kontakti"}
                                </Text>
                            </View>
                            <TouchableOpacity onPress={toggleSearch} className="p-2 -mr-2 items-center justify-center">
                                <SolarIcon name={isSearching ? "magnifer-bold" : "magnifer-linear"} size={24} color="#262626" />
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
                    <View className="flex-1 items-center justify-center pt-8">
                        <Text className="text-neutral-400">Vēl top...</Text>
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

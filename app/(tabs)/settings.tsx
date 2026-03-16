import React from "react";
import { Platform, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function SettingsScreen() {
    const insets = useSafeAreaInsets();
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
                        <Text className="text-xl font-semibold text-neutral-800 pt-4 pb-2 px-2">Iestatījumi</Text>
                        <View className="h-4" />
                    </View>
                </View>

                <View className="flex-1 items-center justify-center pt-6">
                    <Text className="text-neutral-400">Vēl top...</Text>
                </View>
            </ScrollView>
        </View>
    );
}

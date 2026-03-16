import React from "react";
import { Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ContactsScreen() {
    const insets = useSafeAreaInsets();
    return (
        <View className="flex-1 bg-[#efefef]">
            <StatusBar style="dark" backgroundColor="#f6f3ea" translucent={true} />
            <View style={{ height: insets.top, backgroundColor: '#f6f3ea' }} />
            <View className="flex-1 bg-white items-center justify-center">
                <Text className="text-neutral-400">Kontakti - vēl top</Text>
            </View>
        </View>
    );
}

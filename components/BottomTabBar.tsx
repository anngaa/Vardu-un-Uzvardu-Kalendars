import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SolarIcon, { SolarIconName } from "./SolarIcon";

export type BottomTab = "home" | "calendar" | "contacts" | "settings";

interface BottomTabBarProps {
    activeTab: BottomTab;
    onTabChange: (tab: BottomTab) => void;
}

export default function BottomTabBar({ activeTab, onTabChange }: BottomTabBarProps) {
    const insets = useSafeAreaInsets();
    const tabs: { key: BottomTab; label: string; icon: SolarIconName }[] = [
        { key: "home", label: "Sākums", icon: "home-angle-2-linear" },
        { key: "calendar", label: "Kalendārs", icon: "calendar-linear" },
        { key: "contacts", label: "Kontakti", icon: "users-group-two-rounded-linear" },
        { key: "settings", label: "Iestatījumi", icon: "settings-minimalistic-linear" },
    ];

    return (
        <View 
            className="bg-[#efefef]"
            style={{
                paddingBottom: Platform.OS === 'android' ? Math.max(insets.bottom, 12) : insets.bottom,
            }}
        >
            <View
                className="flex-row items-center justify-around"
                style={{
                    paddingTop: 10,
                    paddingBottom: 4,
                }}
            >
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.key;
                    return (
                        <TouchableOpacity
                            key={tab.key}
                            onPress={() => onTabChange(tab.key)}
                            className="items-center justify-center pt-2 pb-1 px-4 min-w-[70px]"
                        >
                            <SolarIcon
                                name={tab.icon}
                                size={24}
                                color={isActive ? "#262626" : "#737373"}
                            />
                            <Text className={`text-[10px] mt-1 ${isActive ? "text-neutral-800 font-semibold" : "text-neutral-500 font-medium"}`}>
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
}

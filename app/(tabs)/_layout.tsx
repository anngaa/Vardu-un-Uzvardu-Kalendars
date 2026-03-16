import { Tabs } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SolarIcon from "../../components/SolarIcon";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#efefef",
          height: 72 + insets.bottom,
          paddingTop: 10,
          paddingBottom: insets.bottom + 8,
          borderTopWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarActiveTintColor: "#262626",
        tabBarInactiveTintColor: "#737373",
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: "500",
          marginBottom: 4,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Sākums",
          tabBarIcon: ({ color }) => <SolarIcon name="home-angle-2-linear" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Kalendārs",
          tabBarIcon: ({ color }) => <SolarIcon name="calendar-linear" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Kontakti",
          tabBarIcon: ({ color }) => <SolarIcon name="users-group-two-rounded-linear" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Iestatījumi",
          tabBarIcon: ({ color }) => <SolarIcon name="settings-minimalistic-linear" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}

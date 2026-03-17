import { Tabs } from "expo-router";
import React from "react";
import CustomTabBar from "../../components/CustomTabBar";
import SolarIcon from "../../components/SolarIcon";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Sākums",
          tabBarIcon: ({ color, focused }) => (
            <SolarIcon name={focused ? "home-angle-2-bold-duotone" : "home-angle-2-linear"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="calendar"
        options={{
          title: "Kalendārs",
          tabBarIcon: ({ color, focused }) => (
            <SolarIcon name={focused ? "calendar-bold-duotone" : "calendar-linear"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="contacts"
        options={{
          title: "Kontakti",
          tabBarIcon: ({ color, focused }) => (
            <SolarIcon name={focused ? "users-group-two-rounded-bold-duotone" : "users-group-two-rounded-linear"} size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Iestatījumi",
          tabBarIcon: ({ color, focused }) => (
            <SolarIcon name={focused ? "settings-minimalistic-bold-duotone" : "settings-minimalistic-linear"} size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

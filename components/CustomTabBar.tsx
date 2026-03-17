import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import React from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SolarIcon, { SolarIconName } from "./SolarIcon";

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="bg-white flex-row border-t border-gray-200"
      style={[
        {
          height: 72 + insets.bottom,
          paddingBottom: insets.bottom + 8,
          paddingTop: 12,
          elevation: 20,
        },
        Platform.select({
          web: {
            boxShadow: "0px 0px 20px rgba(0, 0, 0, 0.05)",
          },
          ios: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: -8 },
            shadowOpacity: 0.1,
            shadowRadius: 15,
          }
        })
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;
        const label =
          options.tabBarLabel !== undefined
            ? typeof options.tabBarLabel === "function"
              ? options.tabBarLabel({
                focused: isFocused,
                color: isFocused ? "#262626" : "#737373",
                position: "below-icon",
                children: route.name,
              })
              : options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        // Ikonu kartēšana
        let iconName: SolarIconName = "home-angle-2-linear";
        if (route.name === "index") {
          iconName = isFocused ? "home-angle-2-bold" : "home-angle-2-linear";
        } else if (route.name === "calendar") {
          iconName = isFocused ? "calendar-bold" : "calendar-linear";
        } else if (route.name === "contacts") {
          iconName = isFocused ? "users-group-two-rounded-bold" : "users-group-two-rounded-linear";
        } else if (route.name === "settings") {
          iconName = isFocused ? "settings-minimalistic-bold" : "settings-minimalistic-linear";
        }

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            onPress={onPress}
            onLongPress={onLongPress}
            className="flex-1 items-center justify-center gap-1"
          >
            <SolarIcon
              name={iconName}
              size={24}
              color={isFocused ? "#262626" : "#737373"}
            />
            {typeof label === "string" ? (
              <Text
                className={`text-[10px] font-medium ${isFocused ? "text-neutral-900" : "text-neutral-500"}`}
              >
                {label}
              </Text>
            ) : (
              label
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

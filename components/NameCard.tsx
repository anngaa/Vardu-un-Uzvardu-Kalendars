import React from "react";
import { Text, View } from "react-native";

interface NameCardProps {
    dayOfWeek: string;
    monthName: string;
    dayNumber: number;
    names: string[];
    extended: string[];
}

export default function NameCard({
    dayOfWeek,
    monthName,
    dayNumber,
    names,
    extended,
}: NameCardProps) {
    return (
        <View className="flex-row mt-2 px-1">
            {/* Left column: Timeline */}
            <View className="w-10 items-center mr-3">
                {/* Decorative ball */}
                <View className="w-4 h-4 rounded-full border-[3px] border-neutral-200 bg-transparent" />
                {/* Dashed line */}
                <View className="flex-1 border-l-2 border-dashed border-neutral-200 my-2" />
            </View>

            {/* Right column: Content bubble */}
            <View className="flex-1 bg-[#eff2e9] rounded-xl p-6">
                <View className="flex-row items-center justify-between mb-3">
                    <Text className="text-[11px] font-bold text-neutral-800/40 uppercase tracking-widest">
                        Vārda dienas
                    </Text>
                    <Text className="text-[11px] font-semibold text-neutral-800/40 uppercase">
                        {dayOfWeek}
                    </Text>
                </View>

                {/* Calendar names - bold */}
                {names.length > 0 && names[0] !== "–" && (
                    <Text className="text-xl font-bold text-neutral-800 leading-7 mb-2">
                        {names.join(", ")}
                    </Text>
                )}

                {/* Extended names - lighter */}
                {extended.length > 0 && (
                    <Text className="text-sm text-neutral-500 leading-6">
                        {extended.join(", ")}
                    </Text>
                )}

                {names.length > 0 && names[0] === "–" && (
                    <Text className="text-base text-neutral-400 italic">
                        Nav vārda dienu
                    </Text>
                )}
            </View>
        </View>
    );
}

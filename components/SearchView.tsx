import React, { useState } from "react";
import { FlatList, Text, TextInput, TouchableOpacity, View } from "react-native";
import namedays from "../data/namedays.json";
import SolarIcon from "./SolarIcon";

interface SearchResult {
    date: string;
    name: string;
    isExtended: boolean;
}

export default function SearchView() {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<SearchResult[]>([]);

    const handleSearch = (text: string) => {
        setQuery(text);
        if (text.length < 2) {
            setResults([]);
            return;
        }

        const filtered: SearchResult[] = [];
        const lowerText = text.toLowerCase();

        for (const [dateKey, data] of Object.entries(namedays)) {
            const entry = data as { names: string[]; extended: string[] };
            for (const name of entry.names) {
                if (name.toLowerCase().includes(lowerText)) {
                    filtered.push({ date: dateKey, name, isExtended: false });
                }
            }
            for (const name of entry.extended) {
                if (name.toLowerCase().includes(lowerText)) {
                    filtered.push({ date: dateKey, name, isExtended: true });
                }
            }
        }

        setResults(filtered.slice(0, 50)); // Limit to 50 results
    };

    const formatDate = (dateKey: string) => {
        const LV_MONTHS = [
            "Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs",
            "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris",
        ];
        const [mm, dd] = dateKey.split("-").map(Number);
        return `${dd}. ${LV_MONTHS[mm - 1]}`;
    };

    return (
        <View className="mb-2 bg-transparent">
            {/* Search input */}
            <View className="flex-row h-12 justify-center items-center bg-white rounded-full px-5 py-1 mb-4">
                <SolarIcon name="magnifer-linear" size={20} color="#a3a3a3" />
                <TextInput
                    value={query}
                    onChangeText={handleSearch}
                    placeholder="Meklēt vārdu..."
                    placeholderTextColor="#a3a3a3"
                    className="flex-1 ml-2.5 text-base text-neutral-800 py-0 focus:outline-none"
                    textAlignVertical="center"
                    style={{ includeFontPadding: false }}
                />
                {query.length > 0 && (
                    <TouchableOpacity onPress={() => handleSearch("")}>
                        <SolarIcon
                            name="close-circle-linear"
                            size={20}
                            color="#a3a3a3"
                        />
                    </TouchableOpacity>
                )}
            </View>

            {/* Results */}
            {query.length >= 2 && results.length === 0 && (
                <Text className="text-sm text-neutral-400 text-center py-4">
                    Nekas netika atrasts
                </Text>
            )}

            {results.length > 0 && (
                <FlatList
                    data={results}
                    keyExtractor={(item, i) => `${item.date}-${item.name}-${i}`}
                    scrollEnabled={false}
                    renderItem={({ item }) => (
                        <View className="flex-row items-center py-3">
                            <View className="flex-1">
                                <Text
                                    className={`text-base ${item.isExtended
                                        ? "text-neutral-400"
                                        : "text-neutral-800 font-bold"
                                        }`}
                                >
                                    {item.name}
                                </Text>
                            </View>
                            <Text className="text-sm text-neutral-400 font-medium tracking-wide">
                                {formatDate(item.date)}
                            </Text>
                        </View>
                    )}
                />
            )}

            {query.length < 2 && (
                <Text className="text-sm text-neutral-400 text-center py-4">
                    Ievadiet vismaz 2 burtus
                </Text>
            )}
        </View>
    );
}

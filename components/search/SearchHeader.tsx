import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SearchHeaderProps {
    onFilterPress?: () => void;
    onSearch?: (text: string) => void;
}

export default function SearchHeader({ onFilterPress, onSearch }: SearchHeaderProps) {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top }} className="bg-white pb-2 px-4 shadow-sm z-10">
            {/* Top Row: Title */}
            <View className="flex-row items-center mb-4 mt-2">
                <Text className="text-xl font-medium text-gray-800 tracking-wide">
                    Search
                </Text>
            </View>

            {/* Search Bar with Filter */}
            <View className="flex-row items-center space-x-4">
                <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-3 py-1.5">
                    <Ionicons name="search-outline" size={18} color="#9CA3AF" />
                    <TextInput
                        autoFocus
                        placeholder="Search"
                        className="flex-1 ml-2 text-gray-700 font-normal"
                        placeholderTextColor="#9CA3AF"
                        onChangeText={onSearch}
                    />
                </View>
                <TouchableOpacity
                    className="bg-white rounded-full p-2 border border-gray-200 ml-2"
                    onPress={onFilterPress}
                >
                    <Ionicons name="options-outline" size={24} color="#555" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

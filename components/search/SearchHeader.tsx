import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function SearchHeader() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top }} className="bg-white pb-2 px-4 shadow-sm z-10">
            {/* Top Row: Menu and Title */}
            <View className="flex-row items-center justify-between mb-4 mt-2">
                <TouchableOpacity onPress={() => router.back()}>
                    <Ionicons name="menu-outline" size={28} color="black" />
                </TouchableOpacity>
                <Text className="text-xl font-medium text-gray-800 tracking-wide">
                    Search
                </Text>
                <View style={{ width: 28 }} />
            </View>

            {/* Search Bar with Filter */}
            <View className="flex-row items-center space-x-2">
                <View className="flex-1 flex-row items-center bg-gray-100 rounded-full px-4 py-3">
                    <Ionicons name="search-outline" size={20} color="#9CA3AF" />
                    <TextInput
                        autoFocus
                        placeholder="Search"
                        className="flex-1 ml-2 text-gray-700 font-normal"
                        placeholderTextColor="#9CA3AF"
                    />
                </View>
                <TouchableOpacity className="bg-white rounded-full p-2 border border-gray-200">
                    <Ionicons name="options-outline" size={24} color="#555" />
                </TouchableOpacity>
            </View>
        </View>
    );
}

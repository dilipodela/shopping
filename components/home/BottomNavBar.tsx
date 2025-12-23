import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

const TABS = [
    { name: 'Home', icon: 'home' },
    { name: 'Search', icon: 'search' },
    { name: 'Bag', icon: 'bag-outline' },
    { name: 'Favorites', icon: 'heart-outline' },
    { name: 'Profile', icon: 'person-outline' },
];

interface BottomNavBarProps {
    activeTab?: string;
}

export default function BottomNavBar({ activeTab = 'Home' }: BottomNavBarProps) {
    const handleTabPress = (tabName: string) => {
        if (tabName === 'Home') {
            if (activeTab !== 'Home') {
                router.dismissAll();
                router.replace('/');
            }
        } else if (tabName === 'Search') {
            router.push('/search');
        } else if (tabName === 'Bag') {
            router.push('/bag');
        } else if (tabName === 'Favorites') {
            router.push('/favorites');
        } else if (tabName === 'Profile') {
            router.push('/profile');
        }
        // Add other tabs here later
    };

    return (
        <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex-row justify-around py-2 pb-6">
            {TABS.map((tab) => {
                const isActive = tab.name === activeTab;
                return (
                    <TouchableOpacity
                        key={tab.name}
                        className="items-center"
                        onPress={() => handleTabPress(tab.name)}
                    >
                        <Ionicons
                            name={tab.icon as any}
                            size={24}
                            color={isActive ? "#F97316" : "#9CA3AF"}
                        />
                        <Text
                            className={`text-[10px] mt-1 ${isActive ? 'text-orange-500 font-medium' : 'text-gray-400'}`}
                        >
                            {tab.name}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

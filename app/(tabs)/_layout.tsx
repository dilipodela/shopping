import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false, // We render our own
            }}
            tabBar={(props) => <CustomTabBar {...props} />}
        >
            <Tabs.Screen name="index" />
            <Tabs.Screen name="search" />
            <Tabs.Screen name="bag" />
            <Tabs.Screen name="favorites" />
            <Tabs.Screen name="profile" />
        </Tabs>
    );
}

const TABS = [
    { name: 'index', label: 'Home', icon: 'home' },
    { name: 'search', label: 'Search', icon: 'search' },
    { name: 'bag', label: 'Bag', icon: 'bag-outline' },
    { name: 'favorites', label: 'Favorites', icon: 'heart-outline' },
    { name: 'profile', label: 'Profile', icon: 'person-outline' },
];

function CustomTabBar({ state, descriptors, navigation }: any) {
    return (
        <View className="bg-white border-t border-gray-200 flex-row justify-around py-2 pb-6 absolute bottom-0 left-0 right-0">
            {state.routes.map((route: any, index: number) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;

                const tabItem = TABS.find(t => t.name === route.name);
                if (!tabItem) return null;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        className="items-center"
                    >
                        <Ionicons
                            name={tabItem.icon as any}
                            size={24}
                            color={isFocused ? "#F97316" : "#9CA3AF"}
                        />
                        <Text className={`text-[10px] mt-1 ${isFocused ? 'text-orange-500 font-medium' : 'text-gray-400'}`}>
                            {tabItem.label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDrawer } from '../../context/DrawerContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function SideDrawer() {
    const { isDrawerOpen, closeDrawer } = useDrawer();
    const slideAnim = useRef(new Animated.Value(-SCREEN_WIDTH)).current;
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isDrawerOpen) {
            setIsVisible(true);
            // Slide In
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                damping: 30, // Smooth damping
                mass: 0.8,
                stiffness: 90,
            }).start();
        } else {
            // Slide Out
            Animated.timing(slideAnim, {
                toValue: -SCREEN_WIDTH,
                duration: 250,
                useNativeDriver: true,
            }).start(() => {
                // Hide modal after animation completes
                setIsVisible(false);
            });
        }
    }, [isDrawerOpen]);

    if (!isVisible) return null;

    const menuItems = [
        { icon: 'share-social-outline', label: 'Shared Items', route: '/shared-items' },
        { icon: 'time-outline', label: 'Recently Viewed', route: '/recently-viewed' },
        { icon: 'pricetag-outline', label: 'Price Drop Alerts', route: '/price-alerts' },
        { icon: 'people-outline', label: 'Refer a Friend', route: '/refer-friend' },
        { icon: 'glasses-outline', label: 'Accessories', route: '/search?category=Accessories' },
        { icon: 'settings-outline', label: 'Settings', route: '/profile' },
    ];

    const handleNavigation = (route: string) => {
        closeDrawer();
        // Small delay to allow drawer to close a bit before navigating
        setTimeout(() => {
            // Logic to handle route navigation
            // Simple router.push for now, can be sophisticated based on route type
            if (route.startsWith('/')) {
                router.push(route as any);
            }
        }, 150);
    };

    return (
        <Modal
            transparent
            visible={isVisible}
            animationType="none"
            onRequestClose={closeDrawer}
        >
            <View className="flex-1 relative">
                {/* Overlay (Click to Close) */}
                <TouchableOpacity
                    activeOpacity={1}
                    onPress={closeDrawer}
                    className="absolute inset-0 bg-black/50"
                />

                {/* Drawer Panel */}
                <Animated.View
                    style={{
                        transform: [{ translateX: slideAnim }],
                        width: SCREEN_WIDTH * 0.75,
                        maxHeight: SCREEN_HEIGHT * 0.85,
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                    }}
                    className="absolute left-0 top-20 bg-gray-50 shadow-2xl z-50 overflow-hidden"
                >
                    <View style={{ paddingTop: insets.top + 20 }} className="px-6 pb-6 bg-white border-b border-gray-100">
                        <View className="flex-row items-center mb-4">
                            <View className="w-12 h-12 bg-gray-200 rounded-full items-center justify-center mr-3 border border-white shadow-sm overflow-hidden">
                                <Ionicons name="person" size={24} color="#9CA3AF" />
                            </View>
                            <View>
                                <Text className="text-gray-500 text-xs font-medium uppercase tracking-wide">Welcome</Text>
                                <Text className="text-gray-900 text-lg font-bold">Guest User</Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView className="px-2 py-4 shrink" showsVerticalScrollIndicator={false}>
                        {menuItems.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => handleNavigation(item.route)}
                                className="flex-row items-center px-4 py-4 rounded-xl active:bg-gray-50 mb-1"
                            >
                                <Ionicons name={item.icon as any} size={22} color="#374151" className="mr-4" />
                                <Text className="text-gray-700 font-medium text-base">{item.label}</Text>
                                <View className="flex-1" />
                                <Ionicons name="chevron-forward" size={16} color="#D1D5DB" />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View className="p-6 border-t border-gray-100">
                        <TouchableOpacity
                            onPress={() => {
                                closeDrawer();
                                // Implement Logout logic
                            }}
                            className="flex-row items-center justify-center bg-gray-100 py-3 rounded-full"
                        >
                            <Ionicons name="log-out-outline" size={20} color="#EF4444" className="mr-2" />
                            <Text className="text-red-500 font-bold">Log Out</Text>
                        </TouchableOpacity>
                        <Text className="text-center text-gray-400 text-xs mt-4">Version 1.0.0</Text>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

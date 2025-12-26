import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useDrawer } from '../../context/DrawerContext';


export default function HomeHeader() {
    const insets = useSafeAreaInsets();
    const { openDrawer } = useDrawer();
    const router = useRouter();

    return (
        <View style={{ paddingTop: insets.top }} className="bg-white pb-4 px-4 pt-0">
            {/* Top Row: Menu and Title */}
            <View className="flex-row items-center justify-between mb-4 mt-2 ">
                <TouchableOpacity onPress={openDrawer}>
                    <Ionicons name="menu-outline" size={28} color="black" />
                </TouchableOpacity>
                <Text className="text-2xl font-dancing text-gray-800 tracking-wide">
                    Hello Gorgeous
                </Text>
                {/* <Image
                    source={require('../../assets/images/logoshoping.jpeg')}
                    style={{ height: 20, width: 180 }}
                    resizeMode="contain"
                /> */}
                <View style={{ width: 28 }} />
            </View>

            {/* Search Bar */}
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => router.push('/search')}
                className="flex-row items-center bg-gray-100 rounded-full px-4 py-2"
            >
                <Ionicons name="search-outline" size={20} color="#9CA3AF" />
                <TextInput
                    placeholder="Search any Product.."
                    className="flex-1 ml-2 text-gray-700 font-normal"
                    placeholderTextColor="#9CA3AF"
                    editable={false}
                    pointerEvents="none"
                />
                <Ionicons name="mic-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>
        </View>
    );
}

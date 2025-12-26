import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PriceAlerts() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const renderHeader = () => (
        <View style={{ paddingTop: insets.top }} className="bg-white px-4 pb-4 border-b border-gray-100">
            <View className="flex-row items-center mt-2 relative">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute left-0 z-10 p-2 -ml-2 rounded-full active:bg-gray-100"
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View className="flex-1 items-center">
                    <Text className="text-xl font-bold text-gray-900">Price Alerts</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-white">
            {renderHeader()}

            <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: 'center', justifyContent: 'center', padding: 32 }}>
                <View className="w-24 h-24 bg-orange-50 rounded-full items-center justify-center mb-6">
                    <Ionicons name="notifications-outline" size={48} color="#F97316" />
                </View>
                <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">No Price Drops Yet</Text>
                <Text className="text-gray-500 text-center leading-7 text-base mb-8">
                    We'll notify you here when items in your Wishlist or Bag go on sale. Keep adding items you love!
                </Text>

                <TouchableOpacity
                    onPress={() => router.push('/search')}
                    className="bg-black px-8 py-4 rounded-full shadow-lg"
                >
                    <Text className="text-white font-bold text-lg">Browse Products</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

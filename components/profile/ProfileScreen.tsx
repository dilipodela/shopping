import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const MENU_ITEMS = [
    { icon: 'bag-handle-outline', label: 'My Orders' },
    { icon: 'card-outline', label: 'Payment Methods' },
    { icon: 'location-outline', label: 'Shipping Addresses' },
    { icon: 'heart-outline', label: 'My Favorites' },
    { icon: 'settings-outline', label: 'Settings' },
    { icon: 'help-circle-outline', label: 'Help & Support' },
];

export default function ProfileScreen() {
    return (
        <View className="flex-1 bg-white">
            <View className="pt-14 px-4 pb-6 bg-white border-b border-gray-100">
                <Text className="text-2xl font-bold text-gray-900 mb-6">My Profile</Text>

                <View className="flex-row items-center">
                    <View className="w-16 h-16 bg-gray-200 rounded-full overflow-hidden mr-4">
                        <Image
                            source={{ uri: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80' }}
                            className="w-full h-full"
                            contentFit="cover"
                            cachePolicy="disk"
                            allowDownscaling={true}
                        />
                    </View>
                    <View>
                        <Text className="text-lg font-bold text-gray-900">Matilda Brown</Text>
                        <Text className="text-gray-500 text-sm">matilda.brown@mail.com</Text>
                    </View>
                </View>
            </View>

            <ScrollView className="flex-1">
                <View className="p-4">
                    {MENU_ITEMS.map((item, index) => (
                        <TouchableOpacity key={index} className="flex-row items-center justify-between py-4 border-b border-gray-50">
                            <View className="flex-row items-center">
                                <Ionicons name={item.icon as any} size={24} color="#374151" />
                                <Text className="ml-4 text-gray-900 font-medium">{item.label}</Text>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
                        </TouchableOpacity>
                    ))}

                    <TouchableOpacity className="mt-8 py-3 bg-gray-50 rounded-lg items-center">
                        <Text className="text-red-500 font-medium">Log Out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, View } from 'react-native';

export default function PromoBanner() {
    return (
        <View className="mx-4 my-4 h-48 bg-teal-600 rounded-xl overflow-hidden flex-row relative">
            {/* Content Overlay */}
            <View className="z-10 absolute left-6 top-6">
                <View className="flex-row items-center mb-2">
                    <Text className="text-orange-400 font-bold text-lg">HELLO</Text>
                    <Text className="text-orange-400 font-light text-lg ml-1">GORGEOUS!</Text>
                </View>
                <View className="flex-row items-center mb-4">
                    <Ionicons name="logo-instagram" size={16} color="white" />
                    <Text className="text-white text-xs ml-1">@hellogorgeous.app</Text>
                </View>
                <Text className="text-white text-base font-semibold w-32">Follow us on Instagram</Text>
            </View>

            {/* Background Image (Mock) */}
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=800&q=80' }}
                className="w-full h-full absolute right-0 top-0 opacity-80"
                resizeMode="cover"
                style={{ left: 80 }} // Shifting image to the right roughly
            />
        </View>
    );
}

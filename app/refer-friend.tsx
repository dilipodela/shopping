import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Share, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function ReferFriend() {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleInvite = async () => {
        try {
            await Share.share({
                message: 'Check out Hello Gorgeous! It is the best place to find amazing fashion in 3D. Download now: https://hellogorgeous.app',
                title: 'Invite a Friend',
            });
        } catch (error) {
            console.error('Error sharing:', error);
        }
    };

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
                    <Text className="text-xl font-bold text-gray-900">Refer a Friend</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-white">
            {renderHeader()}

            <View className="flex-1 items-center justify-center p-8 bg-white">
                <View className="relative mb-8">
                    <View className="w-32 h-32 bg-blue-50 rounded-full items-center justify-center">
                        <Ionicons name="gift-outline" size={64} color="#3B82F6" />
                    </View>
                    <View className="absolute -bottom-2 -right-2 w-12 h-12 bg-white rounded-full items-center justify-center shadow-lg border border-gray-100">
                        <Ionicons name="heart" size={24} color="#EF4444" />
                    </View>
                </View>

                <Text className="text-2xl font-bold text-gray-900 mb-3 text-center">Invite Friends</Text>
                <Text className="text-gray-500 text-center leading-7 text-base mb-10">
                    Share the love! Invite your friends to Hello Gorgeous and explore the world of 3D fashion together.
                </Text>

                <TouchableOpacity
                    onPress={handleInvite}
                    className="w-full bg-black py-4 rounded-full flex-row items-center justify-center shadow-xl shadow-gray-200"
                >
                    <Ionicons name="share-outline" size={22} color="white" className="mr-3" />
                    <Text className="text-white font-bold text-lg">Share Invite Link</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useBag } from '../../context/BagContext';

export default function MiniCartBar() {
    const { bagItems, totalPrice } = useBag();
    const router = useRouter();

    if (bagItems.length === 0) return null;

    const totalItems = bagItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <View className="">
            <TouchableOpacity
                onPress={() => router.push('/bag')}
                className="bg-green-600 rounded-2xl p-4 flex-row items-center justify-between shadow-lg shadow-green-200"
            >
                <View className="flex-row items-center">
                    <View className="bg-white/20 p-2 rounded-full mr-3">
                        <Ionicons name="bag-handle" size={20} color="white" />
                    </View>
                    <View>
                        <Text className="text-white font-bold text-base">
                            {totalItems} {totalItems === 1 ? 'item' : 'items'} | ₹ {totalPrice}
                        </Text>
                        <Text className="text-green-100 text-xs font-medium">Extra charges may apply</Text>
                    </View>
                </View>

                <View className="flex-row items-center">
                    <Text className="text-white font-bold text-sm mr-1">View Cart</Text>
                    <Ionicons name="chevron-forward" size={16} color="white" />
                </View>
            </TouchableOpacity>
        </View>
    );
}

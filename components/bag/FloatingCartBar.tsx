import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { useBag } from '../../context/BagContext';

interface FloatingCartBarProps {
    bottomOffset?: number; // How far from bottom (e.g., to clear TabBar)
}

export default function FloatingCartBar({ bottomOffset = 0 }: FloatingCartBarProps) {
    const router = useRouter();
    const { bagItems, totalPrice } = useBag();

    // Calculate total item count
    const totalItems = bagItems.reduce((acc, item) => acc + item.quantity, 0);

    if (totalItems === 0) return null;

    return (
        <View
            className="absolute left-4 right-4 z-50 bg-white rounded-lg shadow-xl border border-gray-100 flex-row items-center justify-between p-3"
            style={{ bottom: bottomOffset + 16 }} // Add 16px default margin from bottom/reference
        >
            <View className="flex-row items-center gap-3">
                <View className="bg-orange-100 p-2 rounded-full">
                    <Ionicons name="bag-handle" size={20} color="#F97316" />
                </View>
                <View>
                    <Text className="text-gray-900 font-bold text-sm">
                        {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
                    </Text>
                    <Text className="text-gray-500 text-xs font-medium">
                        Total: ₹{totalPrice}
                    </Text>
                </View>
            </View>

            <TouchableOpacity
                onPress={() => router.push('/bag')}
                className="bg-gray-900 px-4 py-2 rounded-lg flex-row items-center gap-2"
            >
                <Text className="text-white font-bold text-xs">View Cart</Text>
                <Ionicons name="arrow-forward" size={14} color="white" />
            </TouchableOpacity>
        </View>
    );
}

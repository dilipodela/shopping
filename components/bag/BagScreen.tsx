import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useBag } from '../../context/BagContext';

export default function BagScreen() {
    const router = useRouter();
    const { bagItems, removeFromBag, totalPrice } = useBag();
    const insets = useSafeAreaInsets();

    return (
        <View className="flex-1 bg-white" style={{ paddingTop: insets.top }}>
            <View className="pt-4 px-4 pb-4 border-b border-gray-100">
                <Text className="text-2xl font-bold text-gray-900">Shopping Bag</Text>
                <Text className="text-gray-500 text-sm">{bagItems.length} items</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 250 }} showsVerticalScrollIndicator={false}>
                {bagItems.length === 0 ? (
                    <View className="items-center justify-center mt-20">
                        <View className="w-20 h-20 bg-gray-50 rounded-full items-center justify-center mb-4">
                            <Ionicons name="bag-outline" size={40} color="#D1D5DB" />
                        </View>
                        <Text className="text-gray-900 font-bold text-lg">Your bag is empty</Text>
                        <Text className="text-gray-500 mt-2 text-center px-10 mb-8">
                            Looks like you haven't added anything to your bag yet.
                        </Text>
                        <TouchableOpacity
                            className="bg-black px-8 py-3 rounded-full"
                            onPress={() => {
                                router.dismissAll();
                                router.replace('/');
                            }}
                        >
                            <Text className="text-white font-bold">Start Shopping</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View>
                        {bagItems.map((item, index) => (
                            <View key={`${item.product.id}-${item.size}`} className="flex-row mb-6 bg-white">
                                <View className="h-24 w-24 bg-gray-100 rounded-lg overflow-hidden mr-4">
                                    <Image
                                        source={typeof item.product.image === 'string' ? { uri: item.product.image } : item.product.image}
                                        className="w-full h-full"
                                        resizeMode="cover"
                                    />
                                </View>
                                <View className="flex-1 justify-between py-1">
                                    <View>
                                        <View className="flex-row justify-between items-start">
                                            <Text className="text-gray-900 font-bold text-base w-[80%]" numberOfLines={1}>{item.product.name}</Text>
                                            <TouchableOpacity onPress={() => removeFromBag(item.product.id, item.size)}>
                                                <Ionicons name="trash-outline" size={18} color="#EF4444" />
                                            </TouchableOpacity>
                                        </View>
                                        <Text className="text-gray-500 text-xs mt-1">{item.product.brand}</Text>
                                        <View className="flex-row items-center mt-2">
                                            <View className="bg-gray-100 px-2 py-0.5 rounded mr-2">
                                                <Text className="text-xs font-bold text-gray-700">Size: {item.size}</Text>
                                            </View>
                                            <View className="bg-gray-100 px-2 py-0.5 rounded">
                                                <Text className="text-xs font-bold text-gray-700">Qty: {item.quantity}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <Text className="text-gray-900 font-bold text-base">QAR {item.product.price * item.quantity}.00</Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
            </ScrollView>

            {bagItems.length > 0 && (
                <View
                    className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-6 pt-4"
                    style={{ paddingBottom: 100 }}
                >
                    <View className="flex-row items-center justify-between">
                        <View>
                            <Text className="text-gray-500 text-xs uppercase tracking-wider font-medium">Total</Text>
                            <Text className="text-xl font-semibold text-gray-900">QAR {totalPrice}.00</Text>
                        </View>

                        <TouchableOpacity className="bg-black px-8 py-3 rounded-full flex-row items-center shadow-lg active:scale-95">
                            <Text className="text-white font-bold text-sm mr-2">Checkout</Text>
                            <Ionicons name="arrow-forward" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
        </View>
    );
}

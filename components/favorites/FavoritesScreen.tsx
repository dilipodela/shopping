import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFavorites } from '../../context/FavoritesContext';
import { PRODUCTS } from '../../data/products';

import { useProductDetail } from '../../context/ProductDetailContext';

export default function FavoritesScreen() {
    const { favorites, toggleFavorite } = useFavorites();
    const { openProduct } = useProductDetail();

    const favoriteProducts = PRODUCTS.filter((product) => favorites.includes(product.id));

    return (
        <View className="flex-1 bg-white">
            <View className="pt-14 px-4 pb-4 border-b border-gray-100">
                <Text className="text-2xl font-bold text-gray-900">Favorites</Text>
                <Text className="text-gray-500 text-sm">{favoriteProducts.length} items</Text>
            </View>

            <ScrollView contentContainerStyle={{ padding: 16, paddingBottom: 100 }}>
                {favoriteProducts.length === 0 ? (
                    <View className="items-center justify-center mt-20">
                        <View className="w-20 h-20 bg-gray-50 rounded-full items-center justify-center mb-4">
                            <Ionicons name="heart-outline" size={40} color="#D1D5DB" />
                        </View>
                        <Text className="text-gray-900 font-bold text-lg">No Favorites Yet</Text>
                        <Text className="text-gray-500 mt-2 text-center px-10">
                            Tap the heart icon on any product to save it here.
                        </Text>
                    </View>
                ) : (
                    <View className="flex-row flex-wrap justify-between">
                        {favoriteProducts.map((product) => (
                            <TouchableOpacity
                                key={product.id}
                                className="w-[48%] bg-white rounded-lg mb-4 shadow-sm pb-2 border border-gray-100"
                                onPress={() => openProduct(product)}
                                activeOpacity={0.9}
                            >
                                <View className="h-48 w-full rounded-t-lg overflow-hidden bg-gray-100 relative">
                                    <Image
                                        source={typeof product.image === 'string' ? { uri: product.image } : product.image}
                                        className="w-full h-full"
                                        style={{ width: '100%', height: '100%' }}
                                        contentFit="cover"
                                        transition={200}
                                        cachePolicy="disk"
                                        allowDownscaling={true}
                                    />
                                    <TouchableOpacity
                                        className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full"
                                        onPress={() => toggleFavorite(product.id)}
                                    >
                                        <Ionicons name="heart" size={16} color="#EF4444" />
                                    </TouchableOpacity>
                                </View>
                                <View className="p-2">
                                    <Text className="text-gray-900 font-semibold text-sm" numberOfLines={1}>{product.name}</Text>
                                    <Text className="text-gray-500 text-xs mb-1">{product.brand}</Text>
                                    <Text className="text-gray-900 font-bold text-sm mt-1">
                                        ₹ {product.price}.00
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                )}
            </ScrollView>
        </View>
    );
}

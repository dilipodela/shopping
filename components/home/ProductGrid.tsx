import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { PRODUCTS } from '../../data/products';

import { useFavorites } from '../../context/FavoritesContext';
import { useProductDetail } from '../../context/ProductDetailContext';

export default function ProductGrid() {
    const { toggleFavorite, isFavorite } = useFavorites();
    const { openProduct } = useProductDetail();

    return (
        <View className="px-4 pb-24 flex-row flex-wrap justify-between">
            {PRODUCTS.map((product) => (
                <TouchableOpacity
                    key={product.id}
                    className="w-[48%] bg-white rounded-lg mb-4 shadow-sm pb-2"
                    onPress={() => openProduct(product)}
                    activeOpacity={0.9}
                >
                    <View className="h-48 w-full rounded-t-lg overflow-hidden bg-gray-100 relative">
                        <Image
                            source={typeof product.image === 'string' ? { uri: product.image } : product.image}
                            className="w-full h-full"
                            resizeMode="cover"
                        />
                    </View>
                    <View className="p-2">
                        <Text className="text-gray-900 font-semibold text-base">{product.name}</Text>
                        <Text className="text-gray-500 text-xs mb-1">{product.brand}</Text>

                        <View className="flex-row items-center justify-between mt-1">
                            <View className="flex-row">
                                {[...Array(5)].map((_, i) => (
                                    <Ionicons key={i} name="star" size={10} color={i < product.rating ? "#F59E0B" : "#E5E7EB"} />
                                ))}
                            </View>
                            <TouchableOpacity
                                className="bg-gray-50 p-1 rounded-full"
                                onPress={() => toggleFavorite(product.id)}
                            >
                                <Ionicons
                                    name={isFavorite(product.id) ? "heart" : "heart-outline"}
                                    size={16}
                                    color={isFavorite(product.id) ? "#EF4444" : "#9CA3AF"}
                                />
                            </TouchableOpacity>
                        </View>

                        <Text className="text-gray-900 font-bold text-sm mt-2">
                            QAR {product.price}.00
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
}

import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useFavorites } from '../../context/FavoritesContext';
import { useProductDetail } from '../../context/ProductDetailContext';
import { PRODUCTS } from '../../data/products';

export default function PopularSection() {
    const { toggleFavorite, isFavorite } = useFavorites();
    const { openProduct } = useProductDetail();
    // Filter for "Popular" items - here we just assume "New" items are popular
    const popularItems = PRODUCTS.filter(p => p.isNew);

    return (
        <View className="mt-4 px-4">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4">
                <Text className="text-lg font-bold">Popular this week</Text>
                <Text className="text-gray-400 text-sm">View all</Text>
            </View>

            {/* Grid */}
            <View className="flex-row flex-wrap justify-between pb-24">
                {popularItems.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        className="w-[48%] bg-white rounded-lg mb-4 pb-2"
                        onPress={() => openProduct(item)}
                        activeOpacity={0.9}
                    >
                        <View className="h-64 w-full rounded-lg overflow-hidden bg-gray-100 relative">
                            <Image
                                source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                            <View className="absolute top-2 left-2 bg-white px-2 py-1 rounded-full">
                                <Text className="text-[10px] font-bold">NEW</Text>
                            </View>
                            <TouchableOpacity
                                className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full"
                                onPress={() => toggleFavorite(item.id)}
                            >
                                <Ionicons
                                    name={isFavorite(item.id) ? "heart" : "heart-outline"}
                                    size={16}
                                    color={isFavorite(item.id) ? "#EF4444" : "#000"}
                                />
                            </TouchableOpacity>
                        </View>

                        <View className="mt-2">
                            <View className="flex-row justify-between items-start">
                                <View>
                                    <Text className="text-gray-900 font-bold text-lg">{item.name}</Text>
                                    <Text className="text-gray-400 text-xs mb-1">{item.brand}</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center mt-1">
                                {[...Array(5)].map((_, i) => (
                                    <Ionicons key={i} name="star" size={12} color={i < item.rating ? "#F59E0B" : "#E5E7EB"} />
                                ))}
                            </View>

                            <Text className="text-gray-900 font-bold text-lg mt-2">
                                QAR {item.price}.00
                            </Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

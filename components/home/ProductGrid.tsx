import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { useRef } from 'react';
import { Animated, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { PRODUCTS } from '../../data/products';

import { useFavorites } from '../../context/FavoritesContext';
import { useProductDetail } from '../../context/ProductDetailContext';

interface ProductGridProps {
    products?: typeof PRODUCTS;
    category?: string | null;
}

export default function ProductGrid({ products, category }: ProductGridProps) {
    const { toggleFavorite, isFavorite } = useFavorites();
    const { openProduct } = useProductDetail();

    const displayProducts = products || (category
        ? PRODUCTS.filter(p => p.category === category)
        : PRODUCTS);

    return (
        <View className="px-4 pb-24 flex-row flex-wrap justify-between relative z-0">
            {displayProducts.map((product) => (
                <GridCard
                    key={product.id}
                    product={product}
                    openProduct={openProduct}
                    toggleFavorite={toggleFavorite}
                    isFavorite={isFavorite}
                />
            ))}
        </View>
    );
}

export function GridCard({ product, openProduct, toggleFavorite, isFavorite }: any) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Animation Handlers
    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 1.05,
            useNativeDriver: true,
            friction: 5,
            tension: 40
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleAnim, {
            toValue: 1,
            useNativeDriver: true,
            friction: 5,
            tension: 40
        }).start();
    };

    const handlePress = () => {
        // Slight delay to let the "pop" be seen before opening
        setTimeout(() => {
            openProduct(product);
        }, 50);
    };

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            style={{ width: '48%', marginBottom: 16 }}
        >
            <Animated.View
                className="bg-white rounded-lg shadow-md pb-2"
                style={{
                    transform: [{ scale: scaleAnim }],
                }}
            >
                <View className="h-48 w-full rounded-t-lg overflow-hidden bg-gray-100 relative">
                    <Image
                        source={product.image}
                        style={{ width: '100%', height: '100%' }}
                        contentFit="cover"
                        transition={200}
                        cachePolicy="disk"
                        allowDownscaling={true}
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
                        ₹ {product.price}.00
                    </Text>
                </View>
            </Animated.View>
        </Pressable>
    );
}

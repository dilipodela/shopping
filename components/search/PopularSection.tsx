import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useFavorites } from '../../context/FavoritesContext';
import { useProductDetail } from '../../context/ProductDetailContext';
import { PRODUCTS } from '../../data/products';

export default function PopularSection() {
    const { toggleFavorite, isFavorite } = useFavorites();
    const { openProduct } = useProductDetail();
    const router = useRouter(); // Initialize router
    // Filter for "Popular" items
    const popularItems = PRODUCTS.filter(p => p.isNew);

    return (
        <View className="mt-4">
            {/* Header */}
            <View className="flex-row justify-between items-center mb-4 px-4">
                <Text className="text-lg font-bold text-gray-900">Popular this week</Text>
                <TouchableOpacity onPress={() => router.push('/popular-items')}>
                    <Text className="text-orange-500 font-medium text-sm">View all</Text>
                </TouchableOpacity>
            </View>

            {/* Horizontal Scroll List */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 20 }}
            >
                {popularItems.map((item) => (
                    <PopularCard
                        key={item.id}
                        item={item}
                        openProduct={openProduct}
                        toggleFavorite={toggleFavorite}
                        isFavorite={isFavorite}
                    />
                ))}
            </ScrollView>
        </View>
    );
}

function PopularCard({ item, openProduct, toggleFavorite, isFavorite }: any) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    // Animation Handlers
    const handlePressIn = () => {
        Animated.spring(scaleAnim, {
            toValue: 0.95,
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
        setTimeout(() => {
            openProduct(item);
        }, 50);
    };

    return (
        <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={handlePress}
            style={{ marginRight: 16 }}
        >
            <Animated.View
                className="bg-white rounded-2xl shadow-sm border border-gray-100 w-64 pb-3"
                style={{
                    transform: [{ scale: scaleAnim }],
                }}
            >
                <View className="h-40 w-full rounded-t-2xl overflow-hidden bg-gray-50 relative">
                    <Image
                        source={typeof item.image === 'string' ? { uri: item.image } : item.image}
                        className="w-full h-full"
                        resizeMode="contain"
                    />
                    <View className="absolute top-3 left-3 bg-black/80 px-2 py-1 rounded-md">
                        <Text className="text-[10px] font-bold text-white tracking-widest">NEW</Text>
                    </View>
                    <TouchableOpacity
                        className="absolute top-3 right-3 bg-white p-1.5 rounded-full shadow-sm"
                        onPress={() => toggleFavorite(item.id)}
                    >
                        <Ionicons
                            name={isFavorite(item.id) ? "heart" : "heart-outline"}
                            size={16}
                            color={isFavorite(item.id) ? "#EF4444" : "#000"}
                        />
                    </TouchableOpacity>
                </View>

                <View className="px-3 pt-3">
                    <Text className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-1">{item.brand}</Text>
                    <Text className="text-gray-900 font-bold text-base leading-5 mb-1" numberOfLines={1}>{item.name}</Text>

                    <View className="flex-row items-center mb-2">
                        <Ionicons name="star" size={14} color="#F59E0B" />
                        <Text className="text-gray-600 text-xs font-bold ml-1">{item.rating} (120 reviews)</Text>
                    </View>

                    <View className="flex-row items-center justify-between mt-1">
                        <Text className="text-gray-900 font-extrabold text-lg">
                            ₹{item.price}
                        </Text>
                        <View className="bg-gray-100 p-1.5 rounded-full">
                            <Ionicons name="add" size={16} color="black" />
                        </View>
                    </View>
                </View>
            </Animated.View>
        </Pressable>
    );
}

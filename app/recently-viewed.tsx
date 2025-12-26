import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GridCard } from '../components/home/ProductGrid';
import { useFavorites } from '../context/FavoritesContext';
import { useProductDetail } from '../context/ProductDetailContext';
import { useUserActivity } from '../context/UserActivityContext';

export default function RecentlyViewed() {
    const { recentlyViewed } = useUserActivity();
    const { openProduct } = useProductDetail();
    const { toggleFavorite, isFavorite } = useFavorites();
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const renderHeader = () => (
        <View style={{ paddingTop: insets.top }} className="bg-white px-4 pb-4 border-b border-gray-100 mb-2">
            <View className="flex-row items-center mt-2 relative">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute left-0 z-10 p-2 -ml-2 rounded-full active:bg-gray-100"
                >
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <View className="flex-1 items-center">
                    <Text className="text-xl font-bold text-gray-900">Recently Viewed</Text>
                </View>
            </View>
        </View>
    );

    return (
        <View className="flex-1 bg-white">
            {renderHeader()}

            {recentlyViewed.length === 0 ? (
                <View className="flex-1 items-center justify-center p-8">
                    <View className="w-20 h-20 bg-gray-50 rounded-full items-center justify-center mb-4">
                        <Ionicons name="time-outline" size={40} color="#9CA3AF" />
                    </View>
                    <Text className="text-xl font-bold text-gray-900 mb-2">No History</Text>
                    <Text className="text-gray-500 text-center leading-6">
                        Products you view will will be saved here automatically.
                    </Text>
                </View>
            ) : (
                <FlatList
                    data={recentlyViewed}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
                    contentContainerStyle={{ paddingBottom: 40, paddingTop: 12 }}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <GridCard
                            product={item}
                            openProduct={openProduct}
                            toggleFavorite={toggleFavorite}
                            isFavorite={isFavorite}
                        />
                    )}
                />
            )}
        </View>
    );
}

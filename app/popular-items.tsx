import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { FlatList, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { GridCard } from '../components/home/ProductGrid'; // Import GridCard directly
import FilterDrawer from '../components/search/FilterDrawer';
import { useFavorites } from '../context/FavoritesContext';
import { useProductDetail } from '../context/ProductDetailContext';
import { PRODUCTS } from '../data/products';

type SortOption = 'new' | 'price-asc' | 'price-desc' | 'rating';

export default function PopularItemsScreen() {
    const router = useRouter();
    const [sortOption, setSortOption] = useState<SortOption>('new');
    const [isFilterVisible, setFilterVisible] = useState(false);

    const [filters, setFilters] = useState<any>({
        priceRange: [0, 10000],
        selectedCategory: 'All',
        selectedRating: null,
        selectedColor: null
    });

    const { toggleFavorite, isFavorite } = useFavorites();
    const { openProduct } = useProductDetail();

    // 1. Filter only "New" items (Popular)
    // 2. Apply Custom Filters
    // 3. Apply Sorting
    const sortedProducts = useMemo(() => {
        let items = PRODUCTS.filter(p => p.isNew);

        // Apply Price Range
        if (filters.priceRange) {
            items = items.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
        }

        // Apply Category
        if (filters.selectedCategory && filters.selectedCategory !== 'All') {
            items = items.filter(p => p.category === filters.selectedCategory);
        }

        // Apply Rating
        if (filters.selectedRating) {
            items = items.filter(p => p.rating >= filters.selectedRating);
        }

        let result = items;
        switch (sortOption) {
            case 'price-asc':
                result = items.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result = items.sort((a, b) => b.price - a.price);
                break;
            case 'rating':
                result = items.sort((a, b) => b.rating - a.rating);
                break;
            case 'new':
            default:
                // Assuming ID order implies newness locally, or just keep original order
                result = items.sort((a, b) => b.id - a.id);
                break;
        }
        console.log(`Sorted ${result.length} items. Top item price: ${result.length > 0 ? result[0].price : 'N/A'}`);
        return result;
    }, [sortOption, filters]);

    // Component for Header and Sort Bar to usage in FlatList
    const ListHeader = () => (
        <View className="bg-white z-10">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 pt-12 pb-4 border-b border-gray-100">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Popular Items</Text>
                <TouchableOpacity onPress={() => setFilterVisible(true)} className="p-2 -mr-2">
                    <Ionicons name="options-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Sort Bar */}
            <View className="flex-row px-4 py-3 border-b border-gray-100 mb-4">
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    <SortButton
                        label="Newest"
                        active={sortOption === 'new'}
                        onPress={() => setSortOption('new')}
                    />
                    <SortButton
                        label="Price: Low to High"
                        active={sortOption === 'price-asc'}
                        onPress={() => setSortOption('price-asc')}
                        icon="arrow-up"
                    />
                    <SortButton
                        label="Price: High to Low"
                        active={sortOption === 'price-desc'}
                        onPress={() => setSortOption('price-desc')}
                        icon="arrow-down"
                    />
                    <SortButton
                        label="Top Rated"
                        active={sortOption === 'rating'}
                        onPress={() => setSortOption('rating')}
                        icon="star"
                    />
                </ScrollView>
            </View>
        </View>
    );

    const handleApplyFilters = (filters: any) => {
        console.log("Filters applied:", filters);
        if (filters.sortOption) {
            setSortOption(filters.sortOption);
        }
        setFilterVisible(false);
    };

    // ... (rest of ListHeader)

    return (
        <View className="flex-1 bg-white">
            <FlatList
                // ... (FlatList props)
                data={sortedProducts}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={ListHeader}

                /* Optimization Props */
                initialNumToRender={6}
                maxToRenderPerBatch={4}
                windowSize={3}
                removeClippedSubviews={false} // Stability fix

                contentContainerStyle={{ paddingBottom: 24 }}
                renderItem={({ item }) => (
                    <GridCard
                        product={item}
                        openProduct={openProduct}
                        toggleFavorite={toggleFavorite}
                        isFavorite={isFavorite}
                    />
                )}
                ListEmptyComponent={() => (
                    <View className="flex-1 items-center justify-center py-20">
                        <Ionicons name="search-outline" size={48} color="#D1D5DB" />
                        <Text className="text-gray-500 text-lg font-medium mt-4">No items found</Text>
                        <Text className="text-gray-400 text-sm mt-1 text-center px-8">
                            Try adjusting your filters or price range to see more results.
                        </Text>
                    </View>
                )}
            />

            <FilterDrawer
                visible={isFilterVisible}
                onClose={() => setFilterVisible(false)}
                onApply={handleApplyFilters}
                currentSort={sortOption}
                initialFilters={filters}
            />
        </View>
    );
}

function SortButton({ label, active, onPress, icon }: { label: string, active: boolean, onPress: () => void, icon?: any }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            className={`flex-row items-center px-4 py-2 rounded-full mr-3 border ${active ? 'bg-black border-black' : 'bg-white border-gray-200'}`}
        >
            <Text className={`font-medium text-xs ${active ? 'text-white' : 'text-gray-700'}`}>
                {label}
            </Text>
            {icon && (
                <Ionicons
                    name={icon}
                    size={12}
                    color={active ? 'white' : 'gray'}
                    style={{ marginLeft: 4 }}
                />
            )}
        </TouchableOpacity>
    );
}

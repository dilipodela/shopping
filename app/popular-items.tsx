import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useMemo, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import ProductGrid from '../components/home/ProductGrid';
import FilterDrawer from '../components/search/FilterDrawer';
import { PRODUCTS } from '../data/products';

type SortOption = 'new' | 'price-asc' | 'price-desc' | 'rating';

export default function PopularItemsScreen() {
    const router = useRouter();
    const [sortOption, setSortOption] = useState<SortOption>('new');
    const [isFilterVisible, setFilterVisible] = useState(false);

    // 1. Filter only "New" items (Popular)
    // 2. Apply Sorting
    const sortedProducts = useMemo(() => {
        let items = PRODUCTS.filter(p => p.isNew);

        switch (sortOption) {
            case 'price-asc':
                return items.sort((a, b) => a.price - b.price);
            case 'price-desc':
                return items.sort((a, b) => b.price - a.price);
            case 'rating':
                return items.sort((a, b) => b.rating - a.rating);
            case 'new':
            default:
                // Assuming ID order implies newness locally, or just keep original order
                return items.sort((a, b) => b.id - a.id);
        }
    }, [sortOption]);

    const handleApplyFilters = (filters: any) => {
        console.log("Filters applied:", filters);
        setFilterVisible(false);
    };

    return (
        <View className="flex-1 bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-4 pt-12 pb-4 bg-white border-b border-gray-100 z-10">
                <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text className="text-lg font-bold text-gray-900">Popular Items</Text>
                <TouchableOpacity onPress={() => setFilterVisible(true)} className="p-2 -mr-2">
                    <Ionicons name="options-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>

            {/* Sort Bar */}
            <View className="flex-row px-4 py-3 bg-white border-b border-gray-100">
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

            {/* Content */}
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 16 }}>
                <ProductGrid products={sortedProducts} />
            </ScrollView>

            <FilterDrawer
                visible={isFilterVisible}
                onClose={() => setFilterVisible(false)}
                onApply={handleApplyFilters}
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

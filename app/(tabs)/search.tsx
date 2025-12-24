import React, { useMemo, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import ProductGrid from '../../components/home/ProductGrid'; // Import ProductGrid
import FilterDrawer from '../../components/search/FilterDrawer';
import PopularSection from '../../components/search/PopularSection';
import SearchHeader from '../../components/search/SearchHeader';
import { PRODUCTS } from '../../data/products'; // Import Data

export default function SearchScreen() {
    const [isFilterVisible, setFilterVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeFilters, setActiveFilters] = useState<any>(null);

    const handleApplyFilters = (filters: any) => {
        setActiveFilters(filters);
    };

    const handleSearch = (text: string) => {
        setSearchQuery(text);
    };

    // Filter Logic
    const filteredProducts = useMemo(() => {
        let result = PRODUCTS;

        // 1. Text Search
        if (searchQuery) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter(p =>
                p.name.toLowerCase().includes(lowerQuery) ||
                p.brand.toLowerCase().includes(lowerQuery) ||
                (p.category && p.category.toLowerCase().includes(lowerQuery))
            );
        }

        // 2. Advanced Filters
        if (activeFilters) {
            // Category
            if (activeFilters.selectedCategory && activeFilters.selectedCategory !== 'All') {
                result = result.filter(p => p.category === activeFilters.selectedCategory);
            }

            // Price Range
            if (activeFilters.priceRange) {
                const [min, max] = activeFilters.priceRange;
                result = result.filter(p => p.price >= min && p.price <= max);
            }

            // Rating
            if (activeFilters.selectedRating) {
                result = result.filter(p => p.rating >= activeFilters.selectedRating);
            }

            // Color (Heuristic based on name/category for now as color isn't a dedicated field in PRODUCTS interface)
            if (activeFilters.selectedColor) {
                const color = activeFilters.selectedColor.toLowerCase();
                result = result.filter(p =>
                    p.name.toLowerCase().includes(color) ||
                    (p.category && p.category.toLowerCase().includes(color))
                );
            }
        }

        return result;
    }, [searchQuery, activeFilters]);

    const isSearchingOrFiltering = searchQuery.length > 0 || (activeFilters && (
        activeFilters.selectedCategory !== 'All' ||
        activeFilters.priceRange[0] > 0 ||
        activeFilters.priceRange[1] < 5000 || // Assuming max default is 5000
        activeFilters.selectedRating !== null ||
        activeFilters.selectedColor !== null
    ));

    return (
        <View className="flex-1 bg-white relative">
            <SearchHeader
                onFilterPress={() => setFilterVisible(true)}
                onSearch={handleSearch}
            />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                {!isSearchingOrFiltering ? (
                    <PopularSection />
                ) : (
                    <View className="pt-4">
                        <View className="px-4 mb-4 flex-row justify-between items-center">
                            <Text className="text-gray-900 font-bold text-lg">
                                {filteredProducts.length} Results Found
                            </Text>
                            {/* Optional: Add clear filters button here if needed */}
                        </View>

                        {filteredProducts.length > 0 ? (
                            <ProductGrid products={filteredProducts} />
                        ) : (
                            <View className="items-center justify-center py-20">
                                <Text className="text-gray-400 text-base">No products found matching your criteria.</Text>
                            </View>
                        )}
                    </View>
                )}
            </ScrollView>

            <FilterDrawer
                visible={isFilterVisible}
                onClose={() => setFilterVisible(false)}
                onApply={handleApplyFilters}
            />
        </View>
    );
}

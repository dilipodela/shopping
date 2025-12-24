import React, { useState } from 'react';
import { ScrollView, View } from 'react-native';
import FilterDrawer from '../../components/search/FilterDrawer';
import PopularSection from '../../components/search/PopularSection';
import SearchHeader from '../../components/search/SearchHeader';

export default function SearchScreen() {
    const [isFilterVisible, setFilterVisible] = useState(false);

    const handleApplyFilters = (filters: any) => {
        console.log('Filters applied:', filters);
        // Logic to filter products would go here
    };

    return (
        <View className="flex-1 bg-white relative">
            <SearchHeader onFilterPress={() => setFilterVisible(true)} />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                <PopularSection />
            </ScrollView>

            <FilterDrawer
                visible={isFilterVisible}
                onClose={() => setFilterVisible(false)}
                onApply={handleApplyFilters}
            />
        </View>
    );
}

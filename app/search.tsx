import React from 'react';
import { ScrollView, View } from 'react-native';
import BottomNavBar from '../components/home/BottomNavBar'; // Reusing nav for now
import PopularSection from '../components/search/PopularSection';
import SearchHeader from '../components/search/SearchHeader';

export default function SearchScreen() {
    return (
        <View className="flex-1 bg-white relative">
            <SearchHeader />

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
                <PopularSection />
            </ScrollView>

            {/* Reusing BottomNavBar - ideally this should handle props to highlight 'Search' */}
            <BottomNavBar activeTab="Search" />
        </View>
    );
}

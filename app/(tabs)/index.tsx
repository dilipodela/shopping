import React from 'react';
import { ScrollView, View } from 'react-native';
// BottomNavBar removed
import MiniCartBar from '../../components/bag/MiniCartBar';
import CategoryList from '../../components/home/CategoryList';
import HomeHeader from '../../components/home/HomeHeader';
import ProductGrid from '../../components/home/ProductGrid';
import PromoBanner from '../../components/home/PromoBanner';

export default function Index() {
  return (
    <View className="flex-1 bg-white relative">
      {/* Static Header */}
      <HomeHeader />

      {/* Main Scrollable Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 80 }}>
        <CategoryList />
        <PromoBanner />
        <ProductGrid />
      </ScrollView>

      <MiniCartBar />
    </View>
  );
}

import { useRef, useState } from 'react';
import { Animated, View } from 'react-native';

import MiniCartBar from '../../components/bag/MiniCartBar';
import CategoryList from '../../components/home/CategoryList';
import HomeHeader from '../../components/home/HomeHeader';
import { GridCard } from '../../components/home/ProductGrid';
import PromoBanner from '../../components/home/PromoBanner';
import { useFavorites } from '../../context/FavoritesContext';
import { useProductDetail } from '../../context/ProductDetailContext';
import { PRODUCTS } from '../../data/products';

export default function Index() {
  const scrollY = useRef(new Animated.Value(0)).current;
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const { toggleFavorite, isFavorite } = useFavorites();
  const { openProduct } = useProductDetail();

  const diffClamp = Animated.diffClamp(scrollY, 0, 100);
  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 200],
    extrapolate: 'clamp',
  });

  const filteredProducts = selectedCategory
    ? PRODUCTS.filter(p => p.category === selectedCategory)
    : PRODUCTS;

  const renderHeader = () => (
    <View>
      <CategoryList selectedCategory={selectedCategory} onSelectCategory={setSelectedCategory} />
      <PromoBanner />
    </View>
  );

  return (
    <View className="flex-1 bg-white relative">
      <HomeHeader />

      <Animated.FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between', paddingHorizontal: 16 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}

        /* Optimization Props */
        initialNumToRender={6}      // Only render visible items initially
        maxToRenderPerBatch={4}     // Batch small chunks
        windowSize={3}              // Keep only 1 screen above and 1 screen below in memory (Crucial for iOS)
        removeClippedSubviews={false} // Stability fix: prevent crashes during interaction

        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <GridCard
            product={item}
            openProduct={openProduct}
            toggleFavorite={toggleFavorite}
            isFavorite={isFavorite}
          />
        )}
      />

      <Animated.View
        className="absolute bottom-[85px] left-4 right-4 z-50"
        style={{
          transform: [{ translateY: translateY }],
        }}
      >
        <MiniCartBar />
      </Animated.View>
    </View>
  );
}

import React, { useRef } from 'react';
import { Animated, View } from 'react-native';
// BottomNavBar removed
import MiniCartBar from '../../components/bag/MiniCartBar';
import CategoryList from '../../components/home/CategoryList';
import HomeHeader from '../../components/home/HomeHeader';
import ProductGrid from '../../components/home/ProductGrid';
import PromoBanner from '../../components/home/PromoBanner';

export default function Index() {
  // 1. Track Scroll Position
  const scrollY = useRef(new Animated.Value(0)).current;

  // 2. Clone ScrollY but clamp the *change* (diff) between 0 and 100
  // interacting with scroll down pushes it to 100 (hidden)
  // interacting with scroll up pushes it to 0 (visible)
  const diffClamp = Animated.diffClamp(scrollY, 0, 100);

  // 3. Interpolate ensuring we map the 0-100 range significantly
  const translateY = diffClamp.interpolate({
    inputRange: [0, 100],
    outputRange: [0, 200], // Translate 200px down when clamped value is at max
    extrapolate: 'clamp',
  });

  return (
    <View className="flex-1 bg-white relative">
      {/* Static Header */}
      <HomeHeader />

      {/* Main Scrollable Content */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        // 4. Drive scrollY directly from native scroll event
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      >
        <CategoryList />
        <PromoBanner />
        <ProductGrid />
      </Animated.ScrollView>

      {/* Animated Mini Cart Bar */}
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

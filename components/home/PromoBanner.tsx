import React, { useState } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';

const { width } = Dimensions.get('window');
const GAP = 12; // Gap between banners
const ITEM_WIDTH = width - 32; // Screen width - 32px padding
const SNAP_INTERVAL = ITEM_WIDTH + GAP;

const images = [
    require('../../assets/images/banner1.jpg'),
    require('../../assets/images/banner2.jpg'),
    require('../../assets/images/banner3.jpg'),
    require('../../assets/images/banner4.jpg'),
];

export default function PromoBanner() {
    const [active, setActive] = useState(0);

    const onScroll = ({ nativeEvent }: any) => {
        const slide = Math.round(nativeEvent.contentOffset.x / SNAP_INTERVAL);
        if (slide !== active) {
            setActive(slide);
        }
    };

    return (
        <View className="mb-6">
            <View className="h-48 relative mx-4">
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    onScroll={onScroll}
                    scrollEventThrottle={16}
                    decelerationRate="fast"
                    snapToInterval={SNAP_INTERVAL}
                    bounces={false}
                    className="w-full h-full"
                    contentContainerStyle={{ paddingRight: 32 }}
                >
                    {images.map((img, index) => (
                        <View
                            key={index}
                            style={{ width: ITEM_WIDTH, marginRight: index === images.length - 1 ? 0 : GAP }}
                            className="h-full rounded-xl overflow-hidden relative"
                        >
                            <Image
                                source={img}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                    ))}
                </ScrollView>

                {/* Pagination Dots */}
                <View className="absolute bottom-3 w-full flex-row justify-center items-center space-x-2 pointer-events-none">
                    {images.map((_, i) => (
                        <View
                            key={i}
                            className={`h-1.5 rounded-full transition-all duration-300 shadow-sm ${i === active ? 'w-5 bg-white' : 'w-1.5 bg-white/50'
                                }`}
                        />
                    ))}
                </View>
            </View>
        </View>
    );
}

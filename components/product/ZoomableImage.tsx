import { Image } from 'expo-image';
import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface ZoomableImageProps {
    uri: string | any;
}

export default function ZoomableImage({ uri }: ZoomableImageProps) {
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const pinch = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
        })
        .onEnd(() => {
            if (scale.value < 1) {
                scale.value = withTiming(1);
                savedScale.value = 1;
            } else {
                savedScale.value = scale.value;
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }],
    }));

    return (
        <GestureDetector gesture={pinch}>
            <AnimatedImage
                source={typeof uri === 'string' ? { uri } : uri}
                style={[styles.image, animatedStyle]}
                contentFit="contain"
                cachePolicy="disk"
                allowDownscaling={true}
            />
        </GestureDetector>
    );
}

const styles = StyleSheet.create({
    image: {
        width: width,
        height: height,
    },
});

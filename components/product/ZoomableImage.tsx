import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

const AnimatedImage = Animated.createAnimatedComponent(Image);

interface ZoomableImageProps {
    uri: string | any;
}

export default function ZoomableImage({ uri }: ZoomableImageProps) {
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);
    const translateX = useSharedValue(0);
    const savedTranslateX = useSharedValue(0);
    const translateY = useSharedValue(0);
    const savedTranslateY = useSharedValue(0);

    const [isZoomed, setIsZoomed] = useState(false);
    const isZoomedSV = useSharedValue(false);

    const pinch = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = savedScale.value * e.scale;
            if (scale.value > 1.05 && !isZoomedSV.value) {
                isZoomedSV.value = true;
                runOnJS(setIsZoomed)(true);
            }
        })
        .onEnd(() => {
            if (scale.value < 1.05) {
                scale.value = withTiming(1);
                savedScale.value = 1;
                translateX.value = withTiming(0);
                savedTranslateX.value = 0;
                translateY.value = withTiming(0);
                savedTranslateY.value = 0;
                isZoomedSV.value = false;
                runOnJS(setIsZoomed)(false);
            } else {
                savedScale.value = scale.value;
            }
        });

    const pan = Gesture.Pan()
        .enabled(isZoomed)
        .averageTouches(true)
        .onUpdate((e) => {
            if (scale.value > 1) {
                translateX.value = savedTranslateX.value + e.translationX;
                translateY.value = savedTranslateY.value + e.translationY;
            }
        })
        .onEnd(() => {
            if (scale.value > 1) {
                savedTranslateX.value = translateX.value;
                savedTranslateY.value = translateY.value;
            }
        });

    const composed = Gesture.Simultaneous(pinch, pan);

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [
            { translateX: translateX.value },
            { translateY: translateY.value },
            { scale: scale.value }
        ],
    }));

    return (
        <GestureDetector gesture={composed}>
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

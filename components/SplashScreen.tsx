import React, { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

interface SplashScreenProps {
    onFinish: () => void;
}

export default function SplashScreen({ onFinish }: SplashScreenProps) {
    const fadeAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        // Wait for 2 seconds, then fade out
        const timer = setTimeout(() => {
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000, // Smooth fade out over 1 second
                useNativeDriver: true,
            }).start(({ finished }) => {
                if (finished) {
                    onFinish();
                }
            });
        }, 2000);

        return () => clearTimeout(timer);
    }, [fadeAnim, onFinish]);

    return (
        <Animated.View
            style={[styles.container, { opacity: fadeAnim }]}
            pointerEvents="none" // Allow touches to pass through during fade if needed, though usually we block interaction until done. Actually "auto" is better until it's gone, but here we are unmounting it after onFinish.
        >
            <View className="flex-1 bg-white items-center justify-center">
                <Image
                    source={require('../assets/images/app1.png')}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </View>
        </Animated.View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject, // Position absolute, covering the whole screen
        zIndex: 50, // Ensure it's on top
        backgroundColor: 'white', // Ensure background prevents seeing through before fade
    },
});

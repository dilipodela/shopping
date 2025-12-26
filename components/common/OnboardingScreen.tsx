import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Image } from 'expo-image';
import React, { useRef, useState } from 'react';
import { Animated, Dimensions, FlatList, KeyboardAvoidingView, Platform, StatusBar, Text, TextInput, TouchableOpacity, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const SLIDES = [
    {
        id: '1',
        type: 'info',
        title: 'Fashion Meets Future',
        description: 'Experience the next generation of shopping. Create your 3D digital twin, try on outfits virtually, and discover premium styles curated just for you.',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800&auto=format&fit=crop', // Fashion
    },
    {
        id: '2',
        type: 'login',
        title: 'Unlock Your Style',
        description: 'Sign in to save your wardrobe and access exclusive collections.',
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop', // Abstract 3D
    },
    {
        id: '3',
        type: 'avatar',
        title: 'Digital You',
        description: 'Ready to step into the multiverse? Create your lifelike 3D avatar now.',
        image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop', // Abstract/Techy
    },
];

interface OnboardingProps {
    onFinish: () => void;
}

const Indicator = ({ scrollX }: { scrollX: Animated.Value }) => {
    return (
        <View className="flex-row justify-center space-x-2 absolute bottom-24 w-full">
            {SLIDES.map((_, i) => {
                const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                const scale = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.8, 1.2, 0.8],
                    extrapolate: 'clamp',
                });
                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.4, 1, 0.4],
                    extrapolate: 'clamp',
                });
                return (
                    <Animated.View
                        key={`indicator-${i}`}
                        style={{ transform: [{ scale }], opacity }}
                        className="h-2 w-2 rounded-full bg-white block"
                    />
                );
            })}
        </View>
    );
};

export default function OnboardingScreen({ onFinish }: OnboardingProps) {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList>(null);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Login State
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleNext = async () => {
        if (currentIndex < SLIDES.length - 1) {
            flatListRef.current?.scrollToIndex({
                index: currentIndex + 1,
                animated: true,
            });
        } else {
            finishOnboarding();
        }
    };

    const finishOnboarding = async () => {
        try {
            await AsyncStorage.setItem('hasSeenOnboarding', 'true');
            onFinish();
        } catch (e) {
            console.error('Failed to save onboarding status', e);
            onFinish(); // Proceed anyway
        }
    };

    const renderLoginForm = () => (
        <View className="w-full px-8 mt-4">
            <View className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <TextInput
                    placeholder="Email Address"
                    placeholderTextColor="#A1A1AA"
                    value={email}
                    onChangeText={setEmail}
                    className="bg-black/30 text-white p-4 rounded-xl mb-3 border border-white/10"
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Password"
                    placeholderTextColor="#A1A1AA"
                    value={password}
                    onChangeText={setPassword}
                    className="bg-black/30 text-white p-4 rounded-xl mb-4 border border-white/10"
                    secureTextEntry
                />

                <TouchableOpacity
                    className="bg-white py-4 rounded-xl items-center mb-3"
                    onPress={handleNext}
                >
                    <Text className="text-black font-bold text-lg">Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    className="flex-row items-center justify-center bg-white py-4 rounded-xl space-x-2"
                    onPress={handleNext}
                >
                    <Ionicons name="logo-google" size={20} color="black" />
                    <Text className="text-black font-bold text-lg">Continue with Google</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderAvatarAction = () => (
        <View className="w-full px-8 mt-4">
            <View className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 items-center">
                <View className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
                    <Ionicons name="person" size={40} color="white" />
                </View>

                <TouchableOpacity
                    className="bg-white w-full py-4 rounded-xl items-center mb-3 shadow-lg shadow-white/20"
                    onPress={finishOnboarding}
                >
                    <Text className="text-black font-bold text-lg">Initialize Avatar</Text>
                </TouchableOpacity>

                <Text className="text-gray-400 text-xs text-center">
                    Powered by AI. Create your realistic digital twin in seconds.
                </Text>
            </View>
        </View>
    );

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            className="flex-1 bg-black"
        >
            <StatusBar barStyle="light-content" />



            <Animated.FlatList
                ref={flatListRef}
                data={SLIDES}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                bounces={false}
                scrollEnabled={true}
                keyboardShouldPersistTaps="handled"
                keyExtractor={(item) => item.id}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={useRef(({ viewableItems }: any) => {
                    if (viewableItems[0]) {
                        setCurrentIndex(viewableItems[0].index);
                    }
                }).current}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                renderItem={({ item }) => (
                    <View style={{ width, height }} className="items-center justify-center relative">
                        <Image
                            source={{ uri: item.image }}
                            style={{ width, height, position: 'absolute' }}
                            contentFit="cover"
                            transition={500}
                        />
                        <View className="absolute inset-0 bg-black/60" />

                        <View className="w-full items-center z-10 -mt-20">
                            <Text className="text-white text-4xl font-extrabold text-center mb-2 tracking-wider px-4">
                                {item.title}
                            </Text>
                            <Text className="text-gray-300 text-sm text-center leading-5 mb-8 px-8 max-w-sm">
                                {item.description}
                            </Text>

                            {item.type === 'login' && renderLoginForm()}
                            {item.type === 'avatar' && renderAvatarAction()}
                        </View>
                    </View>
                )}
            />

            <Indicator scrollX={scrollX} />

            {/* Skip Button - Visible only on last slide (Moved to Bottom Right for Visibility) */}
            {currentIndex === SLIDES.length - 1 && (
                <TouchableOpacity
                    className="absolute bottom-10 right-8 px-6 py-3 rounded-full bg-white border border-white/20 shadow-xl"
                    style={{ elevation: 50, zIndex: 999 }}
                    onPress={finishOnboarding}
                    activeOpacity={0.8}
                >
                    <Text className="text-black font-bold tracking-wide text-sm">Skip</Text>
                </TouchableOpacity>
            )}

            {/* Small Next Button (Hide on Login/Avatar slides if using their own buttons) */}
            {currentIndex === 0 && (
                <TouchableOpacity
                    onPress={handleNext}
                    className="absolute bottom-10 right-8 bg-white/20 backdrop-blur-md w-12 h-12 rounded-full items-center justify-center border border-white/30"
                    activeOpacity={0.8}
                >
                    <Ionicons name="arrow-forward" size={20} color="white" />
                </TouchableOpacity>
            )}
        </KeyboardAvoidingView>
    );
}

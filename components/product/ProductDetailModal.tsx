import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, BackHandler, Dimensions, Image, PanResponder, ScrollView, Share, Text, TouchableOpacity, View } from 'react-native';
import { useBag } from '../../context/BagContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useProductDetail } from '../../context/ProductDetailContext';

import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system/legacy';
const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const { width } = Dimensions.get('window');

import FullScreenImageViewer from './FullScreenImageViewer';

export default function ProductDetailModal() {
    const { selectedProduct, closeProduct } = useProductDetail();
    const { toggleFavorite, isFavorite } = useFavorites();
    const { addToBag, updateQuantity, getItemQuantity } = useBag();

    // State
    const [selectedSize, setSelectedSize] = useState('M');

    // Full Screen Image Viewer State
    const [isFullImageVisible, setIsFullImageVisible] = useState(false);
    const [initialImageIndex, setInitialImageIndex] = useState(0);

    // Success Popup State
    const [showSuccess, setShowSuccess] = useState(false);
    const successAnim = useRef(new Animated.Value(0)).current;

    // Carousel State
    const scrollX = useRef(new Animated.Value(0)).current;

    // Animation Values
    const slideAnim = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

    // Pan Responder for Drag to Dismiss
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: (_, gestureState) => {
                // Only allow dragging down
                return gestureState.dy > 0;
            },
            onPanResponderMove: (_, gestureState) => {
                // Only allow dragging down (positive dy)
                if (gestureState.dy > 0) {
                    slideAnim.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 150 || gestureState.vy > 0.5) {
                    // Dragged enough to close
                    closeProduct();
                } else {
                    // Spring back to open
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        useNativeDriver: true,
                        damping: 15,
                        mass: 1,
                        stiffness: 120,
                    }).start();
                }
            },
        })
    ).current;

    useEffect(() => {
        if (selectedProduct) {
            // Reset state
            setSelectedSize('M');
            setShowSuccess(false); // Reset success state

            // Slide Up with Smooth Spring
            slideAnim.setValue(SCREEN_HEIGHT);
            Animated.spring(slideAnim, {
                toValue: 0,
                useNativeDriver: true,
                damping: 18,
                mass: 1,
                stiffness: 120,
            }).start();

            // Handle Hardware Back Button
            const backAction = () => {
                closeProduct();
                return true; // Disable default behavior
            };

            const backHandler = BackHandler.addEventListener(
                "hardwareBackPress",
                backAction
            );

            return () => backHandler.remove();
        }
    }, [selectedProduct]);

    const handleImagePress = (index: number) => {
        setInitialImageIndex(index);
        setIsFullImageVisible(true);
    };

    const handleAddToBag = () => {
        if (!selectedProduct) return;
        addToBag(selectedProduct, selectedSize);

        // 1. Close Card First (Slide Down)
        Animated.timing(slideAnim, {
            toValue: SCREEN_HEIGHT,
            duration: 300,
            useNativeDriver: true,
        }).start(() => {
            // 2. Show Success Message
            setShowSuccess(true);
            Animated.sequence([
                Animated.spring(successAnim, {
                    toValue: 1,
                    useNativeDriver: true,
                    damping: 15,
                }),
                Animated.delay(800), // Wait for 1 second
                Animated.timing(successAnim, {
                    toValue: 0,
                    duration: 200,
                    useNativeDriver: true,
                })
            ]).start(() => {
                setShowSuccess(false);
                closeProduct();
            });
        });
    };

    const handleShare = async () => {
        if (!selectedProduct) return;

        const message = `Check out this ${selectedProduct.name} on Hello Gorgeous!\nPrice: ₹${selectedProduct.price}\n\nGet it here: https://hellogorgeous.app/product/${selectedProduct.id}`;

        try {
            let imageUri = null;

            if (typeof selectedProduct.image === 'string') {
                const extension = selectedProduct.image.split('.').pop()?.split('?')[0];
                // Ensure valid extension or default to jpg
                const validExt = ['jpg', 'jpeg', 'png'].includes(extension?.toLowerCase() || '') ? extension : 'jpg';
                const filename = `share_${selectedProduct.id}.${validExt}`;

                const fileUri = (FileSystem.cacheDirectory || FileSystem.documentDirectory) + filename;

                const { uri } = await FileSystem.downloadAsync(selectedProduct.image, fileUri);
                imageUri = uri;
            } else {
                const asset = Asset.fromModule(selectedProduct.image);
                await asset.downloadAsync();
                imageUri = asset.localUri || asset.uri;
            }

            if (imageUri) {
                // Try React Native Share first to support Text + Image
                await Share.share({
                    message: message,
                    url: imageUri, // iOS supports local file URI
                    title: `Share ${selectedProduct.name}`
                });
            } else {
                await Share.share({
                    message: message,
                    title: `Share ${selectedProduct.name}`
                });
            }
        } catch (error: any) {
            console.error("Sharing Error:", error);
            // Fallback
            await Share.share({
                message: message,
            });
        }
    };

    if (!selectedProduct) return null;

    return (
        <View
            className="absolute inset-0 z-50"
            pointerEvents="box-none"
        >
            <FullScreenImageViewer
                visible={isFullImageVisible}
                images={selectedProduct.images || [selectedProduct.image]}
                initialIndex={initialImageIndex}
                onClose={() => setIsFullImageVisible(false)}
            />

            <View className="flex-1 justify-end relative" pointerEvents="box-none">
                {/* Backdrop */}
                <Animated.View
                    className="absolute inset-0 bg-black"
                    pointerEvents={showSuccess ? 'none' : 'auto'}
                    style={{
                        opacity: slideAnim.interpolate({
                            inputRange: [0, SCREEN_HEIGHT],
                            outputRange: [0.5, 0],
                            extrapolate: 'clamp',
                        })
                    }}
                />

                {/* Dismiss Touch Area */}
                <TouchableOpacity
                    className="flex-1"
                    activeOpacity={1}
                    onPress={closeProduct}
                />

                {/* Main Modal Content */}
                <Animated.View
                    style={{
                        transform: [{ translateY: slideAnim }],
                        height: '80%',
                    }}
                    className="bg-white rounded-t-3xl overflow-hidden shadow-2xl absolute bottom-0 left-0 right-0"
                >
                    {/* Handle Bar */}
                    <View
                        {...panResponder.panHandlers}
                        className="items-center pt-4 pb-2 bg-white z-10 w-full"
                    >
                        <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
                    </View>

                    <ScrollView bounces={false}>
                        {/* Carousel */}
                        <View className="relative">
                            <ScrollView
                                horizontal
                                pagingEnabled
                                showsHorizontalScrollIndicator={false}
                                onScroll={Animated.event(
                                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                                    { useNativeDriver: false }
                                )}
                                scrollEventThrottle={16}
                                className="w-full h-96 bg-gray-100"
                            >
                                {(selectedProduct.images && selectedProduct.images.length > 0
                                    ? selectedProduct.images
                                    : [selectedProduct.image]
                                ).map((img, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        activeOpacity={0.9}
                                        onPress={() => handleImagePress(index)}
                                    >
                                        <View style={{ width: width, height: 384 }}>
                                            <Image
                                                source={typeof img === 'string' ? { uri: img } : img}
                                                className="w-full h-full"
                                                resizeMode="cover"
                                            />
                                        </View>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>

                            {/* Pagination Dots */}
                            {(selectedProduct.images && selectedProduct.images.length > 1) && (
                                <View className="absolute bottom-4 w-full flex-row justify-center items-center space-x-2">
                                    {selectedProduct.images.map((_, i) => {
                                        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
                                        const dotWidth = scrollX.interpolate({
                                            inputRange,
                                            outputRange: [6, 20, 6],
                                            extrapolate: 'clamp',
                                        });
                                        const opacity = scrollX.interpolate({
                                            inputRange,
                                            outputRange: [0.4, 1, 0.4],
                                            extrapolate: 'clamp',
                                        });
                                        return (
                                            <Animated.View
                                                key={i}
                                                style={{ width: dotWidth, opacity }}
                                                className="h-1.5 rounded-full bg-white mx-1"
                                            />
                                        );
                                    })}
                                </View>
                            )}


                            <View className="absolute top-4 right-4">
                                <TouchableOpacity
                                    className="bg-white/90 p-2 rounded-full shadow-sm"
                                    onPress={() => toggleFavorite(selectedProduct.id)}
                                >
                                    <Ionicons
                                        name={isFavorite(selectedProduct.id) ? "heart" : "heart-outline"}
                                        size={20}
                                        color={isFavorite(selectedProduct.id) ? "#EF4444" : "#000"}
                                    />
                                </TouchableOpacity>
                            </View>

                            <View className="absolute bottom-4 right-4">
                                <TouchableOpacity
                                    className="bg-white/90 p-2 rounded-full shadow-sm"
                                    onPress={handleShare}
                                >
                                    <Ionicons name="share-social-outline" size={20} color="#000" />
                                </TouchableOpacity>
                            </View>

                            <TouchableOpacity
                                className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow-sm"
                                onPress={closeProduct}
                            >
                                <Ionicons name="close" size={20} color="#000" />
                            </TouchableOpacity>
                        </View>

                        {/* Details */}
                        <View className="p-6 pb-32">

                            <View className="flex-row justify-between items-start mb-2">
                                <View>
                                    <Text className="text-gray-500 font-medium mb-1">{selectedProduct.brand}</Text>
                                    <Text className="text-2xl font-bold text-gray-900">{selectedProduct.name}</Text>
                                </View>
                                <View className="items-end">
                                    <View className="flex-row items-center bg-gray-100 px-2 py-1 rounded-lg">
                                        <Ionicons name="star" size={14} color="#F59E0B" />
                                        <Text className="ml-1 font-bold">{selectedProduct.rating}.0</Text>
                                    </View>
                                </View>
                            </View>

                            <Text className="text-3xl font-bold text-gray-900 mt-4 mb-6">
                                ₹ {selectedProduct.price}.00
                            </Text>

                            <Text className="text-gray-900 font-bold mb-2 text-lg">Description</Text>
                            <Text className="text-gray-500 leading-6 mb-6">
                                This {selectedProduct.name} from {selectedProduct.brand} is crafted with high-quality materials to ensure comfort and style. Perfect for any occasion.
                            </Text>

                            <Text className="text-gray-900 font-bold mb-3 text-lg">Select Size</Text>
                            <View className="flex-row mb-8">
                                {['S', 'M', 'L', 'XL'].map((size) => (
                                    <TouchableOpacity
                                        key={size}
                                        onPress={() => setSelectedSize(size)}
                                        className={`w-12 h-12 rounded-full border items-center justify-center mr-3 ${selectedSize === size ? 'bg-black border-black' : 'bg-white border-gray-300'}`}
                                    >
                                        <Text className={`font-bold ${selectedSize === size ? 'text-white' : 'text-gray-900'}`}>{size}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </ScrollView>

                    {/* Bottom Action Bar */}
                    <View className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 flex-row items-center pb-8 safe-bottom">
                        <View className="flex-1 mr-4">
                            <Text className="text-gray-500 text-xs">Total Price</Text>
                            <Text className="text-xl font-bold text-gray-900">₹ {selectedProduct.price * (getItemQuantity(selectedProduct.id, selectedSize) || 1)}</Text>
                        </View>

                        {getItemQuantity(selectedProduct.id, selectedSize) > 0 ? (
                            <View className="flex-2 flex-row items-center justify-between bg-gray-100 rounded-full px-2 py-2">
                                <TouchableOpacity
                                    onPress={() => updateQuantity(selectedProduct.id, selectedSize, getItemQuantity(selectedProduct.id, selectedSize) - 1)}
                                    className="w-12 h-12 bg-white rounded-full items-center justify-center shadow-sm"
                                >
                                    <Ionicons name="remove" size={24} color="black" />
                                </TouchableOpacity>

                                <Text className="text-xl font-bold text-gray-900 mx-6">
                                    {getItemQuantity(selectedProduct.id, selectedSize)}
                                </Text>

                                <TouchableOpacity
                                    onPress={() => updateQuantity(selectedProduct.id, selectedSize, getItemQuantity(selectedProduct.id, selectedSize) + 1)}
                                    className="w-12 h-12 bg-black rounded-full items-center justify-center shadow-sm"
                                >
                                    <Ionicons name="add" size={24} color="white" />
                                </TouchableOpacity>
                            </View>
                        ) : (
                            <TouchableOpacity
                                className="flex-2 bg-orange-500 px-8 py-4 rounded-full flex-row items-center justify-center shadow-lg shadow-orange-200"
                                onPress={handleAddToBag}
                            >
                                <Ionicons name="bag-handle" size={20} color="white" className="mr-2" />
                                <Text className="text-white font-bold text-lg ml-2">Add to Bag</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </Animated.View>
            </View>
        </View>
    );
}

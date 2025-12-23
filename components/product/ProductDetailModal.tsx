import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Image, Modal, PanResponder, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useBag } from '../../context/BagContext';
import { useFavorites } from '../../context/FavoritesContext';
import { useProductDetail } from '../../context/ProductDetailContext';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

export default function ProductDetailModal() {
    const { selectedProduct, closeProduct } = useProductDetail();
    const { toggleFavorite, isFavorite } = useFavorites();
    const { addToBag, updateQuantity, getItemQuantity } = useBag();

    // State
    const [selectedSize, setSelectedSize] = useState('M');

    // Success Popup State
    const [showSuccess, setShowSuccess] = useState(false);
    const successAnim = useRef(new Animated.Value(0)).current;

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
                damping: 15,
                mass: 1,
                stiffness: 120,
            }).start();
        }
    }, [selectedProduct]);

    const handleAddToBag = () => {
        if (!selectedProduct) return;
        addToBag(selectedProduct, selectedSize);

        // Show Success Animation
        setShowSuccess(true);
        Animated.sequence([
            Animated.spring(successAnim, {
                toValue: 1,
                useNativeDriver: true,
                damping: 15,
            }),
            Animated.delay(1500),
            Animated.timing(successAnim, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true,
            })
        ]).start(() => {
            setShowSuccess(false);
            closeProduct();
        });
    };

    if (!selectedProduct) return null;

    return (
        <Modal
            visible={!!selectedProduct}
            transparent
            animationType="none"
            onRequestClose={closeProduct}
        >
            <View className="flex-1 bg-black/50 justify-end relative">
                {/* Dismiss Touch Area */}
                <TouchableOpacity
                    className="flex-1"
                    activeOpacity={1}
                    onPress={closeProduct}
                />

                {/* Success Notification - Beautiful Popup */}
                {showSuccess && (
                    <Animated.View
                        className="absolute top-[10%] self-center bg-black/90 px-6 py-4 rounded-full z-50 flex-row items-center shadow-2xl"
                        style={{
                            opacity: successAnim,
                            transform: [{
                                translateY: successAnim.interpolate({
                                    inputRange: [0, 1],
                                    outputRange: [-20, 0]
                                })
                            }]
                        }}
                    >
                        <View className="bg-green-500 rounded-full p-1 mr-3">
                            <Ionicons name="checkmark" size={16} color="white" />
                        </View>
                        <View>
                            <Text className="text-white font-bold text-base">Added to Bag</Text>
                            <Text className="text-gray-300 text-xs">{selectedProduct.name} • Size {selectedSize}</Text>
                        </View>
                    </Animated.View>
                )}

                <Animated.View
                    style={{
                        transform: [{ translateY: slideAnim }],
                        height: '80%',
                    }}
                    className="bg-white rounded-t-3xl overflow-hidden shadow-2xl absolute bottom-0 left-0 right-0"
                >
                    {/* Handle Bar - Draggable Area */}
                    <View
                        {...panResponder.panHandlers}
                        className="items-center pt-4 pb-2 bg-white z-10 w-full"
                    >
                        <View className="w-12 h-1.5 bg-gray-300 rounded-full" />
                    </View>

                    <ScrollView bounces={false}>
                        {/* Huge Image */}
                        <View className="w-full h-96 bg-gray-100 relative">
                            <Image
                                source={typeof selectedProduct.image === 'string' ? { uri: selectedProduct.image } : selectedProduct.image}
                                className="w-full h-full"
                                resizeMode="cover"
                            />

                            <TouchableOpacity
                                className="absolute top-4 right-4 bg-white/90 p-3 rounded-full shadow-sm"
                                onPress={() => toggleFavorite(selectedProduct.id)}
                            >
                                <Ionicons
                                    name={isFavorite(selectedProduct.id) ? "heart" : "heart-outline"}
                                    size={24}
                                    color={isFavorite(selectedProduct.id) ? "#EF4444" : "#000"}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity
                                className="absolute top-4 left-4 bg-white/90 p-2 rounded-full shadow-sm"
                                onPress={closeProduct}
                            >
                                <Ionicons name="close" size={24} color="#000" />
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
                                QAR {selectedProduct.price}.00
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
                            <Text className="text-xl font-bold text-gray-900">QAR {selectedProduct.price * (getItemQuantity(selectedProduct.id, selectedSize) || 1)}</Text>
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
        </Modal>
    );
}

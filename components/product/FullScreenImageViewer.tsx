import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, BackHandler, Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import ZoomableImage from './ZoomableImage';

const { width, height } = Dimensions.get('window');

interface FullScreenImageViewerProps {
    visible: boolean;
    images: any[];
    initialIndex: number;
    onClose: () => void;
}

export default function FullScreenImageViewer({ visible, images, initialIndex, onClose }: FullScreenImageViewerProps) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const flatListRef = useRef<FlatList>(null);
    const scaleAnim = useRef(new Animated.Value(0)).current; // For opening animation (optional)

    useEffect(() => {
        if (visible) {
            setCurrentIndex(initialIndex);
            // Slight delay to scroll to index after layout
            setTimeout(() => {
                flatListRef.current?.scrollToIndex({ index: initialIndex, animated: false });
            }, 50);

            // Handle Back Button specifically for this modal
            const backAction = () => {
                onClose();
                return true; // Stop event bubbling
            };
            const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
            return () => backHandler.remove();
        }
    }, [visible, initialIndex]);

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const renderItem = ({ item }: { item: any }) => {
        return (
            <View style={{ width, height, justifyContent: 'center', alignItems: 'center' }}>
                <ZoomableImage uri={item} />
            </View>
        );
    };

    if (!visible) return null;

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="fade"
            onRequestClose={onClose}
        >
            <View style={styles.container}>
                {/* Close Button */}
                <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                >
                    <Ionicons name="close" size={28} color="white" />
                </TouchableOpacity>

                {/* Page Indicator */}
                <View style={styles.pageIndicator}>
                    <Text style={styles.pageText}>
                        {currentIndex + 1} / {images.length}
                    </Text>
                </View>

                {/* Main Gallery */}
                <FlatList
                    ref={flatListRef}
                    data={images}
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    renderItem={renderItem}
                    keyExtractor={(_, index) => index.toString()}
                    onViewableItemsChanged={onViewableItemsChanged}
                    viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
                    initialScrollIndex={initialIndex}
                    getItemLayout={(_, index) => ({
                        length: width,
                        offset: width * index,
                        index,
                    })}
                />
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 50,
        left: 20,
        zIndex: 50,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 20,
        padding: 8,
    },
    pageIndicator: {
        position: 'absolute',
        top: 50,
        alignSelf: 'center',
        zIndex: 50,
    },
    pageText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});

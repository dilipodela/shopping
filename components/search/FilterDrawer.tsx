import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Dimensions, Modal, PanResponder, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
const DRAWER_WIDTH = width * 0.85;

type SortOption = 'new' | 'price-asc' | 'price-desc' | 'rating';

interface FilterDrawerProps {
    visible: boolean;
    onClose: () => void;
    onApply: (filters: any) => void;
    currentSort: SortOption;
    initialFilters?: any;
}

export default function FilterDrawer({ visible, onClose, onApply, currentSort, initialFilters }: FilterDrawerProps) {
    const insets = useSafeAreaInsets();
    const slideAnim = useRef(new Animated.Value(-DRAWER_WIDTH)).current;
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Filter States
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]); // Default full range
    const [selectedColor, setSelectedColor] = useState<string | null>(null);
    const [selectedRating, setSelectedRating] = useState<number | null>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const [selectedSort, setSelectedSort] = useState<SortOption>(currentSort);

    useEffect(() => {
        if (visible) {
            setSelectedSort(currentSort);

            // Sync filters if provided
            if (initialFilters) {
                if (initialFilters.priceRange) setPriceRange(initialFilters.priceRange);
                if (initialFilters.selectedCategory) setSelectedCategory(initialFilters.selectedCategory);
                if (initialFilters.selectedRating) setSelectedRating(initialFilters.selectedRating);
                if (initialFilters.selectedColor) setSelectedColor(initialFilters.selectedColor);
            }
        }
    }, [visible, currentSort, initialFilters]);

    useEffect(() => {
        if (visible) {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 300,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0.5,
                    useNativeDriver: true,
                    duration: 300,
                }),
            ]).start();
        } else {
            Animated.parallel([
                Animated.timing(slideAnim, {
                    toValue: -DRAWER_WIDTH,
                    useNativeDriver: true,
                    duration: 250,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    useNativeDriver: true,
                    duration: 250,
                }),
            ]).start();
        }
    }, [visible]);

    const handleClose = () => {
        Animated.parallel([
            Animated.timing(slideAnim, {
                toValue: -DRAWER_WIDTH,
                useNativeDriver: true,
                duration: 250,
            }),
            Animated.timing(fadeAnim, {
                toValue: 0,
                useNativeDriver: true,
                duration: 250,
            }),
        ]).start(() => onClose());
    };

    const handleApply = () => {
        onApply({ priceRange, selectedColor, selectedRating, selectedCategory, sortOption: selectedSort });
        handleClose();
    };

    const handleReset = () => {
        setPriceRange([0, 5000]);
        setSelectedColor(null);
        setSelectedRating(null);
        setSelectedCategory('All');
        setSelectedSort('new');
    };

    if (!visible) return null;

    return (
        <Modal transparent visible={visible} onRequestClose={handleClose} animationType="none">
            <View className="flex-1 relative justify-center">
                {/* Backdrop */}
                <Animated.View
                    style={{ opacity: fadeAnim }}
                    className="absolute inset-0 bg-black"
                >
                    <TouchableOpacity style={{ flex: 1 }} onPress={handleClose} activeOpacity={1} />
                </Animated.View>

                {/* Drawer */}
                <Animated.View
                    style={{
                        transform: [{ translateX: slideAnim }],
                        width: DRAWER_WIDTH,
                    }}
                    className="bg-white h-[75%] shadow-xl rounded-r-[32px] overflow-hidden"
                >
                    <View className="flex-1">
                        {/* Header */}
                        <View className="flex-row items-center justify-between px-6 py-4 border-b border-gray-100" style={{ paddingTop: insets.top }}>
                            <Text className="text-xl font-bold text-gray-900">Filters</Text>
                            <TouchableOpacity onPress={handleClose} className="p-2 bg-gray-50 rounded-full">
                                <Ionicons name="close" size={20} color="#374151" />
                            </TouchableOpacity>
                        </View>

                        <ScrollView className="flex-1 px-6 pt-2" showsVerticalScrollIndicator={false}>
                            {/* Sort By Section */}
                            <View className="mb-6">
                                <Text className="text-base font-semibold text-gray-900 mb-3">Sort By</Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {[
                                        { label: 'Newest', value: 'new' },
                                        { label: 'Price: Low to High', value: 'price-asc' },
                                        { label: 'Price: High to Low', value: 'price-desc' },
                                        { label: 'Top Rated', value: 'rating' },
                                    ].map((opt) => (
                                        <TouchableOpacity
                                            key={opt.value}
                                            onPress={() => setSelectedSort(opt.value as SortOption)}
                                            className={`px-4 py-2 rounded-full border ${selectedSort === opt.value
                                                ? 'bg-black border-black'
                                                : 'bg-white border-gray-200'
                                                }`}
                                        >
                                            <Text className={`${selectedSort === opt.value ? 'text-white font-medium' : 'text-gray-600'}`}>
                                                {opt.label}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Category Section */}
                            <View className="mb-6">
                                <Text className="text-base font-semibold text-gray-900 mb-3">Category</Text>
                                <View className="flex-row flex-wrap gap-2">
                                    {['All', 'Sneakers', 'Running', 'Casual', 'Formal', 'Boots'].map((cat) => (
                                        <TouchableOpacity
                                            key={cat}
                                            onPress={() => setSelectedCategory(cat)}
                                            className={`px-4 py-2 rounded-full border ${selectedCategory === cat
                                                ? 'bg-orange-500 border-orange-500'
                                                : 'bg-white border-gray-200'
                                                }`}
                                        >
                                            <Text className={`${selectedCategory === cat ? 'text-white font-medium' : 'text-gray-600'}`}>
                                                {cat}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Price Range Section */}
                            <View className="mb-6">
                                <View className="flex-row justify-between items-center mb-4">
                                    <Text className="text-base font-semibold text-gray-900">Price Range</Text>
                                    <Text className="text-orange-500 font-medium">₹{Math.round(priceRange[0])} - ₹{Math.round(priceRange[1])}</Text>
                                </View>

                                <PriceSlider
                                    min={0}
                                    max={10000}
                                    values={priceRange}
                                    onValuesChange={setPriceRange}
                                />

                                <View className="flex-row justify-between gap-4 mt-4">
                                    <View className="flex-1 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                        <Text className="text-xs text-gray-400 mb-1">Min Price</Text>
                                        <Text className="font-semibold text-gray-900">₹ {Math.round(priceRange[0])}</Text>
                                    </View>
                                    <View className="flex-1 p-3 bg-gray-50 rounded-2xl border border-gray-100">
                                        <Text className="text-xs text-gray-400 mb-1">Max Price</Text>
                                        <Text className="font-semibold text-gray-900">₹ {Math.round(priceRange[1])}</Text>
                                    </View>
                                </View>
                            </View>

                            {/* Colors Section */}
                            <View className="mb-6">
                                <Text className="text-base font-semibold text-gray-900 mb-3">Color</Text>
                                <View className="flex-row gap-4">
                                    {[
                                        { name: 'black', hex: '#000000' },
                                        { name: 'white', hex: '#FFFFFF' },
                                        { name: 'red', hex: '#EF4444' },
                                        { name: 'blue', hex: '#3B82F6' },
                                        { name: 'green', hex: '#10B981' },
                                    ].map((color) => (
                                        <TouchableOpacity
                                            key={color.name}
                                            onPress={() => setSelectedColor(selectedColor === color.name ? null : color.name)}
                                            className={`w-10 h-10 rounded-full items-center justify-center border shadow-sm ${selectedColor === color.name ? 'border-orange-500' : 'border-gray-200'
                                                }`}
                                            style={{ backgroundColor: color.hex }}
                                        >
                                            {selectedColor === color.name && (
                                                <Ionicons
                                                    name="checkmark"
                                                    size={20}
                                                    color={color.name === 'white' ? '#000' : '#FFF'}
                                                />
                                            )}
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>

                            {/* Rating Section */}
                            <View className="mb-6">
                                <Text className="text-base font-semibold text-gray-900 mb-3">Rating</Text>
                                <View className="flex-row justify-between">
                                    {[5, 4, 3, 2, 1].map((star) => (
                                        <TouchableOpacity
                                            key={star}
                                            onPress={() => setSelectedRating(selectedRating === star ? null : star)}
                                            className={`flex-row items-center px-3 py-1.5 rounded-full border shadow-sm ${selectedRating === star
                                                ? 'bg-orange-50 border-orange-500'
                                                : 'bg-white border-gray-200'
                                                }`}
                                        >
                                            <Ionicons name="star" size={12} color="#F59E0B" />
                                            <Text className={`ml-1 font-medium text-sm ${selectedRating === star ? 'text-orange-700' : 'text-gray-600'}`}>
                                                {star}
                                            </Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            </View>
                        </ScrollView>

                        {/* Footer Buttons */}
                        <View className="px-6 py-4 border-t border-gray-100 flex-row gap-3 bg-white shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                            <TouchableOpacity
                                onPress={handleReset}
                                className="flex-1 py-3 rounded-full border border-gray-200 items-center justify-center active:bg-gray-50"
                            >
                                <Text className="text-gray-600 font-semibold text-sm">Reset</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={handleApply}
                                className="flex-1 py-3 rounded-full bg-gray-900 items-center justify-center shadow-lg shadow-orange-200 active:bg-gray-800"
                            >
                                <Text className="text-white font-bold text-sm">Apply Filters</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </View>
        </Modal>
    );
}

// Dual Slider Component with PanResponder
const PriceSlider = ({ min, max, values, onValuesChange }: {
    min: number,
    max: number,
    values: [number, number],
    onValuesChange: (val: [number, number]) => void
}) => {
    const [containerWidth, setContainerWidth] = useState(0);

    // We need to track the current values in refs to access them inside PanResponders 
    // without triggering excessive re-creation of responders
    const valuesRef = useRef(values);

    // Update ref when props change, but don't use this ref to drive render (props do that)
    useEffect(() => {
        valuesRef.current = values;
    }, [values]);

    const getPercentage = (value: number) => ((value - min) / (max - min)) * 100;
    const getValueFromPosition = (position: number) => {
        if (containerWidth === 0) return 0;
        const boundedPos = Math.max(0, Math.min(position, containerWidth));
        return min + (boundedPos / containerWidth) * (max - min);
    };

    const panResponderMin = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderGrant: () => {
                // Optional: visual feedback start
            },
            onPanResponderMove: (_, gestureState) => {
                if (containerWidth === 0) return;

                // Calculate new value based on gesture
                // We need the initial position + delta, but absolute coords are easier here 
                // if we knew the absolute x of container.
                // Instead, let's just use the current value percentage converted to pixels + dx?
                // No, simpler to rely on moveX if we knew container offset.
                // Safest robust way without measure(): 
                // We can't easily get absolute container X. 
                // So we use accumulation. 
                // Or better: Current rendered position + dx.

                // APPROACH: Since we are controlled, let's use the touch position relative to the view?
                // gestureState.moveX is absolute screen coord.
                // gestureState.x0 is start screen coord.
                // We also need the value AT start of gesture.

                // Alternative: The simple 'tap' handler logic but continuous?
                // Actually, just making the knobs receive the gesture is best.
                // We only get delta (dx) reliably.

                const currentMinVal = valuesRef.current[0];
                const currentMaxVal = valuesRef.current[1];

                // Convert current value to pixel position
                const currentPx = ((currentMinVal - min) / (max - min)) * containerWidth;

                // New pixel position = old pixel position + changes since last "move" event? 
                // PanResponder accumulates dx from the start of the gesture.
                // So: startPx + dx.

                // We need to store startPx on grant.
            },
        })
    ).current;

    // To properly implement "startPx + dx", we need a ref for startPx
    const startPx = useRef(0);

    const createPanResponder = (isMin: boolean) => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            // Calculate starting pixel position of the thumb
            const currentVal = isMin ? valuesRef.current[0] : valuesRef.current[1];
            startPx.current = ((currentVal - min) / (max - min)) * containerWidth;
        },
        onPanResponderMove: (_, gestureState) => {
            if (containerWidth === 0) return;

            const newPos = startPx.current + gestureState.dx;
            const rawValue = getValueFromPosition(newPos);

            const currentMin = valuesRef.current[0];
            const currentMax = valuesRef.current[1];

            let newValue = rawValue;

            if (isMin) {
                // Min thumb cannot go past Max thumb
                newValue = Math.min(newValue, currentMax);
                onValuesChange([newValue, currentMax]);
            } else {
                // Max thumb cannot go below Min thumb
                newValue = Math.max(newValue, currentMin);
                onValuesChange([currentMin, newValue]);
            }
        },
    });

    const panMin = useRef(createPanResponder(true)).current;
    const panMax = useRef(createPanResponder(false)).current;

    // Re-create responders if containerWidth changes? 
    // Actually refs hold the responders, they rely on mutable refs (valuesRef, containerWidth state).
    // But 'containerWidth' is state, accessible in closure IF we recreate.
    // Since we use refs for values, we're good. 
    // But calculate inside move relies on accurate containerWidth.
    // If we use a ref for containerWidth, it's safer.

    // Quick fix: standard ref pattern for width
    const widthRef = useRef(0);
    if (containerWidth !== widthRef.current) widthRef.current = containerWidth;

    // Updated Create Function to use widthRef
    const createPanResponderRef = (isMin: boolean) => PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onPanResponderGrant: () => {
            const w = widthRef.current;
            if (w === 0) return;
            const currentVal = isMin ? valuesRef.current[0] : valuesRef.current[1];
            startPx.current = ((currentVal - min) / (max - min)) * w;
        },
        onPanResponderMove: (_, gestureState) => {
            const w = widthRef.current;
            if (w === 0) return;

            const newPos = startPx.current + gestureState.dx;
            const boundedPos = Math.max(0, Math.min(newPos, w));
            const newValue = min + (boundedPos / w) * (max - min);

            const currentMin = valuesRef.current[0];
            const currentMax = valuesRef.current[1];

            if (isMin) {
                const finalVal = Math.min(newValue, currentMax);
                onValuesChange([finalVal, currentMax]);
            } else {
                const finalVal = Math.max(newValue, currentMin);
                onValuesChange([currentMin, finalVal]);
            }
        },
    });

    // We only create them once.
    const panMinRef = useRef(createPanResponderRef(true)).current;
    const panMaxRef = useRef(createPanResponderRef(false)).current;

    return (
        <View
            className="h-8 justify-center"
            onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
        >
            {/* Track Background */}
            <View className="h-1 bg-gray-200 rounded-full w-full" />

            {/* Active Track */}
            <View
                className="absolute h-1 bg-orange-500 rounded-full"
                style={{
                    left: `${getPercentage(values[0])}%`,
                    width: `${getPercentage(values[1]) - getPercentage(values[0])}%`
                }}
            />

            {/* Min Knob - Large touch area wrapper */}
            <View
                style={{
                    position: 'absolute',
                    left: `${getPercentage(values[0])}%`,
                    marginLeft: -20, // Center the 40px touch area 
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10
                }}
                {...panMinRef.panHandlers}
            >
                {/* Visual Knob */}
                <View className="w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm elevation-2" />
            </View>

            {/* Max Knob - Large touch area wrapper */}
            <View
                style={{
                    position: 'absolute',
                    left: `${getPercentage(values[1])}%`,
                    marginLeft: -20,
                    width: 40,
                    height: 40,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 10
                }}
                {...panMaxRef.panHandlers}
            >
                {/* Visual Knob */}
                <View className="w-6 h-6 bg-white border border-gray-200 rounded-full shadow-sm elevation-2" />
            </View>
        </View>
    );
};

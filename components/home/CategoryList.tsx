import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

interface CategoryListProps {
    selectedCategory: string | null;
    onSelectCategory: (category: string | null) => void;
}

const CATEGORIES = [
    { id: 1, name: 'Caftan', value: 'Caftan', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Tops', value: 'Top', image: require('./../../assets/images/tops.jpg') },
    { id: 3, name: 'Skirts', value: 'Skirt', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=150&q=80' },
    { id: 4, name: 'Dresses', value: 'Dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=150&q=80' },
    { id: 5, name: 'Jackets', value: 'Jacket', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80' }, // Changed from Sweaters to match data better
];

export default function CategoryList({ selectedCategory, onSelectCategory }: CategoryListProps) {
    return (
        <View className="py-2">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {CATEGORIES.map((category) => {
                    const isSelected = selectedCategory === category.value;
                    return (
                        <TouchableOpacity
                            key={category.id}
                            className="mr-6 items-center"
                            onPress={() => onSelectCategory(isSelected ? null : category.value)}
                        >
                            <View
                                className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mb-2"
                                style={{
                                    borderWidth: 3,
                                    borderColor: isSelected ? '#0ea5e9' : 'transparent'
                                }}
                            >
                                <Image
                                    source={typeof category.image === 'string' ? { uri: category.image } : category.image}
                                    className="w-full h-full"
                                    style={{ width: '100%', height: '100%' }}
                                    resizeMode="cover"
                                />
                            </View>
                            <Text className={`text-xs font-medium ${isSelected ? 'text-primary font-bold' : 'text-gray-800'}`}>
                                {category.name}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </ScrollView>
        </View>
    );
}

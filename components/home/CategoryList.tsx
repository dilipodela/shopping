import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const CATEGORIES = [
    { id: 1, name: 'Caftan', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=150&q=80' },
    { id: 2, name: 'Tops', image: require('./../../assets/images/tops.jpg') },
    { id: 3, name: 'Skirts', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=150&q=80' },
    { id: 4, name: 'Dresses', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=150&q=80' },
    { id: 5, name: 'Sweaters', image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&w=150&q=80' },
];

export default function CategoryList() {
    return (
        <View className="py-2">
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 16 }}>
                {CATEGORIES.map((category) => (
                    <TouchableOpacity key={category.id} className="mr-6 items-center">
                        <View className="w-16 h-16 rounded-full overflow-hidden bg-gray-200 mb-2">
                            <Image
                                source={typeof category.image === 'string' ? { uri: category.image } : category.image}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                        <Text className="text-gray-800 text-xs font-medium">{category.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

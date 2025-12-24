export interface Product {
    id: number;
    name: string;
    brand: string;
    image: any; // Changed to any to support require() for local images
    price: number;
    rating: number;
    isNew?: boolean;
    category?: string;
}

export const PRODUCTS: Product[] = [
    // --- Dresses / Caftans ---
    { id: 1, name: 'Red Caftan', brand: 'hellogorgeous', price: 292, rating: 5, isNew: true, category: 'Caftan', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&w=400&q=80' },
    { id: 3, name: 'Summer Dress', brand: 'hellogorgeous', price: 350, rating: 5, category: 'Dress', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&w=400&q=80' },
    { id: 7, name: 'Blue Maxi', brand: 'hellogorgeous', price: 420, rating: 4, category: 'Dress', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=400&q=80' },
    { id: 8, name: 'Evening Gown', brand: 'Luxe', price: 850, rating: 5, category: 'Dress', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=400&q=80' },
    { id: 9, name: 'Boho Dress', brand: 'FreeSpirit', price: 180, rating: 3, category: 'Dress', image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?auto=format&fit=crop&w=400&q=80' },

    // --- Tops ---
    { id: 2, name: 'Black Top', brand: 'hellogorgeous', price: 412, rating: 4, isNew: true, category: 'Top', image: 'https://images.unsplash.com/photo-1589810635657-232948472d98?auto=format&fit=crop&w=400&q=80' },
    { id: 5, name: 'Floral Blouse', brand: 'hellogorgeous', price: 220, rating: 5, category: 'Top', image: 'https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=400&q=80' },
    { id: 10, name: 'White Shirt', brand: 'Basics', price: 90, rating: 4, category: 'Top', image: 'https://images.unsplash.com/photo-1598554747436-c9293d6a588f?auto=format&fit=crop&w=400&q=80' },
    { id: 11, name: 'Crop Top', brand: 'Trendy', price: 60, rating: 4, category: 'Top', image: 'https://images.unsplash.com/photo-1503185912284-5271ff81b9a8?auto=format&fit=crop&w=400&q=80' },
    { id: 12, name: 'Silk Blouse', brand: 'Elegant', price: 300, rating: 5, category: 'Top', image: 'https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=400&q=80' },

    // --- Skirts ---
    { id: 4, name: 'Elegant Skirt', brand: 'hellogorgeous', price: 180, rating: 4, category: 'Skirt', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=400&q=80' },
    { id: 13, name: 'Mini Skirt', brand: 'Chic', price: 120, rating: 4, category: 'Skirt', image: 'https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&w=400&q=80' },
    { id: 14, name: 'Pleated Skirt', brand: 'Classic', price: 200, rating: 5, category: 'Skirt', image: require('../assets/images/pleatedskirt.png') },

    // --- Jackets / Outerwear ---
    { id: 6, name: 'Denim Jacket', brand: 'hellogorgeous', price: 450, rating: 4, category: 'Jacket', image: 'https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&w=400&q=80' },
    { id: 15, name: 'Leather Jacket', brand: 'Rocker', price: 700, rating: 5, category: 'Jacket', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&w=400&q=80' },
    { id: 16, name: 'Winter Coat', brand: 'Cozy', price: 900, rating: 5, category: 'Jacket', image: 'https://images.unsplash.com/photo-1539533113208-f6df8cc8b543?auto=format&fit=crop&w=400&q=80' },

    // --- More Misc Items for Bulk ---
    { id: 17, name: 'Green Scarf', brand: 'Accessory', price: 40, rating: 3, image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?auto=format&fit=crop&w=400&q=80' },
    { id: 18, name: 'Sun Hat', brand: 'Summer', price: 85, rating: 4, image: 'https://images.unsplash.com/photo-1556306535-0f09a537f0a3?auto=format&fit=crop&w=400&q=80' },
    { id: 19, name: 'Sunglasses', brand: 'Shades', price: 150, rating: 5, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?auto=format&fit=crop&w=400&q=80' },
    { id: 20, name: 'Handbag', brand: 'Luxe', price: 1200, rating: 5, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80' },
    { id: 21, name: 'Sneakers', brand: 'Sporty', price: 350, rating: 4, image: 'https://images.unsplash.com/photo-1562183241-b937e95585b6?auto=format&fit=crop&w=400&q=80' },
    { id: 22, name: 'Heels', brand: 'Posh', price: 450, rating: 5, image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&q=80' },
    { id: 23, name: 'Boots', brand: 'Rugged', price: 550, rating: 4, image: require('../assets/images/boots.jpg') },
    { id: 24, name: 'Wool Sweater', brand: 'Warm', price: 280, rating: 4, image: require('../assets/images/wool sweaters.jpg') },
    { id: 25, name: 'T-Shirt', brand: 'Casual', price: 40, rating: 3, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80' },
    { id: 26, name: 'Hoodie', brand: 'Comfy', price: 180, rating: 5, image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=400&q=80' },
    { id: 27, name: 'Shorts', brand: 'Summer', price: 90, rating: 4, image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=400&q=80' },
    { id: 28, name: 'Swimsuit', brand: 'Beach', price: 150, rating: 4, image: 'https://images.unsplash.com/photo-1581044777550-4cfa60707c03?auto=format&fit=crop&w=400&q=80' },
    { id: 29, name: 'Cardigan', brand: 'Layers', price: 200, rating: 4, image: 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?auto=format&fit=crop&w=400&q=80' },
    { id: 30, name: 'Jumpsuit', brand: 'Trendy', price: 320, rating: 5, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=400&q=80' },

    // --- Popular This Week (Unique Additions) ---
    { id: 31, name: 'Velvet Blazer', brand: 'Royal', price: 850, rating: 5, isNew: true, category: 'Jacket', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&q=80' },
    { id: 32, name: 'Floral Maxi', brand: 'Bloom', price: 420, rating: 4, isNew: true, category: 'Dress', image: 'https://images.unsplash.com/photo-1572804013427-4d7ca7268217?auto=format&fit=crop&w=400&q=80' },
    { id: 33, name: 'Cargo Pants', brand: 'Street', price: 280, rating: 4, isNew: true, category: 'Bottoms', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=400&q=80' },
    { id: 34, name: 'Silk Scarf', brand: 'Elegance', price: 150, rating: 5, isNew: true, category: 'Accessories', image: 'https://images.unsplash.com/photo-1584030373081-f37b7bb4fa8e?auto=format&fit=crop&w=400&q=80' },
    { id: 35, name: 'Leather Boots', brand: 'Rugged', price: 1200, rating: 5, isNew: true, category: 'Shoes', image: 'https://images.unsplash.com/photo-1608256246200-53e635b5b69f?auto=format&fit=crop&w=400&q=80' },
    { id: 36, name: 'Puffer Jacket', brand: 'Urban', price: 950, rating: 4, isNew: true, category: 'Jacket', image: 'https://images.unsplash.com/photo-1545563976-a095642d9afb?auto=format&fit=crop&w=400&q=80' },
];

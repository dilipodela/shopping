import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Product } from '../data/products';

interface UserActivityContextType {
    sharedItems: Product[];
    recentlyViewed: Product[];
    addToShared: (product: Product) => void;
    addToRecentlyViewed: (product: Product) => void;
    clearHistory: () => void;
}

const UserActivityContext = createContext<UserActivityContextType | undefined>(undefined);

export function UserActivityProvider({ children }: { children: ReactNode }) {
    const [sharedItems, setSharedItems] = useState<Product[]>([]);
    const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

    const addToShared = (product: Product) => {
        setSharedItems(prev => {
            // Remove if already exists to move to top
            const filtered = prev.filter(p => p.id !== product.id);
            return [product, ...filtered];
        });
    };

    const addToRecentlyViewed = (product: Product) => {
        setRecentlyViewed(prev => {
            const filtered = prev.filter(p => p.id !== product.id);
            // Limit to 20 items
            const newList = [product, ...filtered];
            return newList.slice(0, 20);
        });
    };

    const clearHistory = () => {
        setSharedItems([]);
        setRecentlyViewed([]);
    };

    return (
        <UserActivityContext.Provider value={{
            sharedItems,
            recentlyViewed,
            addToShared,
            addToRecentlyViewed,
            clearHistory
        }}>
            {children}
        </UserActivityContext.Provider>
    );
}

export function useUserActivity() {
    const context = useContext(UserActivityContext);
    if (context === undefined) {
        throw new Error('useUserActivity must be used within a UserActivityProvider');
    }
    return context;
}

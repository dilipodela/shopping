import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Product } from '../data/products';

export interface BagItem {
    product: Product;
    size: string;
    quantity: number;
}

interface BagContextType {
    bagItems: BagItem[];
    addToBag: (product: Product, size: string) => void;
    removeFromBag: (productId: number, size: string) => void;
    updateQuantity: (productId: number, size: string, quantity: number) => void;
    getItemQuantity: (productId: number, size: string) => number;
    clearBag: () => void;
    totalPrice: number;
}

const BagContext = createContext<BagContextType | undefined>(undefined);

export function BagProvider({ children }: { children: ReactNode }) {
    const [bagItems, setBagItems] = useState<BagItem[]>([]);

    const addToBag = (product: Product, size: string) => {
        setBagItems((prevItems) => {
            const existingItem = prevItems.find(
                (item) => item.product.id === product.id && item.size === size
            );

            if (existingItem) {
                return prevItems.map((item) =>
                    item.product.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { product, size, quantity: 1 }];
            }
        });
    };

    const removeFromBag = (productId: number, size: string) => {
        setBagItems((prevItems) =>
            prevItems.filter((item) => !(item.product.id === productId && item.size === size))
        );
    };

    const clearBag = () => {
        setBagItems([]);
    };

    const updateQuantity = (productId: number, size: string, quantity: number) => {
        if (quantity <= 0) {
            removeFromBag(productId, size);
            return;
        }
        setBagItems((prevItems) =>
            prevItems.map((item) =>
                item.product.id === productId && item.size === size
                    ? { ...item, quantity }
                    : item
            )
        );
    };

    const getItemQuantity = (productId: number, size: string) => {
        const item = bagItems.find((item) => item.product.id === productId && item.size === size);
        return item ? item.quantity : 0;
    };

    const totalPrice = bagItems.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
    );

    return (
        <BagContext.Provider value={{ bagItems, addToBag, removeFromBag, updateQuantity, getItemQuantity, clearBag, totalPrice }}>
            {children}
        </BagContext.Provider>
    );
}

export function useBag() {
    const context = useContext(BagContext);
    if (context === undefined) {
        throw new Error('useBag must be used within a BagProvider');
    }
    return context;
}

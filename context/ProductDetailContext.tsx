import React, { createContext, ReactNode, useContext, useState } from 'react';
import { Product } from '../data/products';

interface ProductDetailContextType {
    selectedProduct: Product | null;
    openProduct: (product: Product) => void;
    closeProduct: () => void;
}

const ProductDetailContext = createContext<ProductDetailContextType | undefined>(undefined);

export function ProductDetailProvider({ children }: { children: ReactNode }) {
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    const openProduct = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeProduct = () => {
        setSelectedProduct(null);
    };

    return (
        <ProductDetailContext.Provider value={{ selectedProduct, openProduct, closeProduct }}>
            {children}
        </ProductDetailContext.Provider>
    );
}

export function useProductDetail() {
    const context = useContext(ProductDetailContext);
    if (context === undefined) {
        throw new Error('useProductDetail must be used within a ProductDetailProvider');
    }
    return context;
}

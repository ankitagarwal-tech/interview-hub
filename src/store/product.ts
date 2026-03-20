import type { AddedProducts, Product, ProductStore } from '@/interface/product'
import { create } from 'zustand'

const useProductStore = create<ProductStore>((set) => ({
    addedProducts: [],
    updateCart: (addedProducts: AddedProducts[]) => set({ addedProducts }),
    addToCart: (product: Product) => set((state) => {
        const existing = state.addedProducts.find(p => p.product.id === product.id)
        if (existing) {
            return {
                addedProducts: state.addedProducts.map(p =>
                    p.product.id === product.id ? { ...p, qty: p.qty + 1 } : p
                )
            }
        }
        return { addedProducts: [...state.addedProducts, { product, qty: 1 }] }
    }),
    removeFromCart: (productId: number) => set((state) => {
        const existing = state.addedProducts.find(p => p.product.id === productId)
        if (existing && existing.qty > 1) {
            return {
                addedProducts: state.addedProducts.map(p =>
                    p.product.id === productId ? { ...p, qty: p.qty - 1 } : p
                )
            }
        }
        return { addedProducts: state.addedProducts.filter(p => p.product.id !== productId) }
    }),
    clearCart: () => set({ addedProducts: [] })
}))

export default useProductStore
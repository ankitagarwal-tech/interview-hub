import type { AddedProducts, Product, ProductStore } from '@/interface/product'
import { create } from 'zustand'

const useProductStore = create<ProductStore>((set) => ({
    addedProducts: [],
    // updateCart: (product: AddedProducts) => set((state) => ({ addedProducts: state.addedProducts.concat(product) })),
    // increasePopulation: () => set((state) => ({ addedProducts: state.bears + 1 })),
    // removeAllBears: () => set({ bears: 0 }),

    // updateBears: (newBears) => set({ bears: newBears }),
    updateCart: (addedProducts: AddedProducts[]) => set({ addedProducts: addedProducts }),
}))

export default useProductStore
import {create} from "zustand";
import type {TCartItem} from "@/pages/Products/types.ts";

export const useStore = create((set) => ({
    items: [],
    isModalOpen: false,
    addToCart: (item: TCartItem) => set((state) => {
        const shallow = [...state.items]

        const indexOf = shallow?.findIndex(e => e.id === item?.id)

        if (indexOf >= 0) {
            const obj = {...shallow[indexOf]}
            obj['quantity'] = item?.quantity

            shallow[indexOf] = obj

            return {
                items: shallow
            }
        }

        shallow.push(item)

        return {
            items: shallow
        }
    }),
}))
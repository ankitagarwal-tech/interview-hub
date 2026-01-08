import { createContext, useState } from "react";

// Declare the context
export const CartContext = createContext(null);

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    // Logic to add product to cart
    console.log("Adding to cart:", product);
    // check if product already in cart
    const isExist = cart.find((item) => item?.id === product?.id);
    if (isExist) {
      // increase quantity
      increaseQuantity(product.id);
    } else {
      setCart((prevCart) => [...prevCart, { ...product, purchasedQuantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    // Logic to remove product from cart
    console.log("Removing from cart, product ID:", productId);
    return setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };
  const increaseQuantity = (productId) => {
    console.log("Increasing quantity for product ID:", productId);
    // Logic to increase quantity
    const newCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, purchasedQuantity: item.purchasedQuantity + 1 };
      } 
    });
    return setCart(newCart);
  };
  const decreaseQuantity = (productId) => {
    // Logic to decrease quantity
    console.log("Decreasing quantity for product ID:", productId);
    const newCart = cart.map((item) => {
      if (item.id === productId) {
        return { ...item, purchasedQuantity: item.purchasedQuantity - 1 };
      } 
    });
    return setCart(newCart);
  };
  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        cart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;



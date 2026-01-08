import { useContext } from 'react';
import { CartContext } from './../context/CartContext';
const useCartContext = () => {
  // Implementation of the cart context hook
  const cartContext = useContext(CartContext);
  return cartContext;
}
export default useCartContext;
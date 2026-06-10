import { useState,useContext,createContext } from "react";

const CartContext = createContext();

export function CartProvider({children}){
    
    const [cartItems, setCartItems] = useState([]);

    const [isCartOpen, setIsCartOpen] = useState(false);

    function addToCart(product){

        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);

            if(existingItem){
                return prevItems.map(item =>
                    item.id === product.id? { ...item, quantity: item.quantity + 1 }
                    : item
                );
            }else{
                return [...prevItems,{...product,quantity:1}];
            }
        });
    }

    function removeFromCart(productId){
        setCartItems(prevItems=> 
            prevItems.filter(item => item.id !== productId)
        );
    }

    function updateQuantity(productId,newQuantity){

        if(newQuantity < 1){
            removeFromCart(productId);
            return;
        }

        setCartItems(prevItems=>
            prevItems.map(item=>
                item.id === productId?{...item,quantity:newQuantity}:item
            )
        );
    }

    function clearCart(){
        setCartItems([]);
    }

    const cartCount = cartItems.reduce((total,item) =>{
        return total + item.quantity;
    },0);
    
    const cartTotal = cartItems.reduce((total,item) =>{
        return total + (item.price*item.quantity);
    },0);

    const value = {
        cartItems,
        isCartOpen,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        setIsCartOpen,
    };

    return(
        <CartContext.Provider value = {value}>
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
  return useContext(CartContext);
}
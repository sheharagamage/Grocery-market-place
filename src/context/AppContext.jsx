
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { dummyProducts } from '../assets/assets';
import  toast  from 'react-hot-toast';

export const AppContext = createContext(); 

export const AppContextProvider = ({ children }) => {

    const currency =import.meta.env.VITE_CURRENCY ;

    const navigate = useNavigate();
    const [user, setUser] = useState(true);
    const [isSeller, setIsSeller] = useState(false);
    const [showUserLogin, setShowUserLogin] = useState(false);
    const[products, setProducts] = useState([]);

    const [cartItems, setCartItems] = useState({});
    const [searchQuery, setSearchQuery] = useState({});

    const fetchProducts = async () => {
        setProducts(dummyProducts)
    }

    //add product to cart
    const addToCart  =(itemId) =>{
        let cartData =structuredClone(cartItems);

        if(cartData[itemId]){
            cartData[itemId] += 1;
        }
        else{
            cartData[itemId] = 1;
        }
    
    setCartItems(cartData);
    toast.success("Added to cart")
    }
    //update cart items quantity

    const updateCartItem = () => {
        let cartData =structuredClone(cartItems);
        cartData[itemId] = quantity;
        setCartItems(cartData);
        toast.success("Cart updated")
    }

//remove product from cart
    const removeFromCart = (itemId) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
             cartData[itemId] -=1;
             if( cartData[itemId] == 0) {
                delete cartData[itemId];
            
                } 
        }
            toast.error("Removed from cart");
            setCartItems(cartData);
        
        
    };

    useEffect(() => {
        fetchProducts();
    }, []);



    const value = { navigate, user, setUser, isSeller, setIsSeller, showUserLogin, setShowUserLogin,products,currency,addToCart,updateCartItem ,removeFromCart,cartItems,searchQuery,setSearchQuery};

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
import { toast } from "react-hot-toast";
import React, { useState, createContext, useContext } from "react";
import { AiFillInfoCircle } from "react-icons/ai";
const Context = createContext();
export const StateContext = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [totalProductPrices, setTotalProductPrices] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [individualQuantity, setIndiviualQuantity] = useState(1);
  const [toggleCartSection, setToggleCartSection] = useState(false);

  const increaseQuantity = () => {
    setIndiviualQuantity((prev) => prev + 1);
  };
  const decreaseQuantity = () => {
    if (individualQuantity <= 1) return;
    setIndiviualQuantity((prev) => prev - 1);
  };

  const addItemToCart = (product, quantity) => {
    const checkItemInCartItems = cartItems?.find(
      (item) => item._id === product._id
    );
    const getIndex = cartItems?.findIndex((item) => item._id === product._id);
    if (checkItemInCartItems) {
      const updateCartItems = [...cartItems];
      checkItemInCartItems.quantity = checkItemInCartItems.quantity + quantity;
      updateCartItems.slice(getIndex, 1, checkItemInCartItems);
      setCartItems(updateCartItems);
      setTotalProductPrices((prev) => prev + product.price);
    } else {
      const newItem = { ...product, quantity };
      setCartItems([...cartItems, newItem]);
      setTotalProductPrices((prev) => prev + product.price * quantity);
    }
    toast.success(`${quantity} ${product.name} added to cart`);
    setIndiviualQuantity(1);
    setTotalQuantity((prev) => prev + quantity);
  };

  const incItemFromCart = (product, text) => {
    const findItem = cartItems?.find((item) => item._id === product._id);
    const findIndex = cartItems?.findIndex((item) => item._id === product._id);
    if (text === "increase") {
      findItem.quantity = findItem.quantity + 1;
      const updateCart = [...cartItems];
      updateCart.slice(findIndex, 1, findItem);
      setTotalProductPrices((prev) => prev + Number(findItem.price));
      setCartItems(updateCart);
      setTotalQuantity((prev) => prev + 1);
    } else if (text === "decrease") {
      if (findItem?.quantity > 1) {
        setTotalProductPrices((prev) => prev - findItem?.price);
      }
      if (product.quantity <= 1) {
        findItem.quantity = 1;
      } else {
        findItem.quantity = findItem.quantity - 1;
      }
      const updateCart = [...cartItems];
      updateCart.slice(findIndex, 1, findItem);
      console.log(findItem.quantity);
      setCartItems(updateCart);
      setTotalQuantity((prev) => {
        let count = 0;
        cartItems.forEach((item) => {
          count += item.quantity;
        });
        return count;
      });
    }
  };
  const removeItem = (id) => {
    let updateItem = [...cartItems];
    const findItem = cartItems?.find((item) => item._id === id);
    updateItem = updateItem?.filter((item) => item._id !== id);
    setCartItems(updateItem);
    setTotalQuantity((prev) => prev - findItem.quantity);
    let price = 0;
    updateItem.forEach((item) => {
      price +=Number( item.price);
    });
    setTotalProductPrices(price)
  };

  return (
    <Context.Provider
      value={{
        cartItems,
        totalProductPrices,
        totalQuantity,
        individualQuantity,
        toggleCartSection,
        setToggleCartSection,
        increaseQuantity,
        decreaseQuantity,
        addItemToCart,
        incItemFromCart,
        removeItem,
        setTotalQuantity,
        setTotalProductPrices,
        setCartItems,
      }}
    >
      {children}
    </Context.Provider>
  );
};
export const useStateContext = () => useContext(Context);

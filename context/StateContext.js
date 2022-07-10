import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-hot-toast';

const Context = createContext();

export const StateContext = ({ children }) => {
	const [showCart, setShowCart] = useState(false);
	const [cartItems, setCartItems] = useState([]);
	const [totalPrice, setTotalPrice] = useState(0);
	const [totalQuantity, setTotalQuantity] = useState(0);
	const [qty, setQty] = useState(1);

	let foundProduct;
	let index;

	const incQty = () => {
		setQty(prevQty => prevQty + 1);
	};

	const decQty = () => {
		setQty(prevQty => (prevQty - 1 < 1 ? 1 : prevQty - 1));
	};

	const onAdd = (product, qty) => {
		const checkProductInCart = cartItems.find(item => item._id === product._id);

		setTotalPrice(prevPrice => prevPrice + product.price * qty);
		setTotalQuantity(prevTotalQuantity => prevTotalQuantity + qty);
		if (checkProductInCart) {
			const updateCartItems = cartItems.map(cartProduct => {
				if (cartProduct._id === product._id) {
					return { ...cartProduct, quantity: cartProduct.quantity + qty };
				}
			});
			setCartItems(updateCartItems);
		} else {
			product.quantity = qty;
			setCartItems([...cartItems, { ...product }]);
		}
		toast.success(`${qty} ${product.name} added to cart!`);
	};

	const onRemove = id => {
		foundProduct = cartItems.find(item => item._id === id);
		let newCartsItems = cartItems.filter(item => item._id !== id);
		setTotalPrice(prevPrice => prevPrice - foundProduct.quantity * foundProduct.price);
		setTotalQuantity(prev => prev - foundProduct.quantity);
		setCartItems(newCartsItems);
	};

	const toggleCartItemQuantity = (id, value) => {
		foundProduct = cartItems.find(item => item._id === id);

		index = cartItems.indexOf(foundProduct);
		let newCartsItems = cartItems.filter(item => item._id !== id);
		if (value === 'inc') {
			// foundProduct.quantity + 1;
			setCartItems([
				...newCartsItems.slice(0, index),
				{ ...foundProduct, quantity: foundProduct.quantity + 1 },
				...newCartsItems.slice(index),
			]);
			setTotalPrice(prevPrice => prevPrice + foundProduct.price);
			setTotalQuantity(prevTotalQuantity => prevTotalQuantity + 1);
		} else if (value === 'dec') {
			if (foundProduct.quantity > 1) {
				// foundProduct.quantity -= 1;
				setCartItems([
					...newCartsItems.slice(0, index),
					{ ...foundProduct, quantity: foundProduct.quantity - 1 },
					...newCartsItems.slice(index),
				]);
				setTotalPrice(prevPrice => prevPrice - foundProduct.price);
				setTotalQuantity(prevTotalQuantity => prevTotalQuantity - 1);
			}
			if (foundProduct.quantity === 1) {
				onRemove(foundProduct._id);
			}
		}
	};

	return (
		<Context.Provider
			value={{
				showCart,
				onAdd,
				cartItems,
				setShowCart,
				totalQuantity,
				totalPrice,
				qty,
				incQty,
				decQty,
				toggleCartItemQuantity,
				onRemove,
			}}
		>
			{children}
		</Context.Provider>
	);
};

export const useStateContext = () => useContext(Context);

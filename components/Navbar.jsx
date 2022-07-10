import React from 'react';
import Link from 'next/link';

import { AiOutlineShopping } from 'react-icons/ai';
import { Cart } from './';
import { useStateContext } from '../context/StateContext';

const Navbar = () => {
	const { setShowCart, showCart, totalQuantity } = useStateContext();
	return (
		<div className="navbar-container">
			<p className="logo">
				<Link href="">JSM Headphones</Link>
			</p>
			<button tupe="button" className="cart-icon" onClick={() => setShowCart(true)}>
				<AiOutlineShopping />
				<span className="cart-item-qty">{totalQuantity}</span>
			</button>
			{showCart && <Cart />}
		</div>
	);
};

export default Navbar;
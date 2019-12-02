import React from 'react';
import { connect } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.actions';

import { ReactComponent as ShoppingIcon } from '../../assets/shopping-bag.svg';

import './cart-icon.styles.scss';

function CartIcon({ toggleCartHidden, itemCount }) {
	return (
		<div className="cart-icon" onClick={toggleCartHidden}>
			<ShoppingIcon className="shopping-icon" />
			<span className="item-count">{itemCount}</span>
		</div>
	);
}

const mapStateToProps = ({ cart: { cartItems } }) => ({
	itemCount: cartItems.reduce(
		(accumulatedQuantity, cartItem) => accumulatedQuantity + cartItem.quantity,
		0
	)
});

const mapDisptchToProps = dispatch => ({
	toggleCartHidden: () => dispatch(toggleCartHidden())
});

export default connect(mapStateToProps, mapDisptchToProps)(CartIcon);

import { Type } from "./action.type";

export const initialState = {
	basket: [],
	user: null,
};

export const reducer = (state, action) => {
	switch (action.type) {
		case Type.ADD_TO_BASKET:
			const existingItem = state.basket.find(
				(item) => item.id === action.item.id
			);
			let newBasket;
			if (existingItem) {
				newBasket = state.basket.map((item) =>
					item.id === action.item.id
						? { ...item, amount: item.amount + 1 }
						: item
				);
			} else {
				newBasket = [...state.basket, { ...action.item, amount: 1 }];
			}
			return {
				...state,
				basket: newBasket,
			};
		case Type.REMOVE_FROM_BASKET: // typo fixed
			const index = state.basket.findIndex((item) => item.id === action.id);
			let updatedBasket;
			if (index !== -1) {
				updatedBasket = state.basket
					.map((item, i) =>
						i === index
							? item.amount > 1
								? { ...item, amount: item.amount - 1 }
								: undefined
							: item
					)
					.filter((item) => item !== undefined);
			} else {
				updatedBasket = state.basket;
			}
			return {
				...state,
				basket: updatedBasket,
			};
		case Type.EMPTY_BASKET:
			return {
				...state,
				basket: [],
			};
		case Type.SET_USER:
			return {
				// return directly for simpler update
				...state,
				user: action.user,
			};
		default:
			return state;
	}
};

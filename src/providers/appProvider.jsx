import React, { createContext, useState, useContext } from 'react'
import { getLimit } from '../utils'
import initialProducts from '../utils/initialProducts.json'

const AppContext = createContext({})

export const AppProvider = ({ children }) => {
	const [existingProducts, setExistingProducts] = useState(initialProducts)
	const [basketData, setBasketData] = useState([])

	const addToBasketData = (id, color, storages, item, count = 1) => {
		let clonedData = [...basketData]
		let selectedItemIndex = clonedData.findIndex(item => item.id === id && true)

		if (selectedItemIndex !== -1) {
			let previousBasketItem = clonedData[selectedItemIndex]
			let optionsOfBasketItem = previousBasketItem.options
			let selectedOptionIndex = optionsOfBasketItem.findIndex(option => option.color === color && true)

			if (selectedOptionIndex !== -1) {
				let quantity = clonedData[selectedItemIndex].options[selectedOptionIndex].quantity
				const limit = getLimit(id, color)

				clonedData[selectedItemIndex].options[selectedOptionIndex].quantity = limit > (quantity + count)
					? (quantity + count)
					: limit
				setBasketData(clonedData)
			} else {
				const previousData = clonedData.filter(item => item.id !== id)
				const newData = {
					...previousBasketItem,
					options: [...clonedData[selectedItemIndex].options, {
						color,
						storage: storages,
						quantity: 1
					}]
				}
				setBasketData([...previousData, newData])
			}
		} else {
			let newField = {
				id: item.id,
				name: item.name,
				brand: item.brand,
				price: item.price,
				weight: item.weight,
				options: [{
					color,
					storage: storages,
					quantity: 1
				}]
			}
			setBasketData([...basketData, newField])
		}
	}

	const addCart = (id, color, storage, count = 1) => {//no need storage in our request for current condition
		let clonedData = { ...existingProducts }
		let selectedItemIndex = clonedData.items.findIndex(item => item.id === id && true)
		let selectedOptionIndex = clonedData.items[selectedItemIndex].options.findIndex(option => option.color === color && true)
		let quantity = clonedData.items[selectedItemIndex].options[selectedOptionIndex].quantity

		clonedData.items[selectedItemIndex].options[selectedOptionIndex].quantity = quantity > 0
			? quantity - count
			: count > 0
				? 0
				: quantity - count//for decrement

		setExistingProducts(clonedData)

		const storages = clonedData.items[selectedItemIndex].options[selectedOptionIndex].storage || null
		addToBasketData(id, color, storages, clonedData.items[selectedItemIndex], count)
	}

	return (
		<AppContext.Provider value={{ existingProducts, addCart, basketData }}>
			{children}
		</AppContext.Provider>
	)
}

export const useAppProvider = () => {
	const context = useContext(AppContext)

	return context;
}

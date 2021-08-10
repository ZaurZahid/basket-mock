import mock from '../utils/mock.json'

export const ROUTES = {
    PRODUCTS: {
        MAIN: "/products",
        DETAILED: "/product/:id",
    },
    BASKET: {
        MAIN: "/basket",
    },
    HOME: {
        MAIN: "/",
    }
};

export const getLimit = (id, color) => {
    let selectedItemIndex = mock.items.findIndex(item => item.id === id && true)
    let selectedOptionIndex = mock.items[selectedItemIndex].options.findIndex(option => option.color === color && true)
    let quantity = mock.items[selectedItemIndex].options[selectedOptionIndex].quantity

    return quantity
}
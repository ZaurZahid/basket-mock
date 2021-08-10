import React, { useEffect, useState } from 'react'
import { useAppProvider } from '../../providers/appProvider'
import Layout from '../Layout'
import styles from './basket.module.css'
import SnackBar from './../../components/SnackBar/index';

function Basket() {
    const { basketData, addCart } = useAppProvider()
    const [data, setData] = useState([])
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedStorage, setSelectedStorage] = useState(null)
    const [alert, setAlert] = useState({ open: false, message: '', bgC: "" })

    useEffect(() => {
        setData(basketData)
    }, [basketData])

    const handleSelectOption = (id, color, option) => {
        setSelectedColor(id + color)
        setSelectedStorage(null)
        if (option.storage && option.storage.length === 1) setSelectedStorage(id + color + option.storage[0])
    }

    const handleSelectStorage = (id, color, storage) => {
        setSelectedColor(id + color)
        setSelectedStorage(id + color + storage)
    }

    const addBasket = (selectedOptionQuantity, count, basket) => {
        if (selectedOptionQuantity !== 0) {
            //Should make API request

            setAlert({
                bgC: '#28ca2e',
                open: true,
                message: `Congrats, ${count > 0 ? 'inremented' : 'decremented'} to the basket`
            })

            addCart(basket.id, selectedColor.replace(/\d+/g, ''), selectedStorage, count)
        } else {
            if (count > 0) {//if Man wants to increment again from 0
                //Should make API request

                setAlert({
                    bgC: '#28ca2e',
                    open: true,
                    message: `Congrats, ${count > 0 ? 'inremented' : 'decremented'} to the basket`
                })

                addCart(basket.id, selectedColor.replace(/\d+/g, ''), selectedStorage, count)
            } else {
                setAlert({
                    bgC: '#ed3237',
                    open: true,
                    message: 'Quantity should be > 0'
                })
            }
        }
    }

    const handleSubmit = (basket, count) => {
        setAlert({ isDanger: false, open: false, message: '' })

        if (basket.options) {
            if (selectedColor) {
                const hasOptionStorage = basket.options.find(option => option.color === selectedColor.replace(/\d+/g, '')).storage
                const selectedOptionQuantity = basket.options.find(option => option.color === selectedColor.replace(/\d+/g, '')).quantity
                if (hasOptionStorage) {
                    if (selectedStorage) {
                        addBasket(selectedOptionQuantity, count, basket)
                    } else {
                        setAlert({
                            bgC: '#ed3237',
                            open: true,
                            message: 'Select the storage'
                        })
                    }
                } else {
                    addBasket(selectedOptionQuantity, count, basket)
                }
            } else {
                setAlert({
                    bgC: '#ed3237',
                    open: true,
                    message: 'Select the color'
                })
            }
        }
    }

    return (
        <Layout>
            <div className={styles.BasketPage}>
                {data.length > 0 ?
                    data.map(basket =>
                        <div className={styles.ProductItem}>
                            <div className={styles.ProductItemName}>
                                Name: <span>{basket.name}</span>
                            </div>
                            <div className={styles.ProductItemBrand}>
                                Brand: <span>{basket.brand}</span>
                            </div>
                            <div className={styles.ProductItemPrice}>
                                Price: <span>{basket.price} $</span>
                            </div>

                            {basket.options.length > 0 &&
                                <ul className={styles.ProductItemOptions}>
                                    {basket.options.map(option => {
                                        return (
                                            <li className={styles.ProductItemOption} onClick={() => basket.id + option.color === selectedColor ? undefined : handleSelectOption(basket.id, option.color, option)}>
                                                <input type="radio" checked={selectedColor === basket.id + option.color} onChange={() => handleSelectOption(basket.id, option.color, option)} />

                                                <div className={styles.Actions}>
                                                    <button type="button" onClick={() => handleSubmit(basket, 1)}>increment</button>
                                                    <button type="button" onClick={() => handleSubmit(basket, -1)}>decrement</button>
                                                </div>


                                                <div>Color  <span className={styles.ProductItemOptionColor} style={{ background: option.color }}></span></div>
                                                <div>Quantity : <span className={styles.ProductItemOptionQuantity}>{option.quantity}</span></div>
                                                {option.storage ?
                                                    <>
                                                        <ul className={styles.ProductItemOptionStorage}>
                                                            {option.storage.map((st, index) =>
                                                                <li key={st}>
                                                                    <label htmlFor="storage">Storage: {st}</label>
                                                                    <input type="radio" checked={selectedStorage === basket.id + option.color + st} onChange={() => handleSelectStorage(basket.id, option.color, st)} />
                                                                </li>
                                                            )}
                                                        </ul>
                                                    </>
                                                    : null}
                                            </li>
                                        )
                                    }
                                    )}
                                </ul>
                            }
                        </div>
                    )
                    : <p>not found any data</p>}
            </div>
            <SnackBar alert={alert} setAlert={setAlert} />
        </Layout>
    )
}

export default Basket

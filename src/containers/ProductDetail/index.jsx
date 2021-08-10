import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAppProvider } from '../../providers/appProvider'
import Layout from '../Layout'
import styles from './product_detail.module.css'
import { ROUTES } from './../../utils/index';
import SnackBar from '../../components/SnackBar'

function ProductDetail() {
    const { existingProducts, addCart } = useAppProvider()
    const [product, setProduct] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)
    const [selectedStorage, setSelectedStorage] = useState(null)
    const [disabled, setDisabled] = useState(false)
    const { pathname } = useLocation()
    const [alert, setAlert] = useState({ open: false, message: '', bgC: "" })

    useEffect(() => {
        if (pathname) {
            const id = pathname.split('/')[2]
            const selectedField = existingProducts.items.find(item => item.id === +id)
            setProduct(selectedField)

            if (!selectedField.available) setDisabled(true)
        }

    }, [existingProducts, pathname])

    const handleSelectOption = (color, option) => {
        setSelectedColor(color)
        setSelectedStorage(null)

        if (option.storage && option.storage.length === 1) setSelectedStorage(color + option.storage[0])
    }

    const handleSelectStorage = (color, storage) => {
        setSelectedColor(color)
        setSelectedStorage(color + storage)
    }

    const addBasket = (selectedOptionQuantity) => {
        if (selectedOptionQuantity !== 0) {
            //Should make API request

            setAlert({
                bgC: '#28ca2e',
                open: true,
                message: 'Congrats, added to the basket'
            })

            addCart(product.id, selectedColor, selectedStorage)
        } else {
            setAlert({
                bgC: '#ed3237',
                open: true,
                message: 'Quantity should be > 0'
            })
        }
    }

    const handleSubmit = () => {
        setAlert({ isDanger: false, open: false, message: '' })

        if (product.options) {
            if (selectedColor) {
                const hasOptionStorage = product.options.find(option => option.color === selectedColor).storage
                const selectedOptionQuantity = product.options.find(option => option.color === selectedColor).quantity

                if (hasOptionStorage) {
                    if (selectedStorage) {
                        addBasket(selectedOptionQuantity)
                    } else {
                        setAlert({
                            bgC: '#ed3237',
                            open: true,
                            message: 'Select the storage'
                        })
                    }
                } else {
                    addBasket(selectedOptionQuantity)
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
            <div className={styles.ProductDetailPage}>
                {product ?
                    <div className={styles.ProductItem}>
                        <Link to={ROUTES.PRODUCTS.MAIN} className={styles.Back}>Back</Link>
                        {!product.available && <p style={{ textDecoration: 'underline' }}>NOTE: not avialable</p>}
                        <div className={styles.ProductItemName}>
                            Name: <span>{product.name}</span>
                        </div>
                        <div className={styles.ProductItemBrand}>
                            Brand: <span>{product.brand}</span>
                        </div>
                        <div className={styles.ProductItemPrice}>
                            Price: <span>{product.price} $</span>
                        </div>

                        {product.options.length > 0 &&
                            <ul className={styles.ProductItemOptions}>
                                {product.options.map(option => {
                                    return (
                                        <li className={styles.ProductItemOption} onClick={() => handleSelectOption(option.color, option)}>
                                            <input type="radio" disabled={disabled} checked={selectedColor === option.color} onChange={() => handleSelectOption(option.color, option)} />

                                            <div>Color  <span className={styles.ProductItemOptionColor} style={{ background: option.color }}></span></div>
                                            <div>Quantity : <span className={styles.ProductItemOptionQuantity}>{option.quantity}</span></div>
                                            {option.storage ?
                                                <>
                                                    <ul className={styles.ProductItemOptionStorage}>
                                                        {option.storage.map((st, index) =>
                                                            <li key={st}>
                                                                <label htmlFor="storage">Storage: {st}</label>
                                                                <input type="radio" disabled={disabled} checked={selectedStorage === option.color + st} onChange={() => handleSelectStorage(option.color, st)} />
                                                            </li>
                                                        )}
                                                    </ul>
                                                </>
                                                : null}
                                        </li>
                                    )
                                }
                                )}

                                <button className={styles.AddBasket} disabled={disabled} type="button" onClick={handleSubmit}>Add to basket</button>
                            </ul>
                        }
                    </div>
                    : <p>loading...</p>
                }

                <SnackBar alert={alert} setAlert={setAlert} />
            </div>
        </Layout>
    )
}

export default ProductDetail

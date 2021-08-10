import React from 'react'
import { Link } from 'react-router-dom'
import { useAppProvider } from '../../providers/appProvider'
import Layout from '../Layout'
import styles from './products.module.css'

function Products() {
    const { existingProducts } = useAppProvider()
    console.log(existingProducts)

    return (
        <Layout>
            <div className={styles.ProductsPage}>
                {existingProducts && existingProducts.items &&

                    <div className={styles.ProductList}>
                        {existingProducts.items.map(item =>
                            <Link to={`/product/${item.id}`} className={styles.ProductItem}>
                                <div className={styles.ProductItemName} >
                                    Name: <span>{item.name}</span>
                                </div>
                                <div className={styles.ProductItemBrand}>
                                    Brand: <span>{item.brand}</span>
                                </div>
                                <div className={styles.ProductItemPrice}>
                                    Price: <span>{item.price} $</span>
                                </div>

                                {!item.available && <p className={styles.NotAvailable}>not avialable</p>}
                            </Link>
                        )}
                    </div>

                }
            </div>
        </Layout>
    )
}

export default Products

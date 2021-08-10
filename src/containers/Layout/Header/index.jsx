import React from 'react'
import { Link, useLocation } from 'react-router-dom';
import styles from './header.module.css';
import { ROUTES } from '../../../utils/index';

function Header() {
    const { pathname } = useLocation()

    return (
        <header className={styles.Header}>
            <nav>
                <ul>
                    <li className={pathname === ROUTES.HOME.MAIN ? styles.active : undefined}>
                        <Link to={ROUTES.HOME.MAIN}>Home</Link>
                    </li>
                    <li className={pathname === ROUTES.PRODUCTS.MAIN || pathname.includes('product') ? styles.active : undefined}>
                        <Link to={ROUTES.PRODUCTS.MAIN}>Products</Link>
                    </li>
                    <li className={pathname === ROUTES.BASKET.MAIN ? styles.active : undefined}>
                        <Link to={ROUTES.BASKET.MAIN}>Basket</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header

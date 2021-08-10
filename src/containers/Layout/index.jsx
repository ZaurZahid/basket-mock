import React from 'react'
import Header from './Header'
import styles from './layout.module.css'
import Container from '../Container/index';

function Layout({ children }) {
    return (
        <div className={styles.Layout}>
            <Container>
                <Header />
                {children}
            </Container>
        </div>
    )
}

export default Layout

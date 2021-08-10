import React from 'react'
import styles from './container.module.css'

const Container = ({ children }) => (
    <div className={styles.Container}>
        <div className={styles.Content}>{children}</div>
    </div>
);

export default Container

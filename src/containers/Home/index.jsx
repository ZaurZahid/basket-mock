import React from 'react'
import Layout from '../Layout'
import styles from './home.module.css'

function index() {
    return (
        <Layout>
            <div className={styles.HomePage}>
                HOME
            </div>
        </Layout>
    )
}

export default index

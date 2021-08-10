import React, { useEffect } from 'react'
import style from './snackbar.module.css'
import ClickAwayListener from 'react-click-away-listener';

function SnackBar({ alert, setAlert }) {

    useEffect(() => {
        const timeId = setTimeout(() => {
            setAlert({ ...alert, open: false })
        }, 1000)

        return () => clearTimeout(timeId)
    }, [alert, setAlert]);

    const renderSnackbar = () => {
        let content = null

        if (alert.open) {
            content = (
                <ClickAwayListener onClickAway={() => setAlert({ ...alert, open: false })}>
                    <div
                        className={style.Snackbar}
                        style={{ backgroundColor: alert.bgC || "#28ca2e;" }}
                    >
                        <span>{alert.message}</span>
                    </div>
                </ClickAwayListener>

            )
        }

        return content
    }

    return (
        <>
            {renderSnackbar()}
        </>
    )
}

export default SnackBar
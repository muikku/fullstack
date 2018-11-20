import React from 'react'
import PropTypes from 'prop-types'

const Notification = ({ message }, style) => {
    if (message === null) {
        return null
    }
    return (
        <div className={style} key={message.toString()}>
        {message}
        </div>
    )
}

Notification.PropTypes = {
    message: PropTypes.string.isRequired,
    style: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
    key: PropTypes.string.isRequired
}

export default Notification
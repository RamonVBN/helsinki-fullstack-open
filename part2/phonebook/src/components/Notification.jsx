import './Notification.css'

const Notification = ({ notification }) => {
    if (!notification) {
        return null
    }

    return ( 
        <div className={notification.isError ? 'error' : 'default'}>
            {notification.message}
        </div>
    )
}

export default Notification
const toggleReducer = (store = true, action) => {
    switch(store, action.type) {
        case 'TOGGLE':
        return !store
        default:
        return store
    }
}

export const toggle = () => {
    return (dispatch) => {
        dispatch({
            type: 'TOGGLE'
        })
    }
}

export default toggleReducer
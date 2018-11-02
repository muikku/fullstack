/* eslint-disable default-case */
const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
    total: 0,
    positive: 0
}

const counterReducer = (state = initialState, action) => {
    const posPercent = (total, positive) => positive / total * 100
    const newState = {...state}
    switch (action.type) {
        case 'GOOD':
        newState.good++
        newState.total++
        newState.positive = posPercent(newState.total, newState.good)
        return newState
        case 'OK':       
        newState.ok++
        newState.total++
        newState.positive = posPercent(newState.total, newState.good)
        return newState
        case 'BAD':
        newState.bad++
        newState.total++
        newState.positive = posPercent(newState.total, newState.good)
        return newState
        case 'ZERO':
        return initialState
    }
    return state
}


export default counterReducer
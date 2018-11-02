/* eslint-disable default-case */
const initialState = {
    good: 0,
    ok: 0,
    bad: 0
}

const counterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GOOD':
        return {...state, good: addOne(state.good)}
        case 'OK':
        return {...state, ok: addOne(state.ok)}
        case 'BAD':
        return {...state, bad: addOne(state.bad)}
        case 'ZERO':
        return initialState
    }
    return state
}

const addOne = (prop) => prop + 1

export default counterReducer
import usersService from './../services/users'

const usersReducer = (state = [], action) => {
    switch(action.type){
        case 'GETUSERS':
        return state.concat(action.data)
        default:
        return state
    }
}

export const getUsers = () => {
    return async (dispatch) => {
        const users = await usersService.getAll()
        dispatch({
            type: 'GETUSERS',
            data: users
        })
    }
}

export default usersReducer
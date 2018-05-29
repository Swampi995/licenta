/**
 * Created by swpmr on 5/16/2018.
 */
export const loggedInUser = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN_USER':
            return action.payload
        default:
            return state
    }
}
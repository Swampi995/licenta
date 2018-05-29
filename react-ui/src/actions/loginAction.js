/**
 * Created by swpmr on 5/16/2018.
 */
export const loginAction = (user) => dispatch => {
    dispatch({
        type: 'LOGIN_USER',
        payload: user
    })
}
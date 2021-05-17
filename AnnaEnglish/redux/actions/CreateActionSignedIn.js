import * as actionTypes from './ActionTypes'

export const createActionSignIn = username => ({
    type: actionTypes.signInAction,
    payload: {
        isSignedIn: true,
        username: username.toLowerCase(),
    }
})

export const createActionSignOut = () => ({
    type: actionTypes.signOutAction,
    payload: {
        isSignedIn: false,
        username: undefined
    }
})


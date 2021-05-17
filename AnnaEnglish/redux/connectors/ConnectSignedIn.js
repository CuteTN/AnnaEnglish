import { connect } from 'react-redux'
import { createActionSignIn, createActionSignOut } from '../actions/CreateActionSignedIn'

const mapStateToProps = (state) => {
    return {
        isSignedIn: state.reducerSignedIn.isSignedIn,
        signedInUsername: state.reducerSignedIn.username
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (username) => {
            dispatch(createActionSignIn(username));
        },

        signOut: () => {
            dispatch(createActionSignOut());
        },
    }
}

export const connectSignedIn = connect(mapStateToProps, mapDispatchToProps);
import Cookies from 'js-cookie'
export const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER_INFO':
            // console.log("reducer data",action.payload.data);
            state.userName = action.payload.data.name
            state.isLoggedIn = true
            state._id = action.payload.data._id
            return { ...state }
        case 'DELETE_USER_INFO':
            state.userName = ""
            state.isLoggedIn = false
            Cookies.remove('jwtoken')
            return { ...state }
        default:
            return { ...state }
    }
}
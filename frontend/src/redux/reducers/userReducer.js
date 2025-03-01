const initialState = { user: JSON.parse(localStorage.getItem("user")) || null };

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'LOGIN_SUCCESS':
            // localStorage.setItem("user", JSON.stringify(action.payload.user));
            return { ...state, user: action.payload };
        case 'REGISTER_USER':
            localStorage.setItem("user", JSON.stringify(action.payload.user));
            return { ...state, user: action.payload.user };
        case 'LOGOUT':
            localStorage.removeItem("user");
            return { ...state, user: null };
        default:
            return state;
    }
};
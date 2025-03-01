import API from "../../utils/axiosInstance";
 
export const registerUser = (userData) => async (dispatch) => {
    try {
        const { data } = await API.post('/api/auth/register', userData);
            dispatch({ type: 'REGISTER_USER', payload: data });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            } catch (error) {
                dispatch({ type: "REGISTER_FAIL", payload: error.response.data.message });
            }
    };

export const loginUser = (userData) => async (dispatch) => {
    try {
        const { data } = await API.post("/api/auth/login", userData);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch({ type: "LOGIN_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "LOGIN_FAIL", payload: error.response?.data?.message || "Login failed" });
}
};

// LOGOUT USER
export const logoutUser = () => (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    
    dispatch({ type: "LOGOUT" });
};
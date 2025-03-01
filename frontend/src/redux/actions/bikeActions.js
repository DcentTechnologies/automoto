import API from "../../utils/axiosInstance";

export const addBike = (bikeData) => async (dispatch, getState) => {
    try {
        const token = getState().user.user?.token;
        const config = { headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` } };
        const { data } = await API.post("/api/bikes/sell", bikeData, config);
        dispatch({ type: "ADD_BIKE_SUCCESS", payload: data });
    } catch (error) {
        dispatch({ type: "ADD_BIKE_FAIL", payload: error.response?.data?.message || "Something went wrong" });
    }
};
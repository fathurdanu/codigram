const initialState = {
    action: "",
    status: "loading",
    data: "Loading",
};

const userReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "REGISTER":
            return { ...state, action: "REGISTER", status: payload.status, data: payload.data }
        case "LOGIN":
            return { ...state, action: "LOGIN", status: payload.status, data: payload.data }
        case "GET_USER":
            return { ...state, action: "GET_USER", status: payload.status, data: payload.data }
        default:
            return state;
    }
}

export default userReducer
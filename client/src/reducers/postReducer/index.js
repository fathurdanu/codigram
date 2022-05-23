const initialState = {
    action: "",
    status: "loading",
    data: "Loading",
};

const postReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case "CREATE_POST":
            return { ...state, action: "CREATE_POST", status: payload.status, data: payload.data }
        case "GET_ALL_POSTS":
            return { ...state, action: "GET_ALL_POSTS", status: payload.status, data: payload.data }
        case "GET_POST":
            return { ...state, action: "GET_POST", status: payload.status, data: payload.data }
        case "GET_USER_POSTS":
            return { ...state, action: "GET_USER_POSTS", status: payload.status, data: payload.data }
        case "DELETE_POST":
            return { ...state, action: "DELETE_POST", status: payload.status, data: payload.data }
        case "UPDATE_POST":
            return { ...state, action: "UPDATE_POST", status: payload.status, data: payload.data }
        case "LIKE_POST":
            return { ...state, action: "LIKE_POST", status: payload.status, data: payload.data }
        default:
            return state;
    }
}

export default postReducer;
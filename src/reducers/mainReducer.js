const initialState = [];

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_POST":
            return action.data
        default:
            return state;
    }
}

export default mainReducer;
const initialState = [];

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_POST":
            return action.data
        case 'DELETE_POST':
            return state.filter((post) => post.id !== action.id);
        default:
            return state;
    }
}

export default mainReducer;
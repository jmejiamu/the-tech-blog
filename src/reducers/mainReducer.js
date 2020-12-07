const initialState = [];

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SHOW_POST":
            return action.data
        case 'DELETE_POST':
            return state.filter((post) => post.id !== action.id);
        case 'EDIT_POST':
            return state.map((post) => post.id === action.id ? { ...post, edit: !post.edit } : post)
        case 'UPDATE':
            return state.map((post) => {
                if (post.id === action.data.id) {
                    return {
                        ...post,
                        title: action.data.title,
                        author: action.data.author,
                        context: action.data.context,
                    }
                } else return post;
            })
        default:
            return state;
    }
}

export default mainReducer;
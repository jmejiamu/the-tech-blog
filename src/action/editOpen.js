export const editOpen = (id) => {
    return (dispatch) => {
        dispatch({ type: 'EDIT_POST', id: id })
    }
}
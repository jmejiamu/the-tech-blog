export const deletePost = (id) => {
    return (dispatch) => {
        fetch(`https://thetechblog.me/deleteblog/${id}`, {
            method: 'DELETE'
        }).then(() => {
            dispatch({ type: 'DELETE_POST' })
        })
    }
}
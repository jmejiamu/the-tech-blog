export const updatePost = (id, data) => {
    return (dispatch) => {
        fetch(`https://thetechblog.me/updateblog/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(() => {
                dispatch({ type: 'UPDATE', data: data })
            })
    }
}
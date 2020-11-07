export const getData = () => (dispatch) => {

    fetch('https://thetechblog.me/allpost')
        .then(response => response.json())
        .then(data => dispatch({ type: 'SHOW_POST', data: data }))

}

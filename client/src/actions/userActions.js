import axios from 'axios';
import Swal from 'sweetalert2';
const url = 'http://localhost:3000/users';


export const register = (data) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "REGISTER",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'POST',
            url: url + '/register',
            data: data
        })
            .then(response => {
                Swal.fire(
                    'Success!',
                    'You have been registered!',
                    'success'
                )
                dispatch({
                    type: "REGISTER",
                    payload: {
                        status: 'data',
                        data: response.data
                    }
                });
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                  })
                dispatch({
                    type: "REGISTER",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}

export const login = (data) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "LOGIN",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'POST',
            url: url + '/login',
            data: data
        })
            .then(response => {
                localStorage.setItem('id',response.data.UserId);
                localStorage.setItem('username',response.data.username);
                localStorage.setItem('access_token',response.data.access_token);
                localStorage.setItem('profile_pic',response.data.image);
                dispatch({
                    type: "LOGIN",
                    payload: {
                        status: 'data',
                        data: response.data
                    }
                });
            })
            .catch(error => {
                // Error
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.response.data.message,
                  })
                dispatch({
                    type: "LOGIN",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}


export const getUser = (id) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "GET_USER",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'GET',
            url: url + '/' +id,
            headers:{
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(response => {
                dispatch({
                    type: "GET_USER",
                    payload: {
                        status: 'data',
                        data: response.data
                    }
                });
            })
            .catch(error => {
                // Error
                console.log(error)
                dispatch({
                    type: "GET_USER",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}
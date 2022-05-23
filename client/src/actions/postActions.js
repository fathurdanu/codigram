import axios from 'axios';
import Swal from 'sweetalert2';
const url = 'http://localhost:3000/posts'


export const create = (data) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "CREATE_POST",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'POST',
            url: url + '/create',
            data: data,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(response => {
                Swal.fire(
                    'Success!',
                    'The Post has been created!',
                    'success'
                )
                dispatch({
                    type: "CREATE_POST",
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
                    type: "CREATE_POST",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}

export const updatePost = (id,data) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "UPDATE_POST",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'PUT',
            url: url + '/update/'+id,
            data: data,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(response => {
                Swal.fire(
                    'Success!',
                    'The Post has been updated!',
                    'success'
                )
                dispatch({
                    type: "UPDATE_POST",
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
                    type: "UPDATE_POST",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}

export const deletePost = (id) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "DELETE_POST",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'DELETE',
            url: url + '/delete/' + id,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(async response => {
                await dispatch({
                    type: "DELETE_POST",
                    payload: {
                        status: 'data',
                        data: response.data
                    }
                });
                Swal.fire(
                    'Deleted!',
                    'Your file has been deleted.',
                    'success'
                )
            })
            .catch(error => {
                // Error
                console.log(error)
                dispatch({
                    type: "DELETE_POST",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}

export const likePost = (id) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "LIKE_POST",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'PUT',
            url: url + '/like/' + id,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(async response => {
                await dispatch({
                    type: "LIKE_POST",
                    payload: {
                        status: 'data',
                        data: response.data
                    }
                });
                Swal.fire(
                    'Updated',
                    `Your file has been updated.`,
                    'success'
                )
            })
            .catch(error => {
                // Error
                console.log(error)
                dispatch({
                    type: "LIKE_POST",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}

export const getPosts = (data) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "GET_ALL_POSTS",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'GET',
            url: url,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(response => {
                dispatch({
                    type: "GET_ALL_POSTS",
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
                    type: "GET_ALL_POSTS",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}

export const getPost = (id) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "GET_POST",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'GET',
            url: url + '/detail/' + id,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(response => {
                console.log(response.data)
                dispatch({
                    type: "GET_POST",
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
                    type: "GET_POST",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}

export const getUserPosts = (id) => {
    return (dispatch) => {
        // Loading
        dispatch({
            type: "GET_USER_POSTS",
            payload: {
                status: 'loading',
                data: 'Loading'
            }
        })

        // Success
        axios({
            method: 'GET',
            url: url + '/user/' + id,
            headers: {
                access_token: localStorage.getItem('access_token')
            }
        })
            .then(response => {
                dispatch({
                    type: "GET_USER_POSTS",
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
                    type: "GET_USER_POSTS",
                    payload: {
                        status: 'error',
                        data: error.message
                    }
                });
            });
    }
}


import axios from 'axios'

export const setAuthHeader = token => {
    const JWT = `Bearer ${token}`
    localStorage.setItem('token', JWT)
    axios.defaults.headers.common['Authorization'] = JWT
}
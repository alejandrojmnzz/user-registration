import axios from "axios"

//En este archivo se utiliza axios para hacer las peticiones necesarias al servidor backend de Express
const url = import.meta.env.VITE_BACKEND_URL

function postUser(user) {
    return axios.post(url + "api/users", user)
}

function getUsers() {
    return axios.get(url + "api/users")
}

export default {postUser, getUsers}
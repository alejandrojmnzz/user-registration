import axios from "axios"
//En este archivo se utiliza axios para hacer las peticiones necesarias al servidor backend de Express
const url = "https://shiny-spoon-q79r9q767qg4f6xg-3001.app.github.dev"

function postUser(user) {
    return axios.post(url + "/api/users", user)
}

function getUsers() {
    return axios.get(url + "/api/users")
}

export default {postUser, getUsers}
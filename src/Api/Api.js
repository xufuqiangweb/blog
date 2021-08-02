import axios from 'axios'
let baseUrl = "http://localhost:5000"

export const getHome = (endUrl, obj) => {
    return axios.get(baseUrl + "/api/" + endUrl, obj)
}
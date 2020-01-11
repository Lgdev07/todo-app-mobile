import axios from 'axios'

const api = axios.create({
    baseURL: "https://todo-backend7.herokuapp.com/"
})

export default api
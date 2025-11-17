import axios from 'axios'

const api = axios.create({ baseURL: 'http://localhost:2101/api' })
export default api

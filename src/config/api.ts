import axios from 'axios'

export const apiInstance = axios.create({
    baseURL: `${import.meta.env.VITE_API_BASE_URL}/${import.meta.env.VITE_API_KEY}`
})
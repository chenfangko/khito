import axios from 'axios'
import {url} from './Const'


const apiClient = axios.create({
    baseURL: url.baseUrl,
    withCredentials: false,
    headers: {
        Accept: 'application/json',
        "Content-Type": "image/*",
    },
    timeout: 2000
})
export default apiClient

export const imageService = {
    SaveListPhoto(data) {
        return apiClient.post(`user/save_list_photo`, data)
    },
    
}
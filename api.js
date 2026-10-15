import axios from "axios"

const baseURL=import.meta.env.VITE_API_URL

export const userLogin =async(username, password)=>{
const response=await axios.post(baseURL+ '/todos/login', {username, password})
return response.data
}

export const readTodos= async()=>{
    const response = await axios.get(baseURL)
    return response.data
}

export const addTodo=async (newTodo)=>{
    const response= await axios.post(baseURL, newTodo)
    return response.data 
}

export const deleteTodos=async (id)=>{
    const response= await axios.delete(`${baseURL}/${id}`)
    return response.data 
}
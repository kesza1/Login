import axios from "axios";
import { use } from "react";


const baseUrl = import.meta.env.VITE_API_URL;

export async function login(username, password) {
    const response = await axios.post(baseUrl + "/login", {username, password})
    return response.data;
}

export async function todosGet() {
    return (await axios.get(baseUrl)).data
}

export async function addTodo(task) {
    return (await axios.post(baseUrl, {task})).data
}

export async function deleteTodo(id) {
    return (await axios.delete(baseUrl + `/${id}`)).data
}

export async function patchTodo(id) {
    return (await axios.patch(baseUrl + `/${id}`)).data
}
import { useState } from "react";
//import { todosData } from "../data.js"
import { FaTrashAlt } from "react-icons/fa";
import { Button } from "@heroui/react";
import { FaCheck } from "react-icons/fa";
import { NewTodo } from "./NewTodo.jsx";
import { useEffect } from "react";
import { IoIosLogOut } from "react-icons/io";
import { addTodo, deleteTodo, patchTodo, todosGet } from "../api.js";

export function MyTodos({setIsLoggedIn}) {
    const [data, setData] = useState(null);
    const [remaining, setRemaining] = useState(0);

    useEffect(() => {
        todosGet().then(setData)
    }, [])

    useEffect(() => {
        if (!data) return
        const count = data.filter(({done}) => !done).length
        setRemaining(count)
    }, [data])

    const handleDelete = async (id) => {
        const res = await deleteTodo(id)
        setData(prev=>prev.filter(obj=>obj.id != id))
    }

    const handleCheck = async (id) => {
        const res = await patchTodo(id)
        todosGet().then(setData)
    }

    const handleAdd = async (task) => {
        const res = await addTodo(task);
        todosGet().then(setData)
    }

    return (
        <div className="text-white max-w-3xl m-auto">
            <h2 className="p-3 text-center font-bold">My todos</h2>
            <NewTodo handleAdd={handleAdd}/>
            <ul className="flex flex-col gap-3 shadow-md ">
                {data && data.map(({id, task, complete}) => 
                    <li key={id} className="flex justify-between p-5 bg-blue-500">
                        <Button className={complete ? "bg-green-600": "bg-white"} isIconOnly variant="tertiary" onClick={() => handleCheck(id)}>
                            <FaCheck color={complete ? "green" : "gray"}/>
                        </Button>
                        <div style={{textDecoration: complete ? "line-through" : "none"}}>
                            {task}
                        </div>
                        <Button isIconOnly variant="danger" onClick={() => handleDelete(id)}>
                            <FaTrashAlt/>
                        </Button>
                    </li>
                )}
            </ul>
            <div className="font-bold">
                { remaining != 0 ? "Elvégzetlen feladatok: " + remaining : "Nincs több teendő"} 
            </div>

            <Button onClick={() => setIsLoggedIn(false)} className="fixed top-2 right-2 bg-ind">
                <IoIosLogOut />Kijelentkezés
            </Button>
        </div>
    )
}
import React from 'react'
import { useState } from 'react'
import { ToDosData } from '../data'
import { Button } from '@heroui/react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { NewTodo } from './NewTodo'
import { CiLogout } from "react-icons/ci";
export const Todos = ({setisLoggedIn}) => {
    const [todos, setTodos] = useState(ToDosData)

    console.log('A backend elérése:', import.meta.env.VITE_API_URL);
    
    console.log(todos);
const handleDelete=(id)=>{
    console.log(id);
    setTodos(prev=>prev.filter(obj=>obj.id!=id))

}
const handleAdd=(descr)=>{
        const newTodo={
            id:Date.now(),
            descr, done:false
        }
        setTodos(prev=>[...prev,newTodo])
}
const handleDone=(id)=>{
    setTodos(prev=>prev.map(obj=>obj.id==id ? {...obj, done:!obj.done} : obj))
}
    return (
        <div>
            <h2 className='flex items-center flex-col bg-indigo-950 max-w-3xl m-auto font-bold text-3xl '>Todos</h2>
          <NewTodo handleAdd={handleAdd}/>
            <ul className='flex flex-col gap-3 shadow-md max-w-3xl m-auto'>
                {todos.map(({ id, descr, done }) =>
                    <li key={id} className='flex justify-between p-5 border-b-2'>
                   
<Button isIconOnly variant="tertiary" onClick={()=>handleDone(id)} >
                       <IoCheckmarkDoneCircleSharp style={{color:done ? 'green' : 'gray'}} />
                        </Button>
                      
                        
                        <div style={{textDecoration: done ? "line-through" : ""}} >

                            {descr}
                        </div>
                        <Button isIconOnly aria-label="Delete" variant="danger" onClick={()=>handleDelete(id)}>
                            <FaRegTrashAlt onClick={()=>handleDelete(id)} />
                        </Button>

                    </li>
                )}
            </ul>
            <Button onClick={()=>setisLoggedIn(false)} className='fixed top-2 left-2 bg-indigo-50 text-indigo-950 '>
               <CiLogout/>
                </Button>
        </div>
    )
}




import { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { IoCheckmarkDoneCircleSharp } from 'react-icons/io5'
import { NewTodo } from './NewTodo'
import { CiLogout } from 'react-icons/ci'
import { deleteTodos, readTodos, addTodo } from './api'
import { Message } from './components/Message'


export const Todos = ({ setisLoggedIn }) => {
    const [todos, setTodos] = useState([])
    const [message, setMessage] = useState(null)

    useEffect(() => {
        readTodos()
            .then(setTodos)
            .catch(error => console.log(error))
    }, [])

    const handleDelete = async (id) => {
        try {
            setMessage('')
            const data = await deleteTodos(id)

            setTodos(prev => prev.filter(obj => obj.id !== id))
            setMessage(data.msg)

        } catch (error) {
            setMessage('')
            console.log(error)
            setMessage('Hiba történt a törlés során!')
        }
    }

   const handleAdd = async (task) => {
    try {
        setMessage('')
        console.log('Kapott feladat:', task)

        const data = await addTodo({ task })
        console.log('Backend válasza:', data)

        setTodos(await readTodos())
        setMessage(data.msg)

        setTimeout(() => setMessage(''), 2000)
    } catch (error) {
        setMessage('')
        console.log('Hiba:', error)
        setMessage('Hiba történt a hozzáadás során!')
    }
}

    const handleDone = (id) => {
        setMessage('')
        console.log(id)
    }

    return (
        <div>
            <h2 className='flex items-center flex-col bg-indigo-950 max-w-3xl m-auto font-bold text-3xl text-white'>
                Todos
            </h2>

            <NewTodo handleAdd={handleAdd} />

            <Message message={message} />

            <ul className='flex flex-col gap-3 shadow-md max-w-3xl m-auto'>
                {todos.map(({ id, task, done }) => (
                    <li
                        key={id}
                        className='flex justify-between p-5 border-b-2'
                    >
                        <Button
                            isIconOnly
                            variant='tertiary'
                            onClick={() => handleDone(id)}
                        >
                            <IoCheckmarkDoneCircleSharp
                                style={{ color: done ? 'green' : 'gray' }}
                            />
                        </Button>

                        <div
                            style={{
                                textDecoration: done ? 'line-through' : ''
                            }}
                        >
                            {task}
                        </div>

                        <Button
                            isIconOnly
                            aria-label='Delete'
                            variant='danger'
                            onClick={() => handleDelete(id)}
                        >
                            <FaRegTrashAlt />
                        </Button>
                    </li>
                ))}
            </ul>

            <Button
                onClick={() => setisLoggedIn(false)}
                className='fixed top-2 left-2 bg-indigo-50 text-indigo-950'
            >
                <CiLogout />
            </Button>
            <Message message={message}/>
        </div>
    )
}

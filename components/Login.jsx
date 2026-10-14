import { Button } from "@heroui/react";
import {InputGroup, InputGroupInput, Label, TextField} from "@heroui/react";
import React from "react"
import { userLogin } from "/api.js"
import { useState } from "react";
export const Login = ({setisLoggedIn}) => {
    const [Username, setUsername] = useState('')
    const [Password , setPassword] = useState('')
    const [msg, setmsg] = useState('')



const handleLogin =async ()=>{
   try {
    const data = await userLogin(Username, Password)
    console.log(data);
    
    setisLoggedIn(data.success)
    setmsg(data.msg)
   } catch (error) {
    console.log(error);
    setmsg(error.response?.data?.msg || 'Rossz felhasználó/jelszó')
   }

}



    return (
        <div className="max-w-md m-auto p-4 bg-indigo-400 rounded-2xl">
           <TextField fullWidth name="email">
        <Label>Felhasználónév</Label>
        <InputGroup fullWidth>
        <InputGroup.Input value={Username} onChange={(e)=>setUsername(e.target.value)}/>
       
        </InputGroup>
      </TextField>
      <TextField fullWidth name="password">
        <Label>Jelszó</Label>
        <InputGroup fullWidth>
        <InputGroup.Input placeholder="Enter password" type="password" value={Password} onChange={(e)=>setPassword(e.target.value)}/>
        
        </InputGroup>
      </TextField>
      <Button className='m-4 bg-indigo-950 ' onClick={()=>handleLogin()}>Belépés</Button>
            {msg}
            </div>
    )
}
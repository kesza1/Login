import { InputGroup } from "@heroui/react";
import { Button } from "@heroui/react";
import { Label } from "@heroui/react";
import { TextField } from "@heroui/react";
import { useState } from "react";
import { login } from "../api";

export function Login({setIsLoggedIn}) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [msg, setMsg] = useState("");

    const handleLogin = async () => {
        //if (username == myUsername && password == myPassword) setIsLoggedIn(true)
        //else setMsg("Hibás felhasználónév vagy jelszó!")
        try {
            const data = await login(username, password)
            console.log(data)
            setIsLoggedIn(data.success)
        } catch (err) {
            console.log(err)
            setMsg(err.response?.data?.msg || "Nem sikerült kapcsolódni a szerverhez")
        }

    }

   return (
        <div>
            <h1 className="text-center text-white p-5 text-4xl font-bold">Bejelentkezés</h1>
            <div className="max-w-md m-auto p-4 bg-indigo-400 rounded-2xl">
                <TextField fullWidth name="username" className="gap-4">
                    <Label className="text-white">Felhasználónév</Label>
                    <InputGroup fullWidth>
                        <InputGroup.Input placeholder="Felhasználónév" value={username} onChange={(e) => setUsername(e.target.value)}/>
                    </InputGroup>
                </TextField>
                <TextField fullWidth name="password" className="gap-4 mt-4">
                    <Label className="text-white">Jelszó</Label>
                    <InputGroup fullWidth>
                        <InputGroup.Input placeholder="Jelszó" type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    </InputGroup>
                </TextField>
                <div className="text-red-600 mt-4">{msg}</div>
                <Button className="m-4" onClick={(e) => handleLogin()}>Belépés</Button>
            </div>
        </div>
    )
} 

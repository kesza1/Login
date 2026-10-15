import { useState } from "react";
import { MyTodos } from "./components/MyTodos"
import { Login } from "./components/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  return (
    <div className="bg-blue-950 h-full">
      {isLoggedIn ? <MyTodos setIsLoggedIn={setIsLoggedIn}/> : <Login setIsLoggedIn={setIsLoggedIn}/>}
    </div>
  )
}

export default App
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Home} from "./pages/Home"
import { Signup } from "./pages/Signup";
import { Signin } from "./pages/Signin";
import { Dashboard } from "./pages/Dashboard";
import { Send } from "./pages/Send"

export default function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Home />}/>
            <Route path="/signup" element={ <Signup />}/>
            <Route path="/signin" element={ <Signin />}/>
            <Route path="/dashboard" element={ <Dashboard />}/>
            <Route path="/send" element={ <Send />}/>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}
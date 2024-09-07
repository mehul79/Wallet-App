
import { Heading } from "../components/Heading"
import { Button } from "../components/Button"
import { useNavigate } from "react-router-dom"

export function Home(){

    const navigator = useNavigate()

    return(
        <>
            <div className="pt-56">
                <div>
                    <Heading label={"Welcome"}/>
                </div>
                <div>
                    <Button label="Signin" to={"/signin"} onClick={()=>{
                        navigator("/signin")
                    }}/>
                    <Button label="Signup" to="/signup" onClick={()=>{
                        navigator("/signup")
                    }}/>
                </div>
            </div>
        </>
    )



}
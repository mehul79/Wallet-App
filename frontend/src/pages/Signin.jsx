import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { Warning } from "../components/Warning"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Signin() {

  const[username, setUsername] = useState("")
  const[password, setPassword] = useState("")
  const navigator = useNavigate();




  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="flex items-center justify-center w-screen h-screen bg-slate-400 ">
          <div className="w-1/2 rounded-lg bg-slate-50 h-5/6">
            <div className="pt-3">
              <Heading label={"Sign In"} />
            </div>
            <div className="flex justify-center pt-3">
              <SubHeading
                label={"Enter your Account details to login your account"}
              />
            </div>
            <InputBox label={"Email"} placeholder={"mehulrgupta@gmail.com"} onChange={(e)=>{
              setUsername(e.target.value)
            }}/>
            <InputBox label={"Password"} placeholder={"Mgx"} onChange={(e)=>{
              setPassword(e.target.value)
            }}/>
            <Button label="Sign In" onClick={async()=>{
               const responce = await axios.post("http://localhost:9001/api/v1/user/signin", {
                username: username,
                password: password
              })
              if(responce.status == 200){
                navigator("/dashboard")
              }
              localStorage.setItem("token", responce.data.token)
            }}/>
            <Warning lable="Forgot Password ?" to={"/signup"}/>
          </div>
        </div>
      </div>
    </>
  );
}

import { Heading } from "../components/Heading";
import { SubHeading } from "../components/SubHeading";
import { InputBox } from "../components/InputBox";
import { Button } from "../components/Button";
import { Warning } from "../components/Warning"
import { useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";



export function Signup() {


  const navigator = useNavigate();
  const[firstname, setFirstName] = useState("");
  const[lastname, setLastName] = useState("");
  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");


  return (
    <>
      <div className="flex items-center justify-center h-screen ">
        <div className="flex items-center justify-center size-full bg-slate-400">
          <div className="w-1/2 rounded-lg bg-slate-50 h-5/6">
            <div className="">
              <Heading label={"Sign Up"} />
            </div>
            <div className="flex justify-center pt-3">
              <SubHeading
                label={"Enter your Account details to create an account"}
              />
            </div>
            <InputBox label={"First Name"} placeholder={"John"} onChange={(e)=>{
              setFirstName(e.target.value)
            }} />
            <InputBox label={"Last Name"} placeholder={"Doe"} onChange={(e)=>{
              setLastName(e.target.value)
            }} />
            <InputBox label={"Username"} placeholder={"mehulrgupta@gmail.com"} onChange={(e)=>{
              setUsername(e.target.value)
            }}/>
            <InputBox label={"Password"} placeholder={"Mgx"} onChange={(e)=>{
              setPassword(e.target.value)
            }} />

            
            <Button onClick={async()=>{
              const responce = await axios.post("http://localhost:9001/api/v1/user/signup", {
                username: username,
                password: password,
                firstname: firstname,
                lastname: lastname,
              })
              localStorage.setItem("token", responce.data.token)
              if(responce.status == 200){
                navigator("/dashboard")
              }
            }} label="Sign up" />
            
              <div className="mb-10"> 
                <Warning lable="Alread have a account ?" to={"/signin"} />
              </div>
          </div>
        </div>
      </div>
    </>
  );
}

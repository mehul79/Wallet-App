import { useEffect, useState } from "react";
import { Button } from "./Button";
import {useNavigate} from "react-router-dom"
import axios from "axios";


export function Users({firstname}) {

  const[users, setUser] = useState([])
  const[filter, setFilter] = useState("")
 

  useEffect(()=>{
    axios.get(`http://localhost:9001/api/v1/user/bulk?filter=` + filter)
      .then((responce)=>{
        console.log(responce.data)
        setUser(responce.data)
      })
  }, [filter])
  
  return (
    <>
      <div>
        <div className="pt-8 pl-32 mr-20 font-bold pr-text-lg">Users</div>
        <div className="pl-32 my-2 mr-20">
          <input
            type="text"
            placeholder="Search users..."
            className="w-full px-2 py-1 border rounded border-slate-200"
            onChange={(e)=>{
              setFilter(e.target.value)
            }}
          ></input>
        </div>

        <div>
          {
            users.map((user) => {
              if(user.firstname != firstname){
                 return <User user={user} key={user._id} />
              }
            })
          }
        </div>
      </div>
    </>
  );
}

function User({ user }) {

  const navigator = useNavigate()
  
  return (
    <div className="flex justify-between">
      <div className="flex pl-32">
        <div className="flex justify-center w-8 h-8 mr-2 rounded-full mt-9 bg-slate-200">
          <div className="flex flex-col justify-center h-full text-m">
            {user.firstname[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center pt-9 h-ful">
          <div>
            {user.firstname[0].toUpperCase() + user.firstname.slice(1)} {user.lastname[0].toUpperCase() + user.lastname.slice(1)}
          </div>
        </div>
        {/* <div className="flex flex-col justify-center pt-9 h-ful">
          <div>
            {user._id} 
          </div>
        </div> */}
      </div>

      <div className="w-1/3 h-16 pr-20">
        <Button onClick={()=>{
          navigator(`/send?id=${user._id}&name=${user.firstname}`)
        }} label={"Send Money"} />
      </div>
    </div>
  );
}


import { useEffect, useState } from "react";
import { decodeToken } from "react-jwt";
import axios from "axios";
import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export function Dashboard() {
    const [arr, setArr] = useState([]);
    const [logged, setLogged] = useState("");
    const [balance, setBalance] = useState(0)
    const token = localStorage.getItem("token");
    const id = decodeToken(token).userId;

    useEffect(() => {
        const res_func = async () => {
            const temp = await axios.get("http://localhost:9001/api/v1/user/bulk?filter=");
            setArr(temp.data);
        };
        res_func();
    }, []);

    useEffect(() => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i]._id == id) {
                setLogged(arr[i].firstname);
                break;
            }
        }
    }, [arr, id]);

    useEffect(()=>{
        const res_func = async()=>{
            const temp = await axios.get("http://localhost:9001/api/v1/account/balance", {
                headers: {
                    authorization: `Bearer ${token}`
                }
            })
            setBalance(temp.data.balance);
        }
        res_func()
    }, [])

    return (
        <>
            <div>
                <AppBar name={logged? logged[0].toUpperCase() + logged.slice(1): "" } />
                <Balance value={balance} />
                <Users firstname={logged}/>
            </div>
        </>
    );
}





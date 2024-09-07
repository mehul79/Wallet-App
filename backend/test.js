
const axios = require("axios")
const jsonwebtoken = require("jsonwebtoken")

const token = localStorage.getItem("token");
    try{
        const value =  jsonwebtoken.decode(token);
        const userid = value.userId;
        useEffect(()=>{
            const responce = axios.get("http://localhost:9001/api/v1/user/bulk?filter=")
            console.log(responce.data);
        })
    }catch(e){
        console.log("error");
    }
import { useEffect, useState } from "react"
import { useNavigate,Link } from "react-router-dom"
import axios from 'axios';
import './reg.css'
import "bootstrap/dist/css/bootstrap.min.css";
export default function Login(){
const[email,setEmail] = useState("")
const[password,setPassword] = useState("")
const[error, setError] = useState("")
let navigate = useNavigate()
const Api = "http://localhost:8000/api/login"
  
useEffect(()=>{

  },[])

 const handleSubmit = async (e)=>{
  e.preventDefault()
  setError("")
  try{
   let response = await axios.post(Api, {email:email, password:password})
   let data = JSON.stringify(response.data)
   localStorage.setItem("token", data)
   navigate("/home")
  }catch(error){
    setError(error.message)
  console.error("error in login")
}}

    return(
        <>
        <div className="container">
          <h1  className="text-center text-secondary"> Login Form</h1>
          {error &&  <p  className="text-danger">{error}</p>}
        <form onSubmit={handleSubmit} >
            <label>
               Email:<input type="email" placeholder="enter your email"  value={email}  onChange={(e)=>setEmail(e.target.value)}/>
            </label><br />
            <label>
              Password:<input type="password" placeholder="enter password" value={password} onChange={(e)=>setPassword(e.target.value)}  />
            </label><br />
            <button >submit</button>
        
        <Link to="/registration">Don't have an accound? Register</Link>
        </form>
        </div>
        </>
    )
}
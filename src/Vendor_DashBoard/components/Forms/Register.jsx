
import { useState } from 'react'
import { API_URL } from '../../data/ApiPath'
const Register = ({showLoginHandler}) => {
  const [username, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  //const [loading,setLoading] = useState(true)
  //const [error, setError] = useState('')
  const handleSubmit = async(e)=>{
    e.preventDefault()
    try {
      const response = await fetch(`${API_URL}/vendor/register`,{
        method: 'POST',
        headers: {
          'Content-Type':'application/json'
        },
        body: JSON.stringify({username,email,password})     
       })
       const data = await response.json()
       if(response.ok){
        console.log(data)
        setEmail("")
        setName("")
        setPassword("")
        alert("Vendeor registered sucessfully")
        showLoginHandler()
       }
    } catch (error) {
       console.log("registration failed",error)
       alert("Registration failed")
    }
  }
  return (
    <div className='registerSection'>
      <form action="" className='authForm' onSubmit={handleSubmit}>
      <h3>Vendor Registration</h3>
      <label >User Name</label>
      <input type="text" name='username' value={username} onChange={(e)=>setName(e.target.value)}required placeholder='Enter your Name'/>
        <label >Email</label>
        <input type="text" name='email' value={email} onChange={(e)=>setEmail(e.target.value)} required placeholder='Enter your Email'/>
        <label >Password</label>
        <input type="password" name='password' value={password} onChange={(e)=>setPassword(e.target.value)} required placeholder='Enter your Password'/>
        <button type='submit'>Submit</button>
      </form>
    </div>
  )
}

export default Register

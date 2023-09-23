import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'


import '../../App.css'


async function postData(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
  }



export default function LoginPage() {

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const navigate = useNavigate()

    function token(){
        postData("http://localhost:8000/auth/login/", { "email":email,"password":password })
        .then((data) => {
            if(data.token){
                
                localStorage.setItem("access",data.token.access,)
                localStorage.setItem("refresh",data.token.refresh)
                navigate("/")
            }
        }).catch((error)=>{
            console.error("Login Error",error)
        });
    
    }


    return (
        <div className="text-center m-5-auto">
            <h3>Login to your account</h3>
            <form onSubmit={(e) => e.preventDefault()} >
                <p>
                    <label>Email address</label><br/>
                    <input value={email} onChange={(e) =>setEmail(e.target.value)} type="email" name="email" required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input value={password} onChange={(e) =>setPassword(e.target.value)} type="password" name="password" required />
                </p>

                
                <p>
                    {/* <button id="sub_btn" type="submit" onClick={() => console.log(name)}>Register</button> */}
                      <button id="sub_btn" type="submit" onClick={() => token() }>Login</button>
                </p>
            </form>
            <footer>
            </footer>
        </div>
    )

}

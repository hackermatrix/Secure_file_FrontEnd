import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
// import { Link } from 'react-router-dom'

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



export default function SignUpPage() {

    const [name,setName] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [password2,setPassword2] = useState("")

    const navigate = useNavigate()

    function token(){
        postData("http://localhost:8000/auth/register/", { "name":name,"email":email,"password":password,"password2":password2 })
        .then((data) => {
            if(data.token){
                
                localStorage.setItem("access",data.token.access)
                localStorage.setItem("refresh",data.token.refresh)
                navigate("/")
                
            }
        })
    
    }


    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={(e) => e.preventDefault()} >
                <p>
                    <label>Username</label><br/>
                    <input value={name} onChange={(e) =>setName(e.target.value)} type="text" name="first_name" required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input value={email} onChange={(e) =>setEmail(e.target.value)} type="email" name="email" required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input value={password} onChange={(e) =>setPassword(e.target.value)} type="password" name="password" required />
                </p>
                <p>
                    <label>Confirm Password</label><br/>
                    <input value={password2} onChange={(e) =>setPassword2(e.target.value)} type="password" name="password2" required />
                </p>
                
                <p>
                    {/* <button id="sub_btn" type="submit" onClick={() => console.log(name)}>Register</button> */}
                      <button id="sub_btn" type="submit" onClick={() => token() }>Register</button>
                </p>
            </form>
            <footer>
            </footer>
        </div>
    )

}

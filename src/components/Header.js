import React, { useEffect, useState } from 'react';
import drive from '../assets/drive.png';

import { useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Header() {
  const hiddenFileInput = useRef(null);

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    upload(fileUploaded);
  };

  const upload = (fileUpload) => {
    const formData = new FormData();
    formData.append('file', fileUpload);
    formData.append('category',"TESTING")

    axios
      .post('http://localhost:8000/user/upload', formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      })
      .then((response) => {
        // Handle the response from the server here
        console.log('File uploaded successfully', response);
        window.location.reload();
      })
      .catch((error) => {
        // Handle any errors that occurred during the upload
        console.error('Error uploading file', error);
      });
  };

  const returnToLogin = useNavigate();
  const handleLogOut = ()=>{
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    returnToLogin("/login")
  }

  const [useremail,setUseremail] = useState("");
  useEffect(()=>{
    async function getProfile() {
      try{
    const response = await axios.get('http://localhost:8000/auth/user/profile/',{
        headers:{"Authorization":`Bearer ${localStorage.getItem("access")}`}
      }
      )
      setUseremail(response.data.name)
    }
    catch{
      console.log("CAnnot Fetch user data");
    }

    }
    getProfile();
  }
  
  ,[])

  return (
    <>
      <nav className='flex justify-between items-center p-4 border border-b bg-gray-200 rounded-md mx-4 '>
        <img src={drive} alt='Icon' />
        <span className='border rounded-lg'>
          <input type='text' placeholder='Search' />
          <button>Search</button> {/* Changed button text */}
        </span>

        <ul className='flex pr-12'>
          <li>
            <button
              className='rounded-md w-20 border h-8 bg-blue-600 text-white hover:bg-blue-800'
              onClick={handleClick}
            >
              Upload
              <input
                ref={hiddenFileInput}
                onChange={handleChange}
                style={{ display: 'none' }}
                type='file'
                name='file'
              />
            </button>
          </li>
          
          
          
          {/* <li className='px-4 pt-1 text-black bg-yellow-400 rounded-md mx-1 hover:bg-yellow-300 hover:cursor-pointer'>Profile</li> Capitalized "Profile" */}
          
          {/* Profile DATA */}
          <Dropdown className='mx-2' >
        <Dropdown.Toggle variant="warning" id="dropdown-basic" bsPrefix='dropdown' className='py-1'>
          Profile
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <li><strong className='pl-12'>{useremail}</strong></li>
        </Dropdown.Menu>
        </Dropdown>
          
          
          <li><button onClick={handleLogOut} className='rounded-md w-20 border h-8 bg-red-600 hover:bg-red-800 text-white'>LogOut</button></li>
        </ul>
      </nav>
    </>
  );
}

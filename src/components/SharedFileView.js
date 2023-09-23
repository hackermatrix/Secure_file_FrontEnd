import React from 'react'
import SideBar from './SideBar'
import file from '../assets/file.png'
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SharedFileView() {

    const[sharing,setSharing] = useState([])
    const location = useLocation()
    useEffect(() => {
      const fetchData = async () => {
        try{
          const response = await axios.post("http://localhost:8000/user/get/shared-files",
          {
            "owner_email":location.state.owner_email
          },
          {
            headers:{"Authorization":`Bearer ${localStorage.getItem("access")}`}
          });
          setSharing(response.data.shared_files)
        // console.log(sharing)
        }
        catch{
  
        }
      }
      fetchData()
    
    }, [])

    const navigate = useNavigate();
    
    return (
        <div className='flex justify-start'>
            <SideBar/>
            <div className='grid grid-cols-5 w-3/4 m-4'>
    
                {sharing.map((single)=>(
                    <div key={single['FileID']} className='p-5 border m-4 rounded-lg hover:cursor-pointer' onClick={()=>navigate('/share/fileview',{state:{url:single.FileUrl}})}>
                    <img src={file} alt='Icon' className='h-38 w-32 ml-4 mt-0 mb-2'/>
                    {/* {console.log(single[0].FileName)} */}
                    <strong className='text-center' ><p>{single.FileName}</p></strong>
                    </div>
                ))}
            </div>
        
        
        
        </div>
      )
    }
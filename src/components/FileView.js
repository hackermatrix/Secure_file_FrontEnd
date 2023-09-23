import React, { useEffect, useState } from 'react'
import dis from '../assets/dis.png'
import axios from 'axios'
import del from '../assets/del.png'
import download from '../assets/download.png'
import share from '../assets/share.png'
import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './SideBar'



export default function FileView() {

    const [items,setItems] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:8000/user/listing",{
            headers:{"Authorization":`Bearer ${localStorage.getItem("access")}`}
        })
        .then((res)=>{
            setItems(res.data)
        })
        
    },[]);


    const handleDelete = (fileID)=>{
        axios.get(`http://localhost:8000/user/file/delete?fileid=${fileID}`,{
            headers:{"Authorization":`Bearer ${localStorage.getItem("access")}`}
        })
        .then(()=>{
            window.location.reload();
        })
        
    }

    const handleDownload = (fileID,FileName)=>{ 


            axios({
                method: 'get',
                url: `http://localhost:8000/user/file/download?fileid=${fileID}`,
                responseType: 'blob', // This tells Axios to expect binary data
                headers:{"Authorization":`Bearer ${localStorage.getItem("access")}`}
              })
                .then((response) => {
                  // Create a URL for the binary data
                  const url = window.URL.createObjectURL(new Blob([response.data]));
          
                  // Create a temporary <a> element to trigger the download
                  const link = document.createElement('a');
                  link.href = url;
          
                  // Set the filename for the downloaded file
                  link.setAttribute('download', FileName);
          
                  // Trigger the download
                  link.click();
          
                  // Release the object URL
                  window.URL.revokeObjectURL(url);
                })
                .catch((error) => {
                  console.error('Error downloading binary data', error);
                });
        };


        // const [link,setLink] = useState("")
        // const handleShare = (FileID)=>{
        //     let url = 'http://localhost:3000/share/file/'

        //     axios.get(`http://localhost:8000/user/file/share/link?fileid=${FileID}`,
        //     {
        //         headers:{"Authorization":`Bearer ${localStorage.getItem("access")}`}
        //     }
        //     )
        //     .then((res)=>{
        //         setLink(url+res.data.token)
        //     })
        // }


        //Fetch The Email list
        const [emails,setEmails] = useState([])
        const handleFetchEmails = ()=>{
            axios.get(`http://localhost:8000/user/get/emails`,
            {
                headers:{"Authorization":`Bearer ${localStorage.getItem("access")}`}
            }
            )
            .then((res)=>{
                setEmails(res.data.emails)
            })
        }


        
        //Send List of selected emails
        const [selectedEmails,setSelectedEmails] = useState([])
        const [expiry,setExpiry] = useState()

        const handleCheckboxChange = (event) => {
            const email = event.target.value;

            if (event.target.checked) {
              setSelectedEmails([...selectedEmails, email]);
            } else {
              setSelectedEmails(selectedEmails.filter((email) => email !== this.email));
            }
        };

  const handleSubmit = (fileID) => {
    axios.post(`http://localhost:8000/user/share/email-list`,
    {
        "fileid":fileID,
        "emails":selectedEmails,
        "expiry":expiry
      },{
                headers:{"Authorization":`Bearer ${localStorage.getItem("access")}`}
              })
      .then(response => {
        console.log(response.data.msg)
      })
      .catch(error => {
        // Error
      });
    console.log(selectedEmails)
  };




  return (
    
    <div className='flex justify-start'>
        <SideBar/>
    <div className='grid grid-cols-5 m-4'>
        {items.map((obj) => (
                <div key={obj.FileID} className='p-1 border m-4 rounded-lg'>
                <img src={dis} alt='Icon' className='h-48'/>
               <div className='flex flex-col justify-between'> 
               <strong className='text-center'><p>{obj.FileName}</p></strong>
               <span className='grid grid-cols-3 gap-3 my-2'>
                <button className='bg-green-500 p-2 text-white rounded-lg hover:bg-green-600  ' onClick={()=>handleDownload(obj.FileID,obj.FileName)}>
                    <img className=' h-8 pl-1'src={download} alt='download'/>
                </button>
                
                
                {/* share Button code  */}
                <Dropdown>
                
                <div onClick={()=>handleFetchEmails()}>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic" bsPrefix='dropdown'>
                    <img className='h-8 px-0' src={share} alt='share'></img>
                    </Dropdown.Toggle>
                </div>
              
               <Dropdown.Menu>
                {emails.map((email)=> (
                        <li className='px-1' key={email.email}>
                          <span className='flex justify-center'>
                            <input className='w-10 my-1'type="checkbox" value={email.email} checked={selectedEmails.includes(email.email)} onChange={handleCheckboxChange} />
                             <span>{email.email}</span>
                          </span> 
                        </li>
                    
                ))}

                {/* time inp */}

                <span className=' border flex rounded-lg h-6'>
                  <input className=' ml-1 w-8 text-center border-solid border-gray-400 border-1 ' onChange={(e) =>setExpiry(e.target.value)} type='text'/>
                  <span className='border-l px-1 '>Min</span>
                </span>
                
                
                {/* submit */}
                <Dropdown.Item>
                <button className='bg-green-400 rounded-md p-1 mt-2  text-white hover:bg-green-500' onClick={()=>handleSubmit(obj.FileID)}>Share</button>  
                </Dropdown.Item>
               </Dropdown.Menu>
               
               </Dropdown>





                
                <button className='bg-red-500 text-white rounded-lg hover:bg-red-600 p-2' onClick={()=>handleDelete(obj.FileID)}>
                    <img className=' h-8 pl-1' src={del} alt='delete'/>
                </button>
                </span>
                               </div>
            </div>           
        ))}

    </div>
    </div>
  )
}

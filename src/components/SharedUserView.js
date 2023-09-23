import React from 'react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import owner from '../assets/owner.png';
import SideBar from './SideBar';
import { useNavigate } from 'react-router-dom';

export default function SharedUserView() {

  const [sharing, setSharing] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/user/get/shared-file-user', {
          headers: { Authorization: `Bearer ${localStorage.getItem('access')}` },
        });
        setSharing(response.data.sharing_users);
        console.log(...sharing, response.data.sharing_users[0]);
      } catch {}
    };
    fetchData();
  }, []);

 
  const navigate = useNavigate();
  return (
    <div className='flex justify-start'>
      <SideBar />
      {sharing.length === 0 ? (
        <h2 className='text-center ml-80 mt-40 '>No files are shared.</h2>
      ) : (
        <div className='grid grid-cols-5 m-4'>
          {sharing.map((user) => (
            <div
              key={user['Email']}
              onClick={() => navigate('/share/filelist', { state: { owner_email: user['Email'] } })}
              className='p-5 border m-4 rounded-lg hover:cursor-pointer'
            >
              <img src={owner} alt='Icon' className='h-38 w-32 ml-4 mt-0 mb-2' />
              <strong className=''>{user['Email']}</strong>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
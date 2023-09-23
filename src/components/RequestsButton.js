import Dropdown from 'react-bootstrap/Dropdown';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Requests() {
  const [notify, setNotify] = useState([]);

  useEffect(() => {
    // Fetch notifications when the component mounts
    handleFetch();
  }, []);

  const handleFetch = () => {
    axios
      .get(`http://localhost:8000/user/get/notify`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      })
      .then((res) => {
        setNotify(res.data);
      })
      .catch((error) => {
        console.error('Error Getting Notifications', error);
      });
  };

  const [expiry,setExpiry] = useState()

  const handleAction = (notificationId, action) => {
    // Send Allow or Deny request to the backend
    console.log(`This is the id :${notificationId}`)
    axios
      .post(`http://localhost:8000/user/get/action`, {
        notification_id: notificationId,
        action: action, // 'allow' or 'deny'
        expiry_time:expiry
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
      })
      .then(() => {
        // Update the UI after Allow or Deny action
        handleFetch();
      })
      .catch((error) => {
        console.error('Error Processing Action', error);
      });
  };

  return (
    <Dropdown>
      <div onClick={handleFetch}>
        <Dropdown.Toggle variant="warning" id="dropdown-basic">
          Requests
        </Dropdown.Toggle>
      </div>
      <Dropdown.Menu>
        {notify.map((single, index) => (
          
          <li key={index} className='border p-1 my-0' >
            <span className='flex gap-3 m-1'>
              <span>{single.Requester}</span>
              <span>{single.File}</span>
              <span className='border flex rounded-lg h-6'><input className='w-8 text-center' onChange={(e) =>setExpiry(e.target.value)} type='text'/><span className='border-l px-1 '>Min</span></span>
              <button className='bg-green-400 hover:bg-green-500 rounded-lg px-2 text-white' onClick={() => handleAction(single.id, 'allow')}>Allow</button>
              <button className='bg-red-400 hover:bg-red-500 rounded-lg px-2 text-white' onClick={() => handleAction(single.id, 'deny')}>Deny</button>
            </span>
          </li>

        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default Requests;

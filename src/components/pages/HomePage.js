import Header  from '../Header'
import React, { useEffect } from 'react'
import FileView from '../FileView'
import { useNavigate } from 'react-router-dom'


export default function HomePage() {
    const returnToLogin = useNavigate();
  
    useEffect(() => {
      if (!localStorage.getItem("access")) {
        returnToLogin("/login");
      }
    }, [returnToLogin]);
  
    // Conditional rendering based on the presence of "access" token
    if (!localStorage.getItem("access")) {
      returnToLogin("/login")
      return null; 
    }
  
    return (
      <div>
        <Header />
        <FileView />
      </div>
    );
  }
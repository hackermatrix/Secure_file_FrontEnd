import React from 'react'
import { useNavigate } from 'react-router-dom'
import { CDBSidebar, CDBSidebarMenu, CDBSidebarMenuItem } from 'cdbreact';

export default function SideBar() {


    //To The UserListing 
    const navigate = useNavigate();
  return (
    <CDBSidebar className='rounded-md mt-12 ml-4'>
      <CDBSidebarMenu>
        <CDBSidebarMenuItem className='hover:bg-blue-800' onClick={() => navigate('/')}>Home</CDBSidebarMenuItem>
        <CDBSidebarMenuItem className='hover:bg-blue-800' onClick={() => navigate('/share/fileuserlist')}>Shared Files</CDBSidebarMenuItem>
      </CDBSidebarMenu>
    </CDBSidebar>
  );
};

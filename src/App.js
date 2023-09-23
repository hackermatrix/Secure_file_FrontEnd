import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'


// import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/pages/LoginPage'
import RegisterPage from './components/pages/RegisterPage'
// import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
import HomePage from './components/pages/HomePage'

import './App.css'
import SharedFilePage from './components/pages/SharedFilePage'
import ListSharedFiles from './components/pages/ListSharedFiles'
import ViewerPage from './components/pages/ViewerPage'

export default function App() {
    return (
        <Router>
            <div>
            
                <Routes>
                    <Route path="/" element={ <HomePage/> } />
                    <Route path="/login" element={ <LoginPage/> } />
                    <Route path="/register" element={ <RegisterPage/> } />
                    <Route path='/share/fileuserlist' element={<SharedFilePage/>}/>
                    <Route path='/share/filelist' element={<ListSharedFiles/>}/>
                    <Route path='/share/fileview' element={<ViewerPage/>}/>
                    
                    {/* <Route exact path="/" component={ LandingPage } /> */}
                    {/* <Route path="/forget-password" component={ ForgetPasswordPage } /> */}
                </Routes>
            </div>
        </Router>
    )
}



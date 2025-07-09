import React from 'react'
import { Outlet } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './footer/Footer';



const Layout = () => {
  return (
    <div className="App">
      <div className='container'>
        <div className="container-fluid">
          <Outlet />
        </div>
      
      </div>
      <Footer/>
    </div>

  )
}

export default Layout
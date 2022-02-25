import React from 'react'
import Signup from '../component/Home/signup';
import Login from '../component/Home';
import Dashboard from '../component/Home/Dashboard';
import { Routes,Route } from 'react-router-dom';
import CardDetail from '../component/Home/Card-Detail';
const Mainrouting = () => {
  return (
      <div>
    <Routes>
      <Route path="/Login" element={<Login />} />
      <Route path="/" element={<Signup />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/carddetail/:ShopName" element={<CardDetail />} />
      </Routes>
      </div>
  )
}

export default Mainrouting;
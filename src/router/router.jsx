import React from 'react';
import {  Routes, Route } from "react-router-dom";
import Chat from '../components/Chat';
import Login from '../components/login';
  
const Router = () => {
    return (
        <>
    <Routes>
        <Route path= "/" element={<Login/>} />
        <Route path= "/:id" element={<Chat/>} />
    </Routes>

       
            
        

          </>
    );
};

export default Router;
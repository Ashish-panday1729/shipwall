import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Context from './Components/ContextProvider/Context';
import Login from './Components/Login';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Context>
    <BrowserRouter>




      <Routes>
        <Route path='/' element={<Login />} />
      </Routes>
      <div className='main-wrapper'>
        <App />
      </div>
    </BrowserRouter>
  </Context>


);



import React, { useContext, useEffect } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { LoginContext } from './ContextProvider/Context';

const Dashboard = () => {
  const navigate = useNavigate();
  
  const { loginData, setLoginData } = useContext(LoginContext);
  let token = localStorage.getItem("usersdatatoken");


  const dashValid = async () => {
    await axios.get("/validUser", {
      headers: {
        "Content-Type": "application/json",
        "Authorization": token
      }
    })
      .then((res) => {
        console.log(res.data);
        setLoginData(res.data.validUserOne);

      })
      .catch(err => {
        console.log(err)
        navigate("*")
      })
  }

  useEffect(() => {
    dashValid()
  }, []);
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h3 className='mb-3'>Admin Details</h3>
      <h5>Email:{loginData ? loginData.email : ""}</h5>
      <h5>Name:{loginData.fname}</h5>
    </div>
  )
}

export default Dashboard

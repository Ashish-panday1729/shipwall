import { Radio } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import Man from '../../Man.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { addData } from '../../Components/ContextProvider/Context';
import { useNavigate } from 'react-router-dom';



const RegisterUser = () => {
  // Routing Protection is here----------------->
  let token = localStorage.getItem("usersdatatoken");
  const dashValid = async () => {
    try {
      const res = await axios.get("/validUser", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": token
        }
      });
      // console.log(res.data);
    } catch (error) {
      console.log("Validation error::", error);
      navigate("*");
    }
  };
  //Routing Protection ends here------------->

  const { useradd, setUseradd } = useContext(addData);
  const navigate = useNavigate();


  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    cpassword: "",
    mobile: "",
    gender: "",
    location: ""
  });
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [preview, setPreview] = useState("");

  // setInput Value
  const setInputValue = (e) => {
    const { name, value } = e.target;
    setInputData({ ...inputdata, [name]: value })
  };

  // status getting here
  const setStatusValue = (e) => {
    setStatus(e.value);

  };

  // image getting here
  const setProfile = (e) => {
    setImage(e.target.files[0]);

  };

  // Submit User data
  const submitUserData = (e) => {
    e.preventDefault();
    const { fname, lname, email, mobile, gender, location, password, cpassword } = inputdata


    if (fname === "") {
      toast.error("First name is Required !")
    } else if (lname === "") {
      toast.error("Last name is Required !")
    } else if (email === "") {
      toast.error("Email is Required !")
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email !")
    } else if (mobile === "") {
      toast.error("Mobile is Required !")
    } else if (password === "") {
      toast.error("Enter Password")
    } else if (cpassword === '') {
      toast.error("Enter cpassword!")
    } else if (password !== cpassword) {
      toast.error("Password and conform password not matched!")
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f")
    } else if (gender === "") {
      toast.error("Gender is Required !")
    } else if (status === "") {
      toast.error("Status is Required !")
    } else if (image === "") {
      toast.error("Profile is Required !")
    } else if (location === "") {
      toast.error("location is Required !")
    } else {
      // api call here
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("password", password);
      data.append("cpassword", cpassword);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image);
      data.append("location", location);


      console.log("FormData", data);
      console.log("Image", image);

      axios.post("/admins/users/register", data, {
        headers: {
          "Content-Type": "multipart/form-data", // Correct content type for FormData
          "Authorization": token
        }
      })
        .then((res) => {
          console.log(res);
          setUseradd(res.data.userData)
          console.log(useradd.fname)
          setInputData({
            ...inputdata, fname: "", lname: "", email: "", mobile: "", gender: "", location: "", password: "", cpassword: ""
          })
          toast.success("Registration successfully Done!");
          setStatus("Active");
          setImage(""); // Clear the image state
          setPreview(""); // Clear the preview state
          navigate("/home-page")
        })

        .catch((err) => {
          toast.error("Something went wrong !")
        });

    }
  }

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }
  }, [image])


  return (
    <>
      <div className='container mt-1'>
        <h4 className='text-center mb-5'>Registration Form</h4>
        <form className="row">
          <div className='text-center'>
            <img src={preview ? preview : Man} style={{ height: "86px", borderRadius: "50px", width: "86px" }} alt="Img" />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              First Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name='fname'
              onChange={setInputValue}
              value={inputdata.fname}
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Last Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name='lname'
              value={inputdata.lname}
              onChange={setInputValue}
            />
          </div>


          <div className="mb-4 col-md-4">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name='email'
              onChange={setInputValue}
              value={inputdata.email}
            />

          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name='password'
              onChange={setInputValue}
              value={inputdata.password}
            />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name='cpassword'
              onChange={setInputValue}
              value={inputdata.cpassword}
            />
          </div>

          <div className="mb-3 col-md-4">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Mobile
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name='mobile'
              value={inputdata.mobile}
              onChange={setInputValue}
            />
          </div>

          <div className='col-md-4'>
            Select your gender
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="maleRadio"
                value="Male"
                onChange={setInputValue}

              />
              <label className="form-check-label" htmlFor="maleRadio">
                Male
              </label>
            </div>
            <div className="form-check">
              <input
                className="form-check-input"
                type="radio"
                name="gender"
                id="femaleRadio"
                value="Female"
                onChange={setInputValue}
              />
              <label className="form-check-label" htmlFor="femaleRadio">
                Female
              </label>
            </div>
          </div>

          <div className='col-md-4'>
            Select status
            <Select
              // value={selectedOption}
              onChange={setStatusValue}
              options={options}
            />
          </div>

          <div className="mb-3 col-md-4 mt-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Select your profile
            </label>
            <input
              type="file"
              className="form-control"
              id="exampleInputPassword1"
              name='user_profile'
              onChange={setProfile}
            // value={image}
            />
          </div>

          <div className="mb-3 col-md-4 mt-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Enter location
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              name='location'
              onChange={setInputValue}
              value={inputdata.location}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3" onClick={submitUserData}>
            Submit
          </button>
        </form>
      </div>

      <ToastContainer position='top-center' />



    </>
  )
}

export default RegisterUser
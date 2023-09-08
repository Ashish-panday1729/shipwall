import { Radio } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Form from 'react-bootstrap/Form';
import Select from 'react-select';
import Man from '../../Man.png'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios'

const Edit = () => {
  const navigate = useNavigate();
  const options = [
    { value: 'Active', label: 'Active' },
    { value: 'InActive', label: 'InActive' },
  ];

  const [inputdata, setInputData] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    gender: "",
    location: ""
  });
  // console.log(inputdata)
  const [status, setStatus] = useState("Active");
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState("");
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
    const { fname, lname, email, mobile, gender, location } = inputdata


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
    } else if (mobile.length > 10) {
      toast.error("Enter Valid Mobile!f")
    } else if (gender === "") {
      toast.error("Gender is Required !")
    } else if (status === "") {
      toast.error("Status is Required !")
    } else if (!image && imageData === "") {
      toast.error("Prfile photo is Required !")
    } else if (location === "") {
      toast.error("location is Required !")
    } else {
      // toast.success("Registeration successfully Done!")
      const data = new FormData();
      data.append("fname", fname);
      data.append("lname", lname);
      data.append("email", email);
      data.append("mobile", mobile);
      data.append("gender", gender);
      data.append("status", status);
      data.append("user_profile", image || imageData);
      data.append("location", location);

      axios.post(`/user/edit/${id}`, data)
        .then((res) => {
          console.log(res);
          alert("Successfully Data Updated!")
          navigate("/home-page")
        })
        .catch((err) => {
          console.log(err);
        })
    }
  };

  // getting user data for update
  const { id } = useParams();
  const getUserData = async () => {
    try {
      const resp = await axios.get(`/user/${id}`);
      console.log(resp);
      setInputData(resp.data)
      setStatus(resp.data.status);
      setImageData(resp.data.profile);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image))
    }
    getUserData();
  }, [image])
  return (
    <>
      <div className='container mt-1'>
        <h4 className='text-center mb-5'>Update Your Details</h4>
        <form className="row">
          <div className='text-center'>
            <img src={preview ? preview : `/uploads/${imageData}`} style={{ height: "86px", borderRadius: "50px", width: "86px" }} alt="Img" />
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
                checked={inputdata.gender === "Male" ? true : false}
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
                value="female"
                checked={inputdata.gender === "female" ? true : false}
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
              defaultValue={status}
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
              onChange={setProfile}
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

export default Edit

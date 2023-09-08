import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Card from "react-bootstrap/Card"
import Row from 'react-bootstrap/esm/Row'
import "./profile.css"
import Spiner from '../../Components/spiner/Spiner';
import { addData } from '../../Components/ContextProvider/Context';
import { useParams } from 'react-router-dom';
import moment from 'moment'

const Profile = () => {
  const [showspin, setShowSpin] = useState(true);

  const { useradd, setUseradd } = useContext(addData);

  const { id } = useParams();
  //  get single user details api
  const [singleUser, setSingleUser] = useState({});
  const userDetails = async () => {
    try {
      const res = await axios.get(`/user/${id}`)
      console.log(res.data);
      setSingleUser(res.data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    userDetails();
    setTimeout(() => {
      setShowSpin(false);
    }, 1200)
  }, [])
  return (
    <>
      {
        showspin ? <Spiner /> : <div className="container">
          <Card className='card-profile shadow col-lg-6 mx-auto mt-5'>
            <Card.Body>
              <Row>
                <div className="col">
                  <div className="card-profile-stats d-flex justify-content-center">
                    <img src={`/uploads/${singleUser.profile}`} alt="Image" />
                  </div>
                </div>
              </Row>
              <div className='text-center'>
                <h3>{singleUser.fname + " " + singleUser.lname}</h3>
                <h4><i class="fa-solid fa-envelope email"></i>&nbsp;:- <span>{singleUser.email}</span> </h4>
                <h5><i class="fa-solid fa-mobile"></i>&nbsp;:- <span>{singleUser.mobile}</span> </h5>
                <h4><i class="fa-solid fa-person"></i>&nbsp;:- <span>{singleUser.gender}</span> </h4>
                <h4><i class="fa-solid fa-location-pin location"></i>&nbsp;:- <span>{singleUser.location}</span> </h4>
                <h4>Status&nbsp;:- <span>{singleUser.status}</span> </h4>
                <h5><i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Created&nbsp;:- <span>{moment(singleUser.dateCreated).format("DD/MM/YYYY")}</span> </h5>
                <h5> <i class="fa-solid fa-calendar-days calendar"></i>&nbsp;Date Updated&nbsp;:- {moment(singleUser.dateUpdated).format("DD/MM/YYYY")}<span></span> </h5>
              </div>
            </Card.Body>
          </Card>
        </div>
      }

    </>
  )
}

export default Profile

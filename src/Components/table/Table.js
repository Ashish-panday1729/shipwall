import './table.css'
import React, { useContext, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import Row from 'react-bootstrap/Row';
import Card from 'react-bootstrap/Card';
import Table from 'react-bootstrap/Table';
import Dropdown from 'react-bootstrap/Dropdown';
import Badge from 'react-bootstrap/Badge';
import Man from "../../Man.png"
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { LoginContext } from '../ContextProvider/Context';
import Paginations from '../pagination/Paginations';

const Tables = ({ userdata, deleteUser, getUserData, handlePreview, handleNext, page, pageCount, setPage }) => {
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
                // console.log(res.data);
                setLoginData(res.data.validUserOne);

            })
            .catch(err => {
                console.log(err);
                navigate("*")
            })
    }

    useEffect(() => {
        dashValid();
    }, []);

    const handleChange = async (id, status) => {
        try {
            const res = await axios.put(`/user/status/${id}`, { status });
            console.log(res);
            getUserData();
            toast.success("Status Updated Successfully!")
        } catch (error) {
            console.log(error);
        }
        // console.log(id, status)
    }

    return (
        <>
            <div>
                <Row>
                    <div>
                        <Card className=''>
                            <Table className='align-items-center' responsive="sm">
                                <thead className=''>
                                    <tr>
                                        <th>ID</th>
                                        <th>FullName</th>
                                        <th>Email</th>
                                        <th>Gender</th>
                                        <th>&nbsp;&nbsp;&nbsp;Status</th>
                                        <th>Profile</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        userdata.length > 0 ? userdata.map((element, index) => {
                                            return (
                                                <tr>
                                                    <td>{index + 1}</td>
                                                    <td>{element.fname + " " + element.lname}</td>
                                                    <td>{element.email}</td>
                                                    <td>{element.gender === "female" ? "F" : "M"}</td>
                                                    <td>
                                                        <Dropdown className='text-center'>
                                                            <Dropdown.Toggle className='dropdown_btn' id="dropdown-basic">
                                                                <Badge bg={element.status === "Active" ? "primary" : "danger"}>
                                                                    {element.status} <i class="fa-solid fa-angle-down"></i>
                                                                </Badge>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item onClick={() => handleChange(element._id, "Active")}>Active</Dropdown.Item>
                                                                <Dropdown.Item onClick={() => handleChange(element._id, "InActive")}>InActive</Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                    <td className='img_parent'>
                                                        {/* <img src={`/uploads/${element.profile}`} alt="img" /> */}
                                                        <img src={element.profile} alt="img" />
                                                    </td>
                                                    <td>
                                                        <Dropdown>
                                                            <Dropdown.Toggle variant='light' className='action' id="dropdown-basic">
                                                                <i class="fa-solid fa-ellipsis-vertical"></i>
                                                            </Dropdown.Toggle>
                                                            <Dropdown.Menu>
                                                                <Dropdown.Item >
                                                                    <Link to={`/user-profile/${element._id}`}><i class="fa-solid fa-eye" style={{ color: "green" }} ></i> <span>View</span></Link>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item >
                                                                    <Link to={`/edit-user/${element._id}`}> <i class="fa-solid fa-pen-to-square" style={{ color: "blue" }}></i> <span>Edit</span> </Link>
                                                                </Dropdown.Item>
                                                                <Dropdown.Item >
                                                                    <div>
                                                                        <Link onClick={() => deleteUser(element._id)}><i class="fa-solid fa-trash" style={{ color: "red" }}></i> <span>Delete</span></Link>
                                                                    </div>
                                                                </Dropdown.Item>
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            )
                                        }) : <div>No Data Found</div>
                                    }
                                </tbody>
                            </Table>

                        </Card>
                    </div>
                </Row>
                <ToastContainer position='top-center' />
            </div>

            <Paginations
                handlePreview={handlePreview}
                handleNext={handleNext}
                page={page}
                pageCount={pageCount}
                setPage={setPage}
            />

        </>
    )
}

export default Tables

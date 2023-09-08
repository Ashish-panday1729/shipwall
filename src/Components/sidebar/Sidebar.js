import React, { useContext, useState } from 'react'
import { LoginContext } from '../ContextProvider/Context';


import dashboardIcon from "../../assets/img/icons/dashboard.svg"
import productIcon from "../../assets/img/icons/product.svg"
import users1Icon from "../../assets/img/icons/users1.svg"
import timeIcon from "../../assets/img/icons/time.svg"
import settingsIcon from "../../assets/img/icons/time.svg"
import "./sidebar.css"

const Sidebar = () => {
    const { loginData, setLoginData } = useContext(LoginContext);
    // console.log(loginData._id)
    const [isProductSubMenuOpen, setIsProductSubMenuOpen] = useState(false);
    const [isSalesMenueOpen, setIsSalesMenueOpen] = useState(false);
    const [isCustomerOpen, setIsCustomerOpen] = useState(false)
    const [isReport, setIsRepiort] = useState(false)
    const [isUser, setIsUser] = useState(false)
    const [isSetting, setIsSetting] = useState(false)




    const toggleProductSubMenu = () => {
        setIsProductSubMenuOpen(!isProductSubMenuOpen);
        setIsSalesMenueOpen(false);
        setIsCustomerOpen(false);
        setIsRepiort(false);
        setIsUser(false);
        setIsSetting(false);
    };

    const togglSales = () => {
        setIsSalesMenueOpen(!isSalesMenueOpen);
        setIsProductSubMenuOpen(false);
        setIsCustomerOpen(false);
        setIsRepiort(false);
        setIsUser(false);
        setIsSetting(false);

    };

    const togglCustomar = () => {
        setIsCustomerOpen(!isCustomerOpen);

        setIsRepiort(false);
        setIsProductSubMenuOpen(false);
        setIsUser(false);
        setIsSetting(false);
        setIsSalesMenueOpen(false)
    };

    const toggleReport = () => {
        setIsRepiort(!isReport);

        setIsUser(false);
        setIsProductSubMenuOpen(false);
        setIsSetting(false);
        setIsSalesMenueOpen(false);
        setIsCustomerOpen(false)
    };
    const togglUser = () => {
        setIsUser(!isUser);

        setIsSetting(false);
        setIsProductSubMenuOpen(false);
        setIsSalesMenueOpen(false);
        setIsCustomerOpen(false)
        setIsRepiort(false);
    };

    const togglSetting = () => {
        setIsSetting(!isSetting);

        setIsUser(false)
        setIsProductSubMenuOpen(false);
        setIsSalesMenueOpen(false);
        setIsCustomerOpen(false)
        setIsRepiort(false);
    };

    return (
        <>

            {
                loginData._id ?
                    <>
                        <div className="sidebar showSidebar" id="sidebar">
                            <div className="sidebar-inner slimscroll">
                                <div id="sidebar-menu" className="sidebar-menu">
                                    <ul>
                                        <li className="active">
                                            <a href="#.">
                                                <img src={dashboardIcon} alt="img" ></img>
                                                <span> Dashboard</span>{" "}
                                            </a>
                                        </li>
                                        <li className={isProductSubMenuOpen ? "active submenu" : "inactive submenu"} onClick={toggleProductSubMenu}>
                                            <a className='subdrop' href="javascript:void(0);">
                                                <img src={productIcon} alt="img"></img>
                                                <span> Product</span> <span className="menu-arrow" />
                                            </a>
                                            <ul>
                                                <li>
                                                    <a href="#.">Product List</a>
                                                </li>
                                                <li>
                                                    <a href="#.">Brand List</a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li className={isSalesMenueOpen ? "active submenu" : "inactive submenu"} onClick={togglSales}>
                                            <a href="javascript:void(0);">
                                                <img src={users1Icon} alt="img"></img>
                                                <span> Sales</span> <span className="menu-arrow" />
                                            </a>
                                            <ul>
                                                <li><a href="#.">Sales List</a></li>
                                                <li><a href="#.">New Sales</a></li>
                                                <li><a href="#.">Sales Return List</a></li>
                                                <li><a href="#.">New Sales Return</a></li>
                                            </ul>
                                        </li>
                                        <li className={isCustomerOpen ? "active submenu" : "inactive submenu"} onClick={togglCustomar}>
                                            <a href="javascript:void(0);">
                                                <img src={users1Icon} alt="img"></img>
                                                <span> Customer</span> <span className="menu-arrow" />
                                            </a>
                                            <ul>
                                                <li><a href="#.">Customer List</a></li>
                                                <li><a href="#.">Add Customer</a></li>
                                            </ul>
                                        </li>
                                        <li className={isReport ? "active submenu" : "inactive submenu"} onClick={toggleReport}>
                                            <a href="javascript:void(0);">
                                                <img src={timeIcon} alt="img"></img>
                                                <span> Report</span> <span className="menu-arrow" />
                                            </a>
                                            <ul>
                                                <li><a href="#.">Inventory Report</a></li>
                                                <li><a href="#.">Sales Report</a></li>
                                                <li><a href="#.">Invoice Report</a></li>
                                                <li><a href="#.">Customer Report</a></li>
                                            </ul>
                                        </li>
                                        <li className={isUser ? "active submenu" : "inactive submenu"} onClick={togglUser}>
                                            <a href="javascript:void(0);">
                                                <img src={users1Icon} alt="img"></img>
                                                <span> Users</span> <span className="menu-arrow" />
                                            </a>
                                            <ul>
                                                <li><a href="#.">New User </a></li>
                                                <li><a href="#.">Users List</a></li>
                                            </ul>
                                        </li>
                                        <li className={isSetting ? "active submenu" : "inactive submenu"} onClick={togglSetting}>
                                            <a href="javascript:void(0);">
                                                <img src={settingsIcon} alt="img"></img>
                                                <span> Settings</span> <span className="menu-arrow" />
                                            </a>
                                            <ul>
                                                <li><a href="#.">General Settings</a></li>
                                                <li><a href="#.">Email Settings</a></li>
                                                <li><a href="#.">Payment Settings</a></li>
                                                <li><a href="#.">Currency Settings</a></li>
                                            </ul>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </>
                    : ""
            }
            {/* <div className="sidebar" id="sidebar">
                <div className="sidebar-inner slimscroll">
                    <div id="sidebar-menu" className="sidebar-menu">
                        <ul>
                            <li className="active">
                                <a href="#.">
                                    <img src={dashboardIcon} alt="img" ></img>
                                    <span> Dashboard</span>{" "}
                                </a>
                            </li>
                            <li className="submenu">
                                <a href="javascript:void(0);">
                                    <img src={productIcon} alt="img"></img>
                                    <span> Product</span> <span className="menu-arrow" />
                                </a>
                                <ul>
                                    <li>
                                        <a href="#.">Product List</a>
                                    </li>
                                    <li>
                                        <a href="#.">Brand List</a>
                                    </li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <a href="javascript:void(0);">
                                    <img src={users1Icon} alt="img"></img>
                                    <span> Sales</span> <span className="menu-arrow" />
                                </a>
                                <ul>
                                    <li><a href="#.">Sales List</a></li>
                                    <li><a href="#.">New Sales</a></li>
                                    <li><a href="#.">Sales Return List</a></li>
                                    <li><a href="#.">New Sales Return</a></li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <a href="javascript:void(0);">
                                    <img src={users1Icon} alt="img"></img>
                                    <span> Customer</span> <span className="menu-arrow" />
                                </a>
                                <ul>
                                    <li><a href="#.">Customer List</a></li>
                                    <li><a href="#.">Add Customer</a></li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <a href="javascript:void(0);">
                                    <img src={timeIcon} alt="img"></img>
                                    <span> Report</span> <span className="menu-arrow" />
                                </a>
                                <ul>
                                    <li><a href="#.">Inventory Report</a></li>
                                    <li><a href="#.">Sales Report</a></li>
                                    <li><a href="#.">Invoice Report</a></li>
                                    <li><a href="#.">Customer Report</a></li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <a href="javascript:void(0);">
                                    <img src={users1Icon} alt="img"></img>
                                    <span> Users</span> <span className="menu-arrow" />
                                </a>
                                <ul>
                                    <li><a href="#.">New User </a></li>
                                    <li><a href="#.">Users List</a></li>
                                </ul>
                            </li>
                            <li className="submenu">
                                <a href="javascript:void(0);">
                                    <img src={settingsIcon} alt="img"></img>
                                    <span> Settings</span> <span className="menu-arrow" />
                                </a>
                                <ul>
                                    <li><a href="#.">General Settings</a></li>
                                    <li><a href="#.">Email Settings</a></li>
                                    <li><a href="#.">Payment Settings</a></li>
                                    <li><a href="#.">Currency Settings</a></li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div> */}

        </>
    )
}

export default Sidebar

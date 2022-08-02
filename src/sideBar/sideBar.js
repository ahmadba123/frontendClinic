import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineHome } from "react-icons/ai";
import{BsPeople} from "react-icons/bs";
import{ImLab} from "react-icons/im";
import { BiLogOut } from "react-icons/bi";
import{TbZoomMoney} from "react-icons/tb";
import "./sideBar.css";
import logo from "../pic/logo.png";
import { NavLink, useNavigate } from "react-router-dom";

export default function SideBar(props) {
  const [showNav, setShowNav] = useState(false);
// const logout=() =>{
//   localStorage.clear();
//   window.location.reload(true)
// }
const navigate = useNavigate();

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("superAdmin");
  navigate('/')
}
  return (
    <div className="navbar">
      <header>
        <div className="header_logo navbar_logo">
          {/* <span className="letter_logo">B</span> */}
          <img src={logo} className="logo"/>
          <span className="name_logo">clinic Najdeh</span>
          <span className="line_logo"></span>
        </div>
        {showNav ? (
          <MdClose onClick={() => setShowNav(false)} />
        ) : (
          <GiHamburgerMenu onClick={() => setShowNav(true)} />
        )}
      </header>

      <div className={showNav ? "sidenav active" : "sidenav"}>
        <ul>
          <li >
            <NavLink 
            to="/home"
             onClick={() => setShowNav(false)}
             className={({ isActive }) => (isActive ? "link-active" : "link")}
             >
              <AiOutlineHome />
              Home
            </NavLink>
          </li>
          <li >
            <NavLink 
            to="/doctor"
             onClick={() => setShowNav(false)}
             className={({ isActive }) => (isActive ? "link-active" : "link")}
             >
              <BsPeople />
              doctor
            </NavLink>
          </li>
          <li >
            <NavLink 
            to="/service"
             onClick={() => setShowNav(false)}
             className={({ isActive }) => (isActive ? "link-active" : "link")}
             >
              <ImLab />
              service
            </NavLink>
          </li>
          <li >
            <NavLink 
            to="/patient"
             onClick={() => setShowNav(false)}
             className={({ isActive }) => (isActive ? "link-active" : "link")}
             >
              <BsPeople />
              patient
            </NavLink>
          </li>
          <li >
            <NavLink 
            to="/financial"
             onClick={() => setShowNav(false)}
             className={({ isActive }) => (isActive ? "link-active" : "link")}
             >
              <TbZoomMoney />
              financial                     
            </NavLink>
          </li>
          <li >
            <NavLink 
            to="/vistior"
             onClick={() => setShowNav(false)}
             className={({ isActive }) => (isActive ? "link-active" : "link")}
             >
              <BsPeople />
              vistior
            </NavLink>
          </li>
          <li>
            <button className="btn logout-btn"
            onClick={ logout }
            >
              <BiLogOut /> Logout

            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

import React from 'react'
import { NavLink } from "react-router"
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className="navbar">
        <NavLink to="/" className={(isActive) => isActive ? "active" : ""}> Home </NavLink>
        <NavLink to="/pastes" className={(isActive) => isActive ? "active" : ""}> Pastes </NavLink>
    </div>
  )
}

export default Navbar
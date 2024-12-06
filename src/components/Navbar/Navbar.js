import React from 'react';
import './Navbar.css';
import logoimg from "./logo-image.png";

const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-left">
                <img src={logoimg} alt="Logo" className="logo" />
                <span className="brand-name">AccionLAND</span><span className='write'>presents Ahmedabad Portal</span>
            </div>
            <div className="navbar-right">
                <a href="https://accionland.com/" className="contact-link">Contact Us</a>
            </div>
        </nav>
    );
};

export default Navbar;


import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

export default function NavList() {
  function onToggleMenu(e) {
    e.target.name = e.target.name === "grid" ? "close" : "grid";

    const menulinks = document.querySelector(".menulinks");
    menulinks.classList.toggle("top-[8%]");
  }

  return (
    <div>
      <div id="menulinks" className="menulinks duration-500 md:static md:min-h-fit absolute min-h-[28vh] left-[0%] top-[-100%] md:w-auto w-[100%] flex justify-center py-5 fixed ">
        <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 text-white font-Roboto font-semibold ">
          <li>
            <NavLink to="/" activeClassName="text-[#FFCC33]">
              Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/service">Services</NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-6">
        <ion-icon
          name="grid"
          className="cursor-pointer md:hidden"
          onClick={onToggleMenu}
        ></ion-icon>
      </div>
    </div>
  );
}

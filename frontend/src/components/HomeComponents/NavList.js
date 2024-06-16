import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function NavList() {
  function ScrollDown() {
    const value = window.innerHeight;
    window.scrollTo({ top: value, behavior: "smooth" });
  }

  function onToggleMenu(e) {
    e.target.name = e.target.name === "grid" ? "close" : "grid";

    const menulinks = document.querySelector(".menulinks");
    menulinks.classList.toggle("top-[8%]");
  }

  return (
    <div>
      <div id="menulinks" class="menulinks duration-500 md:static md:min-h-fit absolute min-h-[28vh] left-[0%] top-[-100%] md:w-auto w-[100%] flex justify-center py-5 fixed ">
<<<<<<< HEAD
      <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 text-white font-Roboto font-semibold">
  <li>
    <NavLink
      to="/"
      className={({ isActive }) => (isActive ? "text-[#FFCC33]" : "")}
    >
      Product
    </NavLink>
  </li>
  <li>
    <NavLink
      onClick={() => {
        ScrollDown();
      }}
      className="hover:text-[#FFCC33]"
    >
      Services
    </NavLink>
  </li>
  <li>
    <NavLink to="/login" className="hover:text-[#FFCC33]">
      Login
    </NavLink>
  </li>
  <li>
    <NavLink to="/signup" className="hover:text-[#FFCC33]">
      Signup
    </NavLink>
  </li>
</ul>
=======
        <ul className="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 text-white font-Roboto font-semibold ">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-[#FFCC33]" : "")}
            >
              Product
            </NavLink>
          </li>
          <li>
            <NavLink
                      className={({ isActive }) => 
                                   `hoverEffect ${isActive ? "text-[#0945E8" : ""}`
                                }
              onClick={() => {
                ScrollDown();
              }}
            >
              Services
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" 
               className={({ isActive }) => 
                                   `hoverEffect ${isActive ? "text-[#0945E8" : ""}`
                                }
            >Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup" 
                className={({ isActive }) => 
                                   `hoverEffect ${isActive ? "text-[#0945E8" : ""}`
                                }
            >Signup</NavLink>
          </li>
        </ul>
>>>>>>> de6b47d93ab9f442a0bc757b496bfc84549a152d
      </div>
      <div className="flex items-center gap-6">
          <ion-icon
            name="grid"
            class="cursor-pointer md:hidden"
            onClick={onToggleMenu}
          ></ion-icon>
        </div>
    </div>
  );
}

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
      <div class="py-5 ">
        <ul className=" menulinksupt flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8 text-white font-Roboto font-semibold ">
        <li id="product">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "text-[#FFCC33]" : "")}
            >
              Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/login">Login</NavLink>
          </li>
          <li>
            <NavLink to="/signup">Signup</NavLink>
          </li>
          <li>
            <NavLink
              onClick={() => {
                ScrollDown();
              }}
            >
              Services
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
}

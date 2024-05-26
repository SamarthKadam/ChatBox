import React from "react";
import logo from "../../assets/images/logo-large.png";
import { FaInstagram, FaTwitter, FaFacebook, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="bg-blue-900 text-white py-10 rounded-t-lg mt-10">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 px-4 md:px-8 lg:px-12">
        <div className="flex items-center">
          <div className="border-2 border-white p-5 rounded-3xl">
            <img src={logo}></img>
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Chat App</h3>
          <ul>
            <li className="mb-2">
              <a href="#">About Us</a>
            </li>
            <li className="mb-2">
              <a href="#">Features</a>
            </li>
            <li className="mb-2">
              <a href="#">Pricing</a>
            </li>
            <li className="mb-2">
              <a href="#">Contact</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Legal</h3>
          <ul>
            <li className="mb-2">
              <a href="#">Terms of Service</a>
            </li>
            <li className="mb-2">
              <a href="#">Privacy Policy</a>
            </li>
            <li className="mb-2">
              <a href="#">Cookie Policy</a>
            </li>
            <li className="mb-2">
              <a href="#">Security</a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Follow Us</h3>
          <ul className="flex space-x-4">
            <li className="mb-2">
              <a
                href="#"
                aria-label="Instagram"
                className="text-white hover:text-gray-400"
              >
                <FaInstagram size={24} />
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                aria-label="Twitter"
                className="text-white hover:text-gray-400"
              >
                <FaTwitter size={24} />
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                aria-label="Facebook"
                className="text-white hover:text-gray-400"
              >
                <FaFacebook size={24} />
              </a>
            </li>
            <li className="mb-2">
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-white hover:text-gray-400"
              >
                <FaLinkedin size={24} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 mt-10">
        <div className="border-t border-white pt-5 flex flex-col md:flex-row justify-between items-center text-sm">
          <div className="flex items-center space-x-4 mb-4 md:mb-0">
            <span>© 2024 ChatBox Inc. All rights reserved.</span>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:underline">
              English
            </a>
            <a href="#" className="hover:underline">
              TOU
            </a>
            <a href="#" className="hover:underline">
              Cookie preferences
            </a>
            <a href="#" className="hover:underline">
              Do not sell or share my personal information
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;

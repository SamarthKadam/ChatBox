import React from "react";
import "./Footer.css"; // Assuming you save your CSS in a file named Footer.css

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="footer-col">
            <h4>About</h4>
            <ul>
              <li>
                <a href="/">About Us</a>
              </li>
              <li>
                <a href="/">Contact Us</a>
              </li>
              <li>
                <a href="/">Privacy Policy</a>
              </li>
              <li>
                <a href="/">Terms of Service</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Help</h4>
            <ul>
              <li>
                <a href="/">FAQ</a>
              </li>
              <li>
                <a href="/">Support</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li>
                <a href="/">Facebook</a>
              </li>
              <li>
                <a href="/">Twitter</a>
              </li>
              <li>
                <a href="/">Instagram</a>
              </li>
              <li>
                <a href="/">LinkedIn</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>ChatApp</h4>
            <p>
              Connect with us on our ChatBox for real-time support and updates.
            </p>
            <p>Email: support@chatbox.com</p>
          </div>
        </div>
      </div>
      <p class="rights-text mb-2  text-white m-10 md:text-center">
        © 2024 Created By <b>Chatbox.com</b> All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;

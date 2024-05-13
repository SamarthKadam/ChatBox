import React from "react";
import Logo from '../../assets/images/logo-large.png'

const Footer = () => {
  return (
    <footer class="bg-[#012478] mt-14 md:mt-0">
      <div class="w-[80%] max-w-screen-xl mx-auto p-4 md:py-4">
        <div class="md:flex-row flex-col flex items-center justify-between">
            <div className="flex items-center gap-3">
                <img src={Logo} alt='logo' className='w-6 md:w-10'/>
                <div className='text-white text-xl md:text-2xl font-Roboto font-semibold ml-2'>ChatBox</div>
            </div>
          <ul class="flex flex-wrap items-center mb-4 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400 mt-7 md:mt-0">
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                About
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Services
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline me-4 md:me-6">
                Licensing
              </a>
            </li>
            <li>
              <a href="#" class="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span class="block text-sm text-gray-500 text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://chat-box-samarthkadam.vercel.app/" class="hover:underline">
          ChatBox
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;

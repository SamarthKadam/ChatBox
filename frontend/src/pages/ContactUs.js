import React from 'react';
import NavBar from '../components/HomeComponents/NavBar';

function ContactUs() {
  return (
    <div>
      <NavBar />
      <div className='p-6'>
        <h1 className='text-3xl font-bold mb-4'>Contact Us</h1>
        

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Contact Number</h2>
          <p className="text-gray-700">Phone: +91 1234567890</p>
        </div>
        

        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Email Address</h2>
          <p className="text-gray-700">Email: info@example.com</p>
        </div>
        
   
        <div>
          <h2 className="text-xl font-semibold mb-2">Address</h2>
          <p className="text-gray-700">
            123 Main Street<br />
            City, State, Zip Code<br />
            Country
          </p>
        </div>

   
        <br/>
        <br/>
        <h2 className="text-xl font-semibold mb-2">Please complete the form, and we'll get in touch with you shortly !</h2>
        <form className='space-y-4 mt-6'>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Name</label>
            <input type='text' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Email</label>
            <input type='email' className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm' />
          </div>
          <div>
            <label className='block text-sm font-medium text-gray-700'>Message</label>
            <textarea className='mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'></textarea>
          </div>
          <div>
            <button type='submit' className='px-4 py-2 bg-blue-600 text-white rounded-md'>Send Message</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactUs;

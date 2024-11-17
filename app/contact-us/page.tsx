import React from 'react';
import Image from 'next/image';

const ContactUs = () => {
  return (
    <main className="min-h-screen bg-gray-50">
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-2">Contact Us</h2>
          <p className="text-gray-600 text-center mb-8">Get in touch with us using the form below.</p>

          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Surname</label>
              <input
                type="text"
                placeholder="Enter your surname"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Phone Number</label>
              <div className="flex">
                <select
                  className="block px-4 py-2 border border-gray-300 rounded-l-md bg-gray-50 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  defaultValue="UZB (+998)"
                >
                  <option>UZB (+998)</option>
                  <option>KAZ (+7)</option>
                  <option>UKR (+380)</option>
                  <option>GEO (+995)</option>
                  <option>CHN (+86)</option>
                </select>
                <input
                  type="text"
                  placeholder="Enter your phone number"
                  className="flex-grow px-4 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700">Message</label>
              <textarea
                placeholder="Type your message here..."
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              ></textarea>
            </div>
            <div className="col-span-2 flex flex-col space-y-4">
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-700">By clicking, you agree with our Terms & Conditions</span>
              </label>
              <label className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                <span className="ml-2 text-sm text-gray-700">I have read and agree to the Privacy Policy</span>
              </label>
            </div>
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-md text-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {' '}
                Send Message
              </button>
            </div>
          </form>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-xl font-bold mb-4">Contact Information</h3>
          <p className="text-gray-700 mb-4">Address: 123 Dessert Street, Ice Cream City, CA 90210</p>
          <p className="text-gray-700 mb-4">Phone: +1 (123) 456-7890</p>
          <p className="text-gray-700 mb-4">Email: support@icecreamland.com</p>

          <div className="flex space-x-6 mt-4">
            <a href="#" className="text-blue-600 hover:text-blue-800" aria-label="Facebook">
              <Image src="/icons/meta.svg" alt="Facebook" width={24} height={24} />
            </a>
            <a href="#" className="text-pink-600 hover:text-pink-800" aria-label="Instagram">
              <Image src="/icons/instagram.svg" alt="Instagram" width={24} height={24} />
            </a>
            <a href="#" className="text-blue-400 hover:text-blue-600" aria-label="Twitter">
              <Image src="/icons/twitter.svg" alt="Twitter" width={24} height={24} />
            </a>
          </div>
        </div>
      </section>

      {/* Optional Map */}
      <section className="py-16">
        <div className="container mx-auto max-w-4xl">
          <h3 className="text-xl font-bold mb-4">Visit Us</h3>
          <div className="relative w-full h-96">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345093656!2d-122.41941608468126!3d37.77492927975961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80858064df64d4a3%3A0x3c56c6742f5c7f3b!2sDessert%20City!5e0!3m2!1sen!2sus!4v1699027601234!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
};

export default ContactUs;

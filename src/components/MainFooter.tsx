/**
 * @author Felix Orinda
 * @email forinda82@gmail.com
 * @create date 2023-07-06 23:46:46
 * @modify date 2023-07-06 23:46:46
 * @desc [Application footer]
 */

import { Link } from "react-router-dom";
import logo from "@/assets/img/tisini-logo.png";

function MainFooter() {
  return (
    <div className="bg-primary min-h-[20rem] p-4 py-8">
      <footer className="text-white container mx-auto w-full">
        <div className="flex items-center flex-col md:flex-row justify-around gap-4 border-b-[1px] border-light-darker py-4 mt-5">
          {/* Logo */}
          <div className="flex flex-col justify-center items-center gap2">
            <img src={logo} alt="" className=" h-20 " />
            {/* <h1 className="text-4xl font-bold text-white uppercase">Tisini</h1> */}
          </div>
          {/* Newsletter */}
          <h2 className="font-semibold text-white text-3xl">
            Subscribe to our newsletter
          </h2>
          {/* Form */}
          <form className="flex justify-center items-center bg-white px-2 py-1 rounded-lg">
            <input
              type="email"
              className="w-full max-w-md px-4 py-2 text-black placeholder-black bg-white rounded-md focus:outline-none focus:ring-0 border-none focus:ring-primary-darker"
              placeholder="Enter your email address"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary-lighter text-light rounded-md hover:bg-primary-darker hover:text-white transition duration-300 ease-in-out"
            >
              Subscribe
            </button>
          </form>
        </div>
        {/* Links */}
        <div className="py-2 text-xl">
          <div className="md:flex-row gap-4 mt-5 grid grid-cols-1 lg:grid-cols-4">
            {/* Quick links */}
            <div className="flex gap-4 flex-col">
              <h1>Quick Links</h1>
              <ul className="flex flex-col text-left">
                <li>
                  <Link
                    to="/"
                    className="text-white hover:text-primary-darkest transition duration-300 ease-in-out"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-white hover:text-primary-darkest transition duration-300 ease-in-out"
                  >
                    Livescore
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-white hover:text-primary-darkest transition duration-300 ease-in-out"
                  >
                    Matches
                  </Link>
                </li>
                <li>
                  <Link
                    to="/"
                    className="text-white hover:text-primary-darkest transition duration-300 ease-in-out"
                  >
                    Tano Bora
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-white hover:text-primary-darkest transition duration-300 ease-in-out"
                  >
                    Private Policy
                  </Link>
                </li>
              </ul>
            </div>
            {/* Quick links */}
            <div className="flex gap-4 flex-col ">
              <h1>Quick Links</h1>
              <ul>
                <li>
                  <Link
                    to="/"
                    className="text-white hover:text-primary-darkest transition duration-300 ease-in-out"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-white hover:text-primary-darkest transition duration-300 ease-in-out"
                  >
                    Private Policy
                  </Link>
                </li>
              </ul>
            </div>
            {/* Quick links */}
            <div className="flex gap-4 flex-col ">
              <h1>Quick Links</h1>
              <ul>
                <li>
                  <Link
                    to="/"
                    className="text-white hover:text-primary-darkest transition duration-300 ease-in-out"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-white hover:text-primary-darkest transition duration-300 ease-in-out"
                  >
                    Private Policy
                  </Link>
                </li>
              </ul>
            </div>
            {/* Quick links */}
            <div className="flex gap-4 flex-col ">
              <h1>Quick Links</h1>
              <ul>
                <li>
                  <Link
                    to="/"
                    className="text-white hover:text-primary-darkest transition duration-300 ease-in-out"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className="text-white hover:text-primary-darkest transition duration-300 ease-in-out"
                  >
                    Private Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Copyright */}
        <div className="flex justify-center items-center gap-4 mt-5 text-xl">
          <p className="text-white">
            &copy; {new Date().getFullYear()} Tisini Org. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default MainFooter;

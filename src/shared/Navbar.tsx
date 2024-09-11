import React, { useState } from 'react';
import {  Link, NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { logout, selectCurrentUser } from '../redux/feature/auth/authSlice';

const Navbar = () => {

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout()); // Clear Redux state
    localStorage.removeItem('accessToken'); // Clear token from local storage
    console.log('Logged out. Redirecting to login page...'); // Debug
    navigate('/login'); // Redirect to login page
  };


  const userRole = {
    ADMIN: 'admin',
    FACULTY: 'faculty',
    STUDENT: 'student',
  };
  const user = useAppSelector(selectCurrentUser);
  const NavItem = (
    <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg  md:flex-row md:space-x-8 md:mt-0 md:border-0  dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? 'text-red-700' : 'text-white dark:text-white'
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/services"
          className={({ isActive }) =>
            isActive ? 'text-red-700' : 'text-white dark:text-white'
          }
        >
          Services
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/booking"
          className={({ isActive }) =>
            isActive ? 'text-red-700' : 'text-white dark:text-white'
          }
        >
          Booking
        </NavLink>
      </li>


      {user?.role === userRole.ADMIN && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? 'text-blue-700' : 'text-white dark:text-white'
            }
          >
            Dashboard
          </NavLink>
        )}

      



    </ul>
  );



    const [isOpen, setIsOpen] = useState(false);
    const toggleNavbar = () => {
        setIsOpen(!isOpen);
      };
    return (
        <nav className="bg-[#19191B] text-white">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a href="#" className="flex items-center">
            <img src="https://i.ibb.co/C0RCWDh/300067598-189737770089601-7346916963333562541-n.jpg" className="h-8 mr-3" alt="Flowbite Logo" />
          
          </a>
          <div className="flex md:order-2">
            <button 
              type="button" 
              data-collapse-toggle="navbar-search" 
              aria-controls="navbar-search" 
              aria-expanded="false" 
              className="md:hidden text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 mr-1" 
            >
          
            </button>




            {user ? (
          <button className="relative h-10 w-24 origin-top transform rounded-lg border-2 border-red-500 text-xl text-white before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-[#e81c2e]" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to={'/Login'} className="relative hidden md:block">
            <button className="relative h-10 w-24 origin-top transform rounded-lg border-2 border-red-500 text-xl text-white before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-[#e81c2e]">Sign up</button>

            </Link>
        )}








            








            <button 
              data-collapse-toggle="navbar-search" 
              type="button" 
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" 
              aria-controls="navbar-search" 
              aria-expanded={isOpen ? "true" : "false"} 
              onClick={toggleNavbar}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
              </svg>
            </button>
          </div>
          <div className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isOpen ? 'block' : 'hidden'}`} id="navbar-search">
            <div className="relative mt-3 md:hidden">
              
             

            {user ? (
          <button className="relative h-10 w-24 origin-top transform rounded-lg border-2 border-red-500 text-xl text-white before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-[#e81c2e]" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <Link to={'/Login'} className="relative hidden md:block">
            <button className="relative h-10 w-24 origin-top transform rounded-lg border-2 border-red-500 text-xl text-white before:absolute before:top-0 before:block before:h-0 before:w-full before:duration-500 hover:text-white hover:before:absolute hover:before:left-0 hover:before:-z-10 hover:before:h-full hover:before:bg-[#e81c2e]">Sign up</button>

            </Link>
        )}





            </div>



          {NavItem}



          </div>
        </div>
      </nav>
    );
};

export default Navbar;
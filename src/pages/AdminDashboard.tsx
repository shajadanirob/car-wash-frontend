import React, { useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';

const Dashboard = () => {

  const DashBoardSlider = (
    <nav className="flex-1 px-2 py-4 bg-gray-800">
        <NavLink
            to="/dashboard"
            className={({ isActive }) =>
                `flex items-center px-4 py-2 text-gray-100 hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                }`
            }
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            Service Management
        </NavLink>
        <NavLink
            to="/dashboard/slots"
            className={({ isActive }) =>
                `flex items-center px-4 py-2 mt-2 text-gray-100 hover:bg-gray-700 ${
                    isActive ? 'bg-gray-700' : ''
                }`
            }
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            MAnage Slots
        </NavLink>
      
    </nav>
);



  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-0 z-40 bg-gray-800 md:relative md:flex md:flex-col w-64 ${
          sidebarOpen ? 'block' : 'hidden'
        } md:block`}
      >
        <div className="flex items-center justify-center h-16 bg-gray-900">
          <Link to={'/'} className="text-white font-bold uppercase">Sidebar</Link>
        </div>
        <div className="flex flex-col flex-1 overflow-y-auto">


         {DashBoardSlider}



        </div>
      </div>

      {/* Overlay for mobile sidebar */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-50 md:hidden ${sidebarOpen ? 'block' : 'hidden'}`}
        onClick={toggleSidebar}
      ></div>

      {/* Main content */}
      <div className={`flex-1 flex flex-col overflow-y-auto ${sidebarOpen ? 'ml-64' : ''}`}>
        {/* Mobile sidebar toggle button */}
        <div className="md:hidden flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">
          <button
            className="text-gray-500 focus:outline-none focus:text-gray-700"
            onClick={toggleSidebar}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" />
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
            </svg>
          </button>
        </div>

        {/* Desktop header */}
        <div className="hidden md:flex items-center justify-between h-16 bg-white border-b border-gray-200 px-4">
          <input className="w-full border rounded-md px-4 py-2" type="text" placeholder="Search" />
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
            </svg>
          </button>
        </div>

        <Outlet/>

      </div>
    </div>
  );
};

export default Dashboard;

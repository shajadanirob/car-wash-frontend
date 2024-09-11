import React from 'react';


const FooterSection = () => {
  return (
    <footer 
    className="text-white py-12 bg-[#19191B]" 
    style={{
      backgroundImage: "url('http://aqualine.like-themes.com/wp-content/uploads/2020/02/carbon_BG-20.png')",
      backgroundSize: 'cover',  // Ensures the image covers the entire background
      backgroundRepeat: 'no-repeat', // Prevents the image from repeating
      backgroundPosition: 'center' // Centers the image
    }}
  >
    <div className="container mx-auto text-center">
      <div className="mb-6">
        {/* Logo */}
        <img src="logo.png" alt="Aqualine autocare logo" className="mx-auto mb-4" style={{ width: "100px" }} />
        <p className="text-gray-400 max-w-lg mx-auto">
          Etiam consequat sem ullamcorper, euismod metus sit amet, tristique justo. Vestibulum mattis, nisi ut faucibus commodo, risus ex commodo.
        </p>
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
        <div className="flex flex-col items-center">
          <span className="text-red-600 font-bold mb-2">Round-the-clock</span>
          <p>0 (550) 680-34-12</p>
        </div>

        <div className="flex flex-col items-center">
          <span className="text-red-600 font-bold mb-2">Car Washing Point</span>
          <p>1353 Locust St, Kansas City, MO 64106</p>
        </div>

        <div className="flex flex-col items-center">
            
          <span className="text-red-600 font-bold mb-2">Contact Us</span>
          <p>info@aql-theme.com</p>
          <p>support@aql-theme.com</p>
        </div>
      </div>

      {/* Working Hours */}
      <div className="mt-8">
        <p className="text-red-600 font-bold mb-1">Mo-Sa: 07:00 - 22:00</p>
        <p>Su: 07:00 - 16:00</p>
      </div>

      {/* Copyright Information */}
      <div className="mt-12 text-gray-500 text-xl">
        <p>
          Like-themes © All Rights Reserved - 2020 <a href="#" className="text-red-600 underline">Purchase</a>
        </p>
      </div>
    </div>
  </footer>
  );
};

export default FooterSection;

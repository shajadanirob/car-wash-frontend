import { useCallback, useEffect, useState } from "react";

const images = [
  'http://aqualine.like-themes.com/wp-content/uploads/2018/02/SLIDE_01.jpg',
  'http://aqualine.like-themes.com/wp-content/uploads/2018/02/SLIDE_02.jpg',
  'http://aqualine.like-themes.com/wp-content/uploads/2018/02/SLIDE_03.jpg',
  'http://aqualine.like-themes.com/wp-content/uploads/2018/02/SLIDE_04.jpg',
  'http://aqualine.like-themes.com/wp-content/uploads/2018/02/SLIDE_05.jpg'
];

const titles = [
  'Revolutionize Your Car Care',
  'Experience Ultimate Cleanliness',
  'Advanced Car Washing Technology',
  'Effortless and Efficient Cleaning',
  'Discover the Future of Car Wash'
];

export const Hero = () => {
  const [currentSlider, setCurrentSlider] = useState(0);

  const nextSlider = useCallback(() => {
    setCurrentSlider((prev) => (prev + 1) % images.length);
  }, []);

  // const prevSlider = () => {
  //   setCurrentSlider((prev) => (prev - 1 + images.length) % images.length);
  // };

  useEffect(() => {
    const intervalId = setInterval(nextSlider, 5000); // Change slide every 5 seconds
    return () => clearInterval(intervalId);
  }, [nextSlider]);

  return (
    <section className="relative lg:h-screen overflow-hidden">
      {/* Carousel Container */}
      <div
        className="flex transition-transform duration-500 ease-linear"
        style={{ transform: `translateX(-${currentSlider * 100}%)` }}
      >
        {images.map((slide, idx) => (
          <div key={slide} className="flex-shrink-0 w-full h-[100vh] relative">
            <img
              src={slide}
              className="w-full h-full object-cover"
              alt={`Slider - ${idx + 1}`}
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div>
            {/* Hero Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
              <h2 className="text-sm text-red-500 tracking-wider uppercase mb-4">
                {titles[idx]}
              </h2>
              <h1 className="text-5xl md:text-7xl font-bold mb-6 barlow-condensed-regular-italic">  {titles[idx]}</h1>
              
              <div className="flex space-x-6">
                <button className="bg-[#e81c2e] text-white px-6 py-3 rounded-full hover:bg-red-600 transition duration-300">
                  Book Service
                </button>
                
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
     

      {/* Dots */}
      <div className="flex justify-center items-center rounded-full z-50 absolute bottom-4 w-full gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlider(idx)}
            className={`rounded-full ${currentSlider === idx ? "w-4 bg-white" : "w-2 bg-gray-300"} h-2 transition-all`}
          ></button>
        ))}
      </div>
    </section>
  );
};

import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewsSection = () => {
  const [rating, setRating] = useState(4);

  // Static review data
  // eslint-disable-next-line @typescript-eslint/no-unused-vars


  const handleStarClick = (index: number) => {
    setRating(index + 1);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 md:px-8">
      <h1 className='text-center my-10 text-[#e81c2e] md:text-2xl font-semibold'>FEEDBACK</h1>
      <h1 className='text-center my-10 text-4xl md:text-6xl font-semibold'>Customer Feedback</h1>
      <div className="my-20">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
          {/* Overview - start */}
          <div>
            <div className="rounded-lg border p-4">
              <h2 className="mb-3 text-lg font-bold text-gray-800 lg:text-xl">Customer Reviews</h2>

              <div className="mb-0.5 flex items-center gap-2">
                {/* Stars - start */}
                <div className="-ml-1 flex gap-0.5">
                  {[...Array(5)].map((_, index) => (
                    <FaStar
                      key={index}
                      className={`cursor-pointer ${index < rating ? 'text-yellow-500' : 'text-gray-300'}`}
                      onClick={() => handleStarClick(index)}
                    />
                  ))}
                </div>
                {/* Stars - end */}

                <span className="text-sm font-semibold">4/5</span>
              </div>

              <span className="block text-sm text-gray-500">Based on 27 reviews</span>

              <form>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="message" className="block text-lg font-medium text-gray-700 mb-2">Review</label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg h-32 resize-none focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-[#e81c2e] text-white rounded-lg hover:bg-red-600 transition"
                >
                  Submit
                </button>
              </form>

            </div>
          </div>
          {/* Overview - end */}

          {/* Reviews - start */}
          <div className="lg:col-span-2">
            <div className="border-b pb-4 md:pb-6">
              <h2 className="text-lg font-bold text-gray-800 lg:text-xl">Top Reviews</h2>
            </div>

            <div className="divide-y">
              {/* Review - start */}
              <div className="flex flex-col gap-3 py-4 md:py-8">
                <div>
                  <span className="block text-sm font-bold">John McCulling</span>
                  <span className="block text-sm text-gray-500">August 28, 2021</span>
                </div>

                {/* Stars - start */}
                <div className="-ml-1 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Stars - end */}

                <p className="text-gray-600">
                  This is an amazing product! It exceeded my expectations in every way. I highly recommend it to everyone.
                </p>
              </div>
              {/* Review - end */}
              {/* Add more reviews similarly */}
            </div>
            <div className="divide-y">
              {/* Review - start */}
              <div className="flex flex-col gap-3 py-4 md:py-8">
                <div>
                  <span className="block text-sm font-bold">John McCulling</span>
                  <span className="block text-sm text-gray-500">August 28, 2021</span>
                </div>

                {/* Stars - start */}
                <div className="-ml-1 flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-yellow-400"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                {/* Stars - end */}

                <p className="text-gray-600">
                  This is an amazing product! It exceeded my expectations in every way. I highly recommend it to everyone.
                </p>
              </div>
              {/* Review - end */}
              {/* Add more reviews similarly */}
            </div>
          </div>
          {/* Reviews - end */}
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;

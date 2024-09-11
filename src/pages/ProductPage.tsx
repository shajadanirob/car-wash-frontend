import React, { useState } from 'react';
import { useGetAllServiceQuery } from '../redux/feature/service/serviceApi';
import { Link } from 'react-router-dom';

const ProductPage = () => {
  const { data, error, isLoading } = useGetAllServiceQuery('');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  // Extract products from the data field
  const products = data?.data || [];
  console.log(products);

  const handleClearFilters = () => {
    setSearchTerm('');
    setPriceRange([0, 1000]);
    setSortOrder('asc');
  };

  const filteredProducts = products
    .filter((product: { isDeleted: boolean; }) => product.isDeleted === false) // Exclude products with deleted flag
    .filter((product: { name: string; }) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((product: { price: number; }) =>
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    .sort((a: { price: number; }, b: { price: number; }) =>
      sortOrder === 'asc' ? a.price - b.price : b.price - a.price
    );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white text-center py-12">
        <h1 className="text-4xl font-bold">All Products</h1>
      </div>

      {/* Filters */}
      <div className="container mx-auto flex flex-wrap justify-between items-center py-4 px-4">
        {/* Search Box */}
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          />
        </div>

        {/* Filter by Price */}
        <div className="flex items-center space-x-2">
          <label>Price Range:</label>
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[0]}
            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <input
            type="range"
            min="0"
            max="1000"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
          />
          <span>${priceRange[0]} - ${priceRange[1]}</span>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center space-x-2">
          <label>Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value as 'asc' | 'desc')}
            className="px-4 py-2 border border-gray-300 rounded-lg"
          >
            <option value="asc">Price: Low to High</option>
            <option value="desc">Price: High to Low</option>
          </select>
        </div>

        {/* Clear Filters Button */}
        <button
          onClick={handleClearFilters}
          className="px-4 py-2 bg-red-600 text-white rounded-lg"
        >
          Clear Filters
        </button>
      </div>

      {/* Product Grid */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12 px-4">
        {filteredProducts.length > 0 ? (
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          filteredProducts.map((product: { _id: React.Key | null | undefined; image: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; description: string | any[]; price: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }) => (
            <div key={product._id} className="bg-white shadow-lg p-8 rounded-lg text-center relative transition-all duration-300">
              <div className="image">
                <div>
                  <img
                    src={product?.image}
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
              </div>
              <div className="ltx-item-descr mt-4">
                <div className="star-rating mb-2" role="img" aria-label="Rated 5.00 out of 5">
                  <span style={{ width: '100%' }}>
                    Rated <strong className="rating">5.00</strong> out of 5
                  </span>
                </div>
                <div>
                  <h2 className="woocommerce-loop-product__title text-xl font-bold mb-2">{product.name}</h2>
                </div>
                <div className="post_content entry-content mb-2">
                  {product.description.slice(0, 45)}...
                </div>
                <p className='text-xl font-bold'>${product.price}</p>
                <Link to={`/serviceDetails/${product._id}`}>
                
                
                <button className="text-xl w-32 h-10 bg-[#e81c2e] text-white relative overflow-hidden group z-10 hover:text-white duration-1000">
                  <span className="absolute bg-red-600 size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                  <span className="absolute bg-red-800 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                  See Details
                </button>
                
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No products match your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductPage;


import { useGetAllServiceQuery } from '../redux/feature/service/serviceApi';
import { Link } from 'react-router-dom';
interface Product {
  _id: string;
  image: string;
  name: string;
  description: string;
  price: number;
  isDeleted: boolean;
}

const Cart = () => {
  const { data, error, isLoading } = useGetAllServiceQuery('');
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;
  const products: Product[] = data?.data || [];
  const activeProducts = products.filter((product: Product) => !product.isDeleted);

  return (
    <div className='max-w-screen-xl mx-auto px-8 md:px-16 lg:px-24 py-5'>
      <h1 className='text-center my-5 text-[#e81c2e]  md:text-2xl font-semibold'>ONLINE STORE</h1>
      <h1 className='text-center my-5 text-4xl md:text-6xl font-semibold'>Popular Products</h1>

      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-12 px-4">
        {activeProducts.length > 0 ? (
          activeProducts.map((product: Product) => (
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

export default Cart;


import { useDeleteServiceMutation, useGetAllServiceQuery } from '../redux/feature/service/serviceApi';
import { toast } from 'sonner';
import Modal from '../components/Modal';
import { Link } from 'react-router-dom';

// Define the Product type
interface Product {
  _id: string;
  description: string;
  name: string;
  price: number;
  category: string;
  image: string;
  isDeleted?: boolean; // Optional field for soft deletion
}

const ServiceManagement = () => {
  const { data, error, isLoading } = useGetAllServiceQuery('');
  const [deleteService] = useDeleteServiceMutation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  // Loading and Error States
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading services</div>;

  // Extract products from the data field
  const products: Product[] = data?.data || [];

  // Handle Delete
  const handleDelete = async (productId: string, productName: string) => {
    try {
      await deleteService(productId).unwrap();
      toast.success(`${productName} marked as deleted successfully`);
    } catch (err) {
      console.error('Failed to delete the product: ', err);
      toast.error(`Failed to delete ${productName}`);
    }
  };

 
  // Filter out deleted services
  const activeProducts = products.filter((product) => !product.isDeleted);

  return (
  <div>
<Modal/>

<div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {activeProducts.length > 0 ? (
            activeProducts.map((product) => (
              <tr key={product._id}>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.description.slice(0,30)}...</td>
                <td className="px-6 py-4 whitespace-nowrap">
                 <Link to={`/dashboard/update/${product._id}`}>
                 <button
                  
                  className="px-4 py-2 font-medium text-white bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:shadow-outline-blue active:bg-blue-600 transition duration-150 ease-in-out"
                >
                  Edit
                </button>
                 
                 
                 </Link>
                  <button
                    onClick={() => handleDelete(product._id, product.name)}
                    className="ml-2 px-4 py-2 font-medium text-white bg-red-600 rounded-md hover:bg-red-500 focus:outline-none focus:shadow-outline-red active:bg-red-600 transition duration-150 ease-in-out"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="px-6 py-4 whitespace-nowrap text-center text-gray-500">
                No active services available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </div>
  );
};

export default ServiceManagement;

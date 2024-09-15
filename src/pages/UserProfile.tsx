
import { useAppSelector } from '../redux/hooks';
import { selectCurrentUser } from '../redux/feature/auth/authSlice';
import { useGetProfileByEmailQuery } from '../redux/feature/auth/authApi';

const ProfilePage = () => {
  const user = useAppSelector(selectCurrentUser);
  const { data: profile, isLoading, isError } = useGetProfileByEmailQuery(user?.userEmail || '');
console.log(profile);
  if (isLoading) return <div className="text-center py-4">Loading...</div>;
  if (isError) return <div className="text-center py-4 text-red-500">Error loading profile.</div>;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-semibold text-gray-900 mb-6">User Profile</h1>
      <div className="flex items-center space-x-6 mb-8">
        <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
          {/* Placeholder for user avatar */}
          <span className="text-xl text-gray-500">{profile.name ? profile.name.charAt(0) : 'U'}</span>
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>
      <div className="space-y-4">
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Phone Number</h3>
          <p className="text-gray-700">{profile.phone || 'N/A'}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-medium text-gray-800 mb-2">Address</h3>
          <p className="text-gray-700">{profile.address || 'N/A'}</p>
        </div>
        {/* Add other fields as needed */}
      </div>
    </div>
  );
};

export default ProfilePage;

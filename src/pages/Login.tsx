import React, { useState } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { useLoginMutation } from '../redux/feature/auth/authApi';
import { setUser, TUser } from '../redux/feature/auth/authSlice';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { verifyToken } from '../utils/verifyToken';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [login] = useLoginMutation();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const toastId = toast.loading('Logging in');
  
    try {
      const userInfo = { email, password };
      const res = await login(userInfo).unwrap();
      const user = verifyToken(res.data.accessToken) as TUser;
  
      console.log('Token received:', res.data.accessToken); // Debug
      console.log('User:', user); // Debug
  
      dispatch(setUser({ user, token: res.data.accessToken }));
      localStorage.setItem('accessToken', res.data.accessToken); // Store token
      toast.success('Login successful', { id: toastId, duration: 2000 });
      navigate(`/`);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err); // Debug

      // Extract the error message from the response
      const errorMessage = err.data?.message || 'Something went wrong';
      toast.error(errorMessage, { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="w-screen-x min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="relative py-3 sm:max-w-xs sm:mx-auto">
        <div className="min-h-96 px-8 py-6 mt-4 text-left bg-white dark:bg-gray-900 rounded-xl shadow-lg">
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="flex flex-col items-center justify-center gap-2 mb-8">
              <a href="https://amethgalarcio.web.app/" target="_blank" rel="noopener noreferrer">
                <img src="https://amethgalarcio.web.app/assets/logo-42fde28c.svg" className="w-8" alt="Logo" />
              </a>
              <p className="m-0 text-[16px] font-semibold dark:text-white">Login to your Account</p>
              <span className="m-0 text-xs max-w-[90%] text-center text-[#8B8E98]">
                Get started with our app, just start section and enjoy the experience.
              </span>
            </div>
            <form className="w-full flex flex-col gap-2" onSubmit={handleLogin}>
              <label className="font-semibold text-xs text-gray-400">Email</label>
              <input
                type="email"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label className="font-semibold text-xs text-gray-400">Password</label>
              <input
                type="password"
                className="border rounded-lg px-3 py-2 mb-5 text-sm w-full outline-none dark:border-gray-500 dark:bg-gray-900"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="submit"
                className="py-1 px-8 bg-blue-500 hover:bg-blue-800 focus:ring-offset-blue-200 text-white w-full transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg cursor-pointer select-none"
              >
                Login
              </button>
            </form>
            <p className="text-center text-sm text-zinc-700 dark:text-zinc-300 my-3">
                Don&apos;t have an account?
                <Link to={'/signUp'} className="font-semibold underline">
                    Signup
                </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

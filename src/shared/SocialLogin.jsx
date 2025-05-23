import React from 'react';
import useAuth from '../hooks/useAuth';
import useAxiosPublic from '../axiosInstance/useAxiosPublic';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { auth } from '../firebase/firebase.config';
import { FaGoogle } from 'react-icons/fa';

const SocialLogin = () => {
      const {  loginWithGoogle } = useAuth();
      const axiosPublic = useAxiosPublic();
      const navigate = useNavigate();
      const location = useLocation();
    const handleloginWithGoogle = () => {
        loginWithGoogle()
          .then(() => {
            toast.success("Successfully logged in");
            const user = {
              name: auth?.currentUser?.displayName,
              email: auth?.currentUser?.email,
              photoURL: auth?.currentUser?.photoURL,
              userType: "User",
            };
    
            // POST request to backend
            // axiosPublic.post("http://localhost:5000/users",user)
            //   .then((res) => res.data)
            //   .then((data) => {
            //     if (data.insertedId) {
            //       toast.success("User added successfully!");
            //     } else {
            //       console.error("User already exists in database!");
            //     }
            //   });
            navigate(location?.state || "/");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      };
    return (
        <div>
             {/* Sign in with Google */}
          <button
            onClick={handleloginWithGoogle}
            className="group mx-auto flex h-[50px] w-fit items-center overflow-hidden rounded-full shadow-md outline-none ring-1 ring-teal-600"
          >
            <div className="relative z-20 flex h-full items-center bg-teal-600 px-4 text-lg text-white duration-300 group-hover:bg-transparent group-hover:text-teal-600">
              Sign in with
            </div>
            <span className="flex h-full items-center px-4 text-xl font-bold text-teal-600 duration-300 group-hover:bg-teal-600 group-hover:text-white">
              <FaGoogle />
            </span>
          </button>
        </div>
    );
};

export default SocialLogin;
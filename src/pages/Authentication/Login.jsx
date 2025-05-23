import { useLocation, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { useLottie } from "lottie-react";
import animationData from "../../assets/lootiefiles/deliverman.json";
import useAuth from './../../hooks/useAuth';
import useAxiosPublic from './../../axiosInstance/useAxiosPublic';
import SocialLogin from "../../shared/SocialLogin";


const Login = () => {
  const { loginWithEmailPassword } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const location = useLocation();
  const options = {
    animationData: animationData,
    loop: true
  };
  const { View } = useLottie(options);


  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log("You clicked submit." + email + password);

    loginWithEmailPassword(email, password)
      .then(() => {
        toast.success("Successfully logged in");
        form.reset();
        navigate(location?.state || "/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  

  return (
    <div>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "#fff",
            },
          },
          error: {
            style: {
              background: "red",
              color: "#fff",
            },
          },
        }}
      />
      
      <div className="flex w-full overflow-hidden rounded-xl shadow-md h-full py-6">
        {/* Design Side */}
        <div className="relative hidden items-center justify-center md:flex md:w-[50%]">
          <div className="w-[80%]">{View}</div>
        </div>

        {/* Form Side */}
        <div className="flex w-full flex-col justify-center bg-white py-10 lg:w-[60%] dark:bg-zinc-900">
          <h2 className="pb-8 text-center text-3xl font-semibold tracking-tight text-teal-600">
            Sign In
          </h2>

          <form
            onSubmit={handleLogin}
            className="flex w-full flex-col items-center justify-center gap-4"
          >
            <input
              className="w-[80%] rounded-lg border border-teal-600 bg-transparent py-2 pl-4 text-zinc-600 focus:outline-none focus:ring-2 focus:ring-teal-600/50 md:w-[60%] dark:text-zinc-400"
              type="email"
              placeholder="Email"
              name="email"
              required
            />
            <input
              className="w-[80%] rounded-lg border border-teal-600 bg-transparent py-2 pl-4 text-zinc-600 focus:outline-none focus:ring-2 focus:ring-teal-600/50 md:w-[60%] dark:text-zinc-400"
              type="password"
              placeholder="Password"
              name="password"
              required
            />
            <p className="text-[14px] text-gray-400">
              Do not have an account?{" "}
              <a href="/register" className="text-teal-600">
                Create one
              </a>
            </p>
            <input
              type="submit"
              className="uppercase w-[80%] rounded-lg bg-teal-600 px-6 py-2 font-medium text-white outline-none hover:bg-teal-600 md:w-[60%]"
            />
          </form>

          {/* Divider */}
          <div className="my-8 flex items-center px-8">
            <hr className="flex-1 border-teal-600" />
            <div className="mx-4 text-teal-600">OR</div>
            <hr className="flex-1 border-teal-600" />
          </div>

          {/* Social Login */}
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Login;
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosPublic from "../../axiosInstance/useAxiosPublic";
import SocialLogin from "../../shared/SocialLogin";
import { useState } from "react";
import animationData from "../../assets/lootiefiles/deliverman.json";
import { useLottie } from "lottie-react";

const Register = () => {
  const { registerWithEmailPassword, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [uploading, setUploading] = useState(false);
  // imgbb API key
  const imgbbAPIKey = import.meta.env.VITE_IMGBB_API_KEY;

  // lottie-react
  const options = {
    animationData: animationData,
    loop: true,
  };
  const { View } = useLottie(options);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const uploadImageToImgbb = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(
      `https://api.imgbb.com/1/upload?key=${imgbbAPIKey}`,
      {
        method: "POST",
        body: formData,
      }
    );

    const result = await response.json();

    if (result.success) {
      return result.data.url; // <-- fixed here: get URL correctly
    } else {
      throw new Error("Image upload failed");
    }
  };

  const onSubmit = async (data) => {
    const { name, email, password, userType, image } = data;
    const imageFile = image[0];

    try {
      setUploading(true);
      const uploadedImageUrl = await uploadImageToImgbb(imageFile); // renamed variable

      const userCredential = await registerWithEmailPassword(email, password);

      // Pass displayName and photoURL to updateUserProfile
      await updateUserProfile({
        displayName: name,
        photoURL: uploadedImageUrl,
      });

      const userInfo = {
        name,
        email,
        photoURL: uploadedImageUrl,
        userType,
      };

      // await axiosPublic.post("/users", userInfo);
      toast.success("Registration successful!");
      navigate(location?.state || "/");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="flex justify-center py-10">
      <Toaster position="top-right" />
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md dark:bg-zinc-900">
        <h2 className="text-2xl font-semibold text-teal-600 mb-6 text-center">
          Register
        </h2>
        {/* Form Side */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <input
            type="text"
            placeholder="Full Name"
            {...register("name", { required: "Name is required" })}
            className="w-full p-2 border border-teal-600 rounded"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full p-2 border border-teal-600 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-2 border border-teal-600 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Profile Image Upload */}
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Profile image is required" })}
            className="w-full p-2 border border-teal-600 rounded"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}

          {/* User Type */}
          <select
            {...register("userType", { required: "Please select a user type" })}
            className="w-full p-2 border border-teal-600 rounded"
            defaultValue=""
          >
            <option value="" disabled>
              Select user type
            </option>
            <option value="User">User</option>
            <option value="DeliveryMen">DeliveryMen</option>
          </select>
          {errors.userType && (
            <p className="text-red-500 text-sm">{errors.userType.message}</p>
          )}

          <button
            type="submit"
            disabled={uploading}
            className="w-full bg-teal-600 text-white p-2 rounded hover:bg-teal-700"
          >
            {uploading ? "Uploading..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-6 flex items-center">
          <hr className="flex-1 border-teal-600" />
          <span className="mx-2 text-teal-600">OR</span>
          <hr className="flex-1 border-teal-600" />
        </div>

        {/* Social Login */}
        <SocialLogin />
      </div>
      {/* Design Side */}
        <div className="relative hidden items-center justify-center md:flex md:w-[50%]">
          <div className="mx-auto w-[70%]">{View}</div>
        </div>
    </div>
  );
};

export default Register;

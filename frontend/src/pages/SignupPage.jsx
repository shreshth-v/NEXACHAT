import { Link } from "react-router-dom";
import { FaCamera } from "react-icons/fa6";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import { DEFAULT_USER_IMAGE } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../features/auth/authSlice";

const SignupPage = () => {
  const dispatch = useDispatch();
  const { isSigningUp } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    profilePic: null,
    name: "",
    email: "",
    password: "",
  });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);
  const [previewImage, setPreviewImage] = useState(DEFAULT_USER_IMAGE);

  const handleFormChange = (e) => {
    setFormData((currVal) => {
      return { ...currVal, [e.target.name]: e.target.value };
    });
  };

  const handleImageChange = (e) => {
    setFormData((currVal) => {
      return { ...currVal, [e.target.name]: e.target.files[0] };
    });

    const objectUrl = URL.createObjectURL(e.target.files[0]);
    setPreviewImage(objectUrl);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(signup(formData));
  };

  // Loading
  if (isSigningUp) {
    return (
      <div className="bg-base-300 h-full rounded-xl p-4 flex items-center justify-center">
        <span className="loading loading-spinner text-primary loading-xl"></span>
      </div>
    );
  }

  return (
    <div className="bg-base-300 h-full rounded-xl p-4 flex items-center justify-center">
      <form
        onSubmit={handleFormSubmit}
        className="space-y-2 flex flex-col text-center basis-auto"
      >
        {/* Preview Image */}
        <div className="flex justify-center relative mb-5">
          <img
            src={previewImage}
            alt=""
            className="w-28 h-28 rounded-full border-2 border-white"
          />
          <label
            htmlFor="profilePic"
            className="absolute bottom-0 left-50 text-lg bg-indigo-500 rounded-full p-2"
          >
            <FaCamera />
          </label>
        </div>

        {/* Profile Picture  */}
        <div>
          <input
            type="file"
            className="file-input file-input-ghost hidden"
            id="profilePic"
            name="profilePic"
            onChange={handleImageChange}
          />
        </div>

        {/* Name  */}
        <div>
          <input
            type="text"
            className="input validator"
            required
            placeholder="Name"
            pattern="[A-Za-z][A-Za-z0-9\- ]*"
            minLength="3"
            maxLength="30"
            title="Only letters, numbers or dash"
            name="name"
            onChange={handleFormChange}
            value={formData.name}
          />
          <p className="validator-hint">
            Must be 3 to 30 characters containing only letters, numbers or dash
          </p>
        </div>

        {/* Email */}
        <div>
          <input
            type="email"
            className="input validator"
            required
            placeholder="Email"
            name="email"
            onChange={handleFormChange}
            value={formData.email}
          />
          <div className="validator-hint">Enter valid email address</div>
        </div>

        {/* Password */}
        <div className="relative">
          {isPasswordHidden ? (
            <IoEye
              className="absolute right-8 top-3 text-gray-400 cursor-pointer z-10"
              onClick={() => setIsPasswordHidden(false)}
            />
          ) : (
            <IoEyeOff
              className="absolute right-8 top-3 text-gray-400 cursor-pointer z-10"
              onClick={() => setIsPasswordHidden(true)}
            />
          )}
          <input
            type={isPasswordHidden ? "password" : "text"}
            className="input validator"
            required
            placeholder="Password"
            minLength="6"
            pattern="(?=.*\d).{6,}"
            title="Must be more than 6 characters, including at least one number"
            name="password"
            onChange={handleFormChange}
            value={formData.password}
          />
          <p className="validator-hint">
            Must be more than 6 characters, including at least one number
          </p>
        </div>

        {/* Submit Button  */}
        <div className="px-5 mb-4">
          <button className="btn btn-primary w-full">Create an account</button>
        </div>

        <div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to={"/login"}
              href="#"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupPage;

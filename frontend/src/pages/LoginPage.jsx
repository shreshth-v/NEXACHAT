import { Link } from "react-router-dom";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoggingIn } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  const handleFormChange = (e) => {
    setFormData((currVal) => {
      return { ...currVal, [e.target.name]: e.target.value };
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData));
  };

  // Loading
  if (isLoggingIn) {
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
        <div className="text-3xl font-bold mb-10">Welcome Back!!</div>

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
              className="absolute right-4 top-3 text-gray-400 cursor-pointer z-10"
              onClick={() => setIsPasswordHidden(false)}
            />
          ) : (
            <IoEyeOff
              className="absolute right-4 top-3 text-gray-400 cursor-pointer z-10"
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
            Must be more than 6 characters, and at least one number
          </p>
        </div>

        {/* Submit Button  */}
        <div className="mb-4">
          <button className="btn btn-primary w-full">Login</button>
        </div>

        <div>
          <p className="text-sm font-light text-gray-500 dark:text-gray-400">
            Create a new account?{" "}
            <Link
              to={"/signup"}
              href="#"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;

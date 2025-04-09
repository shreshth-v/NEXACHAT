import { FaCamera } from "react-icons/fa6";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfile } from "../features/auth/authSlice";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const { authUser, isUpdatingProfile } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    profilePic: null,
    name: authUser.name,
    email: authUser.email,
  });

  const [previewImage, setPreviewImage] = useState(authUser.profilePic);

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
    dispatch(updateProfile(formData));
  };

  // Loading
  if (isUpdatingProfile) {
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
            className="size-28 rounded-full border-2 border-white"
          />
          <label
            htmlFor="profilePic"
            className="absolute bottom-0 left-43 text-lg bg-indigo-500 rounded-full p-2"
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
            Name must contain atleast 3 letters, numbers or dash
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
            disabled
          />
          <div className="validator-hint">Enter valid email address</div>
        </div>

        {/* Submit Button  */}
        <div className="mb-4">
          <button className="btn btn-primary w-full">Update Profile</button>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.auth);
  return (
    <div className="navbar bg-indigo-500 shadow-sm px-5">
      <div className="flex-1">
        <Link to={"/"} className="text-xl font-bold">
          NexaChat
        </Link>
      </div>
      {authUser && (
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img alt="Profile Picture" src={authUser.profilePic} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-indigo-700 rounded-box z-1 mt-5 w-52 p-2 shadow"
            >
              <li>
                <Link
                  to={"/profile"}
                  onClick={() => document.activeElement.blur()}
                >
                  Profile
                </Link>
              </li>
              <li>
                <span onClick={() => dispatch(logout())}>Logout</span>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;

import { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleNavigate = () => {
    navigate("/my-profile");
  };

  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="text-2xl font-bold text-gray-800">
          <NavLink to="/" className="hover:text-blue-500">
            Coupon Hunter
          </NavLink>
        </div>

        <nav className="hidden md:flex space-x-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/brands"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }
          >
            Brands
          </NavLink>
          {currentUser && (
            <NavLink
              to="/my-profile"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold"
                  : "text-gray-600 hover:text-blue-500"
              }
            >
              My Profile
            </NavLink>
          )}
          <NavLink
            to="/about-us"
            className={({ isActive }) =>
              isActive
                ? "text-blue-500 font-semibold"
                : "text-gray-600 hover:text-blue-500"
            }
          >
            About Dev
          </NavLink>
        </nav>

        <div className="flex items-center space-x-4">
          {!currentUser ? (
            <>
              <NavLink
                to="/login"
                className="text-sm text-gray-600 hover:text-blue-500"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600"
              >
                Register
              </NavLink>
            </>
          ) : (
            <div className="flex items-center space-x-3">
              <img
                src={currentUser.photoURL}
                alt="Profile"
                className="w-10 h-10 rounded-full border border-gray-300 hover:border hover:p-[2px]"
                onClick={handleNavigate}
              />
              <button
                onClick={handleLogout}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          )}
        </div>

        <div className="md:hidden">
          <button className="text-gray-600 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;

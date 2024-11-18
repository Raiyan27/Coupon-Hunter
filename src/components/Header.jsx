import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { getAuth, signOut } from "firebase/auth";

const Header = () => {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  const auth = getAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
    } catch (error) {
      console.error("Error logging out: ", error);
    }
  };

  const handleNavigate = (path) => {
    setIsMenuOpen(false);
    navigate(path);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

        <div className="items-center space-x-4 hidden md:flex">
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
                onClick={() => handleNavigate("/my-profile")}
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
          <button
            onClick={toggleMenu}
            className="text-gray-600 focus:outline-none"
          >
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

      {isMenuOpen && (
        <div className="md:hidden text-center">
          <nav className="space-y-4 px-4 py-3">
            <NavLink
              to="/"
              onClick={() => handleNavigate("/")}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold block"
                  : "text-gray-600 hover:text-blue-500 block"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/brands"
              onClick={() => handleNavigate("/brands")}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold block"
                  : "text-gray-600 hover:text-blue-500 block"
              }
            >
              Brands
            </NavLink>
            {currentUser && (
              <NavLink
                to="/my-profile"
                onClick={() => handleNavigate("/my-profile")}
                className={({ isActive }) =>
                  isActive
                    ? "text-blue-500 font-semibold block"
                    : "text-gray-600 hover:text-blue-500 block"
                }
              >
                My Profile
              </NavLink>
            )}
            <NavLink
              to="/about-us"
              onClick={() => handleNavigate("/about-us")}
              className={({ isActive }) =>
                isActive
                  ? "text-blue-500 font-semibold block"
                  : "text-gray-600 hover:text-blue-500 block"
              }
            >
              About Dev
            </NavLink>

            {!currentUser ? (
              <>
                <NavLink
                  to="/login"
                  onClick={() => handleNavigate("/login")}
                  className="px-4 py-2 text-sm text-black bg-gray-100 rounded-lg hover:bg-blue-600 block"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  onClick={() => handleNavigate("/register")}
                  className="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg hover:bg-blue-600 block"
                >
                  Register
                </NavLink>
              </>
            ) : (
              <div className="flex flex-col space-y-3">
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600"
                >
                  Log Out
                </button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;

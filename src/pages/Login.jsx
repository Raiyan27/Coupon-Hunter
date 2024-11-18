import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { toast } from "react-toastify";
import { auth, googleProvider } from "../auth/firebase";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = useState(false);

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
      navigate(from);
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      navigate(from);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-[820px]">
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="max-w-md min-w-[400px] mx-auto bg-white p-6 shadow rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 mb-4 border rounded"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <IoEyeOffOutline className="w-5 h-5" />
                ) : (
                  <IoEyeOutline className="w-5 h-5" />
                )}
              </button>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
            >
              Login
            </button>
          </form>
          <p className="text-center mt-4 text-sm">
            <Link to="/register" className="text-blue-500 hover:underline">
              Don’t have an account? Register here
            </Link>
          </p>
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white p-2 w-full mt-4 rounded hover:bg-red-600"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;

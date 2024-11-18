import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../auth/firebase";
import { toast } from "react-toastify";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const validatePassword = (password) => {
    const isValid =
      /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6;
    return isValid;
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!validatePassword(formData.password)) {
      setError(
        "Password must contain at least 6 characters, including uppercase and lowercase letters."
      );
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const user = userCredential.user;

      await updateProfile(user, {
        displayName: formData.name,
        photoURL: formData.photoURL,
      });

      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-[820px]">
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="max-w-md min-w-[400px] mx-auto bg-white p-6 shadow rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
          <form onSubmit={handleRegister}>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
              required
            />
            <input
              type="url"
              placeholder="Photo URL (Optional)"
              value={formData.photoURL}
              onChange={(e) =>
                setFormData({ ...formData, photoURL: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-2 mb-2 border rounded"
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
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 w-full rounded"
            >
              Register
            </button>
            <p className="text-center mt-4">
              <Link to="/login" className="text-blue-500">
                Already have an account? Login here
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

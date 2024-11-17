import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../auth/firebase";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photoURL: "",
  });
  const [error, setError] = useState("");
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
      await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      toast.success("Registration successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-[820px]">
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold text-center mb-4">Register</h1>
          <form
            onSubmit={handleRegister}
            className="max-w-md mx-auto bg-white p-6 shadow rounded-lg"
          >
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
              placeholder="Photo URL"
              value={formData.photoURL}
              onChange={(e) =>
                setFormData({ ...formData, photoURL: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full p-2 mb-2 border rounded"
              required
            />
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

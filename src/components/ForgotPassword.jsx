import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../auth/firebase";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const loginEmail = location.state?.email || "";
    setEmail(loginEmail);
  }, [location]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter a valid email.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Please check your inbox.");
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      toast.error("Failed to send reset email. Please try again.");
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow flex items-center justify-center bg-gray-100">
        <div className="max-w-md min-w-[400px] mx-auto bg-white p-6 shadow rounded-lg">
          <h1 className="text-2xl font-bold text-center mb-6">
            Reset Password
          </h1>
          <form onSubmit={handleResetPassword}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
            >
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

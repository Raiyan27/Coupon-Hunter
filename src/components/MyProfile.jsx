import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";

const MyProfile = () => {
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading user data...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-16 text-center">
        <h1 className="text-4xl font-bold mb-2">
          Welcome, {currentUser.displayName || "User"}
        </h1>
        <p className="text-lg">Manage your profile and account settings.</p>
      </div>

      <div className="container mx-auto mt-10 px-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <div className="text-center">
            <img
              src={currentUser.photoURL || "https://via.placeholder.com/150"}
              alt="User Profile"
              className="w-24 h-24 rounded-full mx-auto mb-4"
            />
            <h2 className="text-2xl font-semibold text-gray-800">
              {currentUser.displayName || "No Name Provided"}
            </h2>
            <p className="text-gray-600">
              {currentUser.email || "No Email Available"}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto mt-10 px-4">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md mx-auto">
          <button
            onClick={() => navigate("/update-profile")}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Update Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;

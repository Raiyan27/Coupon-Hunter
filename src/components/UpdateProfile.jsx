import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../auth/firebase";
import { updateProfile } from "firebase/auth";
import { toast } from "react-toastify";

const UpdateProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    photo: "",
  });
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      setFormData({
        name: currentUser.displayName || "",
        photo: currentUser.photoURL || "",
      });
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (user) {
      try {
        await updateProfile(user, {
          displayName: formData.name,
          photoURL: formData.photo,
        });

        toast.success("Profile updated successfully!");

        navigate("/my-profile");
      } catch (error) {
        console.error("Error updating profile:", error.message);
        toast.error("Error updating profile. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Update Your Information
        </h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-600 mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="photo" className="block text-gray-600 mb-2">
              Photo URL
            </label>
            <input
              type="text"
              id="photo"
              name="photo"
              placeholder="Enter photo URL"
              value={formData.photo}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={handleUpdate}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
          >
            Update Information
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

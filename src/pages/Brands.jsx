import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch("./brands.json");
        if (!response.ok) {
          throw new Error("Failed to fetch brands data");
        }
        const data = await response.json();
        setBrands(data);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrands();
  }, []);

  const filteredBrands = brands.filter((brand) =>
    brand.brand_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleViewCoupons = (brand) => {
    navigate(`/brand/${brand._id}`, { state: brand });
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-16 text-center">
        <h1 className="text-3xl font-bold text-center mb-6">Our Brands</h1>

        <div className="flex justify-center mb-6">
          <input
            type="text"
            placeholder="Search for a brand..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border rounded-lg px-4 py-2 w-full max-w-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="container mx-auto p-4">
        <div className="grid gap-4">
          {filteredBrands.map((brand) => (
            <div
              key={brand._id}
              className="border p-4 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="flex items-center space-x-4">
                <img
                  src={brand.brand_logo}
                  alt={brand.brand_name}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <h2 className="text-xl font-bold">{brand.brand_name}</h2>
                  <div className="flex items-center text-yellow-500">
                    <FaStar /> <span className="ml-2">{brand.rating}</span>
                  </div>
                </div>
              </div>

              <p className="mt-4">{brand.description}</p>

              <div className="mt-4 flex justify-between items-center">
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => handleViewCoupons(brand)}
                >
                  View Coupons
                </button>
                {brand.isSaleOn && (
                  <span className="bg-red-500 text-white px-3 py-1 rounded-lg animate-bounce">
                    Sale is On!
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Brands;

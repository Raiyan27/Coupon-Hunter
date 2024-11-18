import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const Brand = () => {
  const { id } = useParams();
  const [brand, setBrand] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrand = async () => {
      try {
        const response = await fetch("/brandList.json");
        if (!response.ok) {
          throw new Error("Failed to fetch brand data");
        }
        const data = await response.json();

        const selectedBrand = data.find((b) => b._id === id);
        setBrand(selectedBrand);
      } catch (error) {
        console.error("Error fetching brand:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBrand();
  }, [id]);

  const handleCopy = async (couponCode) => {
    try {
      await navigator.clipboard.writeText(couponCode);
      toast.success(`Coupon code "${couponCode}" copied to clipboard!`);
    } catch (error) {
      toast.error("Failed to copy the coupon code.");
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (!brand) {
    return (
      <div className="container mx-auto p-4 text-center">
        <p className="text-gray-600 text-lg">
          Brand not found. Please navigate from the Brands page.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 min-h-screen">
      <Helmet>
        <title>{brand.brand_name} - Coupon Hunter</title>
      </Helmet>
      <div className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white rounded-lg shadow-lg p-6 text-center">
        <img
          src={brand.brand_logo}
          alt={brand.brand_name}
          className="w-32 h-32 mx-auto object-cover rounded-full border-4 border-white shadow-lg mb-4"
        />
        <h1 className="text-4xl font-bold">{brand.brand_name}</h1>
        <p className="mt-2">{brand.description}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Available Coupons
        </h2>
        {brand.coupons.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {brand.coupons.map((coupon) => (
              <div
                key={coupon.coupon_code}
                className="bg-white shadow-md rounded-lg p-6 border hover:shadow-lg transition"
              >
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {coupon.coupon_code}
                </h3>
                <p className="text-gray-700 mb-2">{coupon.description}</p>
                <p className="text-gray-600">
                  <span className="font-bold">Expires:</span>{" "}
                  {coupon.expiry_date}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-bold">Condition:</span>{" "}
                  {coupon.condition}
                </p>
                <button
                  onClick={() => handleCopy(coupon.coupon_code)}
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                  Copy Code
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            No coupons are currently available for this brand.
          </p>
        )}
      </div>

      <div className="mt-10 text-center">
        <a
          href={brand["shop-Link"]}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-500 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-600 transition"
        >
          Visit {brand.brand_name} Shop
        </a>
      </div>
    </div>
  );
};

export default Brand;

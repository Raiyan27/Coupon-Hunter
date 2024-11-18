import { useEffect, useState } from "react";
import Marquee from "react-fast-marquee";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Helmet } from "react-helmet";

const HomePage = () => {
  const [brands, setBrands] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [bgIndex, setBgIndex] = useState(0);
  const navigate = useNavigate();

  const bgImages = ["/bg-1.jpg", "/bg-2.jpg", "/bg-3.jpg"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("./brands.json");
        const data = await response.json();
        setBrands(data);
        const brandCoupons = data.flatMap((brand) =>
          brand.coupons.map((coupon) => ({
            ...coupon,
            brandName: brand.brand_name,
            category: brand.category,
          }))
        );
        setCoupons(brandCoupons);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleBrand = (brand) => {
    navigate(`/brand/${brand._id}`, { state: brand });
  };

  const handleCopy = async (couponCode) => {
    try {
      await navigator.clipboard.writeText(couponCode);
      toast.success(`Coupon code "${couponCode}" copied to clipboard!`);
    } catch (error) {
      toast.error("Failed to copy the coupon code.");
    }
  };

  const handlePrev = () => {
    setBgIndex(
      (prevIndex) => (prevIndex - 1 + bgImages.length) % bgImages.length
    );
  };
  const handleNext = () => {
    setBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
  };
  return (
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Home - Coupon Hunter</title>
      </Helmet>

      <section className="relative">
        <div className=" text-white relative z-10">
          <div className="container mx-auto py-16 px-4 text-center">
            <h1 className="lg:text-6xl text-4xl font-bold mb-4 animate__animated animate__backInDown">
              Welcome to Coupon Hunter
            </h1>
            <p className="text-lg ">
              Find the best deals from your favorite e-commerce stores in
              Bangladesh.
            </p>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-72">
          <div
            className="w-full h-full bg-center bg-cover transition-all duration-1000"
            style={{
              backgroundImage: `url(${bgImages[bgIndex]})`,
            }}
          ></div>

          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 text-white md:text-6xl text-2xl z-20"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white md:text-6xl text-2xl z-20"
          >
            &#8594;
          </button>
        </div>
      </section>

      <section className="container mx-auto py-10 px-4 mt-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Top Brands
        </h2>
        <div className="bg-white shadow-lg rounded-lg">
          <Marquee gradient={false} pauseOnHover>
            <div className="flex items-center space-x-32 py-4">
              {brands.map((brand) => (
                <img
                  onClick={() => handleBrand(brand)}
                  key={brand._id}
                  src={brand.brand_logo}
                  alt={brand.brand_name}
                  className="w-20 h-20 object-contain rounded-full cursor-pointer hover:border hover:bg-blue-500"
                />
              ))}
            </div>
          </Marquee>
        </div>
      </section>

      <section className="container mx-auto py-10 px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center animate__animated animate__tada">
          Brands on Sale
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {brands
            .filter((brand) => brand.isSaleOn)
            .map((brand) => (
              <div
                key={brand._id}
                className="bg-white shadow-md rounded-lg p-4"
              >
                <img
                  src={brand.brand_logo}
                  alt={brand.brand_name}
                  className="w-16 h-16 mx-auto mb-4 object-contain rounded-full"
                />
                <h3 className="text-xl font-semibold text-gray-800 text-center">
                  {brand.brand_name}
                </h3>
                <p className="text-gray-600 text-center">
                  Total Coupons: {brand.coupons.length}
                </p>
                <p className="text-gray-600 text-center">
                  Category: {brand.category}
                </p>
              </div>
            ))}
        </div>
      </section>
      <section className="bg-blue-50 py-10">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center animate__animated animate__tada">
            Featured Coupons
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coupons.slice(0, 6).map((coupon, index) => (
              <div key={index} className="bg-white shadow-md rounded-lg p-4">
                <h1 className="text-4xl font-bold">{coupon.brandName}</h1>
                <h3 className="text-lg text-gray-600 mb-2">
                  Coupon code: {coupon.coupon_code}
                </h3>
                <p className="text-gray-700 font-bold">
                  {coupon.description || "Save big on your purchase."}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Expires: </span>
                  {coupon.expiry_date}
                </p>
                <p className="text-gray-600">
                  <span className="font-bold">Category:</span> {coupon.category}
                </p>
                <button
                  className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                  onClick={() => handleCopy(coupon.coupon_code)}
                >
                  Copy Code
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            How to use the coupons?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                1. Find Coupons
              </h3>
              <p className="text-gray-600">
                Browse and search for coupons from your favorite stores.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                2. Copy Codes
              </h3>
              <p className="text-gray-600">
                Easily copy the coupon codes to your clipboard.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                3. Save Money
              </h3>
              <p className="text-gray-600">
                Apply the codes at checkout and enjoy discounts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

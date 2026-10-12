import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { listingDataContext } from "../Context/ListingContext.jsx";

function ListingPage3() {
  const navigate = useNavigate();

  const {
    title,
    description,
    frontEndImage1,
    frontEndImage2,
    frontEndImage3,
    rent,
    city,
    landmark,
    category,
    handleAddListing,
    adding,
  } = useContext(listingDataContext);

  return (
    <div className="min-h-screen w-full bg-white relative overflow-x-hidden">

      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate("/listingpage2")}
        className="fixed top-6 left-6 z-50 flex h-[50px] w-[50px] items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700 transition"
      >
        <FaArrowLeftLong className="h-6 w-6" />
      </button>

      {/* Main Content */}
      <main className="mx-auto w-[92%] max-w-[1100px] pt-24 pb-12">

        {/* Location Heading */}
        <h1 className="mb-5 text-xl font-medium text-gray-800 md:text-2xl">
          In {landmark?.toUpperCase()}, {city?.toUpperCase()}
        </h1>

        <div className="grid h-[250px] grid-cols-1 gap-2 overflow-hidden rounded-xl sm:h-[350px] md:h-[420px] md:grid-cols-2">

          <div className="h-full overflow-hidden rounded-l-xl">
            {frontEndImage1 ? (
              <img
                src={frontEndImage1}
                alt="Main property"
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
                Main image
              </div>
            )}
          </div>

          <div className="hidden h-full grid-rows-2 gap-2 overflow-hidden md:grid">

            <div className="overflow-hidden">
              {frontEndImage2 ? (
                <img
                  src={frontEndImage2}
                  alt="Property interior"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
                  Image 2
                </div>
              )}
            </div>

            <div className="overflow-hidden">
              {frontEndImage3 ? (
                <img
                  src={frontEndImage3}
                  alt="Property view"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
                  Image 3
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Property Details */}
        <div className="mt-6 flex flex-col gap-4">

          {/* Title */}
          <div>
            <h2 className="text-xl font-semibold uppercase text-gray-900 md:text-2xl">
              {title} {category ? `, ${category}` : ""}
            </h2>

            <p className="mt-2 text-sm text-gray-500 md:text-base">
              {description}
            </p>
          </div>

          {/* Location */}
          <p className="text-base text-gray-600">
            {landmark}, {city}
          </p>

          {/* Price and Button */}
          <div className="mt-3 flex flex-col gap-4 border-t border-gray-200 pt-5 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-2xl font-semibold text-gray-900">
              ₹{rent}
              <span className="text-base font-normal text-gray-500">
                {" "}/ day
              </span>
            </p>

            <button
              type="button"
              onClick={handleAddListing} disabled={adding}
              className="w-full rounded-lg bg-red-600 px-8 py-3 text-lg font-medium text-white shadow-md transition hover:bg-red-700 sm:w-auto"
            >
              {adding? "adding...":"Add Listing"}
            </button>

          </div>
        </div>

      </main>
    </div>
  );
}

export default ListingPage3;
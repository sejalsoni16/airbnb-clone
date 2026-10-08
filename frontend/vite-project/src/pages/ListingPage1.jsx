import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function ListingPage1() {
  const navigate = useNavigate();

  return (
    <div className="w-screen h-screen bg-white relative">

      {/* Back Button */}
      <button
        type="button"
        className="fixed top-10 left-5 z-50 w-[50px] h-[50px] bg-red-500 rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <FaArrowLeftLong className="w-[25px] h-[25px] text-white" />
      </button>

      <form className="max-w-[900px] w-[90%] h-[600px] mx-auto flex items-center justify-center flex-col gap-[10px] overflow-auto">
      </form>

    </div>
  );
}

export default ListingPage1;
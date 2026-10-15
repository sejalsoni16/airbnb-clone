import React from 'react'

function Card({title,landmark,image1,image2,image3,rent,city,id}) {
  return (
    <div className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg cursor-pointer'>
      <div className='w-[100%] h-[67%] bg-[#2e2d2d] rounded-lg overflow-auto flex '>
          <img src={image1} alt="" className='w-[100%] flex-shrink-0' />
          <img src={image2} alt="" className='w-[100%] flex-shrink-0' />
          <img src={image3} alt="" className='w-[100%] flex-shrink-0' />
      </div>
      {/* Listing Details */}
      <div className="w-full flex flex-col items-start gap-2 mt-3">
        <p className="w-full text-sm font-semibold text-[#4a3434] truncate">
          In {landmark?.toUpperCase()}, {city?.toUpperCase()}
        </p>
        <p className="w-full text-sm text-black truncate">
          {title?.toUpperCase()}
        </p>
        <p className="w-full text-base font-semibold text-[#986b6b]">
          ₹{rent}/day
        </p>
      </div>
    </div>
      )
    }

export default Card

import { useNavigate } from 'react-router-dom'
import { listingDataContext } from '../Context/ListingContext'
import { userDataContext } from '../Context/UserContext'
import { MdOutlineStar } from "react-icons/md";
import React, { useContext } from 'react'
import { GiConfirmed } from "react-icons/gi"
import { FcCancel } from "react-icons/fc"

function Card({title,landmark,image1,image2,image3,rent,city,id,ratings,isBooked,host}) {
  let {userData} = useContext(userDataContext)
  let {handleViewCard} = useContext(listingDataContext)
  let navigate = useNavigate()
  const handleClick = ()=>{
    if(userData){
      handleViewCard(id)
    }
    else{
      navigate("/login")
    }
  }
  return (
    <div className='w-[330px] max-w-[85%] h-[460px] flex items-start justify-start flex-col rounded-lg cursor-pointer relative z-[20]' onClick={()=>!isBooked? handleClick():null}>

      {isBooked && <div className='text-[green] bg-white rounded-lg absolute flex items-center justify-center right-1 top-1 gap-[5px] p-[5px]'><GiConfirmed className='w-[20px] h-[20px] text-[green]'/>Booked</div>}

      {isBooked && host == userData?._id && <div className='text-[red] bg-white rounded-lg absolute flex items-center justify-center right-1 top-[50px] gap-[5px] p-[5px]'><FcCancel className='w-[20px] h-[20px] ' />Cancel Booking</div>}

      <div className='w-[300px] h-[100px] bg-[#ffffffdf] absolute top-[110px] left-[13px] rounded-lg'>
        <div className='w-[100%] h-[50%] text-[#2e2d2d] flex items-start justify-center rounded-lg overflow-auto '></div>
      </div>

      <div className='w-[100%] h-[67%] bg-[#2e2d2d] rounded-lg overflow-auto flex '>
          <img src={image1} alt="" className='w-[100%] flex-shrink-0' />
          <img src={image2} alt="" className='w-[100%] flex-shrink-0' />
          <img src={image3} alt="" className='w-[100%] flex-shrink-0' />
      </div>
      {/* Listing Details */}
      <div className="w-full flex flex-col items-start gap-2 mt-3 ">
        <div className='w-full flex items-center justify-between text-[18px] gap-2'>
          <p className="w-full text-sm font-semibold text-[#4a3434] truncate">
            In {landmark?.toUpperCase()}, {city?.toUpperCase()}
          </p>
          <p className='shrink-0 flex items-center justify-center gap-[2px] text-black'>
            <MdOutlineStar className='text-[#eb6262]'/>{ratings}
          </p>
        </div>
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

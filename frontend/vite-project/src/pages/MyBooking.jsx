import Card from '../Component/Card.jsx';
import { userDataContext } from '../Context/UserContext.jsx';
import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaArrowLeftLong } from "react-icons/fa6";


function MyBooking() {
  let navigate = useNavigate();
  let { userData } = useContext(userDataContext);  

  
  return (
    <div className='w-[100vw] min-h-[100vh] flex items-center justify-start flex-col gap-[50px] px-[20px] relative'>
      <div className='w-[50px] h-[50px] bg-[red] cursor-pointer absolute top-[10%] left-[20px] rounded-[50%] flex items-center justify-center ' onClick={()=>{navigate("/")}} ><FaArrowLeftLong className='w-[25px] h-[25px] text-[white]'/></div>

      <div className='w-[60%] h-[10%] border-[2px] border-[#908c8c] p-[15px] flex items-center justify-center text-[30px] rounded-md text-[#613b3b] font-semibold mt-[50px] px-[20px] md:w-[600px] text-no wrap'>MY BOOKING</div>

      <div className='w-[100%] h-[90%] flex items-center justify-center gap-[25px] flex-wrap mt-[30px]'>
        {userData.booking.map((list)=>(
          <Card key={list._id} id={list._id} title={list.title} landmark={list.landmark} city={list.city} image1={list.image1} image2={list.image2} image3={list.image3} rent={list.rent} isBooked={list.isBooked} host={list.host} ratings={list.ratings} /> 
        ))}

      </div>


    </div>
  )
}

export default MyBooking

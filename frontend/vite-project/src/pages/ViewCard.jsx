import { userDataContext } from '../Context/UserContext.jsx';
import { listingDataContext } from '../Context/ListingContext.jsx';
import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { RxCross2 } from "react-icons/rx";
import axios from 'axios';
import { authDataContext } from '../Context/AuthContext.jsx';
import { MdOutlineStar } from "react-icons/md";
import { bookingDataContext } from '../Context/BookingContext.jsx';


function ViewCard() {
  let navigate = useNavigate()
  let {cardDetails} = useContext(listingDataContext)
  let {userData} = useContext(userDataContext)
  let [updatePopUp,setUpdatePopUp] = useState(false);
  let [bookingPopUp,setBookingPopUp] = useState(false);
  let [title,setTitle] = useState(cardDetails.title)
  let [description,setDescription] = useState(cardDetails.description)
  let [backEndImage1,setBackEndImage1] = useState(null)
  let [backEndImage2,setBackEndImage2] = useState(null)
  let [backEndImage3,setBackEndImage3] = useState(null)
  let [rent,setRent] = useState(cardDetails.rent)
  let [city,setCity] = useState(cardDetails.city)
  let [landmark,setLandmark] = useState(cardDetails.landmark)
  let {serverUrl} = useContext(authDataContext)
  let {updating,setUpdating} = useContext(listingDataContext)
  let {deleting,setDeleting} = useContext(listingDataContext)
  let [minDate,setMinDate] = useState("")
  let {checkIn,setCheckIn,
      checkOut,setCheckOut,
      total,setTotal,
      night,setNight,handleBooking,booking,setBooking} = useContext(bookingDataContext)

      useEffect(()=>{
        if(checkIn && checkOut){
          let inDate = new Date(checkIn)
          let outDate = new Date(checkOut)
          let n = ((outDate - inDate) / (24*60*60*1000 ))
          setNight(n)
          let airBnbCharge = (cardDetails.rent*(7/100))
          let tax = (cardDetails.rent*(7/100))

          if(n>0){
            setTotal((cardDetails.rent * n) + airBnbCharge + tax)
          }
          else{
            setTotal(0)
          }
        }
      },[checkIn,checkOut,cardDetails.rent,total])


  
  
  const handleUpdateListing = async()=>{
    setUpdating(true)
    try {
        let formData = new FormData()
        formData.append("title",title)
        if(backEndImage1){formData.append("image1",backEndImage1)}
        if(backEndImage2){formData.append("image2",backEndImage2)}
        if(backEndImage3){formData.append("image3",backEndImage3)}
        formData.append("description", description)
        formData.append("rent",rent)
        formData.append("city",city)
        formData.append("landmark",landmark)

        let result = await axios.post( serverUrl + `/api/listing/update/${cardDetails._id}` , formData, {withCredentials:true})
        setUpdating(false)
        console.log(result)
        navigate("/")
        setTitle("")
        setDescription("")

        setBackEndImage1(null)
        setBackEndImage2(null)
        setBackEndImage3(null)
        setRent("")
        setCity("")
        setLandmark("")

    } catch (error) {
      setUpdating(false)
      
      console.log("Error:", error.response?.data);
      console.log("Status:", error.response?.status);
    }
  }


  const handleDeleteListing = async()=>{
    setDeleting(true)
    try {
      let result = await axios.delete( serverUrl + `/api/listing/delete/${cardDetails._id}` , {withCredentials:true})
      console.log(result.data)
      setDeleting(false)
      navigate("/");
    } catch (error) {
      console.log(error)
      setDeleting(false)
    }
  }
    const handleImage1 = (e)=>{
      let file = e.target.files[0]
      setBackEndImage1(file)
    }
    const handleImage2 = (e)=>{
      let file = e.target.files[0]
      setBackEndImage2(file)
    }
    const handleImage3 = (e)=>{
      let file = e.target.files[0]
      setBackEndImage3(file)
    }
    useEffect(()=>{
      let today = new Date().toISOString().split('T')[0]
      setMinDate(today)
    },[])

    
  return (
  <div className="h-screen w-full bg-white relative overflow-hidden">

    {/* Back Button */}
    <button
      type="button"
      onClick={() => navigate("/")}
      className="absolute top-4 left-4 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white shadow-md hover:bg-red-700"
    >
      <FaArrowLeftLong className="h-5 w-5" />
    </button>

    {/* Main Content */}
    <main className="mx-auto flex h-full w-[95%] max-w-[1250px] flex-col justify-start pt-16 pb-2">

      {/* Location Heading */}
      <div className="mb-3 pl-12">
        <h1 className="text-lg font-semibold text-gray-800 md:text-xl">
          In {cardDetails?.landmark?.toUpperCase()}, {cardDetails?.city?.toUpperCase()}
        </h1>

        <p className="mt-1 line-clamp-2 text-sm text-gray-600">
          {cardDetails?.description}
        </p>
      </div>

      {/* Property Images */}
      <div className="grid h-[48vh] min-h-[250px] max-h-[450px] grid-cols-1 gap-2 overflow-hidden  sm:grid-cols-2">

        {/* Main Image */}
        <div className="h-full overflow-hidden ">
          {cardDetails?.image1 ? (
            <img
              src={cardDetails.image1}
              alt="Main property"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 text-gray-400">
              Main image
            </div>
          )}
        </div>

        {/* Other Images */}
        <div className="hidden h-full grid-rows-2 gap-2 overflow-hidden sm:grid">

          <div className="overflow-hidden ">
            {cardDetails?.image2 ? (
              <img
                src={cardDetails.image2}
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
            {cardDetails?.image3 ? (
              <img
                src={cardDetails.image3}
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
      <div className="mt-4 flex flex-col gap-2">

        {/* Title */}
        <h2 className="text-lg font-semibold uppercase text-gray-900 md:text-xl">
          {cardDetails?.title}
          {cardDetails?.category ? `, ${cardDetails.category}` : ""}
        </h2>

        {/* Location */}
        <p className="text-sm text-gray-700 md:text-base">
          {cardDetails?.landmark}, {cardDetails?.city}
        </p>

        {/* Price and Button */}
        <div className="flex items-center justify-between gap-3 border-t border-gray-200 pt-3">

          <p className="text-xl font-semibold text-gray-900 md:text-2xl">
            ₹{cardDetails?.rent}
            <span className="text-sm font-normal text-gray-600">
              {" "}/ day
            </span>
          </p>

          {cardDetails?.host?.toString() === userData?._id?.toString() ? (
            <button
              type="button"
              onClick={() => setUpdatePopUp(prev => !prev)}
              className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 md:text-base"
            >
              Edit listing
            </button>
          ) : (
            <button
              type="button"
              className="rounded-lg bg-red-600 px-5 py-2 text-sm font-medium text-white hover:bg-red-700 md:text-base" onClick={()=>setBookingPopUp(prev => !prev)}
            >
              Reserve
            </button>
          )}

        </div>
      </div>

    </main>

    {/* Update Listing Popup */}
    {updatePopUp && (
      <div className="absolute inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <button
          type="button"
          className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white" onClick={() => setUpdatePopUp(false)}
        >
          <RxCross2 className="h-6 w-6" />
        </button>

        <form action="" className='max-w-[900px] w-[90%] h-[550px] flex items-center justify-start  flex-col gap-[10px] overflow-auto mt-[50px] text-white bg-[#272727] p-[20px] rounded-lg' onSubmit={(e)=>{e.preventDefault()}} 
        >
        
          <div className='w-[200px] h-[50px] text-[20px] bg-[#f14242] text-[white] flex items-center justify-center rounded-[30px] absolute top-[5%] right-[10px] shadow-lg'>
            Update Your details
          </div>
          <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]' >
            <label htmlFor="title" className='text-[20px]'>Title</label>
            <input type="text" id='title' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]' required onChange={(e)=>setTitle(e.target.value)} value={title}/>
          </div>

          <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]' >
            <label htmlFor="des" className='text-[20px]'>Description</label>
            <textarea name="" id="des" className='w-[90%] h-[80px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-[black]' required  onChange={(e)=>setDescription(e.target.value)} value={description}></textarea>
          </div>

          <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]' >
            <label htmlFor="img1" className='text-[20px]'>Image1</label>
            <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
            <input type="file" id='img1' className='w-[100%] rounded-lg text-[15px] px-[10px]' required onChange={handleImage1}  />
            </div>
          </div>

          <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]' >
            <label htmlFor="img2" className='text-[20px]'>Image2</label>
            <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
            <input type="file" id='img2' className='w-[100%] rounded-lg text-[15px] px-[10px]'  required onChange={handleImage2} />
            </div>
          </div>

          <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]' >
            <label htmlFor="img3" className='text-[20px]'>Image3</label>
            <div className='flex items-center justify-start w-[90%] h-[40px] border-[#555656] border-2 rounded-[10px]'>
            <input type="file" id='img3' className='w-[100%] rounded-lg text-[15px] px-[10px]' required onChange={handleImage3}  />
            </div>
          </div>

          <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]' >
            <label htmlFor="rent" className='text-[20px]'>Rent</label>
            <input type="number" id='rent' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-black' required  onChange={(e)=>setRent(e.target.value)} value={rent}/>
          </div>

          <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]' >
            <label htmlFor="city" className='text-[20px]'>City</label>
            <input type="text" id='city' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-black' required  onChange={(e)=>setCity(e.target.value)} value={city}/>
          </div>

          <div className='w-[90%] flex items-start justify-start flex-col gap-[10px]' >
            <label htmlFor="landmark" className='text-[20px]'>Landmark</label>
            <input type="text" id='landmark' className='w-[90%] h-[40px] border-[2px] border-[#555656] rounded-lg text-[18px] px-[20px] text-black' required  onChange={(e)=>setLandmark(e.target.value)} value={landmark}/>
          </div>

          <div className='w-[100%] flex items-center justify-center gap-[30px] mt-[20px]'>
          <button className='px-[10px] py-[10px] bg-[red] text-[white] text-[15px] md:text-[18px]     md:px-[100px] rounded-lg  text-nowrap' onClick={handleUpdateListing} disabled={updating}>{updating?"updating...":"Update Listing"}</button>

          <button className='px-[10px] py-[10px] bg-[red] text-[white] text-[15px] md:px-[100px] rounded-lg md:text-[18px] text-nowrap' onClick={handleDeleteListing} disabled={deleting}>{deleting?"Deleting...":"Delete Listing"}</button>
          </div>
          
      </form>

      </div>
    )}

      {bookingPopUp && <div className="absolute inset-0 z-[100] flex items-center justify-center gap-8 overflow-y-auto bg-white/80 p-6 backdrop-blur-sm lg:flex-row" >

        <button type="button" className="absolute left-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-red-600 text-white" onClick={() => setBookingPopUp(false)}>
          <RxCross2 className="h-6 w-6" />
        </button>
          
            <form action="" className="flex min-h-[550px] w-full max-w-[565px] flex-col items-center justify-start gap-5 rounded-xl border border-gray-200 bg-[#f7fbfc] p-6 shadow-sm" onSubmit={(e)=>{e.preventDefault()}}>
              <h1 className="w-full border-b border-gray-400 pb-4 text-center text-2xl font-normal text-black">
                Confirm & Book
              </h1>
              <div className="flex w-full flex-1 flex-col items-start justify-start gap-7 pt-4">
                <h3 className='text-[19px] font-semibold text-black'>Your Trip -</h3>

                <div className="flex w-full items-center justify-center gap-6">
                  <label htmlFor="checkIn" className="w-[100px] shrink-0 text-right text-lg text-black">CheckIn</label>
                  <input type="date" min={minDate} id='checkIn' className="h-12 w-[280px] max-w-full rounded-xl border-2 border-gray-400 bg-transparent px-3 text-base text-black" required onChange={(e)=>setCheckIn(e.target.value)} value={checkIn}/>
                </div>

                <div className="flex w-full flex-col items-start justify-start gap-3 sm:flex-row sm:items-center sm:justify-center sm:gap-6">
                  <label htmlFor="checkOut" className='text-[18px] md:text-[20px] text-black'>CheckOut</label>
                  <input type="date" min={minDate} id='checkOut' className="h-12 w-full rounded-xl border-2 border-gray-400 bg-transparent px-3 text-base text-black sm:w-[250px]" required onChange={(e)=>setCheckOut(e.target.value)} value={checkOut}/>
                </div>

                <div className='w-[100%] flex items-center justify-center'>
                <button className="mt-2 h-14 w-full max-w-[350px] rounded-xl bg-red-600 text-lg font-medium text-white transition-colors hover:bg-red-700" onClick={()=>handleBooking(cardDetails._id)} disabled={booking}> {booking?"booking...":"Book Now"}</button>
                </div>

              </div>

            </form>

            <div className="flex min-h-[550px] w-full max-w-[565px] flex-col items-center justify-start gap-3 rounded-xl border border-gray-200 bg-[#f7fbfc] p-6 shadow-sm">
              <div className="flex w-full items-center gap-4 rounded-xl border border-gray-400 p-3">
                  <div className="h-[110px] w-[125px] shrink-0 overflow-hidden rounded-lg">
                    <img
                      className="h-full w-full object-cover"
                      src={cardDetails.image1}
                      alt={cardDetails.title}
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1">
                    <h1 className="truncate text-sm text-gray-700">
                      In {cardDetails.landmark?.toUpperCase()}, {cardDetails.city?.toUpperCase()}
                    </h1>
                    <h1 className="line-clamp-2 text-base font-medium text-gray-900">{cardDetails.title.toUpperCase()}</h1>
                    <h1>{cardDetails.category.toUpperCase()}</h1>
                    <h1 className="flex items-center gap-1 text-sm text-black"><MdOutlineStar className='text-[#eb6262] '/>{cardDetails.ratings}</h1>
                  </div>
              </div>

              <div className="flex w-full flex-1 flex-col items-start justify-start gap-5 rounded-xl border border-gray-400 p-5 text-black">
                <h1 className="text-xl font-semibold text-gray-900">
                  Booking Price -
                </h1>
                <p className="flex w-full items-center justify-between gap-4 text-sm">
                  <span className="font-semibold">
                    ₹{cardDetails.rent} × {night} {night === 1 ? "night" : "nights"}
                  </span>

                  <span>₹{cardDetails.rent * night}</span>
                </p>

                <p className="flex w-full items-center justify-between gap-4 text-sm">
                  <span>Tax</span>
                  <span>₹{cardDetails.rent * night * 0.07}</span>
                </p>

                <p className="flex w-full items-center justify-between gap-4 text-sm">
                  <span>Airbnb Charge</span>
                  <span>₹{cardDetails.rent * night * 0.07}</span>
                </p>

                <div className="mt-1 w-full border-t border-gray-400 pt-4">
                  <p className="flex w-full items-center justify-between gap-4 text-base font-semibold text-gray-900">
                    <span>Total Price</span>
                    <span>₹{total}</span>
                  </p>
                </div>
              </div>

            </div>

      </div>}

  </div>
);
}

export default ViewCard

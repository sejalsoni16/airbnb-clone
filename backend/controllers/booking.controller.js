import Booking from "../model/booking.model.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

export const createBooking = async (req,res)=>{
  try {
     console.log("Booking request received:", {
      id: req.params.id,
      body: req.body,
      userId: req.userId,
    });
    let {id} = req.params
    let {checkIn, checkOut, totalRent} = req.body;

    let  listing = await Listing.findById(id);
    if(!listing){
      return res.status(404).json({message:"Listing is not found"});
    }

    if(new Date(checkIn) >= new Date(checkOut)){
      return res.status(400).json({message:"Invalid checkIn/checkOut date"})
    }

    if(listing.isBooked){
      return res.status(400).json({message:"Listing is already Booked"})
    }
    let booking = await Booking.create({
      checkIn,
      checkOut,
      totalRent,
      host:listing.host,
      guest:req.userId,
      listing:listing._id
    })
    let user = await User.findByIdAndUpdate(req.userId,{
      $push:{bookings:listing}
    },{new:true})

    if(!user){
      return res.status(404).json({message:"User is not found"});
    }
    listing.guest = req.userId
    listing.isBooked = true
    await listing.save()
    return res.status(201).json(booking)

  } catch (error) {
    return res.status(500).json({message:`booking error ${error}`})
    console.log("Booking error:", error.response?.data);
    console.log("Status:", error.response?.status);
    setBookingData(null);
  }
}

export const cancelBooking = async(req,res) => {
  try {
    let {id} = req.params
    let listing = await Listing.findByIdAndUpdate(id,{isBooked:false})
    let user = await User.findByIdAndUpdate(listing.guest,{
      $pull:{bookings:listing._id}
    },{new:true})
    if(!user){
      return res.status(404).json({message:"user is not found"})
    }
    return res.status(200).json({message:"booking cancelled"})
  } catch (error) {
      return res.status(500).json({message:"booking cancel error"})
  }
}
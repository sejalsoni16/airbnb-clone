import User from "../model/user.model.js"

export const getCurrentUser = async (req, res) => {
  try{
    let user = await User.findById(req.userId).select("-password").populate("listing","title image1 image2 image3 description rent category city landmark isBooked host ratings")
    .populate("bookings","title image1 image2 image3 description rent category city landmark isBooked host ratings")
    if(!user){
      return res.status(400).json({message:"user does not found"})
    }
     return res.status(200).json(user)
  } catch (error) {
      console.error("GetCurrentUser Error:", error);

      return res.status(500).json({
        message: "Failed to get current user",
        error: error.message,
      });
    }
}
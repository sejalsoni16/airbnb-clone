import uploadOnCloudinary from "../config/cloudinaryy.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

export const addListing = async (req, res) => {
  try {
    const host = req.userId;

    const {
      title,
      description,
      rent,
      city,
      landmark,
      category,
    } = req.body;

    if (
      !req.files?.image1?.[0] ||
      !req.files?.image2?.[0] ||
      !req.files?.image3?.[0]
    ) {
      return res.status(400).json({
        message: "Please upload all three images",
      });
    }

    const image1 = await uploadOnCloudinary(
      req.files.image1[0].path
    );

    const image2 = await uploadOnCloudinary(
      req.files.image2[0].path
    );

    const image3 = await uploadOnCloudinary(
      req.files.image3[0].path
    );

    if (!image1 || !image2 || !image3) {
      return res.status(500).json({
        message: "Failed to upload images",
      });
    }

    const listing = await Listing.create({
      title,
      description,
      rent: Number(rent),
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host,
    });

    const user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(201).json({
      message: "Listing created successfully",
      listing,
    });

  } catch (error) {
    console.error("AddListing Error:", error);

    return res.status(500).json({
      message: "Failed to add listing",
      error: error.message,
    });
  }
}

  export const getListing = async (req,res) => {
    try {
      let listing = await Listing.find().sort({createdAt:-1});
      res.status(200).json(listing);
    } 
    catch (error) {
      res.status(500).json({message:`getListing error ${error}`})
    }
  }


  export const findListing = async(req,res)=>{
    try {
      let {id} = req.params
      let listing = await Listing.findById(id);
      if(!listing){
        res.status(400).json({message:"listing not found"})
      }
      res.status(200).json(listing)
    } catch (error) {
      res.status(500).json({message:`findListing error ${error}`})
    }
  }
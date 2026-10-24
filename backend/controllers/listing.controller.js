import uploadOnCloudinary from "../config/cloudinaryy.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

export const addListing = async (req, res) => {
  try {
    let image1;
    let image2;
    let image3;
    const host = req.userId;

    let {title,description,rent,city,landmark,category} = req.body;
     if (
        !req.files?.image1?.[0] ||
        !req.files?.image2?.[0] ||
        !req.files?.image3?.[0]
      ) {
        return res.status(400).json({
          message: "Please upload all three images",
        });
      }

    if(req.files.image1){image1 = await uploadOnCloudinary(req.files.image1[0].path);}

    if(req.files.image2){image2 = await uploadOnCloudinary(req.files.image2[0].path);}

    if(req.files.image3){image3 = await uploadOnCloudinary(req.files.image3[0].path);}

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
      return res.status(200).json(listing);
    } 
    catch (error) {
      return res.status(500).json({message:`getListing error ${error}`})
    }
  }


  export const findListing = async(req,res)=>{
    try {
      let {id} = req.params
      let listing = await Listing.findById(id);
      if(!listing){
        return res.status(400).json({message:"listing not found"})
      }
      res.status(200).json(listing)
    } catch (error) {
      return res.status(500).json({message:`findListing error ${error}`})
    }
  }

  export const updateListing = async(req,res) => {
    try {
      const {id} = req.params;
      const {title,description,rent,city,landmark,category} = req.body;
      const existingListing = await Listing.findById(id);

      if (!existingListing) {
        return res.status(404).json({
          message: "Listing not found",
        });
      }

      // Keep existing images if no new image is uploaded
      let image1 = existingListing.image1;
      let image2 = existingListing.image2;
      let image3 = existingListing.image3;

      // Upload image1 only if a new image is selected
      if (req.files?.image1?.[0]) {
        image1 = await uploadOnCloudinary(req.files.image1[0].path);
      }

      // Upload image2 only if a new image is selected
      if (req.files?.image2?.[0]) {
        image2 = await uploadOnCloudinary(req.files.image2[0].path);
      }

      // Upload image3 only if a new image is selected
      if (req.files?.image3?.[0]) {
        image3 = await uploadOnCloudinary(req.files.image3[0].path);
      }

      // Check image upload failures
      if (!image1 || !image2 || !image3) {
        return res.status(500).json({
          message: "Failed to upload images",
        });
      }

      const listing = await Listing.findByIdAndUpdate(id,{
        title,
        description,
        rent: Number(rent),
        city,
        landmark,
        category,
        image1,
        image2,
        image3,
        
      },{new:true});
      return res.status(201).json({
        message: "Listing updated successfully",
        listing,
      });
      
    } catch (error) {
        console.error("UpdateListing Error:", error);

        return res.status(500).json({
          message: "update listing error",
          error: error.message
        });
    }
  }

  export const deleteListing = async (req,res)=>{
    try {
      let {id} = req.params;
      let listing = await Listing.findByIdAndDelete(id)
      let user = await User.findByIdAndUpdate(listing.host,{$pull:{listing:listing._id}},{mew:true})
      if(!user){
        return res.status(404).json({message:"user is not defined"})
      }
      return res.status(201).json({message:"Listing Deleted"})
    } catch (error) {
        return res.status(500).json({message:`UpdateListing Error ${error}`})
    }
  }

  export const ratingListing = async (req,res) => {
    try {
      let {id} = req.params;
      let {ratings} = req.body
      let listing = await Listing.findById(id)
      if(!listing){
        return res.status(400).json({message:"listing not found"})
      }
      listing.ratings = Number(ratings)
      await listing.save()
      return res.status(200).json({ratings:listing.ratings})
    } catch (error) {
        return res.status(500).json({message:`Rating Error ${error}`})
    }
  }

  export const search = async (req,res) => {
    try {
      const {query} = req.query;

      if(!query){
        return res.status(400).json({message: "Search query is required"})
      }

      const listing = await Listing.find({
        $or: [
          { landmark: {$regex: query, $options: "i" } },
          { city: {$regex: query, $options: "i" } },
          { title: {$regex: query, $options: "i" } }
        ]
      })
      return res.status(200).json(listing);
    } catch (error) {
        console.error("Search error", error);
        return res.status(500).json({message: "Internal server error"})
    }
  }
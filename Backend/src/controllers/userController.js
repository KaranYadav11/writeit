import User from "../models/userModel.js";
import mongoose from "mongoose";

export const getUserSavedPosts = async (req, res) => {
  try {
    const id = req.user._id;
    const user = await User.findOne({ _id: id })
      .select("savedPosts")
      .populate({
        path: "savedPosts",
        populate: {
          path: "user",
          select: "fullName email",
        },
      });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user.savedPosts.reverse());
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error ", error: error.message });
  }
};

export const savePost = async (req, res) => {
  try {
    const { postId } = req.body;
    const id = req.user._id;

    const user = await User.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const objectId = new mongoose.Types.ObjectId(postId);

    const isSaved = user.savedPosts.some((p) => p.equals(objectId));

    if (!isSaved) {
      await User.findByIdAndUpdate(user._id, {
        $push: { savedPosts: objectId },
      });
    } else {
      await User.findByIdAndUpdate(user._id, {
        $pull: { savedPosts: objectId },
      });
    }

    res.status(200).json({ message: isSaved ? "Post Unsaved" : "Post Saved" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server error", error: error.message });
  }
};

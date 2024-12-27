import mongoose from "mongoose";
import Post from "../models/postModel.js";
import ImageKit from "imagekit";
import dotenv from "dotenv";
dotenv.config();

export const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 2;

    const posts = await Post.find()
      .limit(limit)
      .skip(limit * (page - 1))
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "-password",
      });

    const totalPosts = await Post.countDocuments();
    const hasMore = totalPosts > limit * page;
    res.status(200).json({ posts, hasMore });
  } catch (error) {
    console.error("Error in getPosts Controller : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const getPost = async (req, res) => {
  const { slug } = req.params;
  try {
    const post = await Post.findOne({ slug }).populate({
      path: "user",
      select: "-password",
    });
    if (!post) {
      return res.status(404).json({ error: "Post Does Not Exists" });
    }
    res.status(200).json(post);
  } catch (error) {
    console.error("Error in getPost Controller : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const createPost = async (req, res) => {
  try {
    if (!req.body.title || !req.body.content || !req.body.desc) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const user = req.user._id;
    let slug = req.body.title.replace(/\s+/g, "-").toLowerCase();
    let existingPost = await Post.findOne({ slug });
    let count = 2;
    while (existingPost) {
      slug = `${slug}-${count}`;
      existingPost = await Post.findOne({ slug });
      count++;
    }
    const post = new Post({ ...req.body, slug, user });
    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error("Error in createPost Controller : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
export const updatePost = async (req, res) => {
  const { slug } = req.params;
  const { title, content, desc, category, img } = req.body;

  try {
    if (!req.body.title || !req.body.content || !req.body.desc) {
      return res.status(400).json({ error: "All fields are requiredxx" });
    }
    // Find the post to update
    const post = await Post.findOne({ slug });

    if (!post) {
      return res.status(404).json({ error: "Post does not exist" });
    }

    // Check if the authenticated user is the owner of the post
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to update this post" });
    }

    // Update the fields
    if (title) {
      let newSlug = title.replace(/\s+/g, "-").toLowerCase();

      // Check if the new slug already exists
      let existingPost = await Post.findOne({ slug: newSlug });
      let count = 2;

      while (
        existingPost &&
        existingPost._id.toString() !== post._id.toString()
      ) {
        newSlug = `${newSlug}-${count}`;
        existingPost = await Post.findOne({ slug: newSlug });
        count++;
      }

      post.slug = newSlug;
    }
    if (title) post.title = title;
    if (content) post.content = content;
    if (desc) post.desc = desc;
    if (category) post.category = category;
    if (img) post.img = img;

    // Save the updated post
    await post.save();

    res.status(200).json(post);
  } catch (error) {
    console.error("Error in updatePost Controller:", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Post ID is required" });
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Post ID format" });
    }
    let post = await Post.findById(id);
    if (!post) {
      return res.status(404).json({ error: "Post does not exists" });
    }
    if (post.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ error: "You are not authorized to delete this post" });
    }

    post = await Post.findByIdAndDelete(id);

    res.status(200).json({ message: "Post Deleted" });
  } catch (error) {
    console.error("Error in deletePost Controller : ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

const imagekit = new ImageKit({
  urlEndpoint: process.env.IK_URL_ENDPOINT,
  publicKey: process.env.IK_PUBLIC_KEY,
  privateKey: process.env.IK_PRIVATE_KEY,
});

export const uploadAuth = async (req, res) => {
  const result = imagekit.getAuthenticationParameters();
  res.send(result);
};

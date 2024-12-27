import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  deletePost,
  uploadAuth,
  updatePost,
} from "../controllers/postController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth);
router.get("/", getPosts);
router.get("/:slug", getPost);
router.post("/", isAuthenticated, createPost);
router.put("/:slug", isAuthenticated, updatePost);
router.delete("/:id", isAuthenticated, deletePost);

export default router;

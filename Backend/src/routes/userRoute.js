import express from "express";
import { getUserSavedPosts, savePost } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/saved", isAuthenticated, getUserSavedPosts);
router.patch("/save", isAuthenticated, savePost);

export default router;
